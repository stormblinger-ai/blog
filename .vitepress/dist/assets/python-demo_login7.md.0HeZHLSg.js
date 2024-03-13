import{_ as p,c as e,m as s,a as n,t,a5 as l,o}from"./chunks/framework.BthLuVtL.js";const i="/assets/109-1.Bd6QkTGm.png",c="/assets/109-2.DI85ksQL.png",r="/assets/109-3.RWwlkYQO.png",U=JSON.parse('{"title":"7. Django表单","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login7.md","filePath":"python-demo/login7.md"}'),u={name:"python-demo/login7.md"},d=l(`<h1 id="_7-django表单" tabindex="-1">7. Django表单 <a class="header-anchor" href="#_7-django表单" aria-label="Permalink to &quot;7. Django表单&quot;">​</a></h1><hr><p>我们前面都是手工在HTML文件中编写表单form元素，然后在views.py的视图函数中接收表单中的用户数据，再编写验证代码进行验证，最后使用ORM进行数据库的增删改查。这样费时费力，整个过程比较复杂，而且有可能写得不太恰当，数据验证也比较麻烦。设想一下，如果我们的表单拥有几十上百个数据字段，有不同的数据特点，如果也使用手工的方式，其效率和正确性都将无法得到保障。有鉴于此，Django在内部集成了一个表单功能，以面向对象的方式，直接使用Python代码生成HTML表单代码，专门帮助我们快速处理表单相关的内容。</p><p>Django的表单给我们提供了下面三个主要功能：</p><ul><li>准备和重构数据用于页面渲染；</li><li>为数据创建HTML表单元素；</li><li>接收和处理用户从表单发送过来的数据。</li></ul><p>编写Django的form表单，非常类似我们在模型系统里编写一个模型。在模型中，一个字段代表数据表的一列，而form表单中的一个字段代表<code>&lt;form&gt;</code>中的一个<code>&lt;input&gt;</code>元素。</p><h2 id="一、创建表单模型" tabindex="-1">一、创建表单模型 <a class="header-anchor" href="#一、创建表单模型" aria-label="Permalink to &quot;一、创建表单模型&quot;">​</a></h2><p>在项目根目录的login文件夹下，新建一个<code>forms.py</code>文件，也就是<code>/login/forms.py</code>，又是我们熟悉的Django组织文件的套路，一个app一套班子！</p><p>在<code>/login/forms.py</code>中写入下面的代码，是不是有一种编写数据model模型的既视感？</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django import forms</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class UserForm(forms.Form):</span></span>
<span class="line"><span>    username = forms.CharField(label=&quot;用户名&quot;, max_length=128)</span></span>
<span class="line"><span>    password = forms.CharField(label=&quot;密码&quot;, max_length=256, widget=forms.PasswordInput)</span></span></code></pre></div><p>说明：</p><ul><li>顶部要先导入forms模块</li><li>所有的表单类都要继承forms.Form类</li><li>每个表单字段都有自己的字段类型比如CharField，它们分别对应一种HTML语言中<code>&lt;form&gt;</code>内的一个input元素。这一点和Django模型系统的设计非常相似。</li><li>label参数用于设置<code>&lt;label&gt;</code>标签</li><li><code>max_length</code>限制字段输入的最大长度。它同时起到两个作用，一是在浏览器页面限制用户输入不可超过字符数，二是在后端服务器验证用户输入的长度也不可超过。</li><li><code>widget=forms.PasswordInput</code>用于指定该字段在form表单里表现为<code>&lt;input type=&#39;password&#39; /&gt;</code>，也就是密码输入框。</li></ul><h2 id="二、修改视图" tabindex="-1">二、修改视图 <a class="header-anchor" href="#二、修改视图" aria-label="Permalink to &quot;二、修改视图&quot;">​</a></h2><p>使用了Django的表单后，就要在视图中进行相应的修改：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># login/views.py</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from django.shortcuts import render</span></span>
<span class="line"><span>from django.shortcuts import redirect</span></span>
<span class="line"><span>from . import models</span></span>
<span class="line"><span>from . import forms</span></span>
<span class="line"><span># Create your views here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def index(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return render(request, &#39;login/index.html&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def login(request):</span></span>
<span class="line"><span>    if request.method == &#39;POST&#39;:</span></span>
<span class="line"><span>        login_form = forms.UserForm(request.POST)</span></span>
<span class="line"><span>        message = &#39;请检查填写的内容！&#39;</span></span>
<span class="line"><span>        if login_form.is_valid():</span></span>
<span class="line"><span>            username = login_form.cleaned_data.get(&#39;username&#39;)</span></span>
<span class="line"><span>            password = login_form.cleaned_data.get(&#39;password&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            try:</span></span>
<span class="line"><span>                user = models.User.objects.get(name=username)</span></span>
<span class="line"><span>            except :</span></span>
<span class="line"><span>                message = &#39;用户不存在！&#39;</span></span>
<span class="line"><span>                return render(request, &#39;login/login.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if user.password == password:</span></span>
<span class="line"><span>                return redirect(&#39;/index/&#39;)</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                message = &#39;密码不正确！&#39;</span></span>
<span class="line"><span>                return render(request, &#39;login/login.html&#39;, locals())</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return render(request, &#39;login/login.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    login_form = forms.UserForm()</span></span>
<span class="line"><span>    return render(request, &#39;login/login.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def register(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return render(request, &#39;login/register.html&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def logout(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return redirect(&quot;/login/&quot;)</span></span></code></pre></div><p>说明：</p><ul><li>在顶部要导入我们写的forms模块:<code>from . import forms</code></li><li>对于非POST方法发送数据时，比如GET方法请求页面，返回空的表单，让用户可以填入数据；</li><li>对于POST方法，接收表单数据，并验证；</li><li>使用表单类自带的<code>is_valid()</code>方法一步完成数据验证工作；</li><li>验证成功后可以从表单对象的<code>cleaned_data</code>数据字典中获取表单的具体值；</li><li>如果验证不通过，则返回一个包含先前数据的表单给前端页面，方便用户修改。也就是说，它会帮你保留先前填写的数据内容，而不是返回一个空表！</li></ul><p>另外，这里使用了一个小技巧，Python内置了一个locals()函数，它返回当前所有的本地变量字典，我们可以偷懒的将这作为render函数的数据字典参数值，就不用费劲去构造一个形如<code>{&#39;message&#39;:message, &#39;login_form&#39;:login_form}</code>的字典了。这样做的好处当然是大大方便了我们，但是同时也可能往模板传入了一些多余的变量数据，造成数据冗余降低效率。</p><h2 id="三、-修改login页面" tabindex="-1">三、 修改login页面 <a class="header-anchor" href="#三、-修改login页面" aria-label="Permalink to &quot;三、 修改login页面&quot;">​</a></h2><p>Django的表单很重要的一个功能就是自动生成HTML的form表单内容。现在，我们需要修改一下原来的<code>login.html</code>文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% load static %}</span></span>
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
<span class="line"><span>                  {% if message %}</span></span>
<span class="line"><span>                    &lt;div class=&quot;alert alert-warning&quot;&gt;{{ message }}&lt;/div&gt;</span></span>
<span class="line"><span>                  {% endif %}</span></span>
<span class="line"><span>                  {% csrf_token %}</span></span>
<span class="line"><span>                  &lt;h3 class=&quot;text-center&quot;&gt;欢迎登录&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  {{ login_form }}</span></span>
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
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>上面贴了一个完整版的代码，方便大家对比参考。</p><p>说明：</p>`,23),g=s("code",null,"login_form",-1),m=s("li",null,[n("但是，它不会生成"),s("code",null,"<form>...</form>"),n("标签，这个要自己写；")],-1),h=s("li",null,[n("使用POST的方法时，必须添加"),s("code",null,"{% csrf_token %}"),n("标签，用于处理csrf安全机制；")],-1),q=s("li",null,"Django自动为每个input元素设置了一个id名称，对应label的for参数",-1),_=s("li",null,"注册链接和登录按钮需要自己写，Django不会帮你生成！",-1),f=l(`<p>我们到浏览器中，看下实际生成的html源码是什么：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;form class=&quot;form-login&quot; action=&quot;/login/&quot; method=&quot;post&quot;&gt; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;input type=&quot;hidden&quot; name=&quot;csrfmiddlewaretoken&quot; value=&quot;5oJMX0z8PkUXY7RPDPGjaD2Q28CndXKeKWlftJD6s0XM1NIUEi7a0iET1NCYikUw&quot;&gt; </span></span>
<span class="line"><span>  &lt;h3 class=&quot;text-center&quot;&gt;欢迎登录&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;tr&gt;&lt;th&gt;&lt;label for=&quot;id_username&quot;&gt;用户名:&lt;/label&gt;&lt;/th&gt;&lt;td&gt;&lt;input type=&quot;text&quot; name=&quot;username&quot; maxlength=&quot;128&quot; required id=&quot;id_username&quot;&gt;&lt;/td&gt;&lt;/tr&gt; </span></span>
<span class="line"><span>  &lt;tr&gt;&lt;th&gt;&lt;label for=&quot;id_password&quot;&gt;密码:&lt;/label&gt;&lt;/th&gt;&lt;td&gt;&lt;input type=&quot;password&quot; name=&quot;password&quot; maxlength=&quot;256&quot; required id=&quot;id_password&quot;&gt;&lt;/td&gt;&lt;/tr&gt; </span></span>
<span class="line"><span>  &lt;div&gt; </span></span>
<span class="line"><span>    &lt;a href=&quot;[/register/](http://127.0.0.1:8000/register/)&quot; class=&quot;text-success &quot; &gt;&lt;ins&gt;新用户注册&lt;/ins&gt;&lt;/a&gt; </span></span>
<span class="line"><span>    &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary float-right&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>  &lt;/div&gt; </span></span>
<span class="line"><span>&lt;/form&gt;</span></span></code></pre></div><p>也就是说，Django的form表单功能，帮你自动生成了下面部分的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;tr&gt;&lt;th&gt;&lt;label for=&quot;id_username&quot;&gt;用户名:&lt;/label&gt;&lt;/th&gt;&lt;td&gt;&lt;input type=&quot;text&quot; name=&quot;username&quot; maxlength=&quot;128&quot; required id=&quot;id_username&quot;&gt;&lt;/td&gt;&lt;/tr&gt; </span></span>
<span class="line"><span>  &lt;tr&gt;&lt;th&gt;&lt;label for=&quot;id_password&quot;&gt;密码:&lt;/label&gt;&lt;/th&gt;&lt;td&gt;&lt;input type=&quot;password&quot; name=&quot;password&quot; maxlength=&quot;256&quot; required id=&quot;id_password&quot;&gt;&lt;/td&gt;&lt;/tr&gt;</span></span></code></pre></div><p>这看起来好像一个<code>&lt;table&gt;</code>标签啊？没错，就是<code>&lt;table&gt;</code>标签，而且是不带<code>&lt;table&gt;&lt;/table&gt;</code>的，捂脸！</p>`,5),b=s("code",null,"<tr>",-1),v=s("code",null,"<p>",-1),y=s("code",null,"<li>",-1),k=s("p",null,[n("注意：上面的渲染方法中都要自己手动编写"),s("code",null,"<table>"),n("或者"),s("code",null,"<ul>"),n("标签。")],-1),w=s("p",null,"重新启动服务器，刷新页面，如下图所示：",-1),T=s("p",null,[s("img",{src:i,alt:"image"})],-1),j=s("h2",{id:"四、手动渲染表单字段",tabindex:"-1"},[n("四、手动渲染表单字段 "),s("a",{class:"header-anchor",href:"#四、手动渲染表单字段","aria-label":'Permalink to "四、手动渲染表单字段"'},"​")],-1),C=l(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>  {{ login_form.username.label_tag }}</span></span>
<span class="line"><span>  {{ login_form.username}}</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>  {{ login_form.password.label_tag }}</span></span>
<span class="line"><span>  {{ login_form.password }}</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p>其中的label标签可以用<code>label_tag</code>方法来生成。这样子更加灵活了,但是灵活的代价就是我们要写更多的代码，又偏向原生的HTML代码多了一点。</p><p>但是问题又...又...又来了！刷新登录页面，却是下图的样子：</p><p><img src="`+c+`" alt="image"></p><p>好像Bootstrap4没有生效呀！仔细查看最终生成的页面源码，你会发现，input元素里少了<code>form-control</code>的class，以及placeholder和autofocus，这可咋办？</p><p>在form类里添加attr属性即可，如下所示修改<code>login/forms.py</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django import forms</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class UserForm(forms.Form):</span></span>
<span class="line"><span>    username = forms.CharField(label=&quot;用户名&quot;, max_length=128, widget=forms.TextInput(attrs={&#39;class&#39;: &#39;form-control&#39;, &#39;placeholder&#39;: &quot;Username&quot;,&#39;autofocus&#39;: &#39;&#39;}))</span></span>
<span class="line"><span>    password = forms.CharField(label=&quot;密码&quot;, max_length=256, widget=forms.PasswordInput(attrs={&#39;class&#39;: &#39;form-control&#39;,&#39;placeholder&#39;: &quot;Password&quot;}))</span></span></code></pre></div><p>再次刷新页面，我们熟悉的Bootstrap4框架UI又回来了！</p><p><img src="`+r+'" alt="image"></p>',9);function P(a,D,x,S,I,F){return o(),e("div",null,[d,s("ul",null,[s("li",null,[n("你没有看错！一个"),s("code",null,t(a.login_form),1),n("就直接完成了表单内容的生成工作！"),g,n("这个名称来自你在视图函数中生成的form实例的变量名！")]),m,h,q,_]),f,s("p",null,[n("实际上除了通过"),s("code",null,t(a.login_form),1),n("简单地将表单渲染到HTML页面中了，还有下面几种方式：")]),s("ul",null,[s("li",null,[s("code",null,t(a.login_form.as_table),1),n(" 将表单渲染成一个表格元素，每个输入框作为一个"),b,n("标签")]),s("li",null,[s("code",null,t(a.login_form.as_p),1),n(" 将表单的每个输入框包裹在一个"),v,n("标签内")]),s("li",null,[s("code",null,t(a.login_form.as_ul),1),n(" 将表单渲染成一个列表元素，每个输入框作为一个"),y,n("标签")])]),k,w,T,j,s("p",null,[n("直接"),s("code",null,t(a.login_form),1),n("虽然好，啥都不用操心，但是界面真的很丑，并且我们先前使用的Bootstraps4都没了。因为这些都需要对表单内的input元素进行额外控制，那怎么办呢？手动渲染字段就可以了！")]),s("p",null,[n("可以通过"),s("code",null,t(a.login_form.name_of_field),1),n("获取每一个字段，然后分别渲染，如下例所示：")]),C,s("p",null,[n("实际上，Django针对"),s("code",null,t(a.login_form),1),n("表单，提供了很多灵活的模板语法，可以循环，可以取值，可以针对可见和不可见的部分单独控制，详细内容可以参考教程前面的章节。")])])}const A=p(u,[["render",P]]);export{U as __pageData,A as default};
