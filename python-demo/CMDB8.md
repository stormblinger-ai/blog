# 8.已上线资产更新



------

前面，我们已经实现了资产进入待审批区、更新待审批区的资产信息以及审批资产上线三个主要功能，还剩下一个最主要的实时更新已上线资产信息的功能。

在`assets/views.py`中的report视图，目前是把已上线资产的数据更新流程‘pass’了，现在将其替换成下面的语句：

```
update_asset = asset_handler.UpdateAsset(request, asset_obj[0], data)
```

report视图变成了下面的样子：

```
@csrf_exempt
def report(request):
    """
    通过csrf_exempt装饰器，跳过Django的csrf安全机制，让post的数据能被接收，但这又会带来新的安全问题。
    可以在客户端，使用自定义的认证token，进行身份验证。这部分工作，请根据实际情况，自己进行。
    :param request:
    :return:
    """
    if request.method == "POST":
        asset_data = request.POST.get('asset_data')
        data = json.loads(asset_data)
        # 各种数据检查，请自行添加和完善！
        if not data:
            return HttpResponse("没有数据！")
        if not issubclass(dict, type(data)):
            return HttpResponse("数据必须为字典格式！")
        # 是否携带了关键的sn号
        sn = data.get('sn', None)
        if sn:
            # 进入审批流程
            # 首先判断是否在上线资产中存在该sn
            asset_obj = models.Asset.objects.filter(sn=sn)
            if asset_obj:
                # 进入已上线资产的数据更新流程
                update_asset = asset_handler.UpdateAsset(request, asset_obj[0], data)
                return HttpResponse("资产数据已经更新！")
            else:   # 如果已上线资产中没有，那么说明是未批准资产，进入新资产待审批区，更新或者创建资产。
                obj = asset_handler.NewAsset(request, data)
                response = obj.add_to_new_assets_zone()
                return HttpResponse(response)
        else:
            return HttpResponse("没有资产sn序列号，请检查数据！")
    return HttpResponse('200 ok')
```

然后，进入`assets/asset_handler.py`模块，修改`log()`方法，并且增加`UpdateAsset`类：

