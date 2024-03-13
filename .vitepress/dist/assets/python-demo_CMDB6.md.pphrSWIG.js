import{_ as s,c as a,o as n,a5 as p}from"./chunks/framework.BthLuVtL.js";const e="/assets/122-1.BQ_MRBsl.png",t="/assets/122-2.CUsXA2NF.png",l="/assets/122-3.H4UieIyM.png",i="/assets/122-4.DxifEri9.png",o="/assets/122-5.D6dwwVex.png",v=JSON.parse('{"title":"6.新资产待审批区","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB6.md","filePath":"python-demo/CMDB6.md"}'),c={name:"python-demo/CMDB6.md"},r=p(`<h1 id="_6-新资产待审批区" tabindex="-1">6.新资产待审批区 <a class="header-anchor" href="#_6-新资产待审批区" aria-label="Permalink to &quot;6.新资产待审批区&quot;">​</a></h1><hr><h2 id="一、启用admin" tabindex="-1">一、启用admin <a class="header-anchor" href="#一、启用admin" aria-label="Permalink to &quot;一、启用admin&quot;">​</a></h2><p>前面，我们已经完成了数据收集客户端的编写和测试，下面我们就可以在admin中展示和管理资产数据了。</p><p>首先，通过<code>python manage.py createsuperuser</code>创建一个管理员账户。</p><p>然后，进入<code>/assets/admin.py</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.contrib import admin</span></span>
<span class="line"><span># Register your models here.</span></span>
<span class="line"><span>from assets import models</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class NewAssetAdmin(admin.ModelAdmin):</span></span>
<span class="line"><span>    list_display = [&#39;asset_type&#39;, &#39;sn&#39;, &#39;model&#39;, &#39;manufacturer&#39;, &#39;c_time&#39;, &#39;m_time&#39;]</span></span>
<span class="line"><span>    list_filter = [&#39;asset_type&#39;, &#39;manufacturer&#39;, &#39;c_time&#39;]</span></span>
<span class="line"><span>    search_fields = (&#39;sn&#39;,)</span></span>
<span class="line"><span></span></span>
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
<span class="line"><span>admin.site.register(models.NewAssetApprovalZone, NewAssetAdmin)</span></span></code></pre></div><p>利用刚才创建的管理员用户，登录admin站点：</p><p><img src="`+e+`" alt="image"></p><p>这里略微对admin界面做了些简单地配置，但目前还没有数据。</p><h2 id="二、创建新资产" tabindex="-1">二、创建新资产 <a class="header-anchor" href="#二、创建新资产" aria-label="Permalink to &quot;二、创建新资产&quot;">​</a></h2><p>前面我们只是在Pycharm中获取并打印数据，并没有将数据保存到数据库里。下面我们来实现这一功能。</p><p>修改/assets/views.py文件，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.shortcuts import render</span></span>
<span class="line"><span>from django.shortcuts import HttpResponse</span></span>
<span class="line"><span>from django.views.decorators.csrf import csrf_exempt</span></span>
<span class="line"><span>import json</span></span>
<span class="line"><span>from assets import models</span></span>
<span class="line"><span>from assets import asset_handler</span></span>
<span class="line"><span># Create your views here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@csrf_exempt</span></span>
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
<span class="line"><span>                pass</span></span>
<span class="line"><span>                return HttpResponse(&quot;资产数据已经更新！&quot;)</span></span>
<span class="line"><span>            else:   # 如果已上线资产中没有，那么说明是未批准资产，进入新资产待审批区，更新或者创建资产。</span></span>
<span class="line"><span>                obj = asset_handler.NewAsset(request, data)</span></span>
<span class="line"><span>                response = obj.add_to_new_assets_zone()</span></span>
<span class="line"><span>                return HttpResponse(response)</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return HttpResponse(&quot;没有资产sn序列号，请检查数据！&quot;)</span></span>
<span class="line"><span>    return HttpResponse(&#39;200 ok&#39;)</span></span></code></pre></div><p>report视图的逻辑是这样的：</p><ul><li><strong>sn是标识一个资产的唯一字段，必须携带，不能重复！</strong></li><li>从POST中获取发送过来的数据；</li><li>使用json转换数据类型；</li><li>进行各种数据检查（比如身份验证等等，请自行完善）；</li><li>判断数据是否为空，空则返回错误信息，结束视图；</li><li>判断data的类型是否字典类型，否则返回错误信息；</li><li>之所以要对data的类型进行判断是因为后面要大量的使用字典的get方法和中括号操作；</li><li>如果没有携带sn号，返回错误信息；</li></ul><p>当前面都没问题时，进入下面的流程：</p><ul><li>首先，利用sn值尝试在已上线的资产进行查找，如果有，则进入已上线资产的更新流程，具体实现，这里暂且跳过;</li><li>如果没有，说明这是个新资产，需要添加到新资产区；</li><li>这里又分两种情况，一种是彻底的新资产，那没得说，需要新增；另一种是新资产区已经有了，但是审批员还没来得及审批，资产数据的后续报告就已经到达了，那么需要更新数据。</li><li>创建一个<code>asset_handler.NewAsset()</code>对象，然后调用它的<code>obj.add_to_new_assets_zone()</code>方法，进行数据保存，并接收返回结果；</li><li>asset_handler是下面我们要新建的资产处理模块，NewAsset是其中的一个类。</li></ul><p><img src="`+t+`" alt="image"></p><p>为了不让<code>views.py</code>文件过于庞大，通常会建立新的py文件，专门处理一些核心业务。</p><p>在assets下新建<code>asset_handler.py</code>文件，并写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import json</span></span>
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
<span class="line"><span>        return &#39;资产已经加入或更新待审批区！&#39;</span></span></code></pre></div><p>NewAsset类接收两个参数，request和data，分别封装了请求和资产数据，它的唯一方法<code>obj.add_to_new_assets_zone()</code>中，首先构造了一个defaults字典，分别将资产数据包的各种数据打包进去，然后利用Django中特别好用的<code>update_or_create()</code>方法，进行数据保存！</p><p><code>update_or_create()</code>方法的机制：如果数据库内没有该数据，那么新增，如果有，则更新，这就大大减少了我们的代码量，不用写两个方法。该方法的参数必须为一些用于查询的指定字段（这里是sn），以及需要新增或者更新的defaults字典。而其返回值，则是一个查询对象和是否新建对象布尔值的二元元组。</p><h2 id="三、测试数据" tabindex="-1">三、测试数据 <a class="header-anchor" href="#三、测试数据" aria-label="Permalink to &quot;三、测试数据&quot;">​</a></h2><p>重启CMDB，在Client中使用<code>python main.py report_data</code>，发送一个资产数据给CMDB服务器，结果如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(venv) D:\\work\\2019\\for_test\\CMDB\\Client\\bin&gt;python main.py report_data</span></span>
<span class="line"><span>正在将数据发送至： [http://192.168.0.100:8000/assets/report/]  ......</span></span>
<span class="line"><span>?[31;1m发送完毕！?[0m</span></span>
<span class="line"><span>返回结果：资产已经加入或更新待审批区！</span></span>
<span class="line"><span>日志记录成功！</span></span></code></pre></div><p>再进入admin后台，查看新资产待审批区，可以看到资产已经成功进入待审批区：</p><p><img src="`+l+'" alt="image"></p><p><img src="'+i+'" alt="image"></p><p>这里我们显示了资产的汇报和更新日期，过几分钟后，重新汇报该资产数据，然后刷新admin中的页面，可以看到，待审批区的资产数据也一并被更新了。</p><p><img src="'+o+'" alt="image"></p><hr>',33),d=[r];function m(u,_,g,h,f,b){return n(),a("div",null,d)}const q=s(c,[["render",m]]);export{v as __pageData,q as default};
