# 4.收集Windows数据



------

## 一、windows中收集硬件信息

为了收集运行Windows操作系统的服务器的硬件信息，我们需要编写一个专门的脚本。

在Pycharm的Client目录下的plugins包中，新建一个`collect_windows_info.py`文件，写入下面的代码：

```
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import platform
import win32com
import wmi

"""
本模块基于windows操作系统，依赖wmi和win32com库，需要提前使用pip进行安装，
pip install wmi
pip install pypiwin32
或者下载安装包手动安装。
"""


class Win32Info(object):

    def __init__(self):
        # 固定用法，更多内容请参考模块说明
        self.wmi_obj = wmi.WMI()
        self.wmi_service_obj = win32com.client.Dispatch("WbemScripting.SWbemLocator")
        self.wmi_service_connector = self.wmi_service_obj.ConnectServer(".", "root\cimv2")

    def collect(self):
        data = {
            'os_type': platform.system(),
            'os_release': "%s %s  %s " % (platform.release(), platform.architecture()[0], platform.version()),
            'os_distribution': 'Microsoft',
            'asset_type': 'server'
        }

        # 分别获取各种硬件信息
        data.update(self.get_cpu_info())
        data.update(self.get_ram_info())
        data.update(self.get_motherboard_info())
        data.update(self.get_disk_info())
        data.update(self.get_nic_info())
        # 最后返回一个数据字典
        return data

    def get_cpu_info(self):
        """
        获取CPU的相关数据，这里只采集了三个数据，实际有更多，请自行选择需要的数据
        :return:
        """
        data = {}
        cpu_lists = self.wmi_obj.Win32_Processor()
        cpu_core_count = 0
        for cpu in cpu_lists:
            cpu_core_count += cpu.NumberOfCores

        cpu_model = cpu_lists[0].Name   # CPU型号（所有的CPU型号都是一样的）
        data["cpu_count"] = len(cpu_lists)      # CPU个数
        data["cpu_model"] = cpu_model
        data["cpu_core_count"] = cpu_core_count  # CPU总的核数

        return data

    def get_ram_info(self):
        """
        收集内存信息
        :return:
        """
        data = []
        # 这个模块用SQL语言获取数据
        ram_collections = self.wmi_service_connector.ExecQuery("Select * from Win32_PhysicalMemory")
        for ram in ram_collections:    # 主机中存在很多根内存，要循环所有的内存数据
            ram_size = int(int(ram.Capacity) / (1024**3))  # 转换内存单位为GB
            item_data = {
                "slot": ram.DeviceLocator.strip(),
                "capacity": ram_size,
                "model": ram.Caption,
                "manufacturer": ram.Manufacturer,
                "sn": ram. SerialNumber,
            }
            data.append(item_data)  # 将每条内存的信息，添加到一个列表里

        return {"ram": data}    # 再对data列表封装一层，返回一个字典，方便上级方法的调用

    def get_motherboard_info(self):
        """
        获取主板信息
        :return:
        """
        computer_info = self.wmi_obj.Win32_ComputerSystem()[0]
        system_info = self.wmi_obj.Win32_OperatingSystem()[0]
        data = {}
        data['manufacturer'] = computer_info.Manufacturer
        data['model'] = computer_info.Model
        data['wake_up_type'] = computer_info.WakeUpType
        data['sn'] = system_info.SerialNumber
        return data

    def get_disk_info(self):
        """
        硬盘信息
        :return:
        """
        data = []
        for disk in self.wmi_obj.Win32_DiskDrive():     # 每块硬盘都要获取相应信息
            disk_data = {}
            interface_choices = ["SAS", "SCSI", "SATA", "SSD"]
            for interface in interface_choices:
                if interface in disk.Model:
                    disk_data['interface_type'] = interface
                    break
            else:
                disk_data['interface_type'] = 'unknown'

            disk_data['slot'] = disk.Index
            disk_data['sn'] = disk.SerialNumber
            disk_data['model'] = disk.Model
            disk_data['manufacturer'] = disk.Manufacturer
            disk_data['capacity'] = int(int(disk.Size) / (1024**3))
            data.append(disk_data)

        return {'physical_disk_driver': data}

    def get_nic_info(self):
        """
        网卡信息
        :return:
        """
        data = []
        for nic in self.wmi_obj.Win32_NetworkAdapterConfiguration():
            if nic.MACAddress is not None:
                nic_data = {}
                nic_data['mac'] = nic.MACAddress
                nic_data['model'] = nic.Caption
                nic_data['name'] = nic.Index
                if nic.IPAddress is not None:
                    nic_data['ip_address'] = nic.IPAddress[0]
                    nic_data['net_mask'] = nic.IPSubnet
                else:
                    nic_data['ip_address'] = ''
                    nic_data['net_mask'] = ''
                data.append(nic_data)

        return {'nic': data}


if __name__ == "__main__":
    # 测试代码
    data = Win32Info().collect()
    for key in data:
        print(key, ":", data[key])
```

