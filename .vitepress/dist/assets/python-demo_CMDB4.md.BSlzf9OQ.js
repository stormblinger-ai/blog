import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const h=JSON.parse('{"title":"4.收集Windows数据","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB4.md","filePath":"python-demo/CMDB4.md"}'),e={name:"python-demo/CMDB4.md"},l=p(`<h1 id="_4-收集windows数据" tabindex="-1">4.收集Windows数据 <a class="header-anchor" href="#_4-收集windows数据" aria-label="Permalink to &quot;4.收集Windows数据&quot;">​</a></h1><hr><h2 id="一、windows中收集硬件信息" tabindex="-1">一、windows中收集硬件信息 <a class="header-anchor" href="#一、windows中收集硬件信息" aria-label="Permalink to &quot;一、windows中收集硬件信息&quot;">​</a></h2><p>为了收集运行Windows操作系统的服务器的硬件信息，我们需要编写一个专门的脚本。</p><p>在Pycharm的Client目录下的plugins包中，新建一个<code>collect_windows_info.py</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#!/usr/bin/env python</span></span>
<span class="line"><span># -*- coding:utf-8 -*-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import platform</span></span>
<span class="line"><span>import win32com</span></span>
<span class="line"><span>import wmi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>本模块基于windows操作系统，依赖wmi和win32com库，需要提前使用pip进行安装，</span></span>
<span class="line"><span>pip install wmi</span></span>
<span class="line"><span>pip install pypiwin32</span></span>
<span class="line"><span>或者下载安装包手动安装。</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Win32Info(object):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __init__(self):</span></span>
<span class="line"><span>        # 固定用法，更多内容请参考模块说明</span></span>
<span class="line"><span>        self.wmi_obj = wmi.WMI()</span></span>
<span class="line"><span>        self.wmi_service_obj = win32com.client.Dispatch(&quot;WbemScripting.SWbemLocator&quot;)</span></span>
<span class="line"><span>        self.wmi_service_connector = self.wmi_service_obj.ConnectServer(&quot;.&quot;, &quot;root\\cimv2&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def collect(self):</span></span>
<span class="line"><span>        data = {</span></span>
<span class="line"><span>            &#39;os_type&#39;: platform.system(),</span></span>
<span class="line"><span>            &#39;os_release&#39;: &quot;%s %s  %s &quot; % (platform.release(), platform.architecture()[0], platform.version()),</span></span>
<span class="line"><span>            &#39;os_distribution&#39;: &#39;Microsoft&#39;,</span></span>
<span class="line"><span>            &#39;asset_type&#39;: &#39;server&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 分别获取各种硬件信息</span></span>
<span class="line"><span>        data.update(self.get_cpu_info())</span></span>
<span class="line"><span>        data.update(self.get_ram_info())</span></span>
<span class="line"><span>        data.update(self.get_motherboard_info())</span></span>
<span class="line"><span>        data.update(self.get_disk_info())</span></span>
<span class="line"><span>        data.update(self.get_nic_info())</span></span>
<span class="line"><span>        # 最后返回一个数据字典</span></span>
<span class="line"><span>        return data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def get_cpu_info(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        获取CPU的相关数据，这里只采集了三个数据，实际有更多，请自行选择需要的数据</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        data = {}</span></span>
<span class="line"><span>        cpu_lists = self.wmi_obj.Win32_Processor()</span></span>
<span class="line"><span>        cpu_core_count = 0</span></span>
<span class="line"><span>        for cpu in cpu_lists:</span></span>
<span class="line"><span>            cpu_core_count += cpu.NumberOfCores</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cpu_model = cpu_lists[0].Name   # CPU型号（所有的CPU型号都是一样的）</span></span>
<span class="line"><span>        data[&quot;cpu_count&quot;] = len(cpu_lists)      # CPU个数</span></span>
<span class="line"><span>        data[&quot;cpu_model&quot;] = cpu_model</span></span>
<span class="line"><span>        data[&quot;cpu_core_count&quot;] = cpu_core_count  # CPU总的核数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def get_ram_info(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        收集内存信息</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        data = []</span></span>
<span class="line"><span>        # 这个模块用SQL语言获取数据</span></span>
<span class="line"><span>        ram_collections = self.wmi_service_connector.ExecQuery(&quot;Select * from Win32_PhysicalMemory&quot;)</span></span>
<span class="line"><span>        for ram in ram_collections:    # 主机中存在很多根内存，要循环所有的内存数据</span></span>
<span class="line"><span>            ram_size = int(int(ram.Capacity) / (1024**3))  # 转换内存单位为GB</span></span>
<span class="line"><span>            item_data = {</span></span>
<span class="line"><span>                &quot;slot&quot;: ram.DeviceLocator.strip(),</span></span>
<span class="line"><span>                &quot;capacity&quot;: ram_size,</span></span>
<span class="line"><span>                &quot;model&quot;: ram.Caption,</span></span>
<span class="line"><span>                &quot;manufacturer&quot;: ram.Manufacturer,</span></span>
<span class="line"><span>                &quot;sn&quot;: ram. SerialNumber,</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            data.append(item_data)  # 将每条内存的信息，添加到一个列表里</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return {&quot;ram&quot;: data}    # 再对data列表封装一层，返回一个字典，方便上级方法的调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def get_motherboard_info(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        获取主板信息</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        computer_info = self.wmi_obj.Win32_ComputerSystem()[0]</span></span>
<span class="line"><span>        system_info = self.wmi_obj.Win32_OperatingSystem()[0]</span></span>
<span class="line"><span>        data = {}</span></span>
<span class="line"><span>        data[&#39;manufacturer&#39;] = computer_info.Manufacturer</span></span>
<span class="line"><span>        data[&#39;model&#39;] = computer_info.Model</span></span>
<span class="line"><span>        data[&#39;wake_up_type&#39;] = computer_info.WakeUpType</span></span>
<span class="line"><span>        data[&#39;sn&#39;] = system_info.SerialNumber</span></span>
<span class="line"><span>        return data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def get_disk_info(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        硬盘信息</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        data = []</span></span>
<span class="line"><span>        for disk in self.wmi_obj.Win32_DiskDrive():     # 每块硬盘都要获取相应信息</span></span>
<span class="line"><span>            disk_data = {}</span></span>
<span class="line"><span>            interface_choices = [&quot;SAS&quot;, &quot;SCSI&quot;, &quot;SATA&quot;, &quot;SSD&quot;]</span></span>
<span class="line"><span>            for interface in interface_choices:</span></span>
<span class="line"><span>                if interface in disk.Model:</span></span>
<span class="line"><span>                    disk_data[&#39;interface_type&#39;] = interface</span></span>
<span class="line"><span>                    break</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                disk_data[&#39;interface_type&#39;] = &#39;unknown&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            disk_data[&#39;slot&#39;] = disk.Index</span></span>
<span class="line"><span>            disk_data[&#39;sn&#39;] = disk.SerialNumber</span></span>
<span class="line"><span>            disk_data[&#39;model&#39;] = disk.Model</span></span>
<span class="line"><span>            disk_data[&#39;manufacturer&#39;] = disk.Manufacturer</span></span>
<span class="line"><span>            disk_data[&#39;capacity&#39;] = int(int(disk.Size) / (1024**3))</span></span>
<span class="line"><span>            data.append(disk_data)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return {&#39;physical_disk_driver&#39;: data}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def get_nic_info(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        网卡信息</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        data = []</span></span>
<span class="line"><span>        for nic in self.wmi_obj.Win32_NetworkAdapterConfiguration():</span></span>
<span class="line"><span>            if nic.MACAddress is not None:</span></span>
<span class="line"><span>                nic_data = {}</span></span>
<span class="line"><span>                nic_data[&#39;mac&#39;] = nic.MACAddress</span></span>
<span class="line"><span>                nic_data[&#39;model&#39;] = nic.Caption</span></span>
<span class="line"><span>                nic_data[&#39;name&#39;] = nic.Index</span></span>
<span class="line"><span>                if nic.IPAddress is not None:</span></span>
<span class="line"><span>                    nic_data[&#39;ip_address&#39;] = nic.IPAddress[0]</span></span>
<span class="line"><span>                    nic_data[&#39;net_mask&#39;] = nic.IPSubnet</span></span>
<span class="line"><span>                else:</span></span>
<span class="line"><span>                    nic_data[&#39;ip_address&#39;] = &#39;&#39;</span></span>
<span class="line"><span>                    nic_data[&#39;net_mask&#39;] = &#39;&#39;</span></span>
<span class="line"><span>                data.append(nic_data)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return {&#39;nic&#39;: data}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    # 测试代码</span></span>
<span class="line"><span>    data = Win32Info().collect()</span></span>
<span class="line"><span>    for key in data:</span></span>
<span class="line"><span>        print(key, &quot;:&quot;, data[key])</span></span></code></pre></div><p>windows中没有方便的命令可以获取硬件信息，但是有额外的模块可以帮助我们实现目的，这个模块叫做wmi。可以使用<code>pip install wmi</code>的方式安装，当前版本是1.4.9。但是wmi安装后，<code>import wmi</code>依然会出错，因为它依赖一个叫做win32com的模块。</p><p>我们依然可以通过<code>pip install pypiwin32</code>来安装win32com模块，但是不幸的是，据反映，有些机器无法通过pip成功安装。所以，这里我在github中提供了一个手动安装包<code>pywin32-220.win-amd64-py3.5(配合wmi模块，获取主机信息的模块).exe</code>，方便大家。(如果版本不兼容，也可以自行在网上搜索。)</p><p>依赖包的问题解决后，我们来看一下<code>sys_info.py</code>脚本的代码。</p><ul><li>类Win32Info封装了具体数据收集逻辑</li><li>其中对Win32模块的调用方式是固定的，有兴趣的可以自行学习这个模块的官方文档</li><li>核心在于collect方法，它汇总了其它方法收集的信息！</li><li>collect方法首先通过platform模块获取平台的信息，然后保存到一个data字典中。</li><li>分别调用其它方法，获取CPU、RAM、主板、硬盘和网卡的信息。</li><li>每一类数据收集完成后都会作为一个新的字典，update到开始的data字典中，最终形成完整的信息字典。</li><li>最后在脚本末尾有一个测试入口。</li></ul><p>整个脚本的代码其实很简单，我们只要将Win32的方法调用当作透明的空气，剩下的不过就是将获得的数据，按照我们指定的格式打包成一个数据字典。</p><h2 id="强调-数据字典的格式和键值是非常重要的-是预设的-不可以随意改变" tabindex="-1">强调：数据字典的格式和键值是非常重要的，是预设的，不可以随意改变！ <a class="header-anchor" href="#强调-数据字典的格式和键值是非常重要的-是预设的-不可以随意改变" aria-label="Permalink to &quot;强调：数据字典的格式和键值是非常重要的，是预设的，不可以随意改变！&quot;">​</a></h2><h2 id="二、信息收集测试" tabindex="-1">二、信息收集测试 <a class="header-anchor" href="#二、信息收集测试" aria-label="Permalink to &quot;二、信息收集测试&quot;">​</a></h2><p>下面，单独运行一下该脚本（注意不是运行CMDB项目），查看一下生成的数据。为了显示更直观，可以通过在线json校验工具格式化一下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>os_type&#39;: &#39;Windows&#39;,</span></span>
<span class="line"><span>&#39;os_release&#39;: &#39;764bit6.1.7601&#39;,</span></span>
<span class="line"><span>&#39;os_distribution&#39;: &#39;Microsoft&#39;,</span></span>
<span class="line"><span>&#39;asset_type&#39;: &#39;server&#39;,</span></span>
<span class="line"><span>&#39;cpu_count&#39;: 1,</span></span>
<span class="line"><span>&#39;cpu_model&#39;: &#39;Intel(R)Core(TM)i5-2300CPU@2.80GHz&#39;,</span></span>
<span class="line"><span>&#39;cpu_core_count&#39;: 4,</span></span>
<span class="line"><span>&#39;ram&#39;: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &#39;slot&#39;: &#39;A0&#39;,</span></span>
<span class="line"><span>        &#39;capacity&#39;: 4,</span></span>
<span class="line"><span>        &#39;model&#39;: &#39;PhysicalMemory&#39;,</span></span>
<span class="line"><span>        &#39;manufacturer&#39;: &#39;&#39;,</span></span>
<span class="line"><span>        &#39;sn&#39;: &#39;&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &#39;slot&#39;: &#39;A1&#39;,</span></span>
<span class="line"><span>        &#39;capacity&#39;: 4,</span></span>
<span class="line"><span>        &#39;model&#39;: &#39;PhysicalMemory&#39;,</span></span>
<span class="line"><span>        &#39;manufacturer&#39;: &#39;&#39;,</span></span>
<span class="line"><span>        &#39;sn&#39;: &#39;&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>],</span></span>
<span class="line"><span>&#39;manufacturer&#39;: &#39;GigabyteTechnologyCo.,</span></span>
<span class="line"><span>Ltd.&#39;,</span></span>
<span class="line"><span>&#39;model&#39;: &#39;P67X-UD3R-B3&#39;,</span></span>
<span class="line"><span>&#39;wake_up_type&#39;: 6,</span></span>
<span class="line"><span>&#39;sn&#39;: &#39;00426-OEM-8992662-12006&#39;,</span></span>
<span class="line"><span>&#39;physical_disk_driver&#39;: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &#39;iface_type&#39;: &#39;unknown&#39;,</span></span>
<span class="line"><span>        &#39;slot&#39;: 0,</span></span>
<span class="line"><span>        &#39;sn&#39;: &#39;3830414130423230233235362020202020202020&#39;,</span></span>
<span class="line"><span>        &#39;model&#39;: &#39;KINGSTONSV100S264GATADevice&#39;,</span></span>
<span class="line"><span>        &#39;manufacturer&#39;: &#39;(标准磁盘驱动器)&#39;,</span></span>
<span class="line"><span>        &#39;capacity&#39;: 59</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &#39;iface_type&#39;: &#39;unknown&#39;,</span></span>
<span class="line"><span>        &#39;slot&#39;: 1,</span></span>
<span class="line"><span>        &#39;sn&#39;: &#39;2020202020202020201020205935334445414235&#39;,</span></span>
<span class="line"><span>        &#39;model&#39;: &#39;ST2000DL003-9VT166ATADevice&#39;,</span></span>
<span class="line"><span>        &#39;manufacturer&#39;: &#39;(标准磁盘驱动器)&#39;,</span></span>
<span class="line"><span>        &#39;capacity&#39;: 1863</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>],</span></span>
<span class="line"><span>&#39;nic&#39;: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &#39;mac&#39;: &#39;24: CF: 92: FF: 48: 34&#39;,</span></span>
<span class="line"><span>        &#39;model&#39;: &#39;[</span></span>
<span class="line"><span>            00000011</span></span>
<span class="line"><span>        ]RealtekRTL8192CUWirelessLAN802.11nUSB2.0NetworkAdapter&#39;,</span></span>
<span class="line"><span>        &#39;name&#39;: 11,</span></span>
<span class="line"><span>        &#39;ip_address&#39;: &#39;192.168.1.100&#39;,</span></span>
<span class="line"><span>        &#39;net_mask&#39;: (&#39;255.255.255.0&#39;,</span></span>
<span class="line"><span>        &#39;64&#39;)</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &#39;mac&#39;: &#39;0A: 00: 27: 00: 00: 00&#39;,</span></span>
<span class="line"><span>        &#39;model&#39;: &#39;[</span></span>
<span class="line"><span>            00000013</span></span>
<span class="line"><span>        ]VirtualBoxHost-OnlyEthernetAdapter&#39;,</span></span>
<span class="line"><span>        &#39;name&#39;: 13,</span></span>
<span class="line"><span>        &#39;ip_address&#39;: &#39;192.168.56.1&#39;,</span></span>
<span class="line"><span>        &#39;net_mask&#39;: (&#39;255.255.255.0&#39;,</span></span>
<span class="line"><span>        &#39;64&#39;)</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &#39;mac&#39;: &#39;24: CF: 92: FF: 48: 34&#39;,</span></span>
<span class="line"><span>        &#39;model&#39;: &#39;[</span></span>
<span class="line"><span>            00000017</span></span>
<span class="line"><span>        ]MicrosoftVirtualWiFiMiniportAdapter&#39;,</span></span>
<span class="line"><span>        &#39;name&#39;: 17,</span></span>
<span class="line"><span>        &#39;ip_address&#39;: &#39;&#39;,</span></span>
<span class="line"><span>        &#39;net_mask&#39;: &#39;&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &#39;mac&#39;: &#39;10: 19: 86: 00: 12: 98&#39;,</span></span>
<span class="line"><span>        &#39;model&#39;: &#39;[</span></span>
<span class="line"><span>            00000018</span></span>
<span class="line"><span>        ]Bluetooth设备(个人区域网)&#39;,</span></span>
<span class="line"><span>        &#39;name&#39;: 18,</span></span>
<span class="line"><span>        &#39;ip_address&#39;: &#39;&#39;,</span></span>
<span class="line"><span>        &#39;net_mask&#39;: &#39;&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>上面的信息包含操作系统、主板、CPU、内存、硬盘、网卡等各种信息。可以看到我有两条内存，两块硬盘，以及4块网卡。内存没有获取到sn，但slot是不一样的。硬盘有sn，但接口未知。四块网卡有出现mac地址相同的情况，因为那是虚拟机的。</p><p>你的数据和我的肯定不一样，但是数据格式和键值必须一样，我们后面自动分析数据、填充数据，都依靠这个固定格式的数据字典。</p><p>通过测试我们发现数据可以收集到了，那么再测试一下数据能否正常发送到服务器。</p><h2 id="三、数据发送测试" tabindex="-1">三、数据发送测试 <a class="header-anchor" href="#三、数据发送测试" aria-label="Permalink to &quot;三、数据发送测试&quot;">​</a></h2><p>由于后面我们还会采用Linux虚拟机作为测试用例，所以Django服务器就不能再运行在127.0.0.1:8000上面了。</p><p>查看一下当前机器的IP，发现是192.168.0.100，修改项目的settings.py文件，将ALLOWED_HOSTS修改如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ALLOWED_HOSTS = [&quot;*&quot;]</span></span></code></pre></div><p>这表示接收所有同一局域网内的网络访问。</p><p>然后以0.0.0.0:8000的参数启动CMDB项目服务器，表示对局域网内所有ip开放服务。</p><p>回到客户端，进入Client/bin目录，运行<code>python main.py report_data</code>，可以看到如下结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(venv) D:\\work\\2019\\for_test\\CMDB\\Client\\bin&gt;python main.py report_data</span></span>
<span class="line"><span>正在将数据发送至： [http://192.168.0.100:8000/assets/report/]  ......</span></span>
<span class="line"><span>?[31;1m发送失败，错误原因： HTTP Error 404: Not Found?[0m</span></span>
<span class="line"><span>日志记录成功！</span></span></code></pre></div><p>这是一个404错误，表示服务器地址没找到，这是因为我们还没有为Django编写接收数据的视图和路由。</p><p>这时，打开log目录下的日志文件，内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>发送时间：2019-04-12 10:13:52     服务器地址：http://192.168.0.100:8000/assets/report/      返回结果：发送失败   错误原因：  HTTP Error 404: Not Found</span></span></code></pre></div><h2 id="四、接收数据" tabindex="-1">四、接收数据 <a class="header-anchor" href="#四、接收数据" aria-label="Permalink to &quot;四、接收数据&quot;">​</a></h2><p>进入<code>cmdb/urls.py</code>文件中，编写一个二级路由，将所有assets相关的数据都转发到<code>assets.urls</code>中，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.contrib import admin</span></span>
<span class="line"><span>from django.urls import path</span></span>
<span class="line"><span>from django.urls import include</span></span>
<span class="line"><span></span></span>
<span class="line"><span>urlpatterns = [</span></span>
<span class="line"><span>    path(&#39;admin/&#39;, admin.site.urls),</span></span>
<span class="line"><span>    path(&#39;assets/&#39;, include(&#39;assets.urls&#39;)),</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>然后，我们在assets中新建一个urls.py文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.urls import path</span></span>
<span class="line"><span>from assets import views</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app_name = &#39;assets&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>urlpatterns = [</span></span>
<span class="line"><span>    path(&#39;report/&#39;, views.report, name=&#39;report&#39;),</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>这样，我们的路由就写好了。</p><p>转过头，我们进入assets/views.py文件，写一个简单的视图。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.shortcuts import render</span></span>
<span class="line"><span>from django.shortcuts import HttpResponse</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Create your views here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def report(request):    </span></span>
<span class="line"><span>    if request.method == &quot;POST&quot;:</span></span>
<span class="line"><span>        asset_data = request.POST.get(&#39;asset_data&#39;)</span></span>
<span class="line"><span>        print(asset_data)</span></span>
<span class="line"><span>        return HttpResponse(&quot;成功收到数据！&quot;)</span></span></code></pre></div><p>代码很简单，接收POST过来的数据，打印出来，然后返回成功的消息。</p><p>重新启动服务器，然后去Client客户端运行<code>python main.py report_data</code>，可以看到：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(venv) D:\\work\\2019\\for_test\\CMDB\\Client\\bin&gt;python main.py report_data</span></span>
<span class="line"><span>正在将数据发送至： [http://192.168.0.100:8000/assets/report/]  ......</span></span>
<span class="line"><span>?[31;1m发送失败，错误原因： HTTP Error 403: Forbidden?[0m</span></span>
<span class="line"><span>日志记录成功！</span></span></code></pre></div><p>403就是拒绝服务的错误了。</p><p>原因在于我们模拟浏览器发送了一个POST请求给Django，但是请求中没有携带Django需要的csrf安全令牌，所以拒绝了请求。</p><p>为了解决这个问题，我们需要在这个report视图上忽略csrf验证，可以通过Django的<code>@csrf_exempt</code>装饰器。修改代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.shortcuts import render</span></span>
<span class="line"><span>from django.shortcuts import HttpResponse</span></span>
<span class="line"><span>from django.views.decorators.csrf import csrf_exempt</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Create your views here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@csrf_exempt</span></span>
<span class="line"><span>def report(request):</span></span>
<span class="line"><span>    if request.method == &quot;POST&quot;:</span></span>
<span class="line"><span>        asset_data = request.POST.get(&#39;asset_data&#39;)</span></span>
<span class="line"><span>        print(asset_data)</span></span>
<span class="line"><span>        return HttpResponse(&quot;成功收到数据！&quot;)</span></span></code></pre></div><p>重启CMDB服务器，再次从客户端报告数据，可以看到返回结果如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(venv) D:\\work\\2019\\for_test\\CMDB\\Client\\bin&gt;python main.py report_data</span></span>
<span class="line"><span>正在将数据发送至： [http://192.168.0.100:8000/assets/report/]  ......</span></span>
<span class="line"><span>?[31;1m发送完毕！?[0m</span></span>
<span class="line"><span>返回结果：成功收到数据！</span></span>
<span class="line"><span>日志记录成功！</span></span></code></pre></div><p>这表明数据发送成功了。</p><p>再看Pycharm中，也打印出了接收到的数据，一切OK！</p><p>CSRF验证的问题解决了，但是又带来新的安全问题。我们可以通过增加用户名、密码，或者md5验证或者自定义安全令牌的方式解决，这部分内容需要大家自己添加。</p><p>Windows下的客户端已经验证完毕了，然后我们就可以通过各种方式让脚本定时运行、收集和报告数据，一切都自动化。</p>`,50),i=[l];function t(c,o,r,d,u,m){return a(),n("div",null,i)}const f=s(e,[["render",t]]);export{h as __pageData,f as default};
