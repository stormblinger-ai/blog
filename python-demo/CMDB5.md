# 5.Linux下收集数据



------

Linux下收集数据就有很多命令和工具了，比Windows方便多了。

但是要在Python的进程中运行操作系统级别的命令，通常需要使用subprocess模块。这个模块的具体用法，请查看Python教程中相关部分的内容。

在Client/plugins下创建一个`collect_linux_info.py`文件，写入下面的代码：

```
#!/usr/bin/env python3
# -*- coding:utf-8 -*-

import subprocess


def collect():
    filter_keys = ['Manufacturer', 'Serial Number', 'Product Name', 'UUID', 'Wake-up Type']
    raw_data = {}

    for key in filter_keys:
        try:
            res = subprocess.Popen("sudo dmidecode -t system|grep '%s'" % key,
                                   stdout=subprocess.PIPE, shell=True)
            result = res.stdout.read().decode()
            data_list = result.split(':')

            if len(data_list) > 1:
                raw_data[key] = data_list[1].strip()
            else:
                raw_data[key] = ''
        except Exception as e:
            print(e)
            raw_data[key] = ''

    data = dict()
    data['asset_type'] = 'server'
    data['manufacturer'] = raw_data['Manufacturer']
    data['sn'] = raw_data['Serial Number']
    data['model'] = raw_data['Product Name']
    data['uuid'] = raw_data['UUID']
    data['wake_up_type'] = raw_data['Wake-up Type']

    data.update(get_os_info())
    data.update(get_cpu_info())
    data.update(get_ram_info())
    data.update(get_nic_info())
    data.update(get_disk_info())
    return data


def get_os_info():
    """
    获取操作系统信息
    :return:
    """
    distributor = subprocess.Popen("lsb_release -a|grep 'Distributor ID'",
                                   stdout=subprocess.PIPE, shell=True)
    distributor = distributor.stdout.read().decode().split(":")

    release = subprocess.Popen("lsb_release -a|grep 'Description'",
                               stdout=subprocess.PIPE, shell=True)

    release = release.stdout.read().decode().split(":")
    data_dic = {
        "os_distribution": distributor[1].strip() if len(distributor) > 1 else "",
        "os_release": release[1].strip() if len(release) > 1 else "",
        "os_type": "Linux",
    }
    return data_dic


def get_cpu_info():
    """
    获取cpu信息
    :return:
    """
    raw_cmd = 'cat /proc/cpuinfo'

    raw_data = {
        'cpu_model': "%s |grep 'model name' |head -1 " % raw_cmd,
        'cpu_count':  "%s |grep  'processor'|wc -l " % raw_cmd,
        'cpu_core_count': "%s |grep 'cpu cores' |awk -F: '{SUM +=$2} END {print SUM}'" % raw_cmd,
    }

    for key, cmd in raw_data.items():
        try:
            result = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
            raw_data[key] = result.stdout.read().decode().strip()
        except ValueError as e:
            print(e)
            raw_data[key] = ""

    data = {
        "cpu_count": raw_data["cpu_count"],
        "cpu_core_count": raw_data["cpu_core_count"]
        }

    cpu_model = raw_data["cpu_model"].split(":")

    if len(cpu_model) > 1:
        data["cpu_model"] = cpu_model[1].strip()
    else:
        data["cpu_model"] = ''

    return data


def get_ram_info():
    """
    获取内存信息
    :return:
    """
    raw_data = subprocess.Popen("sudo dmidecode -t memory", stdout=subprocess.PIPE, shell=True)
    raw_list = raw_data.stdout.read().decode().split("\n")
    raw_ram_list = []
    item_list = []
    for line in raw_list:
        if line.startswith("Memory Device"):
            raw_ram_list.append(item_list)
            item_list = []
        else:
            item_list.append(line.strip())

    ram_list = []
    for item in raw_ram_list:
        item_ram_size = 0
        ram_item_to_dic = {}
        for i in item:
            data = i.split(":")
            if len(data) == 2:
                key, v = data
                if key == 'Size':
                    if v.strip() != "No Module Installed":
                        ram_item_to_dic['capacity'] = v.split()[0].strip()
                        item_ram_size = round(v.split()[0])
                    else:
                        ram_item_to_dic['capacity'] = 0

                if key == 'Type':
                    ram_item_to_dic['model'] = v.strip()
                if key == 'Manufacturer':
                    ram_item_to_dic['manufacturer'] = v.strip()
                if key == 'Serial Number':
                    ram_item_to_dic['sn'] = v.strip()
                if key == 'Asset Tag':
                    ram_item_to_dic['asset_tag'] = v.strip()
                if key == 'Locator':
                    ram_item_to_dic['slot'] = v.strip()

        if item_ram_size == 0:
            pass
        else:
            ram_list.append(ram_item_to_dic)

    raw_total_size = subprocess.Popen("cat /proc/meminfo|grep MemTotal ", stdout=subprocess.PIPE, shell=True)
    raw_total_size = raw_total_size.stdout.read().decode().split(":")
    ram_data = {'ram': ram_list}
    if len(raw_total_size) == 2:
        total_gb_size = int(raw_total_size[1].split()[0]) / 1024**2
        ram_data['ram_size'] = total_gb_size

    return ram_data


def get_nic_info():
    """
    获取网卡信息
    :return:
    """
    raw_data = subprocess.Popen("ifconfig -a", stdout=subprocess.PIPE, shell=True)

    raw_data = raw_data.stdout.read().decode().split("\n")

    nic_dic = dict()
    next_ip_line = False
    last_mac_addr = None

    for line in raw_data:
        if next_ip_line:
            next_ip_line = False
            nic_name = last_mac_addr.split()[0]
            mac_addr = last_mac_addr.split("HWaddr")[1].strip()
            raw_ip_addr = line.split("inet addr:")
            raw_bcast = line.split("Bcast:")
            raw_netmask = line.split("Mask:")
            if len(raw_ip_addr) > 1:
                ip_addr = raw_ip_addr[1].split()[0]
                network = raw_bcast[1].split()[0]
                netmask = raw_netmask[1].split()[0]
            else:
                ip_addr = None
                network = None
                netmask = None
            if mac_addr not in nic_dic:
                nic_dic[mac_addr] = {'name': nic_name,
                                     'mac': mac_addr,
                                     'net_mask': netmask,
                                     'network': network,
                                     'bonding': 0,
                                     'model': 'unknown',
                                     'ip_address': ip_addr,
                                     }
            else:
                if '%s_bonding_addr' % (mac_addr,) not in nic_dic:
                    random_mac_addr = '%s_bonding_addr' % (mac_addr,)
                else:
                    random_mac_addr = '%s_bonding_addr2' % (mac_addr,)

                nic_dic[random_mac_addr] = {'name': nic_name,
                                            'mac': random_mac_addr,
                                            'net_mask': netmask,
                                            'network': network,
                                            'bonding': 1,
                                            'model': 'unknown',
                                            'ip_address': ip_addr,
                                            }

        if "HWaddr" in line:
            next_ip_line = True
            last_mac_addr = line
    nic_list = []
    for k, v in nic_dic.items():
        nic_list.append(v)

    return {'nic': nic_list}


def get_disk_info():
    """
    获取存储信息。
    本脚本只针对ubuntu中使用sda，且只有一块硬盘的情况。
    具体查看硬盘信息的命令，请根据实际情况，实际调整。
    如果需要查看Raid信息，可以尝试MegaCli工具。
    :return:
    """
    raw_data = subprocess.Popen("sudo hdparm -i /dev/sda | grep Model", stdout=subprocess.PIPE, shell=True)
    raw_data = raw_data.stdout.read().decode()
    data_list = raw_data.split(",")
    model = data_list[0].split("=")[1]
    sn = data_list[2].split("=")[1].strip()

    size_data = subprocess.Popen("sudo fdisk -l /dev/sda | grep Disk|head -1", stdout=subprocess.PIPE, shell=True)
    size_data = size_data.stdout.read().decode()
    size = size_data.split(":")[1].strip().split(" ")[0]

    result = {'physical_disk_driver': []}
    disk_dict = dict()
    disk_dict["model"] = model
    disk_dict["size"] = size
    disk_dict["sn"] = sn
    result['physical_disk_driver'].append(disk_dict)

    return result


if __name__ == "__main__":
    # 收集信息功能测试
    data = collect()
    print(data)
```