windows中没有方便的命令可以获取硬件信息，但是有额外的模块可以帮助我们实现目的，这个模块叫做wmi。可以使用`pip install wmi`的方式安装，当前版本是1.4.9。但是wmi安装后，`import wmi`依然会出错，因为它依赖一个叫做win32com的模块。

我们依然可以通过`pip install pypiwin32`来安装win32com模块，但是不幸的是，据反映，有些机器无法通过pip成功安装。所以，这里我在github中提供了一个手动安装包`pywin32-220.win-amd64-py3.5(配合wmi模块，获取主机信息的模块).exe`，方便大家。(如果版本不兼容，也可以自行在网上搜索。)

依赖包的问题解决后，我们来看一下`sys_info.py`脚本的代码。

- 类Win32Info封装了具体数据收集逻辑
- 其中对Win32模块的调用方式是固定的，有兴趣的可以自行学习这个模块的官方文档
- 核心在于collect方法，它汇总了其它方法收集的信息！
- collect方法首先通过platform模块获取平台的信息，然后保存到一个data字典中。
- 分别调用其它方法，获取CPU、RAM、主板、硬盘和网卡的信息。
- 每一类数据收集完成后都会作为一个新的字典，update到开始的data字典中，最终形成完整的信息字典。
- 最后在脚本末尾有一个测试入口。

整个脚本的代码其实很简单，我们只要将Win32的方法调用当作透明的空气，剩下的不过就是将获得的数据，按照我们指定的格式打包成一个数据字典。

## 强调：数据字典的格式和键值是非常重要的，是预设的，不可以随意改变！

## 二、信息收集测试

下面，单独运行一下该脚本（注意不是运行CMDB项目），查看一下生成的数据。为了显示更直观，可以通过在线json校验工具格式化一下。

```
{
os_type': 'Windows',
'os_release': '764bit6.1.7601',
'os_distribution': 'Microsoft',
'asset_type': 'server',
'cpu_count': 1,
'cpu_model': 'Intel(R)Core(TM)i5-2300CPU@2.80GHz',
'cpu_core_count': 4,
'ram': [
    {
        'slot': 'A0',
        'capacity': 4,
        'model': 'PhysicalMemory',
        'manufacturer': '',
        'sn': ''
    },
    {
        'slot': 'A1',
        'capacity': 4,
        'model': 'PhysicalMemory',
        'manufacturer': '',
        'sn': ''
    }
],
'manufacturer': 'GigabyteTechnologyCo.,
Ltd.',
'model': 'P67X-UD3R-B3',
'wake_up_type': 6,
'sn': '00426-OEM-8992662-12006',
'physical_disk_driver': [
    {
        'iface_type': 'unknown',
        'slot': 0,
        'sn': '3830414130423230233235362020202020202020',
        'model': 'KINGSTONSV100S264GATADevice',
        'manufacturer': '(标准磁盘驱动器)',
        'capacity': 59
    },
    {
        'iface_type': 'unknown',
        'slot': 1,
        'sn': '2020202020202020201020205935334445414235',
        'model': 'ST2000DL003-9VT166ATADevice',
        'manufacturer': '(标准磁盘驱动器)',
        'capacity': 1863
    }
],
'nic': [
    {
        'mac': '24: CF: 92: FF: 48: 34',
        'model': '[
            00000011
        ]RealtekRTL8192CUWirelessLAN802.11nUSB2.0NetworkAdapter',
        'name': 11,
        'ip_address': '192.168.1.100',
        'net_mask': ('255.255.255.0',
        '64')
    },
    {
        'mac': '0A: 00: 27: 00: 00: 00',
        'model': '[
            00000013
        ]VirtualBoxHost-OnlyEthernetAdapter',
        'name': 13,
        'ip_address': '192.168.56.1',
        'net_mask': ('255.255.255.0',
        '64')
    },
    {
        'mac': '24: CF: 92: FF: 48: 34',
        'model': '[
            00000017
        ]MicrosoftVirtualWiFiMiniportAdapter',
        'name': 17,
        'ip_address': '',
        'net_mask': ''
    },
    {
        'mac': '10: 19: 86: 00: 12: 98',
        'model': '[
            00000018
        ]Bluetooth设备(个人区域网)',
        'name': 18,
        'ip_address': '',
        'net_mask': ''
    }
]
}
```

