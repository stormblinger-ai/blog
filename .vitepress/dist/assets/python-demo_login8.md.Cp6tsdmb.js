import{_ as p,c as t,m as s,a,t as l,a5 as e,o as i}from"./chunks/framework.BthLuVtL.js";const o="/assets/110-1.CPhUWzIk.png",c="/assets/110-2.B16C0taE.png",P=JSON.parse('{"title":"8. 图片验证码","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login8.md","filePath":"python-demo/login8.md"}'),r={name:"python-demo/login8.md"},d=e(`<h1 id="_8-图片验证码" tabindex="-1">8. 图片验证码 <a class="header-anchor" href="#_8-图片验证码" aria-label="Permalink to &quot;8. 图片验证码&quot;">​</a></h1><hr><p>为了防止机器人频繁登录网站或者破坏分子恶意登录，很多用户登录和注册系统都提供了图形验证码功能。</p><p>验证码（CAPTCHA）是“Completely Automated Public Turing test to tell Computers and Humans Apart”（全自动区分计算机和人类的图灵测试）的缩写，是一种区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水，有效防止某个黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。</p><p>图形验证码的历史比较悠久，到现在已经有点英雄末路的味道了。因为机器学习、图像识别的存在，机器人已经可以比较正确的识别图像内的字符了。但不管怎么说，作为一种防御手段，至少还是可以抵挡一些低级入门的攻击手段，抬高了攻击者的门槛。</p><p>在Django中实现图片验证码功能非常简单，有现成的第三方库可以使用，我们不必自己开发（也要能开发得出来，囧）。这个库叫做<code>django-simple-captcha</code>。</p><h2 id="一、安装captcha" tabindex="-1">一、安装captcha <a class="header-anchor" href="#一、安装captcha" aria-label="Permalink to &quot;一、安装captcha&quot;">​</a></h2><p>在Pycharm的terminal中，使用pip安装第三方库：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>执行命令：pip install django-simple-captcha</span></span>
<span class="line"><span>(venv) D:\\work\\2019\\for_test\\mysite&gt;pip install django-simple-captcha</span></span>
<span class="line"><span>Collecting django-simple-captcha</span></span>
<span class="line"><span>  Downloading https://files.pythonhosted.org/packages/86/d4/5baf10bfc9eb7844872c256898a405e81f22f7213e008ec90875689f913d/django-simple-captcha-0</span></span>
<span class="line"><span>.5.11.zip (234kB)</span></span>
<span class="line"><span>    100% |████████████████████████████████| 235kB 596kB/s</span></span>
<span class="line"><span>Collecting six&gt;=1.2.0 (from django-simple-captcha)</span></span>
<span class="line"><span>  Downloading https://files.pythonhosted.org/packages/73/fb/00a976f728d0d1fecfe898238ce23f502a721c0ac0ecfedb80e0d88c64e9/six-1.12.0-py2.py3-none</span></span>
<span class="line"><span>-any.whl</span></span>
<span class="line"><span>Requirement already satisfied: Django&gt;=1.8 in d:\\work\\2019\\for_test\\mysite\\venv\\lib\\site-packages (from django-simple-captcha) (2.2)</span></span>
<span class="line"><span>Collecting Pillow!=5.1.0,&gt;=2.2.2 (from django-simple-captcha)</span></span>
<span class="line"><span>  Downloading https://files.pythonhosted.org/packages/40/f2/a424d4d5dd6aa8c26636969decbb3da1c01286d344e71429b1d648bccb64/Pillow-6.0.0-cp37-cp37m</span></span>
<span class="line"><span>-win_amd64.whl (2.0MB)</span></span>
<span class="line"><span>    100% |████████████████████████████████| 2.0MB 2.2MB/s</span></span>
<span class="line"><span>Collecting django-ranged-response==0.2.0 (from django-simple-captcha)</span></span>
<span class="line"><span>  Downloading https://files.pythonhosted.org/packages/70/e3/9372fcdca8e9c3205e7979528ccd1a14354a9a24d38efff11c1846ff8bf1/django-ranged-response-</span></span>
<span class="line"><span>0.2.0.tar.gz</span></span>
<span class="line"><span>Requirement already satisfied: sqlparse in d:\\work\\2019\\for_test\\mysite\\venv\\lib\\site-packages (from Django&gt;=1.8-&gt;django-simple-captcha) (0.3.0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Requirement already satisfied: pytz in d:\\work\\2019\\for_test\\mysite\\venv\\lib\\site-packages (from Django&gt;=1.8-&gt;django-simple-captcha) (2018.9)</span></span>
<span class="line"><span>Installing collected packages: six, Pillow, django-ranged-response, django-simple-captcha</span></span>
<span class="line"><span>  Running setup.py install for django-ranged-response ... done</span></span>
<span class="line"><span>  Running setup.py install for django-simple-captcha ... done</span></span>
<span class="line"><span>Successfully installed Pillow-6.0.0 django-ranged-response-0.2.0 django-simple-captcha-0.5.11 six-1.12.0</span></span></code></pre></div><p>pip自动帮我们安装了相关的依赖库<code>six</code>、<code>olefile</code>和<code>Pillow</code>，其中的Pillow是大名鼎鼎的绘图模块。</p><h2 id="二、注册captcha" tabindex="-1">二、注册captcha <a class="header-anchor" href="#二、注册captcha" aria-label="Permalink to &quot;二、注册captcha&quot;">​</a></h2><p>在settings中，将‘captcha’注册到app列表里：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># Application definition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSTALLED_APPS = [</span></span>
<span class="line"><span>    &#39;django.contrib.admin&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.auth&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.contenttypes&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.sessions&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.messages&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.staticfiles&#39;,</span></span>
<span class="line"><span>    &#39;login&#39;,</span></span>
<span class="line"><span>    &#39;captcha&#39;,</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>captcha需要在数据库中建立自己的数据表，所以需要执行migrate命令生成数据表：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>(venv) D:\\work\\2019\\for_test\\mysite&gt;python manage.py migrate</span></span>
<span class="line"><span>Operations to perform:</span></span>
<span class="line"><span>  Apply all migrations: admin, auth, captcha, contenttypes, login, sessions</span></span>
<span class="line"><span>Running migrations:</span></span>
<span class="line"><span>  Applying captcha.0001_initial... OK</span></span></code></pre></div><h2 id="三、添加url路由" tabindex="-1">三、添加url路由 <a class="header-anchor" href="#三、添加url路由" aria-label="Permalink to &quot;三、添加url路由&quot;">​</a></h2><p>在根目录下的urls.py文件中增加captcha对应的url：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.contrib import admin</span></span>
<span class="line"><span>from django.urls import path</span></span>
<span class="line"><span>from django.urls import include</span></span>
<span class="line"><span>from login import views</span></span>
<span class="line"><span></span></span>
<span class="line"><span>urlpatterns = [</span></span>
<span class="line"><span>    path(&#39;admin/&#39;, admin.site.urls),</span></span>
<span class="line"><span>    path(&#39;index/&#39;, views.index),</span></span>
<span class="line"><span>    path(&#39;login/&#39;, views.login),</span></span>
<span class="line"><span>    path(&#39;register/&#39;, views.register),</span></span>
<span class="line"><span>    path(&#39;logout/&#39;, views.logout),</span></span>
<span class="line"><span>    path(&#39;captcha/&#39;, include(&#39;captcha.urls&#39;))   # 增加这一行</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>由于使用了二级路由机制，需要在顶部<code>from django.urls import include</code>。</p><h2 id="四、修改forms-py" tabindex="-1">四、修改forms.py <a class="header-anchor" href="#四、修改forms-py" aria-label="Permalink to &quot;四、修改forms.py&quot;">​</a></h2><p>如果上面都OK了，就可以直接在我们的forms.py文件中添加CaptchaField了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django import forms</span></span>
<span class="line"><span>from captcha.fields import CaptchaField</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class UserForm(forms.Form):</span></span>
<span class="line"><span>    username = forms.CharField(label=&quot;用户名&quot;, max_length=128, widget=forms.TextInput(attrs={&#39;class&#39;: &#39;form-control&#39;, &#39;placeholder&#39;: &quot;Username&quot;,&#39;autofocus&#39;: &#39;&#39;}))</span></span>
<span class="line"><span>    password = forms.CharField(label=&quot;密码&quot;, max_length=256, widget=forms.PasswordInput(attrs={&#39;class&#39;: &#39;form-control&#39;,  &#39;placeholder&#39;: &quot;Password&quot;}))</span></span>
<span class="line"><span>    captcha = CaptchaField(label=&#39;验证码&#39;)</span></span></code></pre></div><p>注意需要提前导入<code>from captcha.fields import CaptchaField</code>，然后就像写普通的form字段一样添加一个captcha字段就可以了！</p><h2 id="五、修改login-html" tabindex="-1">五、修改login.html <a class="header-anchor" href="#五、修改login-html" aria-label="Permalink to &quot;五、修改login.html&quot;">​</a></h2><p>由于我们前面是手动生成的form表单，所以还要修改一下，添加captcha的相关内容，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% load static %}</span></span>
<span class="line"><span>&lt;!doctype html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>  &lt;head&gt;</span></span>
<span class="line"><span>    &lt;!-- Required meta tags --&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, shrink-to-fit=no&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- 上述meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ --&gt;</span></span>
<span class="line"><span>    &lt;!-- Bootstrap CSS --&gt;</span></span>
<span class="line"><span>    &lt;link href=&quot;https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;&gt;</span></span>
<span class="line"><span>    &lt;link href=&quot;{% static &#39;login/css/login.css&#39; %}&quot; rel=&quot;stylesheet&quot;/&gt;</span></span>
<span class="line"><span>    &lt;title&gt;登录&lt;/title&gt;</span></span>
<span class="line"><span>  &lt;/head&gt;</span></span>
<span class="line"><span>  &lt;body&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;col&quot;&gt;</span></span>
<span class="line"><span>                &lt;form class=&quot;form-login&quot; action=&quot;/login/&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                {% if login_form.captcha.errors %}</span></span>
<span class="line"><span>                    &lt;div class=&quot;alert alert-warning&quot;&gt;{{ login_form.captcha.errors }}&lt;/div&gt;</span></span>
<span class="line"><span>                {% elif message %}</span></span>
<span class="line"><span>                    &lt;div class=&quot;alert alert-warning&quot;&gt;{{ message }}&lt;/div&gt;</span></span>
<span class="line"><span>                {% endif %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  {% csrf_token %}</span></span>
<span class="line"><span>                  &lt;h3 class=&quot;text-center&quot;&gt;欢迎登录&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    {{ login_form.username.label_tag }}</span></span>
<span class="line"><span>                    {{ login_form.username}}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    {{ login_form.password.label_tag }}</span></span>
<span class="line"><span>                    {{ login_form.password }}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    {{ login_form.captcha.label_tag }}</span></span>
<span class="line"><span>                    {{ login_form.captcha }}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div&gt;</span></span>
<span class="line"><span>                      &lt;a href=&quot;/register/&quot; class=&quot;text-success &quot; &gt;&lt;ins&gt;新用户注册&lt;/ins&gt;&lt;/a&gt;</span></span>
<span class="line"><span>                      &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary float-right&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/form&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt; &lt;!-- /container --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- Optional JavaScript --&gt;</span></span>
<span class="line"><span>    &lt;!-- jQuery first, then Popper.js, then Bootstrap JS --&gt;</span></span>
<span class="line"><span>    {#    以下三者的引用顺序是固定的#}</span></span>
<span class="line"><span>    &lt;script src=&quot;https://cdn.bootcss.com/jquery/3.3.1/jquery.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://cdn.bootcss.com/popper.js/1.15.0/umd/popper.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div>`,26),g=s("code",null,"{% if %}",-1),h=s("h2",{id:"六、查看效果",tabindex:"-1"},[a("六、查看效果 "),s("a",{class:"header-anchor",href:"#六、查看效果","aria-label":'Permalink to "六、查看效果"'},"​")],-1),u=s("p",null,"重启服务器，进入登录页面，尝试用用户名错误、密码不对、验证码不对、全对的不同情况，看看我们新增的四位验证码的效果如何。",-1),m=s("p",null,[s("img",{src:o,alt:"image"})],-1),f=s("p",null,[s("img",{src:c,alt:"image"})],-1),b=s("p",null,[a("就是这么简单！我们加入了一个防止机器人或者恶意登录的图形验证码功能，虽然界面难看了点，但底子是好的，你可以根据需要进行美化。其中验证图形码是否正确的工作都是在后台自动完成的，只需要使用"),s("code",null,"is_valid()"),a("这个forms内置的验证方法就一起进行了，完全不需要在视图函数中添加任何的验证代码，非常方便快捷！")],-1),q=s("p",null,"关于captcha的功能，当然绝不仅限于此，你可以设置六位、八位验证码，可以对图形噪点的生成模式进行定制，这些就留待你自己学习和研究了。",-1);function _(n,v,y,k,j,w){return i(),t("div",null,[d,s("p",null,[a("这里在顶部的消息处，在"),g,a("模板代码中，额外增加了一条"),s("code",null,l(n.login_form.captcha.errors),1),a("的判断，用于明确指示用户的验证码不正确。")]),h,u,m,f,b,q])}const x=p(r,[["render",_]]);export{P as __pageData,x as default};
