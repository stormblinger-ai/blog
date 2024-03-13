import{_ as a,c as s,o as n,a5 as p}from"./chunks/framework.BthLuVtL.js";const e="/assets/105-1.QIyRF3mm.png",i="/assets/105-2.CSW-bXvK.png",t="/assets/105-3.CaDsUJ8h.png",o="/assets/105-4.Byq9mKSl.png",v=JSON.parse('{"title":"3. admin后台","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login3.md","filePath":"python-demo/login3.md"}'),l={name:"python-demo/login3.md"},c=p(`<h1 id="_3-admin后台" tabindex="-1">3. admin后台 <a class="header-anchor" href="#_3-admin后台" aria-label="Permalink to &quot;3. admin后台&quot;">​</a></h1><hr><p>在我们开发的初期，没有真实的用户数据，也没有完整的测试环境，为了测试和开发的方便，通常我们会频繁地使用Django给我们提供的Admin后台管理界面，创建测试用例，观察模型效果等等。</p><h2 id="一、-在admin中注册模型" tabindex="-1">一、 在admin中注册模型 <a class="header-anchor" href="#一、-在admin中注册模型" aria-label="Permalink to &quot;一、 在admin中注册模型&quot;">​</a></h2><p>admin后台本质上是Django给我们提供的一个app，默认情况下，它已经在settings中注册了，如下所示的第一行！同样的还有session会话框架，后面我们会使用的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># Application definition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSTALLED_APPS = [</span></span>
<span class="line"><span>    &#39;django.contrib.admin&#39;,     # 看这里</span></span>
<span class="line"><span>    &#39;django.contrib.auth&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.contenttypes&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.sessions&#39;,      # 看这里</span></span>
<span class="line"><span>    &#39;django.contrib.messages&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.staticfiles&#39;,</span></span>
<span class="line"><span>    &#39;login&#39;,</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>进入<code>login/admin.py</code>文件，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.contrib import admin</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Register your models here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from . import models</span></span>
<span class="line"><span></span></span>
<span class="line"><span>admin.site.register(models.User)</span></span></code></pre></div><p>暂时简单点，直接注册就好了。</p><h2 id="二、创建超级管理员" tabindex="-1">二、创建超级管理员 <a class="header-anchor" href="#二、创建超级管理员" aria-label="Permalink to &quot;二、创建超级管理员&quot;">​</a></h2><p>Django的admin后台拥有完整的较为安全的用户认证和授权机制，防护等级还算可以。</p><p>要进入该后台，需要创建超级管理员，该管理员和我们先前创建的User用户不是一个概念，要注意区别对待。</p><p>同样在Pycharm的终端中，执行下面的命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>python manage.py createsuperuser</span></span></code></pre></div><p>用户名、邮箱和密码请自行设定，但一定不要忘记。密码最好有一定强度，并且不能太简单和普遍，会有提示，我这里强制通过了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(venv) D:\\work\\2019\\for_test\\mysite&gt;python manage.py createsuperuser</span></span>
<span class="line"><span>用户名 (leave blank to use &#39;feixuelym&#39;): admin</span></span>
<span class="line"><span>电子邮件地址: admin@admin.com</span></span>
<span class="line"><span>Password:</span></span>
<span class="line"><span>Password (again):</span></span>
<span class="line"><span>这个密码太常见了。</span></span>
<span class="line"><span>Bypass password validation and create user anyway? [y/N]: y</span></span>
<span class="line"><span>Superuser created successfully.</span></span></code></pre></div><h2 id="三、-使用admin后台" tabindex="-1">三、 使用Admin后台 <a class="header-anchor" href="#三、-使用admin后台" aria-label="Permalink to &quot;三、 使用Admin后台&quot;">​</a></h2><p>创建好超级管理员后，就可以启动我们的开发服务器了，然后在浏览器中访问<code>http://127.0.0.1:8000/admin/</code>地址，可以看到如下的登录界面：</p><p><img src="`+e+'" alt="image"></p><p>输入我们先前创建的超级管理员账户，进入管理界面：</p><p><img src="'+i+'" alt="image"></p><p>注意，图中下方的<code>认证和授权</code>是admin应用自身的账户管理，上面的LOGIN栏目才是我们创建的login应用所对应的User模型。</p><p>点击Login栏目中的用户链接，进入用户列表界面，发现是空的，因为我们当前没有任何用户。点击右上方的增加用户按钮，我们创建几个测试用户试试：</p><p>通过输入不同的数据，我们看到Email会有地址合法性检查，性别有个选择框，非常的人性化。</p><p><img src="'+t+'" alt="image"></p><p>但是，实际上这里还有点小问题，那就是密码相关。密码不能保存为明文，这个问题我们后面再解决；其次，不可以这么随意的修改和设置密码，为了展示的方便性，我们先这样。</p><p>这里我随便创建了三个测试账号，如下所示：</p><p><img src="'+o+'" alt="image"></p><p>admin的使用和配置博大精深，但在本实战项目里，我们暂时把它当做一个数据库管理后台使用。</p>',29),d=[c];function r(m,h,g,u,_,b){return n(),s("div",null,d)}const k=a(l,[["render",r]]);export{v as __pageData,k as default};
