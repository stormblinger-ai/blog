import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const e="/assets/112-1.W6lNwnr9.png",l="/assets/112-2.DSy6tSuR.png",t="/assets/112-3.T79ByCrn.png",i="/assets/112-4.CFp_M_2q.png",r="/assets/112-5.CrxFZ_hd.png",v=JSON.parse('{"title":"10. 注册视图","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login10.md","filePath":"python-demo/login10.md"}'),o={name:"python-demo/login10.md"},c=p(`<h1 id="_10-注册视图" tabindex="-1">10. 注册视图 <a class="header-anchor" href="#_10-注册视图" aria-label="Permalink to &quot;10. 注册视图&quot;">​</a></h1><hr><p>前面我们已经完成了项目大部分内容，现在还剩下重要的注册功能没有实现。</p><h2 id="一、创建forms" tabindex="-1">一、创建forms <a class="header-anchor" href="#一、创建forms" aria-label="Permalink to &quot;一、创建forms&quot;">​</a></h2><p>显而易见，我们的注册页面也需要一个form表单。同样地，在<code>/login/forms.py</code>中添加一个新的表单类：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class RegisterForm(forms.Form):</span></span>
<span class="line"><span>    gender = (</span></span>
<span class="line"><span>        (&#39;male&#39;, &quot;男&quot;),</span></span>
<span class="line"><span>        (&#39;female&#39;, &quot;女&quot;),</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    username = forms.CharField(label=&quot;用户名&quot;, max_length=128, widget=forms.TextInput(attrs={&#39;class&#39;: &#39;form-control&#39;}))</span></span>
<span class="line"><span>    password1 = forms.CharField(label=&quot;密码&quot;, max_length=256, widget=forms.PasswordInput(attrs={&#39;class&#39;: &#39;form-control&#39;}))</span></span>
<span class="line"><span>    password2 = forms.CharField(label=&quot;确认密码&quot;, max_length=256, widget=forms.PasswordInput(attrs={&#39;class&#39;: &#39;form-control&#39;}))</span></span>
<span class="line"><span>    email = forms.EmailField(label=&quot;邮箱地址&quot;, widget=forms.EmailInput(attrs={&#39;class&#39;: &#39;form-control&#39;}))</span></span>
<span class="line"><span>    sex = forms.ChoiceField(label=&#39;性别&#39;, choices=gender)</span></span>
<span class="line"><span>    captcha = CaptchaField(label=&#39;验证码&#39;)</span></span></code></pre></div><p>说明：</p><ul><li>gender字典和User模型中的一样，其实可以拉出来作为常量共用，为了直观，特意重写一遍；</li><li>password1和password2，用于输入两遍密码，并进行比较，防止误输密码；</li><li>email是一个邮箱输入框；</li><li>sex是一个select下拉框；</li><li>没有添加更多的input属性</li></ul><h2 id="二、完善register-html" tabindex="-1">二、完善register.html <a class="header-anchor" href="#二、完善register-html" aria-label="Permalink to &quot;二、完善register.html&quot;">​</a></h2><p>同样地，类似login.html文件，我们手工在register.html中编写forms相关条目：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% load static %}</span></span>
<span class="line"><span>&lt;!doctype html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>  &lt;head&gt;</span></span>
<span class="line"><span>    &lt;!-- Required meta tags --&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, shrink-to-fit=no&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- 上述meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ --&gt;</span></span>
<span class="line"><span>    &lt;!-- Bootstrap CSS --&gt;</span></span>
<span class="line"><span>    &lt;link href=&quot;https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;&gt;</span></span>
<span class="line"><span>    &lt;link href=&quot;{% static &#39;login/css/register.css&#39; %}&quot; rel=&quot;stylesheet&quot;/&gt;</span></span>
<span class="line"><span>    &lt;title&gt;注册&lt;/title&gt;</span></span>
<span class="line"><span>  &lt;/head&gt;</span></span>
<span class="line"><span>  &lt;body&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;col&quot;&gt;</span></span>
<span class="line"><span>                &lt;form class=&quot;form-register&quot; action=&quot;/register/&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    {% if register_form.captcha.errors %}</span></span>
<span class="line"><span>                        &lt;div class=&quot;alert alert-warning&quot;&gt;{{ register_form.captcha.errors }}&lt;/div&gt;</span></span>
<span class="line"><span>                    {% elif message %}</span></span>
<span class="line"><span>                        &lt;div class=&quot;alert alert-warning&quot;&gt;{{ message }}&lt;/div&gt;</span></span>
<span class="line"><span>                    {% endif %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  {% csrf_token %}</span></span>
<span class="line"><span>                  &lt;h3 class=&quot;text-center&quot;&gt;欢迎注册&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                      {{ register_form.username.label_tag }}</span></span>
<span class="line"><span>                      {{ register_form.username}}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                      {{ register_form.password1.label_tag }}</span></span>
<span class="line"><span>                      {{ register_form.password1 }}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                      {{ register_form.password2.label_tag }}</span></span>
<span class="line"><span>                      {{ register_form.password2 }}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                      {{ register_form.email.label_tag }}</span></span>
<span class="line"><span>                      {{ register_form.email }}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                      {{ register_form.sex.label_tag }}</span></span>
<span class="line"><span>                      {{ register_form.sex }}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                      {{ register_form.captcha.label_tag }}</span></span>
<span class="line"><span>                      {{ register_form.captcha }}</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div&gt;</span></span>
<span class="line"><span>                      &lt;a href=&quot;/login/&quot;  &gt;&lt;ins&gt;直接登录&lt;/ins&gt;&lt;/a&gt;</span></span>
<span class="line"><span>                      &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary float-right&quot;&gt;注册&lt;/button&gt;</span></span>
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
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>需要注意的是：</p><ul><li>编写了一个register.css样式文件</li><li>form标签的action地址为<code>/register/</code>，class为<code>form-register</code></li><li>from中传递过来的表单变量名字为<code>register_form</code></li><li>最下面的链接修改为直接登录的链接</li></ul><p>register.css样式文件的代码很简单，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>body {</span></span>
<span class="line"><span>  height: 100%;</span></span>
<span class="line"><span>  background-image: url(&#39;../image/bg.jpg&#39;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.form-register {</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>  max-width: 400px;</span></span>
<span class="line"><span>  padding: 15px;</span></span>
<span class="line"><span>  margin: 0 auto;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.form-group {</span></span>
<span class="line"><span>  margin-bottom: 5px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>form a{</span></span>
<span class="line"><span>  display: inline-block;</span></span>
<span class="line"><span>  margin-top:25px;</span></span>
<span class="line"><span>  line-height: 10px;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="三、实现注册视图" tabindex="-1">三、实现注册视图 <a class="header-anchor" href="#三、实现注册视图" aria-label="Permalink to &quot;三、实现注册视图&quot;">​</a></h2><p>进入<code>/login/views.py</code>文件，现在来完善我们的<code>register()</code>视图：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def register(request):</span></span>
<span class="line"><span>    if request.session.get(&#39;is_login&#39;, None):</span></span>
<span class="line"><span>        return redirect(&#39;/index/&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if request.method == &#39;POST&#39;:</span></span>
<span class="line"><span>        register_form = forms.RegisterForm(request.POST)</span></span>
<span class="line"><span>        message = &quot;请检查填写的内容！&quot;</span></span>
<span class="line"><span>        if register_form.is_valid():</span></span>
<span class="line"><span>            username = register_form.cleaned_data.get(&#39;username&#39;)</span></span>
<span class="line"><span>            password1 = register_form.cleaned_data.get(&#39;password1&#39;)</span></span>
<span class="line"><span>            password2 = register_form.cleaned_data.get(&#39;password2&#39;)</span></span>
<span class="line"><span>            email = register_form.cleaned_data.get(&#39;email&#39;)</span></span>
<span class="line"><span>            sex = register_form.cleaned_data.get(&#39;sex&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if password1 != password2:</span></span>
<span class="line"><span>                message = &#39;两次输入的密码不同！&#39;</span></span>
<span class="line"><span>                return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                same_name_user = models.User.objects.filter(name=username)</span></span>
<span class="line"><span>                if same_name_user:</span></span>
<span class="line"><span>                    message = &#39;用户名已经存在&#39;</span></span>
<span class="line"><span>                    return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span>                same_email_user = models.User.objects.filter(email=email)</span></span>
<span class="line"><span>                if same_email_user:</span></span>
<span class="line"><span>                    message = &#39;该邮箱已经被注册了！&#39;</span></span>
<span class="line"><span>                    return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                new_user = models.User()</span></span>
<span class="line"><span>                new_user.name = username</span></span>
<span class="line"><span>                new_user.password = password1</span></span>
<span class="line"><span>                new_user.email = email</span></span>
<span class="line"><span>                new_user.sex = sex</span></span>
<span class="line"><span>                new_user.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                return redirect(&#39;/login/&#39;)</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span>    register_form = forms.RegisterForm()</span></span>
<span class="line"><span>    return render(request, &#39;login/register.html&#39;, locals())</span></span></code></pre></div><p>从大体逻辑上，也是先实例化一个RegisterForm的对象，然后使用<code>is_valide()</code>验证数据，再从<code>cleaned_data</code>中获取数据。</p><p>重点在于注册逻辑，首先两次输入的密码必须相同，其次不能存在相同用户名和邮箱，最后如果条件都满足，利用ORM的API，创建一个用户实例，然后保存到数据库内。</p><p>对于注册的逻辑，不同的生产环境有不同的要求，请跟进实际情况自行完善，这里只是一个基本的注册过程，不能生搬照抄。</p><p>让我们看一下注册的页面：</p><p><img src="`+e+'" alt="image"></p><p>你可以尝试用不同的情况进行注册，然后观察错误信息的提示:</p><p><img src="'+l+'" alt="image"></p><p>最后进行一次成功地注册，会自动跳转到登录页面。我们进入admin后台，查看一下用户列表：</p><p><img src="'+t+'" alt="image"></p><p><img src="'+i+`" alt="image"></p><h2 id="四、密码加密" tabindex="-1">四、密码加密 <a class="header-anchor" href="#四、密码加密" aria-label="Permalink to &quot;四、密码加密&quot;">​</a></h2><p>等等！我们好像忘了什么！我们到现在都还一直在用明文的密码！</p><p>对于如何加密密码，有很多不同的途径，其安全程度也高低不等。这里我们使用Python内置的hashlib库，使用哈希值的方式加密密码，可能安全等级不够高，但足够简单，方便使用，不是么？</p><p>首先在<code>login/views.py</code>中编写一个hash函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import hashlib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def hash_code(s, salt=&#39;mysite&#39;):# 加点盐</span></span>
<span class="line"><span>    h = hashlib.sha256()</span></span>
<span class="line"><span>    s += salt</span></span>
<span class="line"><span>    h.update(s.encode())  # update方法只接收bytes类型</span></span>
<span class="line"><span>    return h.hexdigest()</span></span></code></pre></div><p>使用了sha256算法，加了点盐。具体的内容可以参考站点内的Python教程中hashlib库章节。</p><p>然后，我们还要对login()和register()视图进行一下修改：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.shortcuts import render</span></span>
<span class="line"><span>from django.shortcuts import redirect</span></span>
<span class="line"><span>from . import models</span></span>
<span class="line"><span>from . import forms</span></span>
<span class="line"><span>import hashlib</span></span>
<span class="line"><span># Create your views here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def hash_code(s, salt=&#39;mysite&#39;):</span></span>
<span class="line"><span>    h = hashlib.sha256()</span></span>
<span class="line"><span>    s += salt</span></span>
<span class="line"><span>    h.update(s.encode())</span></span>
<span class="line"><span>    return h.hexdigest()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def index(request):</span></span>
<span class="line"><span>    if not request.session.get(&#39;is_login&#39;, None):</span></span>
<span class="line"><span>        return redirect(&#39;/login/&#39;)</span></span>
<span class="line"><span>    return render(request, &#39;login/index.html&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def login(request):</span></span>
<span class="line"><span>    if request.session.get(&#39;is_login&#39;, None):  # 不允许重复登录</span></span>
<span class="line"><span>        return redirect(&#39;/index/&#39;)</span></span>
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
<span class="line"><span>            if user.password == hash_code(password):</span></span>
<span class="line"><span>                request.session[&#39;is_login&#39;] = True</span></span>
<span class="line"><span>                request.session[&#39;user_id&#39;] = user.id</span></span>
<span class="line"><span>                request.session[&#39;user_name&#39;] = user.name</span></span>
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
<span class="line"><span>    if request.session.get(&#39;is_login&#39;, None):</span></span>
<span class="line"><span>        return redirect(&#39;/index/&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if request.method == &#39;POST&#39;:</span></span>
<span class="line"><span>        register_form = forms.RegisterForm(request.POST)</span></span>
<span class="line"><span>        message = &quot;请检查填写的内容！&quot;</span></span>
<span class="line"><span>        if register_form.is_valid():</span></span>
<span class="line"><span>            username = register_form.cleaned_data.get(&#39;username&#39;)</span></span>
<span class="line"><span>            password1 = register_form.cleaned_data.get(&#39;password1&#39;)</span></span>
<span class="line"><span>            password2 = register_form.cleaned_data.get(&#39;password2&#39;)</span></span>
<span class="line"><span>            email = register_form.cleaned_data.get(&#39;email&#39;)</span></span>
<span class="line"><span>            sex = register_form.cleaned_data.get(&#39;sex&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if password1 != password2:</span></span>
<span class="line"><span>                message = &#39;两次输入的密码不同！&#39;</span></span>
<span class="line"><span>                return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                same_name_user = models.User.objects.filter(name=username)</span></span>
<span class="line"><span>                if same_name_user:</span></span>
<span class="line"><span>                    message = &#39;用户名已经存在&#39;</span></span>
<span class="line"><span>                    return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span>                same_email_user = models.User.objects.filter(email=email)</span></span>
<span class="line"><span>                if same_email_user:</span></span>
<span class="line"><span>                    message = &#39;该邮箱已经被注册了！&#39;</span></span>
<span class="line"><span>                    return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                new_user = models.User()</span></span>
<span class="line"><span>                new_user.name = username</span></span>
<span class="line"><span>                new_user.password = hash_code(password1)</span></span>
<span class="line"><span>                new_user.email = email</span></span>
<span class="line"><span>                new_user.sex = sex</span></span>
<span class="line"><span>                new_user.save()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                return redirect(&#39;/login/&#39;)</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span>    register_form = forms.RegisterForm()</span></span>
<span class="line"><span>    return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def logout(request):</span></span>
<span class="line"><span>    if not request.session.get(&#39;is_login&#39;, None):</span></span>
<span class="line"><span>        return redirect(&#39;/login/&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    request.session.flush()</span></span>
<span class="line"><span>    # del request.session[&#39;is_login&#39;]</span></span>
<span class="line"><span>    return redirect(&quot;/login/&quot;)</span></span></code></pre></div><p>注意其中关于密码处理的部分！</p><p>好了，我们可以来验证一下了!但是，**请先在admin后台里，把我们前面创建的测试用户全部删除！**因为它们的密码没有使用哈希算法加密，已经无效了。</p><p>重启服务器，进入注册页面，新建一个用户，然后进入admin后台，查看用户的密码情况：</p><p><img src="`+r+'" alt="image"></p><p>再使用该用户登录一下，大功告成！</p><p>可以看到密码长度根据你哈希算法的不同，已经变得很长了，所以前面model中设置password字段时，不要想当然的将<code>max_length</code>设置为16这么小的数字。</p>',42),g=[c];function d(m,u,h,_,f,q){return a(),n("div",null,g)}const w=s(o,[["render",d]]);export{v as __pageData,w as default};
