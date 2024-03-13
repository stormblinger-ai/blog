import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const m=JSON.parse('{"title":"5.Linux下收集数据","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB5.md","filePath":"python-demo/CMDB5.md"}'),l={name:"python-demo/CMDB5.md"},e=p(`<h1 id="_5-linux下收集数据" tabindex="-1">5.Linux下收集数据 <a class="header-anchor" href="#_5-linux下收集数据" aria-label="Permalink to &quot;5.Linux下收集数据&quot;">​</a></h1><hr><p>Linux下收集数据就有很多命令和工具了，比Windows方便多了。</p><p>但是要在Python的进程中运行操作系统级别的命令，通常需要使用subprocess模块。这个模块的具体用法，请查看Python教程中相关部分的内容。</p><p>在Client/plugins下创建一个<code>collect_linux_info.py</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#!/usr/bin/env python3</span></span>
<span class="line"><span># -*- coding:utf-8 -*-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import subprocess</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def collect():</span></span>
<span class="line"><span>    filter_keys = [&#39;Manufacturer&#39;, &#39;Serial Number&#39;, &#39;Product Name&#39;, &#39;UUID&#39;, &#39;Wake-up Type&#39;]</span></span>
<span class="line"><span>    raw_data = {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for key in filter_keys:</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            res = subprocess.Popen(&quot;sudo dmidecode -t system|grep &#39;%s&#39;&quot; % key,</span></span>
<span class="line"><span>                                   stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span>            result = res.stdout.read().decode()</span></span>
<span class="line"><span>            data_list = result.split(&#39;:&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if len(data_list) &gt; 1:</span></span>
<span class="line"><span>                raw_data[key] = data_list[1].strip()</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                raw_data[key] = &#39;&#39;</span></span>
<span class="line"><span>        except Exception as e:</span></span>
<span class="line"><span>            print(e)</span></span>
<span class="line"><span>            raw_data[key] = &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    data = dict()</span></span>
<span class="line"><span>    data[&#39;asset_type&#39;] = &#39;server&#39;</span></span>
<span class="line"><span>    data[&#39;manufacturer&#39;] = raw_data[&#39;Manufacturer&#39;]</span></span>
<span class="line"><span>    data[&#39;sn&#39;] = raw_data[&#39;Serial Number&#39;]</span></span>
<span class="line"><span>    data[&#39;model&#39;] = raw_data[&#39;Product Name&#39;]</span></span>
<span class="line"><span>    data[&#39;uuid&#39;] = raw_data[&#39;UUID&#39;]</span></span>
<span class="line"><span>    data[&#39;wake_up_type&#39;] = raw_data[&#39;Wake-up Type&#39;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    data.update(get_os_info())</span></span>
<span class="line"><span>    data.update(get_cpu_info())</span></span>
<span class="line"><span>    data.update(get_ram_info())</span></span>
<span class="line"><span>    data.update(get_nic_info())</span></span>
<span class="line"><span>    data.update(get_disk_info())</span></span>
<span class="line"><span>    return data</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_os_info():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    获取操作系统信息</span></span>
<span class="line"><span>    :return:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    distributor = subprocess.Popen(&quot;lsb_release -a|grep &#39;Distributor ID&#39;&quot;,</span></span>
<span class="line"><span>                                   stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span>    distributor = distributor.stdout.read().decode().split(&quot;:&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    release = subprocess.Popen(&quot;lsb_release -a|grep &#39;Description&#39;&quot;,</span></span>
<span class="line"><span>                               stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    release = release.stdout.read().decode().split(&quot;:&quot;)</span></span>
<span class="line"><span>    data_dic = {</span></span>
<span class="line"><span>        &quot;os_distribution&quot;: distributor[1].strip() if len(distributor) &gt; 1 else &quot;&quot;,</span></span>
<span class="line"><span>        &quot;os_release&quot;: release[1].strip() if len(release) &gt; 1 else &quot;&quot;,</span></span>
<span class="line"><span>        &quot;os_type&quot;: &quot;Linux&quot;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return data_dic</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_cpu_info():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    获取cpu信息</span></span>
<span class="line"><span>    :return:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    raw_cmd = &#39;cat /proc/cpuinfo&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    raw_data = {</span></span>
<span class="line"><span>        &#39;cpu_model&#39;: &quot;%s |grep &#39;model name&#39; |head -1 &quot; % raw_cmd,</span></span>
<span class="line"><span>        &#39;cpu_count&#39;:  &quot;%s |grep  &#39;processor&#39;|wc -l &quot; % raw_cmd,</span></span>
<span class="line"><span>        &#39;cpu_core_count&#39;: &quot;%s |grep &#39;cpu cores&#39; |awk -F: &#39;{SUM +=$2} END {print SUM}&#39;&quot; % raw_cmd,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for key, cmd in raw_data.items():</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            result = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span>            raw_data[key] = result.stdout.read().decode().strip()</span></span>
<span class="line"><span>        except ValueError as e:</span></span>
<span class="line"><span>            print(e)</span></span>
<span class="line"><span>            raw_data[key] = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    data = {</span></span>
<span class="line"><span>        &quot;cpu_count&quot;: raw_data[&quot;cpu_count&quot;],</span></span>
<span class="line"><span>        &quot;cpu_core_count&quot;: raw_data[&quot;cpu_core_count&quot;]</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cpu_model = raw_data[&quot;cpu_model&quot;].split(&quot;:&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if len(cpu_model) &gt; 1:</span></span>
<span class="line"><span>        data[&quot;cpu_model&quot;] = cpu_model[1].strip()</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        data[&quot;cpu_model&quot;] = &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return data</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_ram_info():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    获取内存信息</span></span>
<span class="line"><span>    :return:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    raw_data = subprocess.Popen(&quot;sudo dmidecode -t memory&quot;, stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span>    raw_list = raw_data.stdout.read().decode().split(&quot;\\n&quot;)</span></span>
<span class="line"><span>    raw_ram_list = []</span></span>
<span class="line"><span>    item_list = []</span></span>
<span class="line"><span>    for line in raw_list:</span></span>
<span class="line"><span>        if line.startswith(&quot;Memory Device&quot;):</span></span>
<span class="line"><span>            raw_ram_list.append(item_list)</span></span>
<span class="line"><span>            item_list = []</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            item_list.append(line.strip())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ram_list = []</span></span>
<span class="line"><span>    for item in raw_ram_list:</span></span>
<span class="line"><span>        item_ram_size = 0</span></span>
<span class="line"><span>        ram_item_to_dic = {}</span></span>
<span class="line"><span>        for i in item:</span></span>
<span class="line"><span>            data = i.split(&quot;:&quot;)</span></span>
<span class="line"><span>            if len(data) == 2:</span></span>
<span class="line"><span>                key, v = data</span></span>
<span class="line"><span>                if key == &#39;Size&#39;:</span></span>
<span class="line"><span>                    if v.strip() != &quot;No Module Installed&quot;:</span></span>
<span class="line"><span>                        ram_item_to_dic[&#39;capacity&#39;] = v.split()[0].strip()</span></span>
<span class="line"><span>                        item_ram_size = round(v.split()[0])</span></span>
<span class="line"><span>                    else:</span></span>
<span class="line"><span>                        ram_item_to_dic[&#39;capacity&#39;] = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                if key == &#39;Type&#39;:</span></span>
<span class="line"><span>                    ram_item_to_dic[&#39;model&#39;] = v.strip()</span></span>
<span class="line"><span>                if key == &#39;Manufacturer&#39;:</span></span>
<span class="line"><span>                    ram_item_to_dic[&#39;manufacturer&#39;] = v.strip()</span></span>
<span class="line"><span>                if key == &#39;Serial Number&#39;:</span></span>
<span class="line"><span>                    ram_item_to_dic[&#39;sn&#39;] = v.strip()</span></span>
<span class="line"><span>                if key == &#39;Asset Tag&#39;:</span></span>
<span class="line"><span>                    ram_item_to_dic[&#39;asset_tag&#39;] = v.strip()</span></span>
<span class="line"><span>                if key == &#39;Locator&#39;:</span></span>
<span class="line"><span>                    ram_item_to_dic[&#39;slot&#39;] = v.strip()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if item_ram_size == 0:</span></span>
<span class="line"><span>            pass</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            ram_list.append(ram_item_to_dic)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    raw_total_size = subprocess.Popen(&quot;cat /proc/meminfo|grep MemTotal &quot;, stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span>    raw_total_size = raw_total_size.stdout.read().decode().split(&quot;:&quot;)</span></span>
<span class="line"><span>    ram_data = {&#39;ram&#39;: ram_list}</span></span>
<span class="line"><span>    if len(raw_total_size) == 2:</span></span>
<span class="line"><span>        total_gb_size = int(raw_total_size[1].split()[0]) / 1024**2</span></span>
<span class="line"><span>        ram_data[&#39;ram_size&#39;] = total_gb_size</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return ram_data</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_nic_info():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    获取网卡信息</span></span>
<span class="line"><span>    :return:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    raw_data = subprocess.Popen(&quot;ifconfig -a&quot;, stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    raw_data = raw_data.stdout.read().decode().split(&quot;\\n&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    nic_dic = dict()</span></span>
<span class="line"><span>    next_ip_line = False</span></span>
<span class="line"><span>    last_mac_addr = None</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for line in raw_data:</span></span>
<span class="line"><span>        if next_ip_line:</span></span>
<span class="line"><span>            next_ip_line = False</span></span>
<span class="line"><span>            nic_name = last_mac_addr.split()[0]</span></span>
<span class="line"><span>            mac_addr = last_mac_addr.split(&quot;HWaddr&quot;)[1].strip()</span></span>
<span class="line"><span>            raw_ip_addr = line.split(&quot;inet addr:&quot;)</span></span>
<span class="line"><span>            raw_bcast = line.split(&quot;Bcast:&quot;)</span></span>
<span class="line"><span>            raw_netmask = line.split(&quot;Mask:&quot;)</span></span>
<span class="line"><span>            if len(raw_ip_addr) &gt; 1:</span></span>
<span class="line"><span>                ip_addr = raw_ip_addr[1].split()[0]</span></span>
<span class="line"><span>                network = raw_bcast[1].split()[0]</span></span>
<span class="line"><span>                netmask = raw_netmask[1].split()[0]</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                ip_addr = None</span></span>
<span class="line"><span>                network = None</span></span>
<span class="line"><span>                netmask = None</span></span>
<span class="line"><span>            if mac_addr not in nic_dic:</span></span>
<span class="line"><span>                nic_dic[mac_addr] = {&#39;name&#39;: nic_name,</span></span>
<span class="line"><span>                                     &#39;mac&#39;: mac_addr,</span></span>
<span class="line"><span>                                     &#39;net_mask&#39;: netmask,</span></span>
<span class="line"><span>                                     &#39;network&#39;: network,</span></span>
<span class="line"><span>                                     &#39;bonding&#39;: 0,</span></span>
<span class="line"><span>                                     &#39;model&#39;: &#39;unknown&#39;,</span></span>
<span class="line"><span>                                     &#39;ip_address&#39;: ip_addr,</span></span>
<span class="line"><span>                                     }</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                if &#39;%s_bonding_addr&#39; % (mac_addr,) not in nic_dic:</span></span>
<span class="line"><span>                    random_mac_addr = &#39;%s_bonding_addr&#39; % (mac_addr,)</span></span>
<span class="line"><span>                else:</span></span>
<span class="line"><span>                    random_mac_addr = &#39;%s_bonding_addr2&#39; % (mac_addr,)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                nic_dic[random_mac_addr] = {&#39;name&#39;: nic_name,</span></span>
<span class="line"><span>                                            &#39;mac&#39;: random_mac_addr,</span></span>
<span class="line"><span>                                            &#39;net_mask&#39;: netmask,</span></span>
<span class="line"><span>                                            &#39;network&#39;: network,</span></span>
<span class="line"><span>                                            &#39;bonding&#39;: 1,</span></span>
<span class="line"><span>                                            &#39;model&#39;: &#39;unknown&#39;,</span></span>
<span class="line"><span>                                            &#39;ip_address&#39;: ip_addr,</span></span>
<span class="line"><span>                                            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if &quot;HWaddr&quot; in line:</span></span>
<span class="line"><span>            next_ip_line = True</span></span>
<span class="line"><span>            last_mac_addr = line</span></span>
<span class="line"><span>    nic_list = []</span></span>
<span class="line"><span>    for k, v in nic_dic.items():</span></span>
<span class="line"><span>        nic_list.append(v)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return {&#39;nic&#39;: nic_list}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_disk_info():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    获取存储信息。</span></span>
<span class="line"><span>    本脚本只针对ubuntu中使用sda，且只有一块硬盘的情况。</span></span>
<span class="line"><span>    具体查看硬盘信息的命令，请根据实际情况，实际调整。</span></span>
<span class="line"><span>    如果需要查看Raid信息，可以尝试MegaCli工具。</span></span>
<span class="line"><span>    :return:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    raw_data = subprocess.Popen(&quot;sudo hdparm -i /dev/sda | grep Model&quot;, stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span>    raw_data = raw_data.stdout.read().decode()</span></span>
<span class="line"><span>    data_list = raw_data.split(&quot;,&quot;)</span></span>
<span class="line"><span>    model = data_list[0].split(&quot;=&quot;)[1]</span></span>
<span class="line"><span>    sn = data_list[2].split(&quot;=&quot;)[1].strip()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    size_data = subprocess.Popen(&quot;sudo fdisk -l /dev/sda | grep Disk|head -1&quot;, stdout=subprocess.PIPE, shell=True)</span></span>
<span class="line"><span>    size_data = size_data.stdout.read().decode()</span></span>
<span class="line"><span>    size = size_data.split(&quot;:&quot;)[1].strip().split(&quot; &quot;)[0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    result = {&#39;physical_disk_driver&#39;: []}</span></span>
<span class="line"><span>    disk_dict = dict()</span></span>
<span class="line"><span>    disk_dict[&quot;model&quot;] = model</span></span>
<span class="line"><span>    disk_dict[&quot;size&quot;] = size</span></span>
<span class="line"><span>    disk_dict[&quot;sn&quot;] = sn</span></span>
<span class="line"><span>    result[&#39;physical_disk_driver&#39;].append(disk_dict)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return result</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    # 收集信息功能测试</span></span>
<span class="line"><span>    data = collect()</span></span>
<span class="line"><span>    print(data)</span></span></code></pre></div><p>代码整体没有什么难点，无非就是使用subprocess.Popen()方法执行Linux的命令，然后获取返回值，并以规定的格式打包到data字典里。</p><p>需要说明的问题有：</p><ul><li>当Linux中存在好几个Python解释器版本时，要注意调用方式，前面已经强调过了；</li><li>不同的Linux发行版，有些命令可能没有，需要额外安装；</li><li>所使用的查看硬件信息的命令并不一定必须和这里的一样，只要能获得数据就行；</li><li>有一些命令在ubuntu中涉及sudo的问题，需要特别对待；</li><li>最终数据字典的格式一定要正确；</li><li>可以在Linux下配置cronb或其它定时服务，设置定期的数据收集、报告任务。</li></ul><hr><p>下面在Linux虚拟机上，测试一下客户端。</p><p>将Pycharm中的Client客户端文件夹，拷贝到Linux虚拟机中，这里是ubuntu16.04.</p><p>进入bin目录，运行“python3 main.py report_data”，一切顺利的话应该能得到如下的反馈：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>正在将数据发送至： [http://192.168.1.100:8000/assets/report/]  ......</span></span>
<span class="line"><span>发送完毕！ </span></span>
<span class="line"><span>返回结果：成功收到数据！</span></span>
<span class="line"><span>日志记录成功！</span></span></code></pre></div><p>然后，在Pycharm中，也可以看到接收的数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;asset_type&quot;: &quot;server&quot;,</span></span>
<span class="line"><span>    &quot;manufacturer&quot;: &quot;innotek GmbH&quot;,</span></span>
<span class="line"><span>    &quot;sn&quot;: &quot;0&quot;,</span></span>
<span class="line"><span>    &quot;model&quot;: &quot;VirtualBox&quot;,</span></span>
<span class="line"><span>    &quot;uuid&quot;: &quot;E8DE611C-4279-495C-9B58-502B6FCED076&quot;,</span></span>
<span class="line"><span>    &quot;wake_up_type&quot;: &quot;Power Switch&quot;,</span></span>
<span class="line"><span>    &quot;os_distribution&quot;: &quot;Ubuntu&quot;,</span></span>
<span class="line"><span>    &quot;os_release&quot;: &quot;Ubuntu 16.04.3 LTS&quot;,</span></span>
<span class="line"><span>    &quot;os_type&quot;: &quot;Linux&quot;,</span></span>
<span class="line"><span>    &quot;cpu_count&quot;: &quot;2&quot;,</span></span>
<span class="line"><span>    &quot;cpu_core_count&quot;: &quot;4&quot;,</span></span>
<span class="line"><span>    &quot;cpu_model&quot;: &quot;Intel(R) Core(TM) i5-2300 CPU @ 2.80GHz&quot;,</span></span>
<span class="line"><span>    &quot;ram&quot;: [],</span></span>
<span class="line"><span>    &quot;ram_size&quot;: 3.858997344970703,</span></span>
<span class="line"><span>    &quot;nic&quot;: [],</span></span>
<span class="line"><span>    &quot;physical_disk_driver&quot;: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;model&quot;: &quot;VBOX HARDDISK&quot;,</span></span>
<span class="line"><span>            &quot;size&quot;: &quot;50&quot;,</span></span>
<span class="line"><span>            &quot;sn&quot;: &quot;VBeee1ba73-09085302&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>可以看到，由于是virtualbox虚拟机的原因，sn为0，内存和网卡信息一条都没有，数据有点可怜，vmware的虚拟机可能好点。如果你对Linux比较熟悉，还可以自己尝试获取更多的数据，但是要注意虚拟机的sn可能重复，要防止冲突。</p>`,17),i=[e];function t(c,o,u,r,d,_){return a(),n("div",null,i)}const b=s(l,[["render",t]]);export{m as __pageData,b as default};
