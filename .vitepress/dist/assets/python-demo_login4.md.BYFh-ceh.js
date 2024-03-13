import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const t="/assets/106-1.BT5MnRMW.png",l="/assets/106-2.Bmo385Co.png",v=JSON.parse('{"title":"4. url路由和视图","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login4.md","filePath":"python-demo/login4.md"}'),e={name:"python-demo/login4.md"},i=p(`<h1 id="_4-url路由和视图" tabindex="-1">4. url路由和视图 <a class="header-anchor" href="#_4-url路由和视图" aria-label="Permalink to &quot;4. url路由和视图&quot;">​</a></h1><hr><p>前面我们已经创建好数据模型了，并且在admin后台中添加了一些测试用户。下面我们就要设计好站点的url路由、对应的处理视图函数以及使用的前端模板了。</p><h2 id="一、-路由设计" tabindex="-1">一、 路由设计 <a class="header-anchor" href="#一、-路由设计" aria-label="Permalink to &quot;一、 路由设计&quot;">​</a></h2><p>我们初步设想需要下面的四个URL：</p><table><thead><tr><th>URL</th><th>视图</th><th>模板</th><th>说明</th></tr></thead><tbody><tr><td>/index/</td><td>login.views.index</td><td>index.html</td><td>主页</td></tr><tr><td>/login/</td><td>login.views.login</td><td>login.html</td><td>登录</td></tr><tr><td>/register/</td><td>login.views.register</td><td>register.html</td><td>注册</td></tr><tr><td>/logout/</td><td>login.views.logout</td><td>无需专门的页面</td><td>登出</td></tr></tbody></table><p>重要说明：由于本项目目的是打造一个针对管理系统、应用程序等需求下的可重用的登录/注册app，而不是门户网站、免费博客等无需登录即可访问的网站，所以在url路由、跳转策略和文件结构的设计上都是尽量自成体系。具体访问的策略如下：</p><ul><li>未登录人员，不论是访问index还是login和logout，全部跳转到login界面</li><li>已登录人员，访问login会自动跳转到index页面</li><li>已登录人员，不允许直接访问register页面，需先logout</li><li>登出后，自动跳转到login界面</li></ul><p>考虑到登录注册系统属于站点的一级功能，为了直观和更易于接受，这里没有采用二级路由的方式，而是在根路由下直接编写路由条目，同样也没有使用反向解析名（name参数）。所以，在重用本app的时候，一定要按照app使用说明，加入相应的url路由。</p><p>根据上面的策划，打开<code>mysite/urls.py</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.contrib import admin</span></span>
<span class="line"><span>from django.urls import path</span></span>
<span class="line"><span>from login import views</span></span>
<span class="line"><span></span></span>
<span class="line"><span>urlpatterns = [</span></span>
<span class="line"><span>    path(&#39;admin/&#39;, admin.site.urls),</span></span>
<span class="line"><span>    path(&#39;index/&#39;, views.index),</span></span>
<span class="line"><span>    path(&#39;login/&#39;, views.login),</span></span>
<span class="line"><span>    path(&#39;register/&#39;, views.register),</span></span>
<span class="line"><span>    path(&#39;logout/&#39;, views.logout),</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>注意要先从login导入views模块。</p><h2 id="二、-架构初步视图" tabindex="-1">二、 架构初步视图 <a class="header-anchor" href="#二、-架构初步视图" aria-label="Permalink to &quot;二、 架构初步视图&quot;">​</a></h2><p>路由写好了，就进入<code>login/views.py</code>文件编写视图的框架，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.shortcuts import render</span></span>
<span class="line"><span>from django.shortcuts import redirect</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Create your views here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def index(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return render(request, &#39;login/index.html&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def login(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return render(request, &#39;login/login.html&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def register(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return render(request, &#39;login/register.html&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def logout(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return redirect(&quot;/login/&quot;)</span></span></code></pre></div><p>我们先不着急完成视图内部的具体细节，而是把框架先搭建起来。</p><p>注意：</p><ul><li>在顶部额外导入了<code>redirect</code>，用于logout后，页面重定向到‘/login/’这个url，当然你也可以重定向到别的页面；</li><li>另外三个视图都返回一个render调用，render方法接收request作为第一个参数，要渲染的页面为第二个参数，以及需要传递给页面的数据字典作为第三个参数（可以为空），表示根据请求的部分，以渲染的HTML页面为主体，使用模板语言将数据字典填入，然后返回给用户的浏览器。</li><li>渲染的对象为login目录下的html文件，这是一种安全可靠的文件组织方式，我们现在还没有创建这些文件。</li></ul><h2 id="三、-创建html页面文件" tabindex="-1">三、 创建HTML页面文件 <a class="header-anchor" href="#三、-创建html页面文件" aria-label="Permalink to &quot;三、 创建HTML页面文件&quot;">​</a></h2><p>在项目根路径的login目录中创建一个templates目录，再在templates目录里创建一个login目录。这么做有助于app复用，防止命名冲突，能更有效地组织大型工程，具体说明请参考教程前面的相关章节。</p><p>在<code>login/templates/login</code>目录中创建三个文件<code>index.html</code>、<code>login.html</code>以及<code>register.html</code> ，并写入如下的代码：</p><p><strong><code>index.html</code>:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;首页&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;h1&gt;这仅仅是一个主页模拟！请根据实际情况接入正确的主页！&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p><strong><code>login.html</code>:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;登录&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;h1&gt;登录页面&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p><strong><code>register.html</code></strong>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;注册&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;h1&gt;注册页面&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>到目前为止，我们的工程目录结构如下图所示：</p><p><img src="`+t+'" alt="image"></p><h2 id="四、-测试路由和视图" tabindex="-1">四、 测试路由和视图 <a class="header-anchor" href="#四、-测试路由和视图" aria-label="Permalink to &quot;四、 测试路由和视图&quot;">​</a></h2><p>启动服务器，在浏览器访问<code>http://127.0.0.1:8000/index/</code>等页面，如果能正常显示，说明一切OK！</p><p><img src="'+l+'" alt="image"></p><p>现在，我们整个项目的基本框架已经搭建起来了！</p>',33),o=[i];function d(c,r,g,h,u,m){return a(),n("div",null,o)}const _=s(e,[["render",d]]);export{v as __pageData,_ as default};
