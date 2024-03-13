import{_ as a,c as s,o as n,a5 as p}from"./chunks/framework.BthLuVtL.js";const u=JSON.parse('{"title":"2. 设计数据模型","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login2.md","filePath":"python-demo/login2.md"}'),e={name:"python-demo/login2.md"},l=p(`<h1 id="_2-设计数据模型" tabindex="-1">2. 设计数据模型 <a class="header-anchor" href="#_2-设计数据模型" aria-label="Permalink to &quot;2. 设计数据模型&quot;">​</a></h1><p>​</p><hr><p>使用Django开发Web应用的过程中，很多人都是急急忙忙地写视图，写前端页面，把最根本的模型设计给忽略了。模型中定义了数据如何在数据库内保存，也就是数据表的定义方式。这部分工作体现在Django的代码中，其实就是model类的设计。</p><h2 id="一、-数据库模型设计" tabindex="-1">一、 数据库模型设计 <a class="header-anchor" href="#一、-数据库模型设计" aria-label="Permalink to &quot;一、 数据库模型设计&quot;">​</a></h2><p>作为一个用户登录和注册项目，需要保存的都是各种用户的相关信息。很显然，我们至少需要一张用户表User，在用户表里需要保存下面的信息：</p><ul><li>用户名</li><li>密码</li><li>邮箱地址</li><li>性别</li><li>创建时间</li></ul><p>我们现在就暂定保存这些信息吧，更多的内容，请大家在实际项目中自行添加。</p><p>进入<code>login/models.py</code>文件，这里将是我们整个login应用中所有模型的存放地点，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.db import models</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Create your models here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class User(models.Model):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    gender = (</span></span>
<span class="line"><span>        (&#39;male&#39;, &quot;男&quot;),</span></span>
<span class="line"><span>        (&#39;female&#39;, &quot;女&quot;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    name = models.CharField(max_length=128, unique=True)</span></span>
<span class="line"><span>    password = models.CharField(max_length=256)</span></span>
<span class="line"><span>    email = models.EmailField(unique=True)</span></span>
<span class="line"><span>    sex = models.CharField(max_length=32, choices=gender, default=&quot;男&quot;)</span></span>
<span class="line"><span>    c_time = models.DateTimeField(auto_now_add=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        ordering = [&quot;-c_time&quot;]</span></span>
<span class="line"><span>        verbose_name = &quot;用户&quot;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;用户&quot;</span></span></code></pre></div><p>各字段含义：</p><ul><li>name: 必填，最长不超过128个字符，并且唯一，也就是不能有相同姓名；</li><li>password: 必填，最长不超过256个字符（实际可能不需要这么长）；</li><li>email: 使用Django内置的邮箱类型，并且唯一；</li><li>sex: 性别，使用了一个choice，只能选择男或者女，默认为男；</li><li>使用<code>__str__</code>方法帮助人性化显示对象信息；</li><li>元数据里定义用户按创建时间的反序排列，也就是最近的最先显示；</li></ul><p>注意：这里的用户名指的是网络上注册的用户名，不要等同于现实中的真实姓名，所以采用了唯一机制。如果是现实中的人名，那是可以重复的，肯定是不能设置unique的。另外关于密码，建议至少128位长度，原因后面解释。</p><h2 id="二、-设置数据库后端" tabindex="-1">二、 设置数据库后端 <a class="header-anchor" href="#二、-设置数据库后端" aria-label="Permalink to &quot;二、 设置数据库后端&quot;">​</a></h2><p>定义好了模型后，就必须选择我们用来保存数据的数据库系统。Django支持Mysql，SQLite，Oracle等等。</p><p>Django中对数据库的设置在settings文件中，如下部分：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># Database</span></span>
<span class="line"><span># https://docs.djangoproject.com/en/2.2/ref/settings/#databases</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DATABASES = {</span></span>
<span class="line"><span>    &#39;default&#39;: {</span></span>
<span class="line"><span>        &#39;ENGINE&#39;: &#39;django.db.backends.sqlite3&#39;,</span></span>
<span class="line"><span>        &#39;NAME&#39;: os.path.join(BASE_DIR, &#39;db.sqlite3&#39;),</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Django默认使用SQLite数据库，并内置SQLite数据库的访问API，也就是说和Python一样原生支持SQLite。本项目使用SQLite作为后端数据库，因此不需要修改settings中这部分内容。如果你想要使用别的数据库，请自行修改该部分设置。</p><h2 id="三、注册app" tabindex="-1">三、注册app <a class="header-anchor" href="#三、注册app" aria-label="Permalink to &quot;三、注册app&quot;">​</a></h2><p>每次创建了新的app后，都需要在全局settings中注册，这样Django才知道你有新的应用上线了。在settings的下面部分添加‘login’，建议在最后添加个逗号。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># Application definition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSTALLED_APPS = [</span></span>
<span class="line"><span>    &#39;django.contrib.admin&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.auth&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.contenttypes&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.sessions&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.messages&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.staticfiles&#39;,</span></span>
<span class="line"><span>    &#39;login&#39;,</span></span>
<span class="line"><span>]</span></span></code></pre></div><h2 id="四、创建记录和数据表" tabindex="-1">四、创建记录和数据表 <a class="header-anchor" href="#四、创建记录和数据表" aria-label="Permalink to &quot;四、创建记录和数据表&quot;">​</a></h2><p>app中的models建立好了后，并不会自动地在数据库中生成相应的数据表，需要你手动创建。</p><p>进入Pycharm的terminal终端，执行下面的命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>python manage.py makemigrations</span></span></code></pre></div><p>返回结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(venv) D:\\work\\2019\\for_test\\mysite&gt;python manage.py makemigrations</span></span>
<span class="line"><span>Migrations for &#39;login&#39;:</span></span>
<span class="line"><span>  login\\migrations\\0001_initial.py</span></span>
<span class="line"><span>    - Create model User</span></span></code></pre></div><p>Django自动为我们创建了<code>login\\migrations\\0001_initial.py</code>文件，保存了我们的第一次数据迁移工作，也就是创建了User模型。</p><p>接着执行下面的命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>python manage.py migrate</span></span></code></pre></div><p>Django将在数据库内创建真实的数据表。如果是第一次执行该命令，那么一些内置的框架，比如auth、session等的数据表也将被一同创建，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(venv) D:\\work\\2019\\for_test\\mysite&gt;python manage.py migrate</span></span>
<span class="line"><span>Operations to perform:</span></span>
<span class="line"><span>  Apply all migrations: admin, auth, contenttypes, login, sessions</span></span>
<span class="line"><span>Running migrations:</span></span>
<span class="line"><span>  Applying contenttypes.0001_initial... OK</span></span>
<span class="line"><span>  Applying auth.0001_initial... OK</span></span>
<span class="line"><span>  Applying admin.0001_initial... OK</span></span>
<span class="line"><span>  Applying admin.0002_logentry_remove_auto_add... OK</span></span>
<span class="line"><span>  Applying admin.0003_logentry_add_action_flag_choices... OK</span></span>
<span class="line"><span>  Applying contenttypes.0002_remove_content_type_name... OK</span></span>
<span class="line"><span>  Applying auth.0002_alter_permission_name_max_length... OK</span></span>
<span class="line"><span>  Applying auth.0003_alter_user_email_max_length... OK</span></span>
<span class="line"><span>  Applying auth.0004_alter_user_username_opts... OK</span></span>
<span class="line"><span>  Applying auth.0005_alter_user_last_login_null... OK</span></span>
<span class="line"><span>  Applying auth.0006_require_contenttypes_0002... OK</span></span>
<span class="line"><span>  Applying auth.0007_alter_validators_add_error_messages... OK</span></span>
<span class="line"><span>  Applying auth.0008_alter_user_username_max_length... OK</span></span>
<span class="line"><span>  Applying auth.0009_alter_user_last_name_max_length... OK</span></span>
<span class="line"><span>  Applying auth.0010_alter_group_name_max_length... OK</span></span>
<span class="line"><span>  Applying auth.0011_update_proxy_permissions... OK</span></span>
<span class="line"><span>  Applying login.0001_initial... OK</span></span>
<span class="line"><span>  Applying sessions.0001_initial... OK</span></span></code></pre></div>`,32),i=[l];function t(o,c,r,d,g,h){return n(),s("div",null,i)}const m=a(e,[["render",t]]);export{u as __pageData,m as default};