```
def log(log_type, msg=None, asset=None, new_asset=None, request=None):
    """
    记录日志
    """
    event = models.EventLog()
    if log_type == "upline":
        event.name = "%s <%s> ：  上线" % (asset.name, asset.sn)
        event.asset = asset
        event.detail = "资产成功上线！"
        event.user = request.user
    elif log_type == "approve_failed":
        event.name = "%s <%s> ：  审批失败" % (new_asset.asset_type, new_asset.sn)
        event.new_asset = new_asset
        event.detail = "审批失败！\n%s" % msg
        event.user = request.user
    elif log_type == "update":
        event.name = "%s <%s> ：  数据更新！" % (asset.asset_type, asset.sn)
        event.asset = asset
        event.detail = "更新成功！"
    elif log_type == "update_failed":
        event.name = "%s <%s> ：  更新失败" % (asset.asset_type, asset.sn)
        event.asset = asset
        event.detail = "更新失败！\n%s" % msg
    # 更多日志类型.....
    event.save()


class UpdateAsset:
    """
    自动更新已上线的资产。
    如果想让记录的日志更详细，可以逐条对比数据项，将更新过的项目记录到log信息中。
    """

    def __init__(self, request, asset, report_data):
        self.request = request
        self.asset = asset
        self.report_data = report_data            # 此处的数据是由客户端发送过来的整个数据字符串
        self.asset_update()

    def asset_update(self):
        # 为以后的其它类型资产扩展留下接口
        func = getattr(self, "_%s_update" % self.report_data['asset_type'])
        ret = func()
        return ret

    def _server_update(self):
        try:
            self._update_manufacturer()   # 更新厂商
            self._update_server()         # 更新服务器
            self._update_CPU()            # 更新CPU
            self._update_RAM()            # 更新内存
            self._update_disk()           # 更新硬盘
            self._update_nic()            # 更新网卡
            self.asset.save()
        except Exception as e:
            log('update_failed', msg=e, asset=self.asset, request=self.request)
            print(e)
            return False
        else:
            # 添加日志
            log("update", asset=self.asset)
            print("资产数据被更新!")
            return True

    def _update_manufacturer(self):
        """
        更新厂商
        """
        m = self.report_data.get('manufacturer')
        if m:
            manufacturer_obj, _ = models.Manufacturer.objects.get_or_create(name=m)
            self.asset.manufacturer = manufacturer_obj
        else:
            self.asset.manufacturer = None
        self.asset.manufacturer.save()

    def _update_server(self):
        """
        更新服务器
        """
        self.asset.server.model = self.report_data.get('model')
        self.asset.server.os_type = self.report_data.get('os_type')
        self.asset.server.os_distribution = self.report_data.get('os_distribution')
        self.asset.server.os_release = self.report_data.get('os_release')
        self.asset.server.save()

    def _update_CPU(self):
        """
        更新CPU信息
        :return:
        """
        self.asset.cpu.cpu_model = self.report_data.get('cpu_model')
        self.asset.cpu.cpu_count = self.report_data.get('cpu_count')
        self.asset.cpu.cpu_core_count = self.report_data.get('cpu_core_count')
        self.asset.cpu.save()

    def _update_RAM(self):
        """
        更新内存信息。
        使用集合数据类型中差的概念，处理不同的情况。
        如果新数据有，但原数据没有，则新增；
        如果新数据没有，但原数据有，则删除原来多余的部分；
        如果新的和原数据都有，则更新。
        在原则上，下面的代码应该写成一个复用的函数，
        但是由于内存、硬盘、网卡在某些方面的差别，导致很难提取出重用的代码。
        :return:
        """
        # 获取已有内存信息，并转成字典格式
        old_rams = models.RAM.objects.filter(asset=self.asset)
        old_rams_dict = dict()
        if old_rams:
            for ram in old_rams:
                old_rams_dict[ram.slot] = ram
        # 获取新数据中的内存信息，并转成字典格式
        new_rams_list = self.report_data['ram']
        new_rams_dict = dict()
        if new_rams_list:
            for item in new_rams_list:
                new_rams_dict[item['slot']] = item

        # 利用set类型的差集功能，获得需要删除的内存数据对象
        need_deleted_keys = set(old_rams_dict.keys()) - set(new_rams_dict.keys())
        if need_deleted_keys:
            for key in need_deleted_keys:
                old_rams_dict[key].delete()

        # 需要新增或更新的
        if new_rams_dict:
            for key in new_rams_dict:
                defaults = {
                            'sn': new_rams_dict[key].get('sn'),
                            'model': new_rams_dict[key].get('model'),
                            'manufacturer': new_rams_dict[key].get('manufacturer'),
                            'capacity': new_rams_dict[key].get('capacity', 0),
                            }
                models.RAM.objects.update_or_create(asset=self.asset, slot=key, defaults=defaults)

    def _update_disk(self):
        """
        更新硬盘信息。类似更新内存。
        """
        old_disks = models.Disk.objects.filter(asset=self.asset)
        old_disks_dict = dict()
        if old_disks:
            for disk in old_disks:
                old_disks_dict[disk.sn] = disk

        new_disks_list = self.report_data['physical_disk_driver']
        new_disks_dict = dict()
        if new_disks_list:
            for item in new_disks_list:
                new_disks_dict[item['sn']] = item

        # 需要删除的
        need_deleted_keys = set(old_disks_dict.keys()) - set(new_disks_dict.keys())
        if need_deleted_keys:
            for key in need_deleted_keys:
                old_disks_dict[key].delete()

        # 需要新增或更新的
        if new_disks_dict:
            for key in new_disks_dict:
                interface_type = new_disks_dict[key].get('interface_type', 'unknown')
                if interface_type not in ['SATA', 'SAS', 'SCSI', 'SSD', 'unknown']:
                    interface_type = 'unknown'
                defaults = {
                    'slot': new_disks_dict[key].get('slot'),
                    'model': new_disks_dict[key].get('model'),
                    'manufacturer': new_disks_dict[key].get('manufacturer'),
                    'capacity': new_disks_dict[key].get('capacity', 0),
                    'interface_type': interface_type,
                }
                models.Disk.objects.update_or_create(asset=self.asset, sn=key, defaults=defaults)

    def _update_nic(self):
        """
        更新网卡信息。类似更新内存。
        """
        old_nics = models.NIC.objects.filter(asset=self.asset)
        old_nics_dict = dict()
        if old_nics:
            for nic in old_nics:
                old_nics_dict[nic.model+nic.mac] = nic

        new_nics_list = self.report_data['nic']
        new_nics_dict = dict()
        if new_nics_list:
            for item in new_nics_list:
                new_nics_dict[item['model']+item['mac']] = item

        # 需要删除的
        need_deleted_keys = set(old_nics_dict.keys()) - set(new_nics_dict.keys())
        if need_deleted_keys:
            for key in need_deleted_keys:
                old_nics_dict[key].delete()

        # 需要新增或更新的
        if new_nics_dict:
            for key in new_nics_dict:
                if new_nics_dict[key].get('net_mask') and len(new_nics_dict[key].get('net_mask')) > 0:
                    net_mask = new_nics_dict[key].get('net_mask')[0]
                else:
                    net_mask = ""
                defaults = {
                    'name': new_nics_dict[key].get('name'),
                    'ip_address': new_nics_dict[key].get('ip_address'),
                    'net_mask': net_mask,
                }
                models.NIC.objects.update_or_create(asset=self.asset, model=new_nics_dict[key]['model'],
                                                    mac=new_nics_dict[key]['mac'], defaults=defaults)

        print('更新成功！')
```

