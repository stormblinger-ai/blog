import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const e="/assets/123-1.BsJCAbw1.png",l="/assets/123-2.CZqEG5VL.png",t="/assets/123-3.BfzuwPKw.png",i="/assets/123-4.BGKvYEfm.png",o="/assets/123-5.CYiOSxLh.png",c="/assets/123-6.DLIeCNPY.png",u="/assets/123-7.CqdAg9xu.png",y=JSON.parse('{"title":"7.审批新资产","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB7.md","filePath":"python-demo/CMDB7.md"}'),r={name:"python-demo/CMDB7.md"},q=p('<h1 id="_7-审批新资产" tabindex="-1">7.审批新资产 <a class="header-anchor" href="#_7-审批新资产" aria-label="Permalink to &quot;7.审批新资产&quot;">​</a></h1><hr><h2 id="一、自定义admin的actions" tabindex="-1">一、自定义admin的actions <a class="header-anchor" href="#一、自定义admin的actions" aria-label="Permalink to &quot;一、自定义admin的actions&quot;">​</a></h2><p>需要有专门的审批员来审批新资产，对资产的合法性、健全性、可用性等更多方面进行审核，如果没有问题，那么就批准上线。</p><p>批准上线这一操作是通过admin的自定义actions来实现的。</p><p>Django的admin默认有一个delete操作的action，所有在admin中的模型都有这个action，更多的就需要我们自己编写了。</p><p><img src="'+e+`" alt="image"></p><p>修改<code>/assets/admin.py</code>的代码，新的代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.contrib import admin</span></span>
<span class="line"><span># Register your models here.</span></span>
<span class="line"><span>from assets import models</span></span>
<span class="line"><span>from assets import asset_handler</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class NewAssetAdmin(admin.ModelAdmin):</span></span>
<span class="line"><span>    list_display = [&#39;asset_type&#39;, &#39;sn&#39;, &#39;model&#39;, &#39;manufacturer&#39;, &#39;c_time&#39;, &#39;m_time&#39;]</span></span>
<span class="line"><span>    list_filter = [&#39;asset_type&#39;, &#39;manufacturer&#39;, &#39;c_time&#39;]</span></span>
<span class="line"><span>    search_fields = (&#39;sn&#39;,)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    actions = [&#39;approve_selected_new_assets&#39;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def approve_selected_new_assets(self, request, queryset):</span></span>
<span class="line"><span>        # 获得被打钩的checkbox对应的资产</span></span>
<span class="line"><span>        selected = request.POST.getlist(admin.ACTION_CHECKBOX_NAME)</span></span>
<span class="line"><span>        success_upline_number = 0</span></span>
<span class="line"><span>        for asset_id in selected:</span></span>
<span class="line"><span>            obj = asset_handler.ApproveAsset(request, asset_id)</span></span>
<span class="line"><span>            ret = obj.asset_upline()</span></span>
<span class="line"><span>            if ret:</span></span>
<span class="line"><span>                success_upline_number += 1</span></span>
<span class="line"><span>        # 顶部绿色提示信息</span></span>
<span class="line"><span>        self.message_user(request, &quot;成功批准  %s  条新资产上线！&quot; % success_upline_number)</span></span>
<span class="line"><span>    approve_selected_new_assets.short_description = &quot;批准选择的新资产&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class AssetAdmin(admin.ModelAdmin):</span></span>
<span class="line"><span>    list_display = [&#39;asset_type&#39;, &#39;name&#39;, &#39;status&#39;, &#39;approved_by&#39;, &#39;c_time&#39;, &quot;m_time&quot;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>admin.site.register(models.Asset, AssetAdmin)</span></span>
<span class="line"><span>admin.site.register(models.Server)</span></span>
<span class="line"><span>admin.site.register(models.StorageDevice)</span></span>
<span class="line"><span>admin.site.register(models.SecurityDevice)</span></span>
<span class="line"><span>admin.site.register(models.BusinessUnit)</span></span>
<span class="line"><span>admin.site.register(models.Contract)</span></span>
<span class="line"><span>admin.site.register(models.CPU)</span></span>
<span class="line"><span>admin.site.register(models.Disk)</span></span>
<span class="line"><span>admin.site.register(models.EventLog)</span></span>
<span class="line"><span>admin.site.register(models.IDC)</span></span>
<span class="line"><span>admin.site.register(models.Manufacturer)</span></span>
<span class="line"><span>admin.site.register(models.NetworkDevice)</span></span>
<span class="line"><span>admin.site.register(models.NIC)</span></span>
<span class="line"><span>admin.site.register(models.RAM)</span></span>
<span class="line"><span>admin.site.register(models.Software)</span></span>
<span class="line"><span>admin.site.register(models.Tag)</span></span>
<span class="line"><span>admin.site.register(models.NewAssetApprovalZone, NewAssetAdmin)</span></span></code></pre></div><p>说明：</p><ul><li>通过<code>actions = [&#39;approve_selected_new_assets&#39;]</code>定义当前模型的新acitons列表；</li><li><code>approve_selected_new_assets()</code>方法包含具体的动作逻辑；</li><li>自定义的action接收至少三个参数，第一个是self，第二个是request即请求，第三个是被选中的数据对象集合queryset。</li><li>首先通过<code>request.POST.getlist()</code>方法获取被打钩的checkbox对应的资产；</li><li>注意：django3.0后，<code>ACTION_CHECKBOX_NAME</code>的位置发生了改变。所以需要改成<code>admin.helpers.ACTION_CHECKBOX_NAME</code>或者<code>&#39;_selected_action&#39;</code>。</li><li>可能同时有多个资产被选择，所以这是个批量操作，需要进行循环；</li><li>selected是一个包含了被选中资产的id值的列表；</li><li>对于每一个资产，创建一个<code>asset_handler.ApproveAsset()</code>的实例，然后调用实例的<code>asset_upline()</code>方法，并获取返回值。如果返回值为True，说明该资产被成功批准，那么<code>success_upline_number</code>变量+1，保存成功批准的资产数；</li><li>最后，在admin中给与提示信息。</li><li><code>approve_selected_new_assets.short_description = &quot;批准选择的新资产&quot;</code>用于在admin界面中为action提供中文显示。你可以尝试去掉这条，看看效果。</li></ul><p>重新启动CMDB，进入admin的待审批资产区，查看上方的acitons动作条，如下所示：</p><p><img src="`+l+`" alt="image"></p><h2 id="二、创建测试用例" tabindex="-1">二、创建测试用例 <a class="header-anchor" href="#二、创建测试用例" aria-label="Permalink to &quot;二、创建测试用例&quot;">​</a></h2><p>由于没有真实的服务器供测试，这里需要手动创建一些虚假的服务器用例，方便后面的使用和展示。</p><p>首先，将先前的所有资产条目全部从admin中删除，确保数据库内没有任何数据。</p><p>然后，在Client/bin/目录下新建一个<code>report_assets</code>脚本，其内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#!/usr/bin/env python</span></span>
<span class="line"><span># -*- coding:utf-8 -*-</span></span>
<span class="line"><span>import json</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import urllib.request</span></span>
<span class="line"><span>import urllib.parse</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BASE_DIR = os.path.dirname(os.getcwd())</span></span>
<span class="line"><span># 设置工作目录，使得包和模块能够正常导入</span></span>
<span class="line"><span>sys.path.append(BASE_DIR)</span></span>
<span class="line"><span>from conf import settings</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def update_test(data):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    创建测试用例</span></span>
<span class="line"><span>    :return:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    # 将数据打包到一个字典内，并转换为json格式</span></span>
<span class="line"><span>    data = {&quot;asset_data&quot;: json.dumps(data)}</span></span>
<span class="line"><span>    # 根据settings中的配置，构造url</span></span>
<span class="line"><span>    url = &quot;http://%s:%s%s&quot; % (settings.Params[&#39;server&#39;], settings.Params[&#39;port&#39;], settings.Params[&#39;url&#39;])</span></span>
<span class="line"><span>    print(&#39;正在将数据发送至： [%s]  ......&#39; % url)</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        # 使用Python内置的urllib.request库，发送post请求。</span></span>
<span class="line"><span>        # 需要先将数据进行封装，并转换成bytes类型</span></span>
<span class="line"><span>        data_encode = urllib.parse.urlencode(data).encode()</span></span>
<span class="line"><span>        response = urllib.request.urlopen(url=url, data=data_encode, timeout=settings.Params[&#39;request_timeout&#39;])</span></span>
<span class="line"><span>        print(&quot;\\033[31;1m发送完毕！\\033[0m &quot;)</span></span>
<span class="line"><span>        message = response.read().decode()</span></span>
<span class="line"><span>        print(&quot;返回结果：%s&quot; % message)</span></span>
<span class="line"><span>    except Exception as e:</span></span>
<span class="line"><span>        message = &quot;发送失败&quot;</span></span>
<span class="line"><span>        print(&quot;\\033[31;1m发送失败，%s\\033[0m&quot; % e)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    windows_data = {</span></span>
<span class="line"><span>        &quot;os_type&quot;: &quot;Windows&quot;,</span></span>
<span class="line"><span>        &quot;os_release&quot;: &quot;7 64bit  6.1.7601 &quot;,</span></span>
<span class="line"><span>        &quot;os_distribution&quot;: &quot;Microsoft&quot;,</span></span>
<span class="line"><span>        &quot;asset_type&quot;: &quot;server&quot;,</span></span>
<span class="line"><span>        &quot;cpu_count&quot;: 2,</span></span>
<span class="line"><span>        &quot;cpu_model&quot;: &quot;Intel(R) Core(TM) i5-2300 CPU @ 2.80GHz&quot;,</span></span>
<span class="line"><span>        &quot;cpu_core_count&quot;: 8,</span></span>
<span class="line"><span>        &quot;ram&quot;: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;slot&quot;: &quot;A1&quot;,</span></span>
<span class="line"><span>                &quot;capacity&quot;: 8,</span></span>
<span class="line"><span>                &quot;model&quot;: &quot;Physical Memory&quot;,</span></span>
<span class="line"><span>                &quot;manufacturer&quot;: &quot;kingstone &quot;,</span></span>
<span class="line"><span>                &quot;sn&quot;: &quot;456&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        &quot;manufacturer&quot;: &quot;Intel&quot;,</span></span>
<span class="line"><span>        &quot;model&quot;: &quot;P67X-UD3R-B3&quot;,</span></span>
<span class="line"><span>        &quot;wake_up_type&quot;: 6,</span></span>
<span class="line"><span>        &quot;sn&quot;: &quot;00426-OEM-8992662-111111&quot;,</span></span>
<span class="line"><span>        &quot;physical_disk_driver&quot;: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;iface_type&quot;: &quot;unknown&quot;,</span></span>
<span class="line"><span>                &quot;slot&quot;: 0,</span></span>
<span class="line"><span>                &quot;sn&quot;: &quot;3830414130423230343234362020202020202020&quot;,</span></span>
<span class="line"><span>                &quot;model&quot;: &quot;KINGSTON SV100S264G ATA Device&quot;,</span></span>
<span class="line"><span>                &quot;manufacturer&quot;: &quot;(标准磁盘驱动器)&quot;,</span></span>
<span class="line"><span>                &quot;capacity&quot;: 128</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;iface_type&quot;: &quot;SATA&quot;,</span></span>
<span class="line"><span>                &quot;slot&quot;: 1,</span></span>
<span class="line"><span>                &quot;sn&quot;: &quot;383041413042323023234362020102020202020&quot;,</span></span>
<span class="line"><span>                &quot;model&quot;: &quot;KINGSTON SV100S264G ATA Device&quot;,</span></span>
<span class="line"><span>                &quot;manufacturer&quot;: &quot;(标准磁盘驱动器)&quot;,</span></span>
<span class="line"><span>                &quot;capacity&quot;: 2048</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        &quot;nic&quot;: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;mac&quot;: &quot;14:CF:22:FF:48:34&quot;,</span></span>
<span class="line"><span>                &quot;model&quot;: &quot;[00000011] Realtek RTL8192CU Wireless LAN 802.11n USB 2.0 Network Adapter&quot;,</span></span>
<span class="line"><span>                &quot;name&quot;: 11,</span></span>
<span class="line"><span>                &quot;ip_address&quot;: &quot;192.168.1.110&quot;,</span></span>
<span class="line"><span>                &quot;net_mask&quot;: [</span></span>
<span class="line"><span>                    &quot;255.255.255.0&quot;,</span></span>
<span class="line"><span>                    &quot;64&quot;</span></span>
<span class="line"><span>                ]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;mac&quot;: &quot;0A:01:27:00:00:00&quot;,</span></span>
<span class="line"><span>                &quot;model&quot;: &quot;[00000013] VirtualBox Host-Only Ethernet Adapter&quot;,</span></span>
<span class="line"><span>                &quot;name&quot;: 13,</span></span>
<span class="line"><span>                &quot;ip_address&quot;: &quot;192.168.56.1&quot;,</span></span>
<span class="line"><span>                &quot;net_mask&quot;: [</span></span>
<span class="line"><span>                    &quot;255.255.255.0&quot;,</span></span>
<span class="line"><span>                    &quot;64&quot;</span></span>
<span class="line"><span>                ]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;mac&quot;: &quot;14:CF:22:FF:48:34&quot;,</span></span>
<span class="line"><span>                &quot;model&quot;: &quot;[00000017] Microsoft Virtual WiFi Miniport Adapter&quot;,</span></span>
<span class="line"><span>                &quot;name&quot;: 17,</span></span>
<span class="line"><span>                &quot;ip_address&quot;: &quot;&quot;,</span></span>
<span class="line"><span>                &quot;net_mask&quot;: &quot;&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;mac&quot;: &quot;14:CF:22:FF:48:34&quot;,</span></span>
<span class="line"><span>                &quot;model&quot;: &quot;Intel Adapter&quot;,</span></span>
<span class="line"><span>                &quot;name&quot;: 17,</span></span>
<span class="line"><span>                &quot;ip_address&quot;: &quot;192.1.1.1&quot;,</span></span>
<span class="line"><span>                &quot;net_mask&quot;: &quot;&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    linux_data = {</span></span>
<span class="line"><span>        &quot;asset_type&quot;: &quot;server&quot;,</span></span>
<span class="line"><span>        &quot;manufacturer&quot;: &quot;innotek GmbH&quot;,</span></span>
<span class="line"><span>        &quot;sn&quot;: &quot;00001&quot;,</span></span>
<span class="line"><span>        &quot;model&quot;: &quot;VirtualBox&quot;,</span></span>
<span class="line"><span>        &quot;uuid&quot;: &quot;E8DE611C-4279-495C-9B58-502B6FCED076&quot;,</span></span>
<span class="line"><span>        &quot;wake_up_type&quot;: &quot;Power Switch&quot;,</span></span>
<span class="line"><span>        &quot;os_distribution&quot;: &quot;Ubuntu&quot;,</span></span>
<span class="line"><span>        &quot;os_release&quot;: &quot;Ubuntu 16.04.3 LTS&quot;,</span></span>
<span class="line"><span>        &quot;os_type&quot;: &quot;Linux&quot;,</span></span>
<span class="line"><span>        &quot;cpu_count&quot;: &quot;2&quot;,</span></span>
<span class="line"><span>        &quot;cpu_core_count&quot;: &quot;4&quot;,</span></span>
<span class="line"><span>        &quot;cpu_model&quot;: &quot;Intel(R) Core(TM) i5-2300 CPU @ 2.80GHz&quot;,</span></span>
<span class="line"><span>        &quot;ram&quot;: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;slot&quot;: &quot;A1&quot;,</span></span>
<span class="line"><span>                &quot;capacity&quot;: 8,</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>        &quot;ram_size&quot;: 3.858997344970703,</span></span>
<span class="line"><span>        &quot;nic&quot;: [],</span></span>
<span class="line"><span>        &quot;physical_disk_driver&quot;: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;model&quot;: &quot;VBOX HARDDISK&quot;,</span></span>
<span class="line"><span>                &quot;size&quot;: &quot;50&quot;,</span></span>
<span class="line"><span>                &quot;sn&quot;: &quot;VBeee1ba73-09085302&quot;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    update_test(linux_data)</span></span>
<span class="line"><span>    update_test(windows_data)</span></span></code></pre></div><p>该脚本的作用很简单，人为虚构了两台服务器（一台windows，一台Linux）的信息，并发送给CMDB。单独执行该脚本，在admin的新资产待审批区可以看到添加了两条新资产信息。</p><p>要添加更多的资产，只需修改脚本中<code>windows_data</code>和<code>linux_data</code>的数据即可。但是要注意的是，如果不修改sn，那么会变成资产数据更新，而不是增加新资产，这一点一定要注意。</p><p>OK，我们再加两条资产，这样就变成四个实例了。</p><p><img src="`+t+`" alt="image"></p><h2 id="三、批准资产上线" tabindex="-1">三、批准资产上线 <a class="header-anchor" href="#三、批准资产上线" aria-label="Permalink to &quot;三、批准资产上线&quot;">​</a></h2><p>有已经忍不住点击‘执行’命令的请举手！</p><p>是不是出现了错误？</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>AttributeError at /admin/assets/newassetapprovalzone/</span></span>
<span class="line"><span>module &#39;assets.asset_handler&#39; has no attribute &#39;ApproveAsset&#39;</span></span></code></pre></div><p>这是必然的，因为还没有写如何上线的代码啊！</p><p>在<code>/assets/asset_handler.py</code>中添加下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def log(log_type, msg=None, asset=None, new_asset=None, request=None):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    记录日志</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    event = models.EventLog()</span></span>
<span class="line"><span>    if log_type == &quot;upline&quot;:</span></span>
<span class="line"><span>        event.name = &quot;%s &lt;%s&gt; ：  上线&quot; % (asset.name, asset.sn)</span></span>
<span class="line"><span>        event.asset = asset</span></span>
<span class="line"><span>        event.detail = &quot;资产成功上线！&quot;</span></span>
<span class="line"><span>        event.user = request.user</span></span>
<span class="line"><span>    elif log_type == &quot;approve_failed&quot;:</span></span>
<span class="line"><span>        event.name = &quot;%s &lt;%s&gt; ：  审批失败&quot; % (new_asset.asset_type, new_asset.sn)</span></span>
<span class="line"><span>        event.new_asset = new_asset</span></span>
<span class="line"><span>        event.detail = &quot;审批失败！\\n%s&quot; % msg</span></span>
<span class="line"><span>        event.user = request.user</span></span>
<span class="line"><span>    # 更多日志类型.....</span></span>
<span class="line"><span>    event.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ApproveAsset:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    审批资产并上线。</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    def __init__(self, request, asset_id):</span></span>
<span class="line"><span>        self.request = request</span></span>
<span class="line"><span>        self.new_asset = models.NewAssetApprovalZone.objects.get(id=asset_id)</span></span>
<span class="line"><span>        self.data = json.loads(self.new_asset.data)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def asset_upline(self):</span></span>
<span class="line"><span>        # 为以后的其它类型资产扩展留下接口</span></span>
<span class="line"><span>        func = getattr(self, &quot;_%s_upline&quot; % self.new_asset.asset_type)</span></span>
<span class="line"><span>        ret = func()</span></span>
<span class="line"><span>        return ret</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _server_upline(self):</span></span>
<span class="line"><span>        # 在实际的生产环境中，下面的操作应该是原子性的整体事务，任何一步出现异常，所有操作都要回滚。</span></span>
<span class="line"><span>        asset = self._create_asset()  # 创建一条资产并返回资产对象。注意要和待审批区的资产区分开。</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            self._create_manufacturer(asset) # 创建厂商</span></span>
<span class="line"><span>            self._create_server(asset)       # 创建服务器</span></span>
<span class="line"><span>            self._create_CPU(asset)          # 创建CPU</span></span>
<span class="line"><span>            self._create_RAM(asset)          # 创建内存</span></span>
<span class="line"><span>            self._create_disk(asset)         # 创建硬盘</span></span>
<span class="line"><span>            self._create_nic(asset)          # 创建网卡</span></span>
<span class="line"><span>            self._delete_original_asset()    # 从待审批资产区删除已审批上线的资产</span></span>
<span class="line"><span>        except Exception as e:</span></span>
<span class="line"><span>            asset.delete()</span></span>
<span class="line"><span>            log(&#39;approve_failed&#39;, msg=e, new_asset=self.new_asset, request=self.request)</span></span>
<span class="line"><span>            print(e)</span></span>
<span class="line"><span>            return False</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            # 添加日志</span></span>
<span class="line"><span>            log(&quot;upline&quot;, asset=asset, request=self.request)</span></span>
<span class="line"><span>            print(&quot;新服务器上线!&quot;)</span></span>
<span class="line"><span>            return True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _create_asset(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        创建资产并上线</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        # 利用request.user自动获取当前管理人员的信息，作为审批人添加到资产数据中。</span></span>
<span class="line"><span>        asset = models.Asset.objects.create(asset_type=self.new_asset.asset_type,</span></span>
<span class="line"><span>                                            name=&quot;%s: %s&quot; % (self.new_asset.asset_type, self.new_asset.sn),</span></span>
<span class="line"><span>                                            sn=self.new_asset.sn,</span></span>
<span class="line"><span>                                            approved_by=self.request.user,</span></span>
<span class="line"><span>                                            )</span></span>
<span class="line"><span>        return asset</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _create_manufacturer(self, asset):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        创建厂商</span></span>
<span class="line"><span>        :param asset:</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        # 判断厂商数据是否存在。如果存在，看看数据库里是否已经有该厂商，再决定是获取还是创建。</span></span>
<span class="line"><span>        m = self.new_asset.manufacturer</span></span>
<span class="line"><span>        if m:</span></span>
<span class="line"><span>            manufacturer_obj, _ = models.Manufacturer.objects.get_or_create(name=m)</span></span>
<span class="line"><span>            asset.manufacturer = manufacturer_obj</span></span>
<span class="line"><span>            asset.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _create_server(self, asset):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        创建服务器</span></span>
<span class="line"><span>        :param asset:</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        models.Server.objects.create(asset=asset,</span></span>
<span class="line"><span>                                     model=self.new_asset.model,</span></span>
<span class="line"><span>                                     os_type=self.new_asset.os_type,</span></span>
<span class="line"><span>                                     os_distribution=self.new_asset.os_distribution,</span></span>
<span class="line"><span>                                     os_release=self.new_asset.os_release,</span></span>
<span class="line"><span>                                     )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _create_CPU(self, asset):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        创建CPU.</span></span>
<span class="line"><span>        教程这里对发送过来的数据采取了最大限度的容忍，</span></span>
<span class="line"><span>        实际情况下你可能还要对数据的完整性、合法性、数据类型进行检测，</span></span>
<span class="line"><span>        根据不同的检测情况，是被动接收，还是打回去要求重新收集，请自行决定。</span></span>
<span class="line"><span>        这里的业务逻辑非常复杂，不可能面面俱到。</span></span>
<span class="line"><span>        :param asset:</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        cpu = models.CPU.objects.create(asset=asset)</span></span>
<span class="line"><span>        cpu.cpu_model = self.new_asset.cpu_model</span></span>
<span class="line"><span>        cpu.cpu_count = self.new_asset.cpu_count</span></span>
<span class="line"><span>        cpu.cpu_core_count = self.new_asset.cpu_core_count</span></span>
<span class="line"><span>        cpu.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _create_RAM(self, asset):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        创建内存。通常有多条内存</span></span>
<span class="line"><span>        :param asset:</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        ram_list = self.data.get(&#39;ram&#39;)</span></span>
<span class="line"><span>        if not ram_list:    # 万一一条内存数据都没有</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        for ram_dict in ram_list:</span></span>
<span class="line"><span>            if not ram_dict.get(&#39;slot&#39;):</span></span>
<span class="line"><span>                raise ValueError(&quot;未知的内存插槽！&quot;)  # 使用虚拟机的时候，可能无法获取内存插槽，需要你修改此处的逻辑。</span></span>
<span class="line"><span>            ram = models.RAM()</span></span>
<span class="line"><span>            ram.asset = asset</span></span>
<span class="line"><span>            ram.slot = ram_dict.get(&#39;slot&#39;)</span></span>
<span class="line"><span>            ram.sn = ram_dict.get(&#39;sn&#39;)</span></span>
<span class="line"><span>            ram.model = ram_dict.get(&#39;model&#39;)</span></span>
<span class="line"><span>            ram.manufacturer = ram_dict.get(&#39;manufacturer&#39;)</span></span>
<span class="line"><span>            ram.capacity = ram_dict.get(&#39;capacity&#39;, 0)</span></span>
<span class="line"><span>            ram.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _create_disk(self, asset):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        存储设备种类多，还有Raid情况，需要根据实际情况具体解决。</span></span>
<span class="line"><span>        这里只以简单的SATA硬盘为例子。可能有多块硬盘。</span></span>
<span class="line"><span>        :param asset:</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        disk_list = self.data.get(&#39;physical_disk_driver&#39;)</span></span>
<span class="line"><span>        if not disk_list:  # 一条硬盘数据都没有</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        for disk_dict in disk_list:</span></span>
<span class="line"><span>            if not disk_dict.get(&#39;sn&#39;):</span></span>
<span class="line"><span>                raise ValueError(&quot;未知sn的硬盘！&quot;)  # 根据sn确定具体某块硬盘。</span></span>
<span class="line"><span>            disk = models.Disk()</span></span>
<span class="line"><span>            disk.asset = asset</span></span>
<span class="line"><span>            disk.sn = disk_dict.get(&#39;sn&#39;)</span></span>
<span class="line"><span>            disk.model = disk_dict.get(&#39;model&#39;)</span></span>
<span class="line"><span>            disk.manufacturer = disk_dict.get(&#39;manufacturer&#39;),</span></span>
<span class="line"><span>            disk.slot = disk_dict.get(&#39;slot&#39;)</span></span>
<span class="line"><span>            disk.capacity = disk_dict.get(&#39;capacity&#39;, 0)</span></span>
<span class="line"><span>            iface = disk_dict.get(&#39;interface_type&#39;)</span></span>
<span class="line"><span>            if iface in [&#39;SATA&#39;, &#39;SAS&#39;, &#39;SCSI&#39;, &#39;SSD&#39;, &#39;unknown&#39;]:</span></span>
<span class="line"><span>                disk.interface_type = iface</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            disk.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _create_nic(self, asset):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        创建网卡。可能有多个网卡，甚至虚拟网卡。</span></span>
<span class="line"><span>        :param asset:</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        nic_list = self.data.get(&quot;nic&quot;)</span></span>
<span class="line"><span>        if not nic_list:</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        for nic_dict in nic_list:</span></span>
<span class="line"><span>            if not nic_dict.get(&#39;mac&#39;):</span></span>
<span class="line"><span>                raise ValueError(&quot;网卡缺少mac地址！&quot;)</span></span>
<span class="line"><span>            if not nic_dict.get(&#39;model&#39;):</span></span>
<span class="line"><span>                raise ValueError(&quot;网卡型号未知！&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            nic = models.NIC()</span></span>
<span class="line"><span>            nic.asset = asset</span></span>
<span class="line"><span>            nic.name = nic_dict.get(&#39;name&#39;)</span></span>
<span class="line"><span>            nic.model = nic_dict.get(&#39;model&#39;)</span></span>
<span class="line"><span>            nic.mac = nic_dict.get(&#39;mac&#39;)</span></span>
<span class="line"><span>            nic.ip_address = nic_dict.get(&#39;ip_address&#39;)</span></span>
<span class="line"><span>            if nic_dict.get(&#39;net_mask&#39;):</span></span>
<span class="line"><span>                if len(nic_dict.get(&#39;net_mask&#39;)) &gt; 0:</span></span>
<span class="line"><span>                    nic.net_mask = nic_dict.get(&#39;net_mask&#39;)[0]</span></span>
<span class="line"><span>            nic.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _delete_original_asset(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        这里的逻辑是已经审批上线的资产，就从待审批区删除。</span></span>
<span class="line"><span>        也可以设置为修改成已审批状态但不删除，只是在管理界面特别处理，不让再次审批，灰色显示。</span></span>
<span class="line"><span>        不过这样可能导致待审批区越来越大。</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        self.new_asset.delete()</span></span></code></pre></div><p>核心就是增加了一个记录日志的log()函数以及审批资产的ApproveAsset类。</p><p>log()函数很简单，根据日志类型的不同，保存日志需要的各种信息，比如日志名称、关联的资产对象、日志详细内容和审批人员等等。所有的日志都被保存在数据库中，可以在admin中查看。</p><p>对于关键的ApproveAsset类，说明如下：</p><ul><li>初始化方法接收reqeust和待审批资产的id；</li><li>分别提前获取资产对象和所有数据data；</li><li><code>asset_upline()</code>是入口方法，通过反射，获取一个类似<code>_server_upline</code>的方法。之所以这么做，是为后面的网络设别、安全设备、存储设备等更多类型资产的审批留下扩展接口。本教程里只实现了服务器类型资产的审批方法，更多的请自行完善，过程基本类似。</li></ul><p><code>_server_upline()</code>是服务器类型资产上线的核心方法：</p><ul><li>它首先新建了一个Asset资产对象（注意要和待审批区的资产区分开）；</li><li>然后利用该对象，分别创建了对应的厂商、服务器、CPU、内存、硬盘和网卡，并删除待审批区的对应资产；</li><li>在实际的生产环境中，上面的操作应该是原子性的整体事务，任何一步出现异常，所有操作都要回滚；</li><li>如果任何一步出现错误，上面的操作全部撤销，也就是<code>asset.delete()</code>。记录错误日志，返回False；</li><li>如果没问题，那么记录正确日志，返回True。</li></ul><p>对于<code>_create_asset(self)</code>方法，利用<code>request.user</code>自动获取当前管理人员的信息，作为审批人添加到资产数据中。</p><p>对于<code>_create_manufacturer(self, asset)</code>方法，先判断厂商数据是否存在，再决定是获取还是创建。</p><p>对于<code>_create_CPU(self, asset)</code>等方法，教程这里对数据采取了最大限度的容忍，实际情况下你可能还要对数据的完整性、合法性、数据类型进行检测，根据不同的检测情况，是被动接收，还是打回去要求重新收集，请自行决定。这里的业务逻辑非常复杂，不可能面面俱到。后面的内存、硬盘和网卡也是一样的。</p><p>对于<code>_delete_original_asset(self)</code>方法，这里的逻辑是已经审批上线的资产，就从待审批区删除。也可以设置为修改成已审批状态但不删除，只是在管理界面特别处理，不让再次审批，灰色显示，不过这样可能导致待审批区越来越大。</p><h2 id="四、测试资产上线功能" tabindex="-1">四、测试资产上线功能 <a class="header-anchor" href="#四、测试资产上线功能" aria-label="Permalink to &quot;四、测试资产上线功能&quot;">​</a></h2><p>重新启动服务器，在admin的新资产待审批区选择刚才的四条资产，然后选择上线action并点击‘执行’按钮，稍等片刻，显示<code>成功批准 4 条新资产上线！</code>的绿色提示信息，同时新资产也从待审批区被删除了，如下图所示：</p><p><img src="`+i+'" alt="image"></p><p>然后，进入admin中的资产总表，可以看到有四条资产了。在其它相应的表内，也可以看到很多数据信息了。</p><p><img src="'+o+'" alt="image"></p><p><img src="'+c+'" alt="image"></p><p>往后，如果我们再次发送这四个服务器资产的信息，那就不是在待审批区了，而是已上线资产了。</p><p>最后，还可以看一下我们的日志记录：</p><p><img src="'+u+'" alt="image"></p><hr>',49),d=[q];function _(m,f,g,h,v,A){return a(),n("div",null,d)}const b=s(r,[["render",_]]);export{y as __pageData,b as default};