代码整体没有什么难点，无非就是使用subprocess.Popen()方法执行Linux的命令，然后获取返回值，并以规定的格式打包到data字典里。

需要说明的问题有：

- 当Linux中存在好几个Python解释器版本时，要注意调用方式，前面已经强调过了；
- 不同的Linux发行版，有些命令可能没有，需要额外安装；
- 所使用的查看硬件信息的命令并不一定必须和这里的一样，只要能获得数据就行；
- 有一些命令在ubuntu中涉及sudo的问题，需要特别对待；
- 最终数据字典的格式一定要正确；
- 可以在Linux下配置cronb或其它定时服务，设置定期的数据收集、报告任务。

------

下面在Linux虚拟机上，测试一下客户端。

将Pycharm中的Client客户端文件夹，拷贝到Linux虚拟机中，这里是ubuntu16.04.

进入bin目录，运行“python3 main.py report_data”，一切顺利的话应该能得到如下的反馈：

```
正在将数据发送至： [http://192.168.1.100:8000/assets/report/]  ......
发送完毕！ 
返回结果：成功收到数据！
日志记录成功！
```

然后，在Pycharm中，也可以看到接收的数据：

```
{
    "asset_type": "server",
    "manufacturer": "innotek GmbH",
    "sn": "0",
    "model": "VirtualBox",
    "uuid": "E8DE611C-4279-495C-9B58-502B6FCED076",
    "wake_up_type": "Power Switch",
    "os_distribution": "Ubuntu",
    "os_release": "Ubuntu 16.04.3 LTS",
    "os_type": "Linux",
    "cpu_count": "2",
    "cpu_core_count": "4",
    "cpu_model": "Intel(R) Core(TM) i5-2300 CPU @ 2.80GHz",
    "ram": [],
    "ram_size": 3.858997344970703,
    "nic": [],
    "physical_disk_driver": [
        {
            "model": "VBOX HARDDISK",
            "size": "50",
            "sn": "VBeee1ba73-09085302"
        }
    ]
}
```

可以看到，由于是virtualbox虚拟机的原因，sn为0，内存和网卡信息一条都没有，数据有点可怜，vmware的虚拟机可能好点。如果你对Linux比较熟悉，还可以自己尝试获取更多的数据，但是要注意虚拟机的sn可能重复，要防止冲突。