对于log()函数，只是增加了两种数据更新的日志类型，分别记录不同的日志情况，没什么特别的。

对于UpdateAsset类，类似前面的ApproveAsset类：

- 首先初始化动作，自动执行asset_update()方法；
- 依然是通过反射，决定要调用的更新方法；
- 教程实现了主要的服务器类型资产的更新，对于网络设备、安全设备等请自行完善，基本类似；
- `_server_update(self)`方法中，分别更新厂商、服务器本身、CPU、内存、网卡、硬盘等信息。然后保存数据，这些事务应该是原子性的，所以要抓取异常；
- 不管成功还是失败，都要记录日志。

最主要的，对于`_update_CPU(self)`等方法，以内存为例，由于内存可能有多条，新的数据中可能出现三种情况，拔除、新增、信息变更，因此要分别对待和处理。

- 首先，获取已有内存信息，并转成字典格式；
- 其次，获取新数据中的内存信息，并转成字典格式；
- 利用set类型的差集功能，获得需要删除的内存数据对象
- 对要删除的对象，执行delete()方法；
- 对于需要新增或更新的内存对象，首先生成defaults数据字典；
- 然后，使用`update_or_create(asset=self.asset, slot=key, defaults=defaults)`方法，一次性完成新增或者更新数据的操作，不用写两个方法的代码；
- 硬盘和网卡的操作类同内存的操作。

数据更新完毕后，需要保存asset对象，也就是`self.asset.save()`，否则前面的工作无法关联保存下来。

**最终的`asset_handler.py`如下**：

