import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const m=JSON.parse('{"title":"8.已上线资产更新","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB8.md","filePath":"python-demo/CMDB8.md"}'),e={name:"python-demo/CMDB8.md"},l=p(`<h1 id="_8-已上线资产更新" tabindex="-1">8.已上线资产更新 <a class="header-anchor" href="#_8-已上线资产更新" aria-label="Permalink to &quot;8.已上线资产更新&quot;">​</a></h1><hr><p>前面，我们已经实现了资产进入待审批区、更新待审批区的资产信息以及审批资产上线三个主要功能，还剩下一个最主要的实时更新已上线资产信息的功能。</p><p>在<code>assets/views.py</code>中的report视图，目前是把已上线资产的数据更新流程‘pass’了，现在将其替换成下面的语句：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>update_asset = asset_handler.UpdateAsset(request, asset_obj[0], data)</span></span></code></pre></div><p>report视图变成了下面的样子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>@csrf_exempt</span></span>
<span class="line"><span>def report(request):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    通过csrf_exempt装饰器，跳过Django的csrf安全机制，让post的数据能被接收，但这又会带来新的安全问题。</span></span>
<span class="line"><span>    可以在客户端，使用自定义的认证token，进行身份验证。这部分工作，请根据实际情况，自己进行。</span></span>
<span class="line"><span>    :param request:</span></span>
<span class="line"><span>    :return:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    if request.method == &quot;POST&quot;:</span></span>
<span class="line"><span>        asset_data = request.POST.get(&#39;asset_data&#39;)</span></span>
<span class="line"><span>        data = json.loads(asset_data)</span></span>
<span class="line"><span>        # 各种数据检查，请自行添加和完善！</span></span>
<span class="line"><span>        if not data:</span></span>
<span class="line"><span>            return HttpResponse(&quot;没有数据！&quot;)</span></span>
<span class="line"><span>        if not issubclass(dict, type(data)):</span></span>
<span class="line"><span>            return HttpResponse(&quot;数据必须为字典格式！&quot;)</span></span>
<span class="line"><span>        # 是否携带了关键的sn号</span></span>
<span class="line"><span>        sn = data.get(&#39;sn&#39;, None)</span></span>
<span class="line"><span>        if sn:</span></span>
<span class="line"><span>            # 进入审批流程</span></span>
<span class="line"><span>            # 首先判断是否在上线资产中存在该sn</span></span>
<span class="line"><span>            asset_obj = models.Asset.objects.filter(sn=sn)</span></span>
<span class="line"><span>            if asset_obj:</span></span>
<span class="line"><span>                # 进入已上线资产的数据更新流程</span></span>
<span class="line"><span>                update_asset = asset_handler.UpdateAsset(request, asset_obj[0], data)</span></span>
<span class="line"><span>                return HttpResponse(&quot;资产数据已经更新！&quot;)</span></span>
<span class="line"><span>            else:   # 如果已上线资产中没有，那么说明是未批准资产，进入新资产待审批区，更新或者创建资产。</span></span>
<span class="line"><span>                obj = asset_handler.NewAsset(request, data)</span></span>
<span class="line"><span>                response = obj.add_to_new_assets_zone()</span></span>
<span class="line"><span>                return HttpResponse(response)</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return HttpResponse(&quot;没有资产sn序列号，请检查数据！&quot;)</span></span>
<span class="line"><span>    return HttpResponse(&#39;200 ok&#39;)</span></span></code></pre></div><p>然后，进入<code>assets/asset_handler.py</code>模块，修改<code>log()</code>方法，并且增加<code>UpdateAsset</code>类：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def log(log_type, msg=None, asset=None, new_asset=None, request=None):</span></span>
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
<span class="line"><span>    elif log_type == &quot;update&quot;:</span></span>
<span class="line"><span>        event.name = &quot;%s &lt;%s&gt; ：  数据更新！&quot; % (asset.asset_type, asset.sn)</span></span>
<span class="line"><span>        event.asset = asset</span></span>
<span class="line"><span>        event.detail = &quot;更新成功！&quot;</span></span>
<span class="line"><span>    elif log_type == &quot;update_failed&quot;:</span></span>
<span class="line"><span>        event.name = &quot;%s &lt;%s&gt; ：  更新失败&quot; % (asset.asset_type, asset.sn)</span></span>
<span class="line"><span>        event.asset = asset</span></span>
<span class="line"><span>        event.detail = &quot;更新失败！\\n%s&quot; % msg</span></span>
<span class="line"><span>    # 更多日志类型.....</span></span>
<span class="line"><span>    event.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class UpdateAsset:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    自动更新已上线的资产。</span></span>
<span class="line"><span>    如果想让记录的日志更详细，可以逐条对比数据项，将更新过的项目记录到log信息中。</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __init__(self, request, asset, report_data):</span></span>
<span class="line"><span>        self.request = request</span></span>
<span class="line"><span>        self.asset = asset</span></span>
<span class="line"><span>        self.report_data = report_data            # 此处的数据是由客户端发送过来的整个数据字符串</span></span>
<span class="line"><span>        self.asset_update()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def asset_update(self):</span></span>
<span class="line"><span>        # 为以后的其它类型资产扩展留下接口</span></span>
<span class="line"><span>        func = getattr(self, &quot;_%s_update&quot; % self.report_data[&#39;asset_type&#39;])</span></span>
<span class="line"><span>        ret = func()</span></span>
<span class="line"><span>        return ret</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _server_update(self):</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            self._update_manufacturer()   # 更新厂商</span></span>
<span class="line"><span>            self._update_server()         # 更新服务器</span></span>
<span class="line"><span>            self._update_CPU()            # 更新CPU</span></span>
<span class="line"><span>            self._update_RAM()            # 更新内存</span></span>
<span class="line"><span>            self._update_disk()           # 更新硬盘</span></span>
<span class="line"><span>            self._update_nic()            # 更新网卡</span></span>
<span class="line"><span>            self.asset.save()</span></span>
<span class="line"><span>        except Exception as e:</span></span>
<span class="line"><span>            log(&#39;update_failed&#39;, msg=e, asset=self.asset, request=self.request)</span></span>
<span class="line"><span>            print(e)</span></span>
<span class="line"><span>            return False</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            # 添加日志</span></span>
<span class="line"><span>            log(&quot;update&quot;, asset=self.asset)</span></span>
<span class="line"><span>            print(&quot;资产数据被更新!&quot;)</span></span>
<span class="line"><span>            return True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_manufacturer(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新厂商</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        m = self.report_data.get(&#39;manufacturer&#39;)</span></span>
<span class="line"><span>        if m:</span></span>
<span class="line"><span>            manufacturer_obj, _ = models.Manufacturer.objects.get_or_create(name=m)</span></span>
<span class="line"><span>            self.asset.manufacturer = manufacturer_obj</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            self.asset.manufacturer = None</span></span>
<span class="line"><span>        self.asset.manufacturer.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_server(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新服务器</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        self.asset.server.model = self.report_data.get(&#39;model&#39;)</span></span>
<span class="line"><span>        self.asset.server.os_type = self.report_data.get(&#39;os_type&#39;)</span></span>
<span class="line"><span>        self.asset.server.os_distribution = self.report_data.get(&#39;os_distribution&#39;)</span></span>
<span class="line"><span>        self.asset.server.os_release = self.report_data.get(&#39;os_release&#39;)</span></span>
<span class="line"><span>        self.asset.server.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_CPU(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新CPU信息</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        self.asset.cpu.cpu_model = self.report_data.get(&#39;cpu_model&#39;)</span></span>
<span class="line"><span>        self.asset.cpu.cpu_count = self.report_data.get(&#39;cpu_count&#39;)</span></span>
<span class="line"><span>        self.asset.cpu.cpu_core_count = self.report_data.get(&#39;cpu_core_count&#39;)</span></span>
<span class="line"><span>        self.asset.cpu.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_RAM(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新内存信息。</span></span>
<span class="line"><span>        使用集合数据类型中差的概念，处理不同的情况。</span></span>
<span class="line"><span>        如果新数据有，但原数据没有，则新增；</span></span>
<span class="line"><span>        如果新数据没有，但原数据有，则删除原来多余的部分；</span></span>
<span class="line"><span>        如果新的和原数据都有，则更新。</span></span>
<span class="line"><span>        在原则上，下面的代码应该写成一个复用的函数，</span></span>
<span class="line"><span>        但是由于内存、硬盘、网卡在某些方面的差别，导致很难提取出重用的代码。</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        # 获取已有内存信息，并转成字典格式</span></span>
<span class="line"><span>        old_rams = models.RAM.objects.filter(asset=self.asset)</span></span>
<span class="line"><span>        old_rams_dict = dict()</span></span>
<span class="line"><span>        if old_rams:</span></span>
<span class="line"><span>            for ram in old_rams:</span></span>
<span class="line"><span>                old_rams_dict[ram.slot] = ram</span></span>
<span class="line"><span>        # 获取新数据中的内存信息，并转成字典格式</span></span>
<span class="line"><span>        new_rams_list = self.report_data[&#39;ram&#39;]</span></span>
<span class="line"><span>        new_rams_dict = dict()</span></span>
<span class="line"><span>        if new_rams_list:</span></span>
<span class="line"><span>            for item in new_rams_list:</span></span>
<span class="line"><span>                new_rams_dict[item[&#39;slot&#39;]] = item</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 利用set类型的差集功能，获得需要删除的内存数据对象</span></span>
<span class="line"><span>        need_deleted_keys = set(old_rams_dict.keys()) - set(new_rams_dict.keys())</span></span>
<span class="line"><span>        if need_deleted_keys:</span></span>
<span class="line"><span>            for key in need_deleted_keys:</span></span>
<span class="line"><span>                old_rams_dict[key].delete()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要新增或更新的</span></span>
<span class="line"><span>        if new_rams_dict:</span></span>
<span class="line"><span>            for key in new_rams_dict:</span></span>
<span class="line"><span>                defaults = {</span></span>
<span class="line"><span>                            &#39;sn&#39;: new_rams_dict[key].get(&#39;sn&#39;),</span></span>
<span class="line"><span>                            &#39;model&#39;: new_rams_dict[key].get(&#39;model&#39;),</span></span>
<span class="line"><span>                            &#39;manufacturer&#39;: new_rams_dict[key].get(&#39;manufacturer&#39;),</span></span>
<span class="line"><span>                            &#39;capacity&#39;: new_rams_dict[key].get(&#39;capacity&#39;, 0),</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                models.RAM.objects.update_or_create(asset=self.asset, slot=key, defaults=defaults)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_disk(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新硬盘信息。类似更新内存。</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        old_disks = models.Disk.objects.filter(asset=self.asset)</span></span>
<span class="line"><span>        old_disks_dict = dict()</span></span>
<span class="line"><span>        if old_disks:</span></span>
<span class="line"><span>            for disk in old_disks:</span></span>
<span class="line"><span>                old_disks_dict[disk.sn] = disk</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        new_disks_list = self.report_data[&#39;physical_disk_driver&#39;]</span></span>
<span class="line"><span>        new_disks_dict = dict()</span></span>
<span class="line"><span>        if new_disks_list:</span></span>
<span class="line"><span>            for item in new_disks_list:</span></span>
<span class="line"><span>                new_disks_dict[item[&#39;sn&#39;]] = item</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要删除的</span></span>
<span class="line"><span>        need_deleted_keys = set(old_disks_dict.keys()) - set(new_disks_dict.keys())</span></span>
<span class="line"><span>        if need_deleted_keys:</span></span>
<span class="line"><span>            for key in need_deleted_keys:</span></span>
<span class="line"><span>                old_disks_dict[key].delete()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要新增或更新的</span></span>
<span class="line"><span>        if new_disks_dict:</span></span>
<span class="line"><span>            for key in new_disks_dict:</span></span>
<span class="line"><span>                interface_type = new_disks_dict[key].get(&#39;interface_type&#39;, &#39;unknown&#39;)</span></span>
<span class="line"><span>                if interface_type not in [&#39;SATA&#39;, &#39;SAS&#39;, &#39;SCSI&#39;, &#39;SSD&#39;, &#39;unknown&#39;]:</span></span>
<span class="line"><span>                    interface_type = &#39;unknown&#39;</span></span>
<span class="line"><span>                defaults = {</span></span>
<span class="line"><span>                    &#39;slot&#39;: new_disks_dict[key].get(&#39;slot&#39;),</span></span>
<span class="line"><span>                    &#39;model&#39;: new_disks_dict[key].get(&#39;model&#39;),</span></span>
<span class="line"><span>                    &#39;manufacturer&#39;: new_disks_dict[key].get(&#39;manufacturer&#39;),</span></span>
<span class="line"><span>                    &#39;capacity&#39;: new_disks_dict[key].get(&#39;capacity&#39;, 0),</span></span>
<span class="line"><span>                    &#39;interface_type&#39;: interface_type,</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                models.Disk.objects.update_or_create(asset=self.asset, sn=key, defaults=defaults)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_nic(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新网卡信息。类似更新内存。</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        old_nics = models.NIC.objects.filter(asset=self.asset)</span></span>
<span class="line"><span>        old_nics_dict = dict()</span></span>
<span class="line"><span>        if old_nics:</span></span>
<span class="line"><span>            for nic in old_nics:</span></span>
<span class="line"><span>                old_nics_dict[nic.model+nic.mac] = nic</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        new_nics_list = self.report_data[&#39;nic&#39;]</span></span>
<span class="line"><span>        new_nics_dict = dict()</span></span>
<span class="line"><span>        if new_nics_list:</span></span>
<span class="line"><span>            for item in new_nics_list:</span></span>
<span class="line"><span>                new_nics_dict[item[&#39;model&#39;]+item[&#39;mac&#39;]] = item</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要删除的</span></span>
<span class="line"><span>        need_deleted_keys = set(old_nics_dict.keys()) - set(new_nics_dict.keys())</span></span>
<span class="line"><span>        if need_deleted_keys:</span></span>
<span class="line"><span>            for key in need_deleted_keys:</span></span>
<span class="line"><span>                old_nics_dict[key].delete()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要新增或更新的</span></span>
<span class="line"><span>        if new_nics_dict:</span></span>
<span class="line"><span>            for key in new_nics_dict:</span></span>
<span class="line"><span>                if new_nics_dict[key].get(&#39;net_mask&#39;) and len(new_nics_dict[key].get(&#39;net_mask&#39;)) &gt; 0:</span></span>
<span class="line"><span>                    net_mask = new_nics_dict[key].get(&#39;net_mask&#39;)[0]</span></span>
<span class="line"><span>                else:</span></span>
<span class="line"><span>                    net_mask = &quot;&quot;</span></span>
<span class="line"><span>                defaults = {</span></span>
<span class="line"><span>                    &#39;name&#39;: new_nics_dict[key].get(&#39;name&#39;),</span></span>
<span class="line"><span>                    &#39;ip_address&#39;: new_nics_dict[key].get(&#39;ip_address&#39;),</span></span>
<span class="line"><span>                    &#39;net_mask&#39;: net_mask,</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                models.NIC.objects.update_or_create(asset=self.asset, model=new_nics_dict[key][&#39;model&#39;],</span></span>
<span class="line"><span>                                                    mac=new_nics_dict[key][&#39;mac&#39;], defaults=defaults)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        print(&#39;更新成功！&#39;)</span></span></code></pre></div><p>对于log()函数，只是增加了两种数据更新的日志类型，分别记录不同的日志情况，没什么特别的。</p><p>对于UpdateAsset类，类似前面的ApproveAsset类：</p><ul><li>首先初始化动作，自动执行asset_update()方法；</li><li>依然是通过反射，决定要调用的更新方法；</li><li>教程实现了主要的服务器类型资产的更新，对于网络设备、安全设备等请自行完善，基本类似；</li><li><code>_server_update(self)</code>方法中，分别更新厂商、服务器本身、CPU、内存、网卡、硬盘等信息。然后保存数据，这些事务应该是原子性的，所以要抓取异常；</li><li>不管成功还是失败，都要记录日志。</li></ul><p>最主要的，对于<code>_update_CPU(self)</code>等方法，以内存为例，由于内存可能有多条，新的数据中可能出现三种情况，拔除、新增、信息变更，因此要分别对待和处理。</p><ul><li>首先，获取已有内存信息，并转成字典格式；</li><li>其次，获取新数据中的内存信息，并转成字典格式；</li><li>利用set类型的差集功能，获得需要删除的内存数据对象</li><li>对要删除的对象，执行delete()方法；</li><li>对于需要新增或更新的内存对象，首先生成defaults数据字典；</li><li>然后，使用<code>update_or_create(asset=self.asset, slot=key, defaults=defaults)</code>方法，一次性完成新增或者更新数据的操作，不用写两个方法的代码；</li><li>硬盘和网卡的操作类同内存的操作。</li></ul><p>数据更新完毕后，需要保存asset对象，也就是<code>self.asset.save()</code>，否则前面的工作无法关联保存下来。</p><p><strong>最终的<code>asset_handler.py</code>如下</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import json</span></span>
<span class="line"><span>from assets import models</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class NewAsset(object):</span></span>
<span class="line"><span>    def __init__(self, request, data):</span></span>
<span class="line"><span>        self.request = request</span></span>
<span class="line"><span>        self.data = data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def add_to_new_assets_zone(self):</span></span>
<span class="line"><span>        defaults = {</span></span>
<span class="line"><span>            &#39;data&#39;: json.dumps(self.data),</span></span>
<span class="line"><span>            &#39;asset_type&#39;: self.data.get(&#39;asset_type&#39;),</span></span>
<span class="line"><span>            &#39;manufacturer&#39;: self.data.get(&#39;manufacturer&#39;),</span></span>
<span class="line"><span>            &#39;model&#39;: self.data.get(&#39;model&#39;),</span></span>
<span class="line"><span>            &#39;ram_size&#39;: self.data.get(&#39;ram_size&#39;),</span></span>
<span class="line"><span>            &#39;cpu_model&#39;: self.data.get(&#39;cpu_model&#39;),</span></span>
<span class="line"><span>            &#39;cpu_count&#39;: self.data.get(&#39;cpu_count&#39;),</span></span>
<span class="line"><span>            &#39;cpu_core_count&#39;: self.data.get(&#39;cpu_core_count&#39;),</span></span>
<span class="line"><span>            &#39;os_distribution&#39;: self.data.get(&#39;os_distribution&#39;),</span></span>
<span class="line"><span>            &#39;os_release&#39;: self.data.get(&#39;os_release&#39;),</span></span>
<span class="line"><span>            &#39;os_type&#39;: self.data.get(&#39;os_type&#39;),</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        models.NewAssetApprovalZone.objects.update_or_create(sn=self.data[&#39;sn&#39;], defaults=defaults)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return &#39;资产已经加入或更新待审批区！&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def log(log_type, msg=None, asset=None, new_asset=None, request=None):</span></span>
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
<span class="line"><span>    elif log_type == &quot;update&quot;:</span></span>
<span class="line"><span>        event.name = &quot;%s &lt;%s&gt; ：  数据更新！&quot; % (asset.asset_type, asset.sn)</span></span>
<span class="line"><span>        event.asset = asset</span></span>
<span class="line"><span>        event.detail = &quot;更新成功！&quot;</span></span>
<span class="line"><span>    elif log_type == &quot;update_failed&quot;:</span></span>
<span class="line"><span>        event.name = &quot;%s &lt;%s&gt; ：  更新失败&quot; % (asset.asset_type, asset.sn)</span></span>
<span class="line"><span>        event.asset = asset</span></span>
<span class="line"><span>        event.detail = &quot;更新失败！\\n%s&quot; % msg</span></span>
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
<span class="line"><span>        self.new_asset.delete()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class UpdateAsset:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    自动更新已上线的资产。</span></span>
<span class="line"><span>    如果想让记录的日志更详细，可以逐条对比数据项，将更新过的项目记录到log信息中。</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __init__(self, request, asset, report_data):</span></span>
<span class="line"><span>        self.request = request</span></span>
<span class="line"><span>        self.asset = asset</span></span>
<span class="line"><span>        self.report_data = report_data            # 此处的数据是由客户端发送过来的整个数据字符串</span></span>
<span class="line"><span>        self.asset_update()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def asset_update(self):</span></span>
<span class="line"><span>        # 为以后的其它类型资产扩展留下接口</span></span>
<span class="line"><span>        func = getattr(self, &quot;_%s_update&quot; % self.report_data[&#39;asset_type&#39;])</span></span>
<span class="line"><span>        ret = func()</span></span>
<span class="line"><span>        return ret</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _server_update(self):</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            self._update_manufacturer()   # 更新厂商</span></span>
<span class="line"><span>            self._update_server()         # 更新服务器</span></span>
<span class="line"><span>            self._update_CPU()            # 更新CPU</span></span>
<span class="line"><span>            self._update_RAM()            # 更新内存</span></span>
<span class="line"><span>            self._update_disk()           # 更新硬盘</span></span>
<span class="line"><span>            self._update_nic()            # 更新网卡</span></span>
<span class="line"><span>            self.asset.save()</span></span>
<span class="line"><span>        except Exception as e:</span></span>
<span class="line"><span>            log(&#39;update_failed&#39;, msg=e, asset=self.asset, request=self.request)</span></span>
<span class="line"><span>            print(e)</span></span>
<span class="line"><span>            return False</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            # 添加日志</span></span>
<span class="line"><span>            log(&quot;update&quot;, asset=self.asset)</span></span>
<span class="line"><span>            print(&quot;资产数据被更新!&quot;)</span></span>
<span class="line"><span>            return True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_manufacturer(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新厂商</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        m = self.report_data.get(&#39;manufacturer&#39;)</span></span>
<span class="line"><span>        if m:</span></span>
<span class="line"><span>            manufacturer_obj, _ = models.Manufacturer.objects.get_or_create(name=m)</span></span>
<span class="line"><span>            self.asset.manufacturer = manufacturer_obj</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            self.asset.manufacturer = None</span></span>
<span class="line"><span>        self.asset.manufacturer.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_server(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新服务器</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        self.asset.server.model = self.report_data.get(&#39;model&#39;)</span></span>
<span class="line"><span>        self.asset.server.os_type = self.report_data.get(&#39;os_type&#39;)</span></span>
<span class="line"><span>        self.asset.server.os_distribution = self.report_data.get(&#39;os_distribution&#39;)</span></span>
<span class="line"><span>        self.asset.server.os_release = self.report_data.get(&#39;os_release&#39;)</span></span>
<span class="line"><span>        self.asset.server.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_CPU(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新CPU信息</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        self.asset.cpu.cpu_model = self.report_data.get(&#39;cpu_model&#39;)</span></span>
<span class="line"><span>        self.asset.cpu.cpu_count = self.report_data.get(&#39;cpu_count&#39;)</span></span>
<span class="line"><span>        self.asset.cpu.cpu_core_count = self.report_data.get(&#39;cpu_core_count&#39;)</span></span>
<span class="line"><span>        self.asset.cpu.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_RAM(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新内存信息。</span></span>
<span class="line"><span>        使用集合数据类型中差的概念，处理不同的情况。</span></span>
<span class="line"><span>        如果新数据有，但原数据没有，则新增；</span></span>
<span class="line"><span>        如果新数据没有，但原数据有，则删除原来多余的部分；</span></span>
<span class="line"><span>        如果新的和原数据都有，则更新。</span></span>
<span class="line"><span>        在原则上，下面的代码应该写成一个复用的函数，</span></span>
<span class="line"><span>        但是由于内存、硬盘、网卡在某些方面的差别，导致很难提取出重用的代码。</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        # 获取已有内存信息，并转成字典格式</span></span>
<span class="line"><span>        old_rams = models.RAM.objects.filter(asset=self.asset)</span></span>
<span class="line"><span>        old_rams_dict = dict()</span></span>
<span class="line"><span>        if old_rams:</span></span>
<span class="line"><span>            for ram in old_rams:</span></span>
<span class="line"><span>                old_rams_dict[ram.slot] = ram</span></span>
<span class="line"><span>        # 获取新数据中的内存信息，并转成字典格式</span></span>
<span class="line"><span>        new_rams_list = self.report_data[&#39;ram&#39;]</span></span>
<span class="line"><span>        new_rams_dict = dict()</span></span>
<span class="line"><span>        if new_rams_list:</span></span>
<span class="line"><span>            for item in new_rams_list:</span></span>
<span class="line"><span>                new_rams_dict[item[&#39;slot&#39;]] = item</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 利用set类型的差集功能，获得需要删除的内存数据对象</span></span>
<span class="line"><span>        need_deleted_keys = set(old_rams_dict.keys()) - set(new_rams_dict.keys())</span></span>
<span class="line"><span>        if need_deleted_keys:</span></span>
<span class="line"><span>            for key in need_deleted_keys:</span></span>
<span class="line"><span>                old_rams_dict[key].delete()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要新增或更新的</span></span>
<span class="line"><span>        if new_rams_dict:</span></span>
<span class="line"><span>            for key in new_rams_dict:</span></span>
<span class="line"><span>                defaults = {</span></span>
<span class="line"><span>                            &#39;sn&#39;: new_rams_dict[key].get(&#39;sn&#39;),</span></span>
<span class="line"><span>                            &#39;model&#39;: new_rams_dict[key].get(&#39;model&#39;),</span></span>
<span class="line"><span>                            &#39;manufacturer&#39;: new_rams_dict[key].get(&#39;manufacturer&#39;),</span></span>
<span class="line"><span>                            &#39;capacity&#39;: new_rams_dict[key].get(&#39;capacity&#39;, 0),</span></span>
<span class="line"><span>                            }</span></span>
<span class="line"><span>                models.RAM.objects.update_or_create(asset=self.asset, slot=key, defaults=defaults)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_disk(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新硬盘信息。类似更新内存。</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        old_disks = models.Disk.objects.filter(asset=self.asset)</span></span>
<span class="line"><span>        old_disks_dict = dict()</span></span>
<span class="line"><span>        if old_disks:</span></span>
<span class="line"><span>            for disk in old_disks:</span></span>
<span class="line"><span>                old_disks_dict[disk.sn] = disk</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        new_disks_list = self.report_data[&#39;physical_disk_driver&#39;]</span></span>
<span class="line"><span>        new_disks_dict = dict()</span></span>
<span class="line"><span>        if new_disks_list:</span></span>
<span class="line"><span>            for item in new_disks_list:</span></span>
<span class="line"><span>                new_disks_dict[item[&#39;sn&#39;]] = item</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要删除的</span></span>
<span class="line"><span>        need_deleted_keys = set(old_disks_dict.keys()) - set(new_disks_dict.keys())</span></span>
<span class="line"><span>        if need_deleted_keys:</span></span>
<span class="line"><span>            for key in need_deleted_keys:</span></span>
<span class="line"><span>                old_disks_dict[key].delete()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要新增或更新的</span></span>
<span class="line"><span>        if new_disks_dict:</span></span>
<span class="line"><span>            for key in new_disks_dict:</span></span>
<span class="line"><span>                interface_type = new_disks_dict[key].get(&#39;interface_type&#39;, &#39;unknown&#39;)</span></span>
<span class="line"><span>                if interface_type not in [&#39;SATA&#39;, &#39;SAS&#39;, &#39;SCSI&#39;, &#39;SSD&#39;, &#39;unknown&#39;]:</span></span>
<span class="line"><span>                    interface_type = &#39;unknown&#39;</span></span>
<span class="line"><span>                defaults = {</span></span>
<span class="line"><span>                    &#39;slot&#39;: new_disks_dict[key].get(&#39;slot&#39;),</span></span>
<span class="line"><span>                    &#39;model&#39;: new_disks_dict[key].get(&#39;model&#39;),</span></span>
<span class="line"><span>                    &#39;manufacturer&#39;: new_disks_dict[key].get(&#39;manufacturer&#39;),</span></span>
<span class="line"><span>                    &#39;capacity&#39;: new_disks_dict[key].get(&#39;capacity&#39;, 0),</span></span>
<span class="line"><span>                    &#39;interface_type&#39;: interface_type,</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                models.Disk.objects.update_or_create(asset=self.asset, sn=key, defaults=defaults)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _update_nic(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        更新网卡信息。类似更新内存。</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        old_nics = models.NIC.objects.filter(asset=self.asset)</span></span>
<span class="line"><span>        old_nics_dict = dict()</span></span>
<span class="line"><span>        if old_nics:</span></span>
<span class="line"><span>            for nic in old_nics:</span></span>
<span class="line"><span>                old_nics_dict[nic.model+nic.mac] = nic</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        new_nics_list = self.report_data[&#39;nic&#39;]</span></span>
<span class="line"><span>        new_nics_dict = dict()</span></span>
<span class="line"><span>        if new_nics_list:</span></span>
<span class="line"><span>            for item in new_nics_list:</span></span>
<span class="line"><span>                new_nics_dict[item[&#39;model&#39;]+item[&#39;mac&#39;]] = item</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要删除的</span></span>
<span class="line"><span>        need_deleted_keys = set(old_nics_dict.keys()) - set(new_nics_dict.keys())</span></span>
<span class="line"><span>        if need_deleted_keys:</span></span>
<span class="line"><span>            for key in need_deleted_keys:</span></span>
<span class="line"><span>                old_nics_dict[key].delete()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 需要新增或更新的</span></span>
<span class="line"><span>        if new_nics_dict:</span></span>
<span class="line"><span>            for key in new_nics_dict:</span></span>
<span class="line"><span>                if new_nics_dict[key].get(&#39;net_mask&#39;) and len(new_nics_dict[key].get(&#39;net_mask&#39;)) &gt; 0:</span></span>
<span class="line"><span>                    net_mask = new_nics_dict[key].get(&#39;net_mask&#39;)[0]</span></span>
<span class="line"><span>                else:</span></span>
<span class="line"><span>                    net_mask = &quot;&quot;</span></span>
<span class="line"><span>                defaults = {</span></span>
<span class="line"><span>                    &#39;name&#39;: new_nics_dict[key].get(&#39;name&#39;),</span></span>
<span class="line"><span>                    &#39;ip_address&#39;: new_nics_dict[key].get(&#39;ip_address&#39;),</span></span>
<span class="line"><span>                    &#39;net_mask&#39;: net_mask,</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                models.NIC.objects.update_or_create(asset=self.asset, model=new_nics_dict[key][&#39;model&#39;],</span></span>
<span class="line"><span>                                                    mac=new_nics_dict[key][&#39;mac&#39;], defaults=defaults)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        print(&#39;更新成功！&#39;)</span></span></code></pre></div><p>现在，可以测试一下资产数据的更新了。重启CMDB，然后转到Client/report_assetss.py脚本，修改其中的一些数据，删除或增加一些内存、硬盘、网卡的条目。<strong>注意数据格式必须正确，sn必须不能变。</strong></p><p>再次运行脚本，报告数据。进入admin中查看相关内容，可以看到数据已经得到更新了。</p><p>至此，CMDB自动资产管理系统的后台部分已经完成了。</p>`,20),t=[l];function i(c,o,_,d,u,r){return a(),n("div",null,t)}const q=s(e,[["render",i]]);export{m as __pageData,q as default};
