import{_ as s,c as n,o as a,a5 as e}from"./chunks/framework.BthLuVtL.js";const p="/assets/118-1.njBMo4gC.png",l="/assets/118-2.BarZ3kQM.png",b=JSON.parse('{"title":"2.模型设计","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB2.md","filePath":"python-demo/CMDB2.md"}'),i={name:"python-demo/CMDB2.md"},o=e('<h1 id="_2-模型设计" tabindex="-1">2.模型设计 <a class="header-anchor" href="#_2-模型设计" aria-label="Permalink to &quot;2.模型设计&quot;">​</a></h1><hr><h2 id="一、创建项目" tabindex="-1">一、创建项目 <a class="header-anchor" href="#一、创建项目" aria-label="Permalink to &quot;一、创建项目&quot;">​</a></h2><p>让我们新开一个副本....咳咳，新建一个项目。</p><p>首先，通过Pycharm直接创建CMDB项目，建立虚拟环境<code>env</code>，安装最新的Django2.2，生成一个app，名字就叫做assets，最后配置好settings中的语言和时区。这些基本过程以后就不再赘述了，不熟悉的请参考教程的前面部分。</p><p>创建成功后，初始状态如下图所示：</p><p><img src="'+p+'" alt="image"></p><h2 id="二、模型设计" tabindex="-1">二、模型设计 <a class="header-anchor" href="#二、模型设计" aria-label="Permalink to &quot;二、模型设计&quot;">​</a></h2><p><strong>说明：本项目采用SQLite数据库</strong></p><p>模型设计是整个项目的重中之重，其它所有的内容其实都是围绕它展开的。</p><p>而我们设计数据模型的原则和参考依据是前一节分析的项目需求和数据分类表。</p><p>我们的模型架构图如下所示：</p><p><img src="'+l+`" alt="image"></p><h3 id="_1-资产共有数据模型" tabindex="-1">1.资产共有数据模型 <a class="header-anchor" href="#_1-资产共有数据模型" aria-label="Permalink to &quot;1.资产共有数据模型&quot;">​</a></h3><p>打开assets/models.py文件，首先我们要设计一张资产共有数据表：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.db import models</span></span>
<span class="line"><span>from django.contrib.auth.models import User</span></span>
<span class="line"><span># Create your models here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Asset(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;    所有资产的共有数据表    &quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset_type_choice = (</span></span>
<span class="line"><span>        (&#39;server&#39;, &#39;服务器&#39;),</span></span>
<span class="line"><span>        (&#39;networkdevice&#39;, &#39;网络设备&#39;),</span></span>
<span class="line"><span>        (&#39;storagedevice&#39;, &#39;存储设备&#39;),</span></span>
<span class="line"><span>        (&#39;securitydevice&#39;, &#39;安全设备&#39;),</span></span>
<span class="line"><span>        (&#39;software&#39;, &#39;软件资产&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset_status = (</span></span>
<span class="line"><span>        (0, &#39;在线&#39;),</span></span>
<span class="line"><span>        (1, &#39;下线&#39;),</span></span>
<span class="line"><span>        (2, &#39;未知&#39;),</span></span>
<span class="line"><span>        (3, &#39;故障&#39;),</span></span>
<span class="line"><span>        (4, &#39;备用&#39;),</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset_type = models.CharField(choices=asset_type_choice, max_length=64, default=&#39;server&#39;, verbose_name=&quot;资产类型&quot;)</span></span>
<span class="line"><span>    name = models.CharField(max_length=64, unique=True, verbose_name=&quot;资产名称&quot;)     # 不可重复</span></span>
<span class="line"><span>    sn = models.CharField(max_length=128, unique=True, verbose_name=&quot;资产序列号&quot;)  # 不可重复</span></span>
<span class="line"><span>    business_unit = models.ForeignKey(&#39;BusinessUnit&#39;, null=True, blank=True, verbose_name=&#39;所属业务线&#39;,</span></span>
<span class="line"><span>                                      on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    status = models.SmallIntegerField(choices=asset_status, default=0, verbose_name=&#39;设备状态&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    manufacturer = models.ForeignKey(&#39;Manufacturer&#39;, null=True, blank=True, verbose_name=&#39;制造商&#39;,</span></span>
<span class="line"><span>                                     on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    manage_ip = models.GenericIPAddressField(null=True, blank=True, verbose_name=&#39;管理IP&#39;)</span></span>
<span class="line"><span>    tags = models.ManyToManyField(&#39;Tag&#39;, blank=True, verbose_name=&#39;标签&#39;)</span></span>
<span class="line"><span>    admin = models.ForeignKey(User, null=True, blank=True, verbose_name=&#39;资产管理员&#39;, related_name=&#39;admin&#39;,</span></span>
<span class="line"><span>                              on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    idc = models.ForeignKey(&#39;IDC&#39;, null=True, blank=True, verbose_name=&#39;所在机房&#39;, on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    contract = models.ForeignKey(&#39;Contract&#39;, null=True, blank=True, verbose_name=&#39;合同&#39;, on_delete=models.SET_NULL)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    purchase_day = models.DateField(null=True, blank=True, verbose_name=&quot;购买日期&quot;)</span></span>
<span class="line"><span>    expire_day = models.DateField(null=True, blank=True, verbose_name=&quot;过保日期&quot;)</span></span>
<span class="line"><span>    price = models.FloatField(null=True, blank=True, verbose_name=&quot;价格&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    approved_by = models.ForeignKey(User, null=True, blank=True, verbose_name=&#39;批准人&#39;, related_name=&#39;approved_by&#39;,</span></span>
<span class="line"><span>                                    on_delete=models.SET_NULL)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    memo = models.TextField(null=True, blank=True, verbose_name=&#39;备注&#39;)</span></span>
<span class="line"><span>    c_time = models.DateTimeField(auto_now_add=True, verbose_name=&#39;批准日期&#39;)</span></span>
<span class="line"><span>    m_time = models.DateTimeField(auto_now=True, verbose_name=&#39;更新日期&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;&lt;%s&gt;  %s&#39; % (self.get_asset_type_display(), self.name)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;资产总表&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;资产总表&quot;</span></span>
<span class="line"><span>        ordering = [&#39;-c_time&#39;]</span></span></code></pre></div><p>说明：</p><ul><li>导入django.contrib.auto.models内置的User表，作为我们CMDB项目的用户表，用于保存管理员和批准人员的信息；</li><li>sn这个数据字段是所有资产都必须有，并且唯一不可重复的！通常来自自动收集的数据中；</li><li>name和sn一样，也是唯一的；</li><li>asset_type_choice和asset_status分别设计为两个选择类型</li><li>adamin和approved_by是分别是当前资产的管理员和将该资产上线的审批员，为了区分他们，设置了related_name；</li><li>Asset表中的很多字段内容都无法自动获取，需要我们手动输入，比如合同、备注。</li><li>最关键的是其中的一些外键字段，设置为<code>on_delete=models.SET_NULL</code>，这样的话，当关联的对象被删除的时候，不会影响到资产数据表。</li></ul><h3 id="_2-服务器模型" tabindex="-1">2.服务器模型 <a class="header-anchor" href="#_2-服务器模型" aria-label="Permalink to &quot;2.服务器模型&quot;">​</a></h3><p>服务器作为资产的一种，而且是最主要的管理对象，包含了一些重要的字段，其模型结构如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class Server(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;服务器设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;PC服务器&#39;),</span></span>
<span class="line"><span>        (1, &#39;刀片机&#39;),</span></span>
<span class="line"><span>        (2, &#39;小型机&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    created_by_choice = (</span></span>
<span class="line"><span>        (&#39;auto&#39;, &#39;自动添加&#39;),</span></span>
<span class="line"><span>        (&#39;manual&#39;, &#39;手工录入&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)  # 非常关键的一对一关联！asset被删除的时候一并删除server</span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;服务器类型&quot;)</span></span>
<span class="line"><span>    created_by = models.CharField(choices=created_by_choice, max_length=32, default=&#39;auto&#39;, verbose_name=&quot;添加方式&quot;)</span></span>
<span class="line"><span>    hosted_on = models.ForeignKey(&#39;self&#39;, related_name=&#39;hosted_on_server&#39;,</span></span>
<span class="line"><span>                                  blank=True, null=True, verbose_name=&quot;宿主机&quot;, on_delete=models.CASCADE)  # 虚拟机专用字段</span></span>
<span class="line"><span>    model = models.CharField(max_length=128, null=True, blank=True, verbose_name=&#39;服务器型号&#39;)</span></span>
<span class="line"><span>    raid_type = models.CharField(max_length=512, blank=True, null=True, verbose_name=&#39;Raid类型&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    os_type = models.CharField(&#39;操作系统类型&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    os_distribution = models.CharField(&#39;发行商&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    os_release = models.CharField(&#39;操作系统版本&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s--%s--%s &lt;sn:%s&gt;&#39; % (self.asset.name, self.get_sub_asset_type_display(), self.model, self.asset.sn)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;服务器&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;服务器&quot;</span></span></code></pre></div><p>说明：</p><ul><li>每台服务器都唯一关联着一个资产对象，因此使用OneToOneField构建了一个一对一字段，这非常重要!</li><li>服务器又可分为几种子类型，这里定义了三种；</li><li>服务器添加的方式可以分为手动和自动；</li><li>有些服务器是虚拟机或者docker生成的，没有物理实体，存在于宿主机中，因此需要增加一个hosted_on字段；这里认为，宿主机如果被删除，虚拟机也就不存在了；</li><li>服务器有型号信息，如果硬件信息中不包含，那么指的就是主板型号；</li><li>Raid类型在采用了Raid的时候才有，否则为空</li><li>操作系统相关信息包含类型、发行版本和具体版本。</li></ul><h3 id="_3-安全、网络、存储设备和软件资产的模型" tabindex="-1">3.安全、网络、存储设备和软件资产的模型 <a class="header-anchor" href="#_3-安全、网络、存储设备和软件资产的模型" aria-label="Permalink to &quot;3.安全、网络、存储设备和软件资产的模型&quot;">​</a></h3><p>这部分内容不是项目的主要内容，而且数据大多数不能自动收集和报告，很多都需要手工录入。我这里给出了范例，更多的数据字段，可以自行添加。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class SecurityDevice(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;安全设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;防火墙&#39;),</span></span>
<span class="line"><span>        (1, &#39;入侵检测设备&#39;),</span></span>
<span class="line"><span>        (2, &#39;互联网网关&#39;),</span></span>
<span class="line"><span>        (4, &#39;运维审计系统&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;安全设备类型&quot;)</span></span>
<span class="line"><span>    model = models.CharField(max_length=128, default=&#39;未知型号&#39;, verbose_name=&#39;安全设备型号&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.asset.name + &quot;--&quot; + self.get_sub_asset_type_display() + str(self.model) + &quot; id:%s&quot; % self.id</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;安全设备&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;安全设备&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class StorageDevice(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;存储设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;磁盘阵列&#39;),</span></span>
<span class="line"><span>        (1, &#39;网络存储器&#39;),</span></span>
<span class="line"><span>        (2, &#39;磁带库&#39;),</span></span>
<span class="line"><span>        (4, &#39;磁带机&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;存储设备类型&quot;)</span></span>
<span class="line"><span>    model = models.CharField(max_length=128, default=&#39;未知型号&#39;, verbose_name=&#39;存储设备型号&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.asset.name + &quot;--&quot; + self.get_sub_asset_type_display() + str(self.model) + &quot; id:%s&quot; % self.id</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;存储设备&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;存储设备&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class NetworkDevice(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;网络设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;路由器&#39;),</span></span>
<span class="line"><span>        (1, &#39;交换机&#39;),</span></span>
<span class="line"><span>        (2, &#39;负载均衡&#39;),</span></span>
<span class="line"><span>        (4, &#39;VPN设备&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;网络设备类型&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    vlan_ip = models.GenericIPAddressField(blank=True, null=True, verbose_name=&quot;VLanIP&quot;)</span></span>
<span class="line"><span>    intranet_ip = models.GenericIPAddressField(blank=True, null=True, verbose_name=&quot;内网IP&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    model = models.CharField(max_length=128, default=&#39;未知型号&#39;,  verbose_name=&quot;网络设备型号&quot;)</span></span>
<span class="line"><span>    firmware = models.CharField(max_length=128, blank=True, null=True, verbose_name=&quot;设备固件版本&quot;)</span></span>
<span class="line"><span>    port_num = models.SmallIntegerField(null=True, blank=True, verbose_name=&quot;端口个数&quot;)</span></span>
<span class="line"><span>    device_detail = models.TextField(null=True, blank=True, verbose_name=&quot;详细配置&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s--%s--%s &lt;sn:%s&gt;&#39; % (self.asset.name, self.get_sub_asset_type_display(), self.model, self.asset.sn)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;网络设备&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;网络设备&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Software(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    只保存付费购买的软件</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;操作系统&#39;),</span></span>
<span class="line"><span>        (1, &#39;办公\\开发软件&#39;),</span></span>
<span class="line"><span>        (2, &#39;业务软件&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;软件类型&quot;)</span></span>
<span class="line"><span>    license_num = models.IntegerField(default=1, verbose_name=&quot;授权数量&quot;)</span></span>
<span class="line"><span>    version = models.CharField(max_length=64, unique=True, help_text=&#39;例如: RedHat release 7 (Final)&#39;,</span></span>
<span class="line"><span>                               verbose_name=&#39;软件/系统版本&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s--%s&#39; % (self.get_sub_asset_type_display(), self.version)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;软件/系统&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;软件/系统&quot;</span></span></code></pre></div><p>说明：</p><ul><li>每台安全、网络、存储设备都通过一对一的方式唯一关联这一个资产对象。</li><li>通过sub_asset_type又细分设备的子类型</li><li>对于软件，它没有物理形体，因此无须关联一个资产对象；</li><li>软件只管理那些大型的收费软件，关注点是授权数量和软件版本。对于那些开源的或者免费的软件，显然不算公司的资产。</li></ul><h3 id="_4-机房、制造商、业务线、合同、资产标签等数据模型" tabindex="-1">4.机房、制造商、业务线、合同、资产标签等数据模型 <a class="header-anchor" href="#_4-机房、制造商、业务线、合同、资产标签等数据模型" aria-label="Permalink to &quot;4.机房、制造商、业务线、合同、资产标签等数据模型&quot;">​</a></h3><p>这一部分是CMDB中相关的内容，数据表建立后，可以通过手动添加。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class IDC(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;机房&quot;&quot;&quot;</span></span>
<span class="line"><span>    name = models.CharField(max_length=64, unique=True, verbose_name=&quot;机房名称&quot;)</span></span>
<span class="line"><span>    memo = models.CharField(max_length=128, blank=True, null=True, verbose_name=&#39;备注&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;机房&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;机房&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Manufacturer(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;厂商&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    name = models.CharField(&#39;厂商名称&#39;, max_length=64, unique=True)</span></span>
<span class="line"><span>    telephone = models.CharField(&#39;支持电话&#39;, max_length=30, blank=True, null=True)</span></span>
<span class="line"><span>    memo = models.CharField(&#39;备注&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;厂商&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;厂商&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class BusinessUnit(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;业务线&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    parent_unit = models.ForeignKey(&#39;self&#39;, blank=True, null=True, related_name=&#39;parent_level&#39;, on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    name = models.CharField(&#39;业务线&#39;, max_length=64, unique=True)</span></span>
<span class="line"><span>    memo = models.CharField(&#39;备注&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;业务线&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;业务线&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Contract(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;合同&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sn = models.CharField(&#39;合同号&#39;, max_length=128, unique=True)</span></span>
<span class="line"><span>    name = models.CharField(&#39;合同名称&#39;, max_length=64)</span></span>
<span class="line"><span>    memo = models.TextField(&#39;备注&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    price = models.IntegerField(&#39;合同金额&#39;)</span></span>
<span class="line"><span>    detail = models.TextField(&#39;合同详细&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    start_day = models.DateField(&#39;开始日期&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    end_day = models.DateField(&#39;失效日期&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    license_num = models.IntegerField(&#39;license数量&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    c_day = models.DateField(&#39;创建日期&#39;, auto_now_add=True)</span></span>
<span class="line"><span>    m_day = models.DateField(&#39;修改日期&#39;, auto_now=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;合同&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;合同&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Tag(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;标签&quot;&quot;&quot;</span></span>
<span class="line"><span>    name = models.CharField(&#39;标签名&#39;, max_length=32, unique=True)</span></span>
<span class="line"><span>    c_day = models.DateField(&#39;创建日期&#39;, auto_now_add=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;标签&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;标签&quot;</span></span></code></pre></div><p>说明：</p><ul><li>机房可以有很多其它字段，比如城市、楼号、楼层和未知等等，如有需要可自行添加；</li><li>业务线可以有子业务线，因此使用一个外键关联自身模型；</li><li>合同模型主要存储财务部门关心的数据；</li><li>资产标签模型与资产是多对多的关系。</li></ul><h3 id="_5-cpu模型" tabindex="-1">5.CPU模型 <a class="header-anchor" href="#_5-cpu模型" aria-label="Permalink to &quot;5.CPU模型&quot;">​</a></h3><p>通常一台服务器中只能有一种CPU型号，所以这里使用OneToOneField唯一关联一个资产对象，而不是外键关系。服务器上可以有多个物理CPU，它们的型号都是一样的。每个物理CPU又可能包含多核。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class CPU(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;CPU组件&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)  # 设备上的cpu肯定都是一样的，所以不需要建立多个cpu数据，一条就可以，因此使用一对一。</span></span>
<span class="line"><span>    cpu_model = models.CharField(&#39;CPU型号&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    cpu_count = models.PositiveSmallIntegerField(&#39;物理CPU个数&#39;, default=1)</span></span>
<span class="line"><span>    cpu_core_count = models.PositiveSmallIntegerField(&#39;CPU核数&#39;, default=1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.asset.name + &quot;:   &quot; + self.cpu_model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;CPU&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;CPU&quot;</span></span></code></pre></div><h3 id="_6-ram模型" tabindex="-1">6.RAM模型 <a class="header-anchor" href="#_6-ram模型" aria-label="Permalink to &quot;6.RAM模型&quot;">​</a></h3><p>某个资产中可能有多条内存，所以这里必须是外键关系。其次，内存的sn号可能无法获得，就必须通过内存所在的插槽未知来唯一确定每条内存。因此，<code>unique_together = (&#39;asset&#39;, &#39;slot&#39;)</code>这条设置非常关键，相当于内存的主键了，每条内存数据必须包含slot字段，否则就不合法。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class RAM(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;内存组件&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.ForeignKey(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sn = models.CharField(&#39;SN号&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    model = models.CharField(&#39;内存型号&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    manufacturer = models.CharField(&#39;内存制造商&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    slot = models.CharField(&#39;插槽&#39;, max_length=64)</span></span>
<span class="line"><span>    capacity = models.IntegerField(&#39;内存大小(GB)&#39;, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s: %s: %s: %s&#39; % (self.asset.name, self.model, self.slot, self.capacity)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;内存&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;内存&quot;</span></span>
<span class="line"><span>        unique_together = (&#39;asset&#39;, &#39;slot&#39;)  # 同一资产下的内存，根据插槽的不同，必须唯一</span></span></code></pre></div><h3 id="_7-硬盘模型" tabindex="-1">7. 硬盘模型 <a class="header-anchor" href="#_7-硬盘模型" aria-label="Permalink to &quot;7. 硬盘模型&quot;">​</a></h3><p>与内存相同的是，硬盘也可能有很多块，所以也是外键关系。不同的是，硬盘通常都能获取到sn号，使用sn作为唯一值比较合适，也就是<code>unique_together = (&#39;asset&#39;, &#39;sn&#39;)</code>。硬盘有不同的接口，这里设置了4种以及unknown，可自行添加其它类别。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class Disk(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;硬盘设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    disk_interface_type_choice = (</span></span>
<span class="line"><span>        (&#39;SATA&#39;, &#39;SATA&#39;),</span></span>
<span class="line"><span>        (&#39;SAS&#39;, &#39;SAS&#39;),</span></span>
<span class="line"><span>        (&#39;SCSI&#39;, &#39;SCSI&#39;),</span></span>
<span class="line"><span>        (&#39;SSD&#39;, &#39;SSD&#39;),</span></span>
<span class="line"><span>        (&#39;unknown&#39;, &#39;unknown&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.ForeignKey(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sn = models.CharField(&#39;硬盘SN号&#39;, max_length=128)</span></span>
<span class="line"><span>    slot = models.CharField(&#39;所在插槽位&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    model = models.CharField(&#39;磁盘型号&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    manufacturer = models.CharField(&#39;磁盘制造商&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    capacity = models.FloatField(&#39;磁盘容量(GB)&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    interface_type = models.CharField(&#39;接口类型&#39;, max_length=16, choices=disk_interface_type_choice, default=&#39;unknown&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s:  %s:  %s:  %sGB&#39; % (self.asset.name, self.model, self.slot, self.capacity)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;硬盘&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;硬盘&quot;</span></span>
<span class="line"><span>        unique_together = (&#39;asset&#39;, &#39;sn&#39;)</span></span></code></pre></div><h3 id="_8-网卡模型" tabindex="-1">8.网卡模型 <a class="header-anchor" href="#_8-网卡模型" aria-label="Permalink to &quot;8.网卡模型&quot;">​</a></h3><p>一台设备中可能有很多块网卡，所以网卡与资产也是外键的关系。另外，由于虚拟机的存在，网卡的mac地址可能会发生重复，无法唯一确定某块网卡，因此通过网卡型号加mac地址的方式来唯一确定网卡。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class NIC(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;网卡组件&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.ForeignKey(&#39;Asset&#39;, on_delete=models.CASCADE)  # 注意要用外键</span></span>
<span class="line"><span>    name = models.CharField(&#39;网卡名称&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    model = models.CharField(&#39;网卡型号&#39;, max_length=128)</span></span>
<span class="line"><span>    mac = models.CharField(&#39;MAC地址&#39;, max_length=64)  # 虚拟机有可能会出现同样的mac地址</span></span>
<span class="line"><span>    ip_address = models.GenericIPAddressField(&#39;IP地址&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    net_mask = models.CharField(&#39;掩码&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    bonding = models.CharField(&#39;绑定地址&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s:  %s:  %s&#39; % (self.asset.name, self.model, self.mac)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;网卡&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;网卡&quot;</span></span>
<span class="line"><span>        unique_together = (&#39;asset&#39;, &#39;model&#39;, &#39;mac&#39;)  # 资产、型号和mac必须联合唯一。防止虚拟机中的特殊情况发生错误。</span></span></code></pre></div><h3 id="_9-其它模型" tabindex="-1">9. 其它模型 <a class="header-anchor" href="#_9-其它模型" aria-label="Permalink to &quot;9. 其它模型&quot;">​</a></h3><p>比如机房、厂商、标签、业务线、合同等其它信息。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class IDC(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;机房&quot;&quot;&quot;</span></span>
<span class="line"><span>    name = models.CharField(max_length=64, unique=True, verbose_name=&quot;机房名称&quot;)</span></span>
<span class="line"><span>    memo = models.CharField(max_length=128, blank=True, null=True, verbose_name=&#39;备注&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;机房&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;机房&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Manufacturer(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;厂商&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    name = models.CharField(&#39;厂商名称&#39;, max_length=64, unique=True)</span></span>
<span class="line"><span>    telephone = models.CharField(&#39;支持电话&#39;, max_length=30, blank=True, null=True)</span></span>
<span class="line"><span>    memo = models.CharField(&#39;备注&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;厂商&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;厂商&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class BusinessUnit(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;业务线&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    parent_unit = models.ForeignKey(&#39;self&#39;, blank=True, null=True, related_name=&#39;parent_level&#39;,</span></span>
<span class="line"><span>                                    on_delete=models.CASCADE)</span></span>
<span class="line"><span>    name = models.CharField(&#39;业务线名称&#39;, max_length=64, unique=True)</span></span>
<span class="line"><span>    memo = models.CharField(&#39;备注&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;业务线&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;业务线&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Contract(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;合同&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sn = models.CharField(&#39;合同号&#39;, max_length=128, unique=True)</span></span>
<span class="line"><span>    name = models.CharField(&#39;合同名称&#39;, max_length=64)</span></span>
<span class="line"><span>    memo = models.TextField(&#39;备注&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    price = models.IntegerField(&#39;合同金额&#39;)</span></span>
<span class="line"><span>    detail = models.TextField(&#39;合同详细&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    start_day = models.DateField(&#39;开始日期&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    end_day = models.DateField(&#39;失效日期&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    license_num = models.IntegerField(&#39;license数量&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    c_day = models.DateField(&#39;创建日期&#39;, auto_now_add=True)</span></span>
<span class="line"><span>    m_day = models.DateField(&#39;修改日期&#39;, auto_now=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;合同&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;合同&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Tag(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;标签&quot;&quot;&quot;</span></span>
<span class="line"><span>    name = models.CharField(&#39;标签名&#39;, max_length=32, unique=True)</span></span>
<span class="line"><span>    c_day = models.DateField(&#39;创建日期&#39;, auto_now_add=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;标签&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;标签&quot;</span></span></code></pre></div><h3 id="_10-日志模型" tabindex="-1">10.日志模型 <a class="header-anchor" href="#_10-日志模型" aria-label="Permalink to &quot;10.日志模型&quot;">​</a></h3><p>CMDB必须记录各种日志，这是毫无疑问的！我们通常要记录事件名称、类型、关联的资产、子事件、事件详情、谁导致的、发生时间。这些都很重要！</p><p>尤其要注意的是，事件日志不能随着关联资产的删除被一并删除，也就是我们设置<code>on_delete=models.SET_NULL</code>的意义！</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class EventLog(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    日志.</span></span>
<span class="line"><span>    在关联对象被删除的时候，不能一并删除，需保留日志。</span></span>
<span class="line"><span>    因此，on_delete=models.SET_NULL</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    name = models.CharField(&#39;事件名称&#39;, max_length=128)</span></span>
<span class="line"><span>    event_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;其它&#39;),</span></span>
<span class="line"><span>        (1, &#39;硬件变更&#39;),</span></span>
<span class="line"><span>        (2, &#39;新增配件&#39;),</span></span>
<span class="line"><span>        (3, &#39;设备下线&#39;),</span></span>
<span class="line"><span>        (4, &#39;设备上线&#39;),</span></span>
<span class="line"><span>        (5, &#39;定期维护&#39;),</span></span>
<span class="line"><span>        (6, &#39;业务上线\\更新\\变更&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    asset = models.ForeignKey(&#39;Asset&#39;, blank=True, null=True, on_delete=models.SET_NULL)  # 当资产审批成功时有这项数据</span></span>
<span class="line"><span>    new_asset = models.ForeignKey(&#39;NewAssetApprovalZone&#39;, blank=True, null=True, on_delete=models.SET_NULL)  # 当资产审批失败时有这项数据</span></span>
<span class="line"><span>    event_type = models.SmallIntegerField(&#39;事件类型&#39;, choices=event_type_choice, default=4)</span></span>
<span class="line"><span>    component = models.CharField(&#39;事件子项&#39;, max_length=256, blank=True, null=True)</span></span>
<span class="line"><span>    detail = models.TextField(&#39;事件详情&#39;)</span></span>
<span class="line"><span>    date = models.DateTimeField(&#39;事件时间&#39;, auto_now_add=True)</span></span>
<span class="line"><span>    user = models.ForeignKey(User, blank=True, null=True, verbose_name=&#39;事件执行人&#39;, on_delete=models.SET_NULL)  # 自动更新资产数据时没有执行人</span></span>
<span class="line"><span>    memo = models.TextField(&#39;备注&#39;, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;事件纪录&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;事件纪录&quot;</span></span></code></pre></div><h3 id="_11-新资产待审批区模型" tabindex="-1">11.新资产待审批区模型 <a class="header-anchor" href="#_11-新资产待审批区模型" aria-label="Permalink to &quot;11.新资产待审批区模型&quot;">​</a></h3><p>新资产的到来，并不能直接加入CMDB数据库中，而是要通过管理员审批后，才可以上线的。这就需要一个新资产的待审批区。在该区中，以资产的sn号作为唯一值，确定不同的资产。除了关键的包含资产所有信息的data字段，为了方便审批员查看信息，我们还设计了一些厂商、型号、内存大小、CPU类型等字段。同时，有可能出现资产还未审批，更新数据就已经发过来的情况，所以需要一个数据更新日期字段。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class NewAssetApprovalZone(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;新资产待审批区&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sn = models.CharField(&#39;资产SN号&#39;, max_length=128, unique=True)  # 此字段必填</span></span>
<span class="line"><span>    asset_type_choice = (</span></span>
<span class="line"><span>        (&#39;server&#39;, &#39;服务器&#39;),</span></span>
<span class="line"><span>        (&#39;networkdevice&#39;, &#39;网络设备&#39;),</span></span>
<span class="line"><span>        (&#39;storagedevice&#39;, &#39;存储设备&#39;),</span></span>
<span class="line"><span>        (&#39;securitydevice&#39;, &#39;安全设备&#39;),</span></span>
<span class="line"><span>        (&#39;software&#39;, &#39;软件资产&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    asset_type = models.CharField(choices=asset_type_choice, default=&#39;server&#39;, max_length=64, blank=True, null=True,</span></span>
<span class="line"><span>                                  verbose_name=&#39;资产类型&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    manufacturer = models.CharField(max_length=64, blank=True, null=True, verbose_name=&#39;生产厂商&#39;)</span></span>
<span class="line"><span>    model = models.CharField(max_length=128, blank=True, null=True, verbose_name=&#39;型号&#39;)</span></span>
<span class="line"><span>    ram_size = models.PositiveIntegerField(blank=True, null=True, verbose_name=&#39;内存大小&#39;)</span></span>
<span class="line"><span>    cpu_model = models.CharField(max_length=128, blank=True, null=True, verbose_name=&#39;CPU型号&#39;)</span></span>
<span class="line"><span>    cpu_count = models.PositiveSmallIntegerField(&#39;CPU物理数量&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    cpu_core_count = models.PositiveSmallIntegerField(&#39;CPU核心数量&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    os_distribution = models.CharField(&#39;发行商&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    os_type = models.CharField(&#39;系统类型&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    os_release = models.CharField(&#39;操作系统版本号&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    data = models.TextField(&#39;资产数据&#39;)  # 此字段必填</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    c_time = models.DateTimeField(&#39;汇报日期&#39;, auto_now_add=True)</span></span>
<span class="line"><span>    m_time = models.DateTimeField(&#39;数据更新日期&#39;, auto_now=True)</span></span>
<span class="line"><span>    approved = models.BooleanField(&#39;是否批准&#39;, default=False)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.sn</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;新上线待批准资产&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;新上线待批准资产&quot;</span></span>
<span class="line"><span>        ordering = [&#39;-c_time&#39;]</span></span></code></pre></div><h3 id="_11-总结" tabindex="-1">11.总结 <a class="header-anchor" href="#_11-总结" aria-label="Permalink to &quot;11.总结&quot;">​</a></h3><p>通过前面的内容，我们可以看出CMDB数据模型的设计非常复杂，我们这里还是省略了很多不太重要的部分，就这样总共都有400多行代码。其中每个模型需要保存什么字段、采用什么类型、什么关联关系、定义哪些参数、数据是否可以为空，这些都是踩过各种坑后总结出来的，不是随便就能定义的。所以，请务必详细阅读和揣摩这些模型的内容。</p><p>一切没有问题之后，注册app，然后makemigrations以及migrate!</p><p>最后附上整个models.py文件的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.db import models</span></span>
<span class="line"><span>from django.contrib.auth.models import User</span></span>
<span class="line"><span># Create your models here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Asset(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;    所有资产的共有数据表    &quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset_type_choice = (</span></span>
<span class="line"><span>        (&#39;server&#39;, &#39;服务器&#39;),</span></span>
<span class="line"><span>        (&#39;networkdevice&#39;, &#39;网络设备&#39;),</span></span>
<span class="line"><span>        (&#39;storagedevice&#39;, &#39;存储设备&#39;),</span></span>
<span class="line"><span>        (&#39;securitydevice&#39;, &#39;安全设备&#39;),</span></span>
<span class="line"><span>        (&#39;software&#39;, &#39;软件资产&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset_status = (</span></span>
<span class="line"><span>        (0, &#39;在线&#39;),</span></span>
<span class="line"><span>        (1, &#39;下线&#39;),</span></span>
<span class="line"><span>        (2, &#39;未知&#39;),</span></span>
<span class="line"><span>        (3, &#39;故障&#39;),</span></span>
<span class="line"><span>        (4, &#39;备用&#39;),</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset_type = models.CharField(choices=asset_type_choice, max_length=64, default=&#39;server&#39;, verbose_name=&quot;资产类型&quot;)</span></span>
<span class="line"><span>    name = models.CharField(max_length=64, unique=True, verbose_name=&quot;资产名称&quot;)     # 不可重复</span></span>
<span class="line"><span>    sn = models.CharField(max_length=128, unique=True, verbose_name=&quot;资产序列号&quot;)  # 不可重复</span></span>
<span class="line"><span>    business_unit = models.ForeignKey(&#39;BusinessUnit&#39;, null=True, blank=True, verbose_name=&#39;所属业务线&#39;,</span></span>
<span class="line"><span>                                      on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    status = models.SmallIntegerField(choices=asset_status, default=0, verbose_name=&#39;设备状态&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    manufacturer = models.ForeignKey(&#39;Manufacturer&#39;, null=True, blank=True, verbose_name=&#39;制造商&#39;,</span></span>
<span class="line"><span>                                     on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    manage_ip = models.GenericIPAddressField(null=True, blank=True, verbose_name=&#39;管理IP&#39;)</span></span>
<span class="line"><span>    tags = models.ManyToManyField(&#39;Tag&#39;, blank=True, verbose_name=&#39;标签&#39;)</span></span>
<span class="line"><span>    admin = models.ForeignKey(User, null=True, blank=True, verbose_name=&#39;资产管理员&#39;, related_name=&#39;admin&#39;,</span></span>
<span class="line"><span>                              on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    idc = models.ForeignKey(&#39;IDC&#39;, null=True, blank=True, verbose_name=&#39;所在机房&#39;, on_delete=models.SET_NULL)</span></span>
<span class="line"><span>    contract = models.ForeignKey(&#39;Contract&#39;, null=True, blank=True, verbose_name=&#39;合同&#39;, on_delete=models.SET_NULL)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    purchase_day = models.DateField(null=True, blank=True, verbose_name=&quot;购买日期&quot;)</span></span>
<span class="line"><span>    expire_day = models.DateField(null=True, blank=True, verbose_name=&quot;过保日期&quot;)</span></span>
<span class="line"><span>    price = models.FloatField(null=True, blank=True, verbose_name=&quot;价格&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    approved_by = models.ForeignKey(User, null=True, blank=True, verbose_name=&#39;批准人&#39;, related_name=&#39;approved_by&#39;,</span></span>
<span class="line"><span>                                    on_delete=models.SET_NULL)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    memo = models.TextField(null=True, blank=True, verbose_name=&#39;备注&#39;)</span></span>
<span class="line"><span>    c_time = models.DateTimeField(auto_now_add=True, verbose_name=&#39;批准日期&#39;)</span></span>
<span class="line"><span>    m_time = models.DateTimeField(auto_now=True, verbose_name=&#39;更新日期&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;&lt;%s&gt;  %s&#39; % (self.get_asset_type_display(), self.name)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;资产总表&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;资产总表&quot;</span></span>
<span class="line"><span>        ordering = [&#39;-c_time&#39;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Server(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;服务器设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;PC服务器&#39;),</span></span>
<span class="line"><span>        (1, &#39;刀片机&#39;),</span></span>
<span class="line"><span>        (2, &#39;小型机&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    created_by_choice = (</span></span>
<span class="line"><span>        (&#39;auto&#39;, &#39;自动添加&#39;),</span></span>
<span class="line"><span>        (&#39;manual&#39;, &#39;手工录入&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)  # 非常关键的一对一关联！asset被删除的时候一并删除server</span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;服务器类型&quot;)</span></span>
<span class="line"><span>    created_by = models.CharField(choices=created_by_choice, max_length=32, default=&#39;auto&#39;, verbose_name=&quot;添加方式&quot;)</span></span>
<span class="line"><span>    hosted_on = models.ForeignKey(&#39;self&#39;, related_name=&#39;hosted_on_server&#39;,</span></span>
<span class="line"><span>                                  blank=True, null=True, verbose_name=&quot;宿主机&quot;, on_delete=models.CASCADE)  # 虚拟机专用字段</span></span>
<span class="line"><span>    model = models.CharField(max_length=128, null=True, blank=True, verbose_name=&#39;服务器型号&#39;)</span></span>
<span class="line"><span>    raid_type = models.CharField(max_length=512, blank=True, null=True, verbose_name=&#39;Raid类型&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    os_type = models.CharField(&#39;操作系统类型&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    os_distribution = models.CharField(&#39;发行商&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    os_release = models.CharField(&#39;操作系统版本&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s--%s--%s &lt;sn:%s&gt;&#39; % (self.asset.name, self.get_sub_asset_type_display(), self.model, self.asset.sn)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;服务器&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;服务器&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class SecurityDevice(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;安全设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;防火墙&#39;),</span></span>
<span class="line"><span>        (1, &#39;入侵检测设备&#39;),</span></span>
<span class="line"><span>        (2, &#39;互联网网关&#39;),</span></span>
<span class="line"><span>        (4, &#39;运维审计系统&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;安全设备类型&quot;)</span></span>
<span class="line"><span>    model = models.CharField(max_length=128, default=&#39;未知型号&#39;, verbose_name=&#39;安全设备型号&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.asset.name + &quot;--&quot; + self.get_sub_asset_type_display() + str(self.model) + &quot; id:%s&quot; % self.id</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;安全设备&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;安全设备&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class StorageDevice(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;存储设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;磁盘阵列&#39;),</span></span>
<span class="line"><span>        (1, &#39;网络存储器&#39;),</span></span>
<span class="line"><span>        (2, &#39;磁带库&#39;),</span></span>
<span class="line"><span>        (4, &#39;磁带机&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;存储设备类型&quot;)</span></span>
<span class="line"><span>    model = models.CharField(max_length=128, default=&#39;未知型号&#39;, verbose_name=&#39;存储设备型号&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.asset.name + &quot;--&quot; + self.get_sub_asset_type_display() + str(self.model) + &quot; id:%s&quot; % self.id</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;存储设备&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;存储设备&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class NetworkDevice(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;网络设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;路由器&#39;),</span></span>
<span class="line"><span>        (1, &#39;交换机&#39;),</span></span>
<span class="line"><span>        (2, &#39;负载均衡&#39;),</span></span>
<span class="line"><span>        (4, &#39;VPN设备&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;网络设备类型&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    vlan_ip = models.GenericIPAddressField(blank=True, null=True, verbose_name=&quot;VLanIP&quot;)</span></span>
<span class="line"><span>    intranet_ip = models.GenericIPAddressField(blank=True, null=True, verbose_name=&quot;内网IP&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    model = models.CharField(max_length=128, default=&#39;未知型号&#39;,  verbose_name=&quot;网络设备型号&quot;)</span></span>
<span class="line"><span>    firmware = models.CharField(max_length=128, blank=True, null=True, verbose_name=&quot;设备固件版本&quot;)</span></span>
<span class="line"><span>    port_num = models.SmallIntegerField(null=True, blank=True, verbose_name=&quot;端口个数&quot;)</span></span>
<span class="line"><span>    device_detail = models.TextField(null=True, blank=True, verbose_name=&quot;详细配置&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s--%s--%s &lt;sn:%s&gt;&#39; % (self.asset.name, self.get_sub_asset_type_display(), self.model, self.asset.sn)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;网络设备&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;网络设备&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Software(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    只保存付费购买的软件</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    sub_asset_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;操作系统&#39;),</span></span>
<span class="line"><span>        (1, &#39;办公\\开发软件&#39;),</span></span>
<span class="line"><span>        (2, &#39;业务软件&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sub_asset_type = models.SmallIntegerField(choices=sub_asset_type_choice, default=0, verbose_name=&quot;软件类型&quot;)</span></span>
<span class="line"><span>    license_num = models.IntegerField(default=1, verbose_name=&quot;授权数量&quot;)</span></span>
<span class="line"><span>    version = models.CharField(max_length=64, unique=True, help_text=&#39;例如: RedHat release 7 (Final)&#39;,</span></span>
<span class="line"><span>                               verbose_name=&#39;软件/系统版本&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s--%s&#39; % (self.get_sub_asset_type_display(), self.version)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;软件/系统&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;软件/系统&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class CPU(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;CPU组件&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.OneToOneField(&#39;Asset&#39;, on_delete=models.CASCADE)  # 设备上的cpu肯定都是一样的，所以不需要建立多个cpu数据，一条就可以，因此使用一对一。</span></span>
<span class="line"><span>    cpu_model = models.CharField(&#39;CPU型号&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    cpu_count = models.PositiveSmallIntegerField(&#39;物理CPU个数&#39;, default=1)</span></span>
<span class="line"><span>    cpu_core_count = models.PositiveSmallIntegerField(&#39;CPU核数&#39;, default=1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.asset.name + &quot;:   &quot; + self.cpu_model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;CPU&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;CPU&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class RAM(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;内存组件&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.ForeignKey(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sn = models.CharField(&#39;SN号&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    model = models.CharField(&#39;内存型号&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    manufacturer = models.CharField(&#39;内存制造商&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    slot = models.CharField(&#39;插槽&#39;, max_length=64)</span></span>
<span class="line"><span>    capacity = models.IntegerField(&#39;内存大小(GB)&#39;, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s: %s: %s: %s&#39; % (self.asset.name, self.model, self.slot, self.capacity)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;内存&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;内存&quot;</span></span>
<span class="line"><span>        unique_together = (&#39;asset&#39;, &#39;slot&#39;)  # 同一资产下的内存，根据插槽的不同，必须唯一</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Disk(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;硬盘设备&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    disk_interface_type_choice = (</span></span>
<span class="line"><span>        (&#39;SATA&#39;, &#39;SATA&#39;),</span></span>
<span class="line"><span>        (&#39;SAS&#39;, &#39;SAS&#39;),</span></span>
<span class="line"><span>        (&#39;SCSI&#39;, &#39;SCSI&#39;),</span></span>
<span class="line"><span>        (&#39;SSD&#39;, &#39;SSD&#39;),</span></span>
<span class="line"><span>        (&#39;unknown&#39;, &#39;unknown&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.ForeignKey(&#39;Asset&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    sn = models.CharField(&#39;硬盘SN号&#39;, max_length=128)</span></span>
<span class="line"><span>    slot = models.CharField(&#39;所在插槽位&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    model = models.CharField(&#39;磁盘型号&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    manufacturer = models.CharField(&#39;磁盘制造商&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span>    capacity = models.FloatField(&#39;磁盘容量(GB)&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    interface_type = models.CharField(&#39;接口类型&#39;, max_length=16, choices=disk_interface_type_choice, default=&#39;unknown&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s:  %s:  %s:  %sGB&#39; % (self.asset.name, self.model, self.slot, self.capacity)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;硬盘&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;硬盘&quot;</span></span>
<span class="line"><span>        unique_together = (&#39;asset&#39;, &#39;sn&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class NIC(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;网卡组件&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    asset = models.ForeignKey(&#39;Asset&#39;, on_delete=models.CASCADE)  # 注意要用外键</span></span>
<span class="line"><span>    name = models.CharField(&#39;网卡名称&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    model = models.CharField(&#39;网卡型号&#39;, max_length=128)</span></span>
<span class="line"><span>    mac = models.CharField(&#39;MAC地址&#39;, max_length=64)  # 虚拟机有可能会出现同样的mac地址</span></span>
<span class="line"><span>    ip_address = models.GenericIPAddressField(&#39;IP地址&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    net_mask = models.CharField(&#39;掩码&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    bonding = models.CharField(&#39;绑定地址&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return &#39;%s:  %s:  %s&#39; % (self.asset.name, self.model, self.mac)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;网卡&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;网卡&quot;</span></span>
<span class="line"><span>        unique_together = (&#39;asset&#39;, &#39;model&#39;, &#39;mac&#39;)  # 资产、型号和mac必须联合唯一。防止虚拟机中的特殊情况发生错误。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class IDC(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;机房&quot;&quot;&quot;</span></span>
<span class="line"><span>    name = models.CharField(max_length=64, unique=True, verbose_name=&quot;机房名称&quot;)</span></span>
<span class="line"><span>    memo = models.CharField(max_length=128, blank=True, null=True, verbose_name=&#39;备注&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;机房&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;机房&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Manufacturer(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;厂商&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    name = models.CharField(&#39;厂商名称&#39;, max_length=64, unique=True)</span></span>
<span class="line"><span>    telephone = models.CharField(&#39;支持电话&#39;, max_length=30, blank=True, null=True)</span></span>
<span class="line"><span>    memo = models.CharField(&#39;备注&#39;, max_length=128, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;厂商&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;厂商&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class BusinessUnit(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;业务线&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    parent_unit = models.ForeignKey(&#39;self&#39;, blank=True, null=True, related_name=&#39;parent_level&#39;,</span></span>
<span class="line"><span>                                    on_delete=models.CASCADE)</span></span>
<span class="line"><span>    name = models.CharField(&#39;业务线名称&#39;, max_length=64, unique=True)</span></span>
<span class="line"><span>    memo = models.CharField(&#39;备注&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;业务线&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;业务线&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Contract(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;合同&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sn = models.CharField(&#39;合同号&#39;, max_length=128, unique=True)</span></span>
<span class="line"><span>    name = models.CharField(&#39;合同名称&#39;, max_length=64)</span></span>
<span class="line"><span>    memo = models.TextField(&#39;备注&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    price = models.IntegerField(&#39;合同金额&#39;)</span></span>
<span class="line"><span>    detail = models.TextField(&#39;合同详细&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    start_day = models.DateField(&#39;开始日期&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    end_day = models.DateField(&#39;失效日期&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    license_num = models.IntegerField(&#39;license数量&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    c_day = models.DateField(&#39;创建日期&#39;, auto_now_add=True)</span></span>
<span class="line"><span>    m_day = models.DateField(&#39;修改日期&#39;, auto_now=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;合同&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;合同&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Tag(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;标签&quot;&quot;&quot;</span></span>
<span class="line"><span>    name = models.CharField(&#39;标签名&#39;, max_length=32, unique=True)</span></span>
<span class="line"><span>    c_day = models.DateField(&#39;创建日期&#39;, auto_now_add=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;标签&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;标签&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class EventLog(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    日志.</span></span>
<span class="line"><span>    在关联对象被删除的时候，不能一并删除，需保留日志。</span></span>
<span class="line"><span>    因此，on_delete=models.SET_NULL</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    name = models.CharField(&#39;事件名称&#39;, max_length=128)</span></span>
<span class="line"><span>    event_type_choice = (</span></span>
<span class="line"><span>        (0, &#39;其它&#39;),</span></span>
<span class="line"><span>        (1, &#39;硬件变更&#39;),</span></span>
<span class="line"><span>        (2, &#39;新增配件&#39;),</span></span>
<span class="line"><span>        (3, &#39;设备下线&#39;),</span></span>
<span class="line"><span>        (4, &#39;设备上线&#39;),</span></span>
<span class="line"><span>        (5, &#39;定期维护&#39;),</span></span>
<span class="line"><span>        (6, &#39;业务上线\\更新\\变更&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    asset = models.ForeignKey(&#39;Asset&#39;, blank=True, null=True, on_delete=models.SET_NULL)  # 当资产审批成功时有这项数据</span></span>
<span class="line"><span>    new_asset = models.ForeignKey(&#39;NewAssetApprovalZone&#39;, blank=True, null=True, on_delete=models.SET_NULL)  # 当资产审批失败时有这项数据</span></span>
<span class="line"><span>    event_type = models.SmallIntegerField(&#39;事件类型&#39;, choices=event_type_choice, default=4)</span></span>
<span class="line"><span>    component = models.CharField(&#39;事件子项&#39;, max_length=256, blank=True, null=True)</span></span>
<span class="line"><span>    detail = models.TextField(&#39;事件详情&#39;)</span></span>
<span class="line"><span>    date = models.DateTimeField(&#39;事件时间&#39;, auto_now_add=True)</span></span>
<span class="line"><span>    user = models.ForeignKey(User, blank=True, null=True, verbose_name=&#39;事件执行人&#39;, on_delete=models.SET_NULL)  # 自动更新资产数据时没有执行人</span></span>
<span class="line"><span>    memo = models.TextField(&#39;备注&#39;, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;事件纪录&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;事件纪录&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class NewAssetApprovalZone(models.Model):</span></span>
<span class="line"><span>    &quot;&quot;&quot;新资产待审批区&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sn = models.CharField(&#39;资产SN号&#39;, max_length=128, unique=True)  # 此字段必填</span></span>
<span class="line"><span>    asset_type_choice = (</span></span>
<span class="line"><span>        (&#39;server&#39;, &#39;服务器&#39;),</span></span>
<span class="line"><span>        (&#39;networkdevice&#39;, &#39;网络设备&#39;),</span></span>
<span class="line"><span>        (&#39;storagedevice&#39;, &#39;存储设备&#39;),</span></span>
<span class="line"><span>        (&#39;securitydevice&#39;, &#39;安全设备&#39;),</span></span>
<span class="line"><span>        (&#39;software&#39;, &#39;软件资产&#39;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    asset_type = models.CharField(choices=asset_type_choice, default=&#39;server&#39;, max_length=64, blank=True, null=True,</span></span>
<span class="line"><span>                                  verbose_name=&#39;资产类型&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    manufacturer = models.CharField(max_length=64, blank=True, null=True, verbose_name=&#39;生产厂商&#39;)</span></span>
<span class="line"><span>    model = models.CharField(max_length=128, blank=True, null=True, verbose_name=&#39;型号&#39;)</span></span>
<span class="line"><span>    ram_size = models.PositiveIntegerField(blank=True, null=True, verbose_name=&#39;内存大小&#39;)</span></span>
<span class="line"><span>    cpu_model = models.CharField(max_length=128, blank=True, null=True, verbose_name=&#39;CPU型号&#39;)</span></span>
<span class="line"><span>    cpu_count = models.PositiveSmallIntegerField(&#39;CPU物理数量&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    cpu_core_count = models.PositiveSmallIntegerField(&#39;CPU核心数量&#39;, blank=True, null=True)</span></span>
<span class="line"><span>    os_distribution = models.CharField(&#39;发行商&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    os_type = models.CharField(&#39;系统类型&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span>    os_release = models.CharField(&#39;操作系统版本号&#39;, max_length=64, blank=True, null=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    data = models.TextField(&#39;资产数据&#39;)  # 此字段必填</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    c_time = models.DateTimeField(&#39;汇报日期&#39;, auto_now_add=True)</span></span>
<span class="line"><span>    m_time = models.DateTimeField(&#39;数据更新日期&#39;, auto_now=True)</span></span>
<span class="line"><span>    approved = models.BooleanField(&#39;是否批准&#39;, default=False)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.sn</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        verbose_name = &#39;新上线待批准资产&#39;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;新上线待批准资产&quot;</span></span>
<span class="line"><span>        ordering = [&#39;-c_time&#39;]</span></span></code></pre></div><hr>`,61),t=[o];function c(u,r,d,_,m,q){return a(),n("div",null,t)}const T=s(i,[["render",c]]);export{b as __pageData,T as default};