```
import json
from assets import models


class NewAsset(object):
    def __init__(self, request, data):
        self.request = request
        self.data = data

    def add_to_new_assets_zone(self):
        defaults = {
            'data': json.dumps(self.data),
            'asset_type': self.data.get('asset_type'),
            'manufacturer': self.data.get('manufacturer'),
            'model': self.data.get('model'),
            'ram_size': self.data.get('ram_size'),
            'cpu_model': self.data.get('cpu_model'),
            'cpu_count': self.data.get('cpu_count'),
            'cpu_core_count': self.data.get('cpu_core_count'),
            'os_distribution': self.data.get('os_distribution'),
            'os_release': self.data.get('os_release'),
            'os_type': self.data.get('os_type'),

        }
        models.NewAssetApprovalZone.objects.update_or_create(sn=self.data['sn'], defaults=defaults)

        return '资产已经加入或更新待审批区！'


def log(log_type, msg=None, asset=None, new_asset=None, request=None):
    """
    记录日志
    """
    event = models.EventLog()
    if log_type == "upline":
        event.name = "%s <%s> ：  上线" % (asset.name, asset.sn)
        event.asset = asset
        event.detail = "资产成功上线！"
        event.user = request.user
    elif log_type == "approve_failed":
        event.name = "%s <%s> ：  审批失败" % (new_asset.asset_type, new_asset.sn)
        event.new_asset = new_asset
        event.detail = "审批失败！\n%s" % msg
        event.user = request.user
    elif log_type == "update":
        event.name = "%s <%s> ：  数据更新！" % (asset.asset_type, asset.sn)
        event.asset = asset
        event.detail = "更新成功！"
    elif log_type == "update_failed":
        event.name = "%s <%s> ：  更新失败" % (asset.asset_type, asset.sn)
        event.asset = asset
        event.detail = "更新失败！\n%s" % msg
    # 更多日志类型.....
    event.save()


class ApproveAsset:
    """
    审批资产并上线。
    """
    def __init__(self, request, asset_id):
        self.request = request
        self.new_asset = models.NewAssetApprovalZone.objects.get(id=asset_id)
        self.data = json.loads(self.new_asset.data)

    def asset_upline(self):
        # 为以后的其它类型资产扩展留下接口
        func = getattr(self, "_%s_upline" % self.new_asset.asset_type)
        ret = func()
        return ret

    def _server_upline(self):
        # 在实际的生产环境中，下面的操作应该是原子性的整体事务，任何一步出现异常，所有操作都要回滚。
        asset = self._create_asset()  # 创建一条资产并返回资产对象。注意要和待审批区的资产区分开。
        try:
            self._create_manufacturer(asset) # 创建厂商
            self._create_server(asset)       # 创建服务器
            self._create_CPU(asset)          # 创建CPU
            self._create_RAM(asset)          # 创建内存
            self._create_disk(asset)         # 创建硬盘
            self._create_nic(asset)          # 创建网卡
            self._delete_original_asset()    # 从待审批资产区删除已审批上线的资产
        except Exception as e:
            asset.delete()
            log('approve_failed', msg=e, new_asset=self.new_asset, request=self.request)
            print(e)
            return False
        else:
            # 添加日志
            log("upline", asset=asset, request=self.request)
            print("新服务器上线!")
            return True

    def _create_asset(self):
        """
        创建资产并上线
        :return:
        """
        # 利用request.user自动获取当前管理人员的信息，作为审批人添加到资产数据中。
        asset = models.Asset.objects.create(asset_type=self.new_asset.asset_type,
                                            name="%s: %s" % (self.new_asset.asset_type, self.new_asset.sn),
                                            sn=self.new_asset.sn,
                                            approved_by=self.request.user,
                                            )
        return asset

    def _create_manufacturer(self, asset):
        """
        创建厂商
        :param asset:
        :return:
        """
        # 判断厂商数据是否存在。如果存在，看看数据库里是否已经有该厂商，再决定是获取还是创建。
        m = self.new_asset.manufacturer
        if m:
            manufacturer_obj, _ = models.Manufacturer.objects.get_or_create(name=m)
            asset.manufacturer = manufacturer_obj
            asset.save()

    def _create_server(self, asset):
        """
        创建服务器
        :param asset:
        :return:
        """
        models.Server.objects.create(asset=asset,
                                     model=self.new_asset.model,
                                     os_type=self.new_asset.os_type,
                                     os_distribution=self.new_asset.os_distribution,
                                     os_release=self.new_asset.os_release,
                                     )

    def _create_CPU(self, asset):
        """
        创建CPU.
        教程这里对发送过来的数据采取了最大限度的容忍，
        实际情况下你可能还要对数据的完整性、合法性、数据类型进行检测，
        根据不同的检测情况，是被动接收，还是打回去要求重新收集，请自行决定。
        这里的业务逻辑非常复杂，不可能面面俱到。
        :param asset:
        :return:
        """
        cpu = models.CPU.objects.create(asset=asset)
        cpu.cpu_model = self.new_asset.cpu_model
        cpu.cpu_count = self.new_asset.cpu_count
        cpu.cpu_core_count = self.new_asset.cpu_core_count
        cpu.save()

    def _create_RAM(self, asset):
        """
        创建内存。通常有多条内存
        :param asset:
        :return:
        """
        ram_list = self.data.get('ram')
        if not ram_list:    # 万一一条内存数据都没有
            return
        for ram_dict in ram_list:
            if not ram_dict.get('slot'):
                raise ValueError("未知的内存插槽！")  # 使用虚拟机的时候，可能无法获取内存插槽，需要你修改此处的逻辑。
            ram = models.RAM()
            ram.asset = asset
            ram.slot = ram_dict.get('slot')
            ram.sn = ram_dict.get('sn')
            ram.model = ram_dict.get('model')
            ram.manufacturer = ram_dict.get('manufacturer')
            ram.capacity = ram_dict.get('capacity', 0)
            ram.save()

    def _create_disk(self, asset):
        """
        存储设备种类多，还有Raid情况，需要根据实际情况具体解决。
        这里只以简单的SATA硬盘为例子。可能有多块硬盘。
        :param asset:
        :return:
        """
        disk_list = self.data.get('physical_disk_driver')
        if not disk_list:  # 一条硬盘数据都没有
            return
        for disk_dict in disk_list:
            if not disk_dict.get('sn'):
                raise ValueError("未知sn的硬盘！")  # 根据sn确定具体某块硬盘。
            disk = models.Disk()
            disk.asset = asset
            disk.sn = disk_dict.get('sn')
            disk.model = disk_dict.get('model')
            disk.manufacturer = disk_dict.get('manufacturer'),
            disk.slot = disk_dict.get('slot')
            disk.capacity = disk_dict.get('capacity', 0)
            iface = disk_dict.get('interface_type')
            if iface in ['SATA', 'SAS', 'SCSI', 'SSD', 'unknown']:
                disk.interface_type = iface

            disk.save()

    def _create_nic(self, asset):
        """
        创建网卡。可能有多个网卡，甚至虚拟网卡。
        :param asset:
        :return:
        """
        nic_list = self.data.get("nic")
        if not nic_list:
            return

        for nic_dict in nic_list:
            if not nic_dict.get('mac'):
                raise ValueError("网卡缺少mac地址！")
            if not nic_dict.get('model'):
                raise ValueError("网卡型号未知！")

            nic = models.NIC()
            nic.asset = asset
            nic.name = nic_dict.get('name')
            nic.model = nic_dict.get('model')
            nic.mac = nic_dict.get('mac')
            nic.ip_address = nic_dict.get('ip_address')
            if nic_dict.get('net_mask'):
                if len(nic_dict.get('net_mask')) > 0:
                    nic.net_mask = nic_dict.get('net_mask')[0]
            nic.save()

    def _delete_original_asset(self):
        """
        这里的逻辑是已经审批上线的资产，就从待审批区删除。
        也可以设置为修改成已审批状态但不删除，只是在管理界面特别处理，不让再次审批，灰色显示。
        不过这样可能导致待审批区越来越大。
        :return:
        """
        self.new_asset.delete()


class UpdateAsset:
    """
    自动更新已上线的资产。
    如果想让记录的日志更详细，可以逐条对比数据项，将更新过的项目记录到log信息中。
    """

    def __init__(self, request, asset, report_data):
        self.request = request
        self.asset = asset
        self.report_data = report_data            # 此处的数据是由客户端发送过来的整个数据字符串
        self.asset_update()

    def asset_update(self):
        # 为以后的其它类型资产扩展留下接口
        func = getattr(self, "_%s_update" % self.report_data['asset_type'])
        ret = func()
        return ret

    def _server_update(self):
        try:
            self._update_manufacturer()   # 更新厂商
            self._update_server()         # 更新服务器
            self._update_CPU()            # 更新CPU
            self._update_RAM()            # 更新内存
            self._update_disk()           # 更新硬盘
            self._update_nic()            # 更新网卡
            self.asset.save()
        except Exception as e:
            log('update_failed', msg=e, asset=self.asset, request=self.request)
            print(e)
            return False
        else:
            # 添加日志
            log("update", asset=self.asset)
            print("资产数据被更新!")
            return True

    def _update_manufacturer(self):
        """
        更新厂商
        """
        m = self.report_data.get('manufacturer')
        if m:
            manufacturer_obj, _ = models.Manufacturer.objects.get_or_create(name=m)
            self.asset.manufacturer = manufacturer_obj
        else:
            self.asset.manufacturer = None
        self.asset.manufacturer.save()

    def _update_server(self):
        """
        更新服务器
        """
        self.asset.server.model = self.report_data.get('model')
        self.asset.server.os_type = self.report_data.get('os_type')
        self.asset.server.os_distribution = self.report_data.get('os_distribution')
        self.asset.server.os_release = self.report_data.get('os_release')
        self.asset.server.save()

    def _update_CPU(self):
        """
        更新CPU信息
        :return:
        """
        self.asset.cpu.cpu_model = self.report_data.get('cpu_model')
        self.asset.cpu.cpu_count = self.report_data.get('cpu_count')
        self.asset.cpu.cpu_core_count = self.report_data.get('cpu_core_count')
        self.asset.cpu.save()

    def _update_RAM(self):
        """
        更新内存信息。
        使用集合数据类型中差的概念，处理不同的情况。
        如果新数据有，但原数据没有，则新增；
        如果新数据没有，但原数据有，则删除原来多余的部分；
        如果新的和原数据都有，则更新。
        在原则上，下面的代码应该写成一个复用的函数，
        但是由于内存、硬盘、网卡在某些方面的差别，导致很难提取出重用的代码。
        :return:
        """
        # 获取已有内存信息，并转成字典格式
        old_rams = models.RAM.objects.filter(asset=self.asset)
        old_rams_dict = dict()
        if old_rams:
            for ram in old_rams:
                old_rams_dict[ram.slot] = ram
        # 获取新数据中的内存信息，并转成字典格式
        new_rams_list = self.report_data['ram']
        new_rams_dict = dict()
        if new_rams_list:
            for item in new_rams_list:
                new_rams_dict[item['slot']] = item

        # 利用set类型的差集功能，获得需要删除的内存数据对象
        need_deleted_keys = set(old_rams_dict.keys()) - set(new_rams_dict.keys())
        if need_deleted_keys:
            for key in need_deleted_keys:
                old_rams_dict[key].delete()

        # 需要新增或更新的
        if new_rams_dict:
            for key in new_rams_dict:
                defaults = {
                            'sn': new_rams_dict[key].get('sn'),
                            'model': new_rams_dict[key].get('model'),
                            'manufacturer': new_rams_dict[key].get('manufacturer'),
                            'capacity': new_rams_dict[key].get('capacity', 0),
                            }
                models.RAM.objects.update_or_create(asset=self.asset, slot=key, defaults=defaults)

    def _update_disk(self):
        """
        更新硬盘信息。类似更新内存。
        """
        old_disks = models.Disk.objects.filter(asset=self.asset)
        old_disks_dict = dict()
        if old_disks:
            for disk in old_disks:
                old_disks_dict[disk.sn] = disk

        new_disks_list = self.report_data['physical_disk_driver']
        new_disks_dict = dict()
        if new_disks_list:
            for item in new_disks_list:
                new_disks_dict[item['sn']] = item

        # 需要删除的
        need_deleted_keys = set(old_disks_dict.keys()) - set(new_disks_dict.keys())
        if need_deleted_keys:
            for key in need_deleted_keys:
                old_disks_dict[key].delete()

        # 需要新增或更新的
        if new_disks_dict:
            for key in new_disks_dict:
                interface_type = new_disks_dict[key].get('interface_type', 'unknown')
                if interface_type not in ['SATA', 'SAS', 'SCSI', 'SSD', 'unknown']:
                    interface_type = 'unknown'
                defaults = {
                    'slot': new_disks_dict[key].get('slot'),
                    'model': new_disks_dict[key].get('model'),
                    'manufacturer': new_disks_dict[key].get('manufacturer'),
                    'capacity': new_disks_dict[key].get('capacity', 0),
                    'interface_type': interface_type,
                }
                models.Disk.objects.update_or_create(asset=self.asset, sn=key, defaults=defaults)

    def _update_nic(self):
        """
        更新网卡信息。类似更新内存。
        """
        old_nics = models.NIC.objects.filter(asset=self.asset)
        old_nics_dict = dict()
        if old_nics:
            for nic in old_nics:
                old_nics_dict[nic.model+nic.mac] = nic

        new_nics_list = self.report_data['nic']
        new_nics_dict = dict()
        if new_nics_list:
            for item in new_nics_list:
                new_nics_dict[item['model']+item['mac']] = item

        # 需要删除的
        need_deleted_keys = set(old_nics_dict.keys()) - set(new_nics_dict.keys())
        if need_deleted_keys:
            for key in need_deleted_keys:
                old_nics_dict[key].delete()

        # 需要新增或更新的
        if new_nics_dict:
            for key in new_nics_dict:
                if new_nics_dict[key].get('net_mask') and len(new_nics_dict[key].get('net_mask')) > 0:
                    net_mask = new_nics_dict[key].get('net_mask')[0]
                else:
                    net_mask = ""
                defaults = {
                    'name': new_nics_dict[key].get('name'),
                    'ip_address': new_nics_dict[key].get('ip_address'),
                    'net_mask': net_mask,
                }
                models.NIC.objects.update_or_create(asset=self.asset, model=new_nics_dict[key]['model'],
                                                    mac=new_nics_dict[key]['mac'], defaults=defaults)

        print('更新成功！')
```

现在，可以测试一下资产数据的更新了。重启CMDB，然后转到Client/report_assetss.py脚本，修改其中的一些数据，删除或增加一些内存、硬盘、网卡的条目。**注意数据格式必须正确，sn必须不能变。**

再次运行脚本，报告数据。进入admin中查看相关内容，可以看到数据已经得到更新了。

至此，CMDB自动资产管理系统的后台部分已经完成了。