上面的信息包含操作系统、主板、CPU、内存、硬盘、网卡等各种信息。可以看到我有两条内存，两块硬盘，以及4块网卡。内存没有获取到sn，但slot是不一样的。硬盘有sn，但接口未知。四块网卡有出现mac地址相同的情况，因为那是虚拟机的。

你的数据和我的肯定不一样，但是数据格式和键值必须一样，我们后面自动分析数据、填充数据，都依靠这个固定格式的数据字典。

通过测试我们发现数据可以收集到了，那么再测试一下数据能否正常发送到服务器。

## 三、数据发送测试

由于后面我们还会采用Linux虚拟机作为测试用例，所以Django服务器就不能再运行在127.0.0.1:8000上面了。

查看一下当前机器的IP，发现是192.168.0.100，修改项目的settings.py文件，将ALLOWED_HOSTS修改如下：

```
ALLOWED_HOSTS = ["*"]
```

这表示接收所有同一局域网内的网络访问。

然后以0.0.0.0:8000的参数启动CMDB项目服务器，表示对局域网内所有ip开放服务。

回到客户端，进入Client/bin目录，运行`python main.py report_data`，可以看到如下结果：

```
(venv) D:\work\2019\for_test\CMDB\Client\bin>python main.py report_data
正在将数据发送至： [http://192.168.0.100:8000/assets/report/]  ......
?[31;1m发送失败，错误原因： HTTP Error 404: Not Found?[0m
日志记录成功！
```

这是一个404错误，表示服务器地址没找到，这是因为我们还没有为Django编写接收数据的视图和路由。

这时，打开log目录下的日志文件，内容如下：

```
发送时间：2019-04-12 10:13:52     服务器地址：http://192.168.0.100:8000/assets/report/      返回结果：发送失败   错误原因：  HTTP Error 404: Not Found 
```

## 四、接收数据

进入`cmdb/urls.py`文件中，编写一个二级路由，将所有assets相关的数据都转发到`assets.urls`中，如下所示：

```
from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('assets/', include('assets.urls')),
]
```

然后，我们在assets中新建一个urls.py文件，写入下面的代码：

```
from django.urls import path
from assets import views

app_name = 'assets'

urlpatterns = [
    path('report/', views.report, name='report'),
]
```

这样，我们的路由就写好了。

转过头，我们进入assets/views.py文件，写一个简单的视图。

```
from django.shortcuts import render
from django.shortcuts import HttpResponse

# Create your views here.

def report(request):    
    if request.method == "POST":
        asset_data = request.POST.get('asset_data')
        print(asset_data)
        return HttpResponse("成功收到数据！")
```

代码很简单，接收POST过来的数据，打印出来，然后返回成功的消息。

重新启动服务器，然后去Client客户端运行`python main.py report_data`，可以看到：

```
(venv) D:\work\2019\for_test\CMDB\Client\bin>python main.py report_data
正在将数据发送至： [http://192.168.0.100:8000/assets/report/]  ......
?[31;1m发送失败，错误原因： HTTP Error 403: Forbidden?[0m
日志记录成功！
```

403就是拒绝服务的错误了。

原因在于我们模拟浏览器发送了一个POST请求给Django，但是请求中没有携带Django需要的csrf安全令牌，所以拒绝了请求。

为了解决这个问题，我们需要在这个report视图上忽略csrf验证，可以通过Django的`@csrf_exempt`装饰器。修改代码如下：

```
from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def report(request):
    if request.method == "POST":
        asset_data = request.POST.get('asset_data')
        print(asset_data)
        return HttpResponse("成功收到数据！")
```

重启CMDB服务器，再次从客户端报告数据，可以看到返回结果如下：

```
(venv) D:\work\2019\for_test\CMDB\Client\bin>python main.py report_data
正在将数据发送至： [http://192.168.0.100:8000/assets/report/]  ......
?[31;1m发送完毕！?[0m
返回结果：成功收到数据！
日志记录成功！
```

这表明数据发送成功了。

再看Pycharm中，也打印出了接收到的数据，一切OK！

CSRF验证的问题解决了，但是又带来新的安全问题。我们可以通过增加用户名、密码，或者md5验证或者自定义安全令牌的方式解决，这部分内容需要大家自己添加。

Windows下的客户端已经验证完毕了，然后我们就可以通过各种方式让脚本定时运行、收集和报告数据，一切都自动化。