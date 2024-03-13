import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const e="/assets/114-1.Dhxnknvj.png",l="/assets/114-2.BQEcDLhU.png",i="/assets/114-3.z1KE8aVh.png",t="/assets/114-5.BmwsbZeu.png",b=JSON.parse('{"title":"12. 邮件注册确认","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login12.md","filePath":"python-demo/login12.md"}'),c={name:"python-demo/login12.md"},r=p(`<h1 id="_12-邮件注册确认" tabindex="-1">12. 邮件注册确认 <a class="header-anchor" href="#_12-邮件注册确认" aria-label="Permalink to &quot;12. 邮件注册确认&quot;">​</a></h1><hr><p>很自然地，我们会想到如果能用邮件确认的方式对新注册用户进行审查，既安全又正式，也是目前很多站点的做法。</p><h2 id="一、-创建模型" tabindex="-1">一、 创建模型 <a class="header-anchor" href="#一、-创建模型" aria-label="Permalink to &quot;一、 创建模型&quot;">​</a></h2><p>既然要区分通过和未通过邮件确认的用户，那么必须给用户添加一个是否进行过邮件确认的属性。</p><p>另外，我们要创建一张新表，用于保存用户的确认码以及注册提交的时间。</p><p>全新、完整的<code>/login/models.py</code>文件如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.db import models</span></span>
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
<span class="line"><span>    has_confirmed = models.BooleanField(default=False)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span>        ordering = [&quot;-c_time&quot;]</span></span>
<span class="line"><span>        verbose_name = &quot;用户&quot;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;用户&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ConfirmString(models.Model):</span></span>
<span class="line"><span>    code = models.CharField(max_length=256)</span></span>
<span class="line"><span>    user = models.OneToOneField(&#39;User&#39;, on_delete=models.CASCADE)</span></span>
<span class="line"><span>    c_time = models.DateTimeField(auto_now_add=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        return self.user.name + &quot;:   &quot; + self.code</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Meta:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ordering = [&quot;-c_time&quot;]</span></span>
<span class="line"><span>        verbose_name = &quot;确认码&quot;</span></span>
<span class="line"><span>        verbose_name_plural = &quot;确认码&quot;</span></span></code></pre></div><p>说明：</p><ul><li>User模型新增了<code>has_confirmed</code>字段，这是个布尔值，默认为False，也就是未进行邮件注册；</li><li>ConfirmString模型保存了用户和注册码之间的关系，一对一的形式；</li><li>code字段是哈希后的注册码；</li><li>user是关联的一对一用户；</li><li><code>c_time</code>是注册的提交时间。</li></ul><p>这里有个问题可以讨论一下：是否需要创建ConfirmString新表？可否都放在User表里？我认为如果全都放在User中，不利于管理，查询速度慢，创建新表有利于区分已确认和未确认的用户。最终的选择可以根据你的实际情况具体分析。</p><p>模型修改和创建完毕，需要执行migrate命令，一定不要忘了。</p><p>顺便修改一下admin.py文件，方便我们在后台修改和观察数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># login/admin.py</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from django.contrib import admin</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Register your models here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from . import models</span></span>
<span class="line"><span></span></span>
<span class="line"><span>admin.site.register(models.User)</span></span>
<span class="line"><span>admin.site.register(models.ConfirmString)</span></span></code></pre></div><h2 id="二、修改视图" tabindex="-1">二、修改视图 <a class="header-anchor" href="#二、修改视图" aria-label="Permalink to &quot;二、修改视图&quot;">​</a></h2><p>首先，要修改我们的<code>register()</code>视图的逻辑：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def register(request):</span></span>
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
<span class="line"><span>                code = make_confirm_string(new_user)</span></span>
<span class="line"><span>                send_email(email, code)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                message = &#39;请前往邮箱进行确认！&#39;</span></span>
<span class="line"><span>                return render(request, &#39;login/confirm.html&#39;, locals())</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return render(request, &#39;login/register.html&#39;, locals())</span></span>
<span class="line"><span>    register_form = forms.RegisterForm()</span></span>
<span class="line"><span>    return render(request, &#39;login/register.html&#39;, locals())</span></span></code></pre></div><p>关键是多了下面两行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>code = make_confirm_string(new_user)</span></span>
<span class="line"><span>send_email(email, code)</span></span></code></pre></div><p><code>make_confirm_string()</code>是创建确认码对象的方法，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import datetime</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def make_confirm_string(user):</span></span>
<span class="line"><span>    now = datetime.datetime.now().strftime(&quot;%Y-%m-%d %H:%M:%S&quot;)</span></span>
<span class="line"><span>    code = hash_code(user.name, now)</span></span>
<span class="line"><span>    models.ConfirmString.objects.create(code=code, user=user,)</span></span>
<span class="line"><span>    return code</span></span></code></pre></div><p>在文件顶部要先导入<code>datetime</code>模块。</p><p><code>make_confirm_string()</code>方法接收一个用户对象作为参数。首先利用datetime模块生成一个当前时间的字符串now，再调用我们前面编写的<code>hash_code()</code>方法以用户名为基础，now为‘盐’，生成一个独一无二的哈希值，再调用ConfirmString模型的create()方法，生成并保存一个确认码对象。最后返回这个哈希值。</p><p><code>send_email(email, code)</code>方法接收两个参数，分别是注册的邮箱和前面生成的哈希值，代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.conf import settings</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def send_email(email, code):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    from django.core.mail import EmailMultiAlternatives</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    subject = &#39;来自注册测试确认邮件&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    text_content = &#39;&#39;&#39;感谢注册技术的分享！\\</span></span>
<span class="line"><span>                    如果你看到这条消息，说明你的邮箱服务器不提供HTML链接功能，请联系管理员！&#39;&#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    html_content = &#39;&#39;&#39;</span></span>
<span class="line"><span>                    &lt;p&gt;感谢注册&lt;a href=&quot;http://{}/confirm/?code={}&quot; target=blank&gt;www.liujiangblog.com&lt;/a&gt;，\\</span></span>
<span class="line"><span>                    测试&lt;/p&gt;</span></span>
<span class="line"><span>                    &lt;p&gt;请点击站点链接完成注册确认！&lt;/p&gt;</span></span>
<span class="line"><span>                    &lt;p&gt;此链接有效期为{}天！&lt;/p&gt;</span></span>
<span class="line"><span>                    &#39;&#39;&#39;.format(&#39;127.0.0.1:8000&#39;, code, settings.CONFIRM_DAYS)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [email])</span></span>
<span class="line"><span>    msg.attach_alternative(html_content, &quot;text/html&quot;)</span></span>
<span class="line"><span>    msg.send()</span></span></code></pre></div><p>首先我们需要导入settings配置文件<code>from django.conf import settings</code>。</p><p>邮件内容中的所有字符串都可以根据你的实际情况进行修改。其中关键在于<code>&lt;a href=&#39;&#39;&gt;</code>中链接地址的格式，我这里使用了硬编码的&#39;127.0.0.1:8000&#39;，请酌情修改，url里的参数名为<code>code</code>，它保存了关键的注册确认码，最后的有效期天数为设置在settings中的<code>CONFIRM_DAYS</code>。所有的这些都是可以定制的！</p><p>下面是邮件相关的settings配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 邮件配置</span></span>
<span class="line"><span>EMAIL_BACKEND = &#39;django.core.mail.backends.smtp.EmailBackend&#39;</span></span>
<span class="line"><span>EMAIL_HOST = &#39;smtp.sina.com&#39;</span></span>
<span class="line"><span>EMAIL_PORT = 25</span></span>
<span class="line"><span>EMAIL_HOST_USER = &#39;xxx@sina.com&#39;</span></span>
<span class="line"><span>EMAIL_HOST_PASSWORD = &#39;xxxxxx&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 注册有效期天数</span></span>
<span class="line"><span>CONFIRM_DAYS = 7</span></span></code></pre></div><h2 id="三、处理邮件确认请求" tabindex="-1">三、处理邮件确认请求 <a class="header-anchor" href="#三、处理邮件确认请求" aria-label="Permalink to &quot;三、处理邮件确认请求&quot;">​</a></h2><p>首先，在根目录的<code>urls.py</code>中添加一条url：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>path(&#39;confirm/&#39;, views.user_confirm),</span></span></code></pre></div><p>其次，在<code>login/views.py</code>中添加一个<code>user_confirm</code>视图。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def user_confirm(request):</span></span>
<span class="line"><span>    code = request.GET.get(&#39;code&#39;, None)</span></span>
<span class="line"><span>    message = &#39;&#39;</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        confirm = models.ConfirmString.objects.get(code=code)</span></span>
<span class="line"><span>    except:</span></span>
<span class="line"><span>        message = &#39;无效的确认请求!&#39;</span></span>
<span class="line"><span>        return render(request, &#39;login/confirm.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    c_time = confirm.c_time</span></span>
<span class="line"><span>    now = datetime.datetime.now()</span></span>
<span class="line"><span>    if now &gt; c_time + datetime.timedelta(settings.CONFIRM_DAYS):</span></span>
<span class="line"><span>        confirm.user.delete()</span></span>
<span class="line"><span>        message = &#39;您的邮件已经过期！请重新注册!&#39;</span></span>
<span class="line"><span>        return render(request, &#39;login/confirm.html&#39;, locals())</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        confirm.user.has_confirmed = True</span></span>
<span class="line"><span>        confirm.user.save()</span></span>
<span class="line"><span>        confirm.delete()</span></span>
<span class="line"><span>        message = &#39;感谢确认，请使用账户登录！&#39;</span></span>
<span class="line"><span>        return render(request, &#39;login/confirm.html&#39;, locals())</span></span></code></pre></div><p>说明：</p><ul><li>通过<code>request.GET.get(&#39;code&#39;, None)</code>从请求的url地址中获取确认码;</li><li>先去数据库内查询是否有对应的确认码;</li><li>如果没有，返回<code>confirm.html</code>页面，并提示;</li><li>如果有，获取注册的时间<code>c_time</code>，加上设置的过期天数，这里是7天，然后与现在时间点进行对比；</li><li>如果时间已经超期，删除注册的用户，同时注册码也会一并删除，然后返回<code>confirm.html</code>页面，并提示;</li><li>如果未超期，修改用户的<code>has_confirmed</code>字段为True，并保存，表示通过确认了。然后删除注册码，但不删除用户本身。最后返回<code>confirm.html</code>页面，并提示。</li></ul><p>这里需要一个<code>confirm.html</code>页面，我们将它创建在<code>/login/templates/login/</code>下面：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;注册确认&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;h1 style=&quot;margin-left: 100px;&quot;&gt;{{ message }}&lt;/h1&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        window.setTimeout(&quot;window.location=&#39;/login/&#39;&quot;,2000);</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>页面中通过JS代码，设置2秒后自动跳转到登录页面。</p><p>confirm.html页面仅仅是个示意的提示页面，你可以根据自己的需要去除或者美化。</p><h2 id="四、修改登录规则" tabindex="-1">四、修改登录规则 <a class="header-anchor" href="#四、修改登录规则" aria-label="Permalink to &quot;四、修改登录规则&quot;">​</a></h2><p>既然未进行邮件确认的用户不能登录，那么我们就必须修改登录规则，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def login(request):</span></span>
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
<span class="line"><span>            if not user.has_confirmed:</span></span>
<span class="line"><span>                message = &#39;该用户还未经过邮件确认！&#39;</span></span>
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
<span class="line"><span>    return render(request, &#39;login/login.html&#39;, locals())</span></span></code></pre></div><p>关键是下面的部分：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if not user.has_confirmed:</span></span>
<span class="line"><span>    message = &#39;该用户还未经过邮件确认！&#39;</span></span>
<span class="line"><span>    return render(request, &#39;login/login.html&#39;, locals())</span></span></code></pre></div><p>最后，贴出view.py的整体代码，供大家参考：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.shortcuts import render</span></span>
<span class="line"><span>from django.shortcuts import redirect</span></span>
<span class="line"><span>from django.conf import settings</span></span>
<span class="line"><span>from . import models</span></span>
<span class="line"><span>from . import forms</span></span>
<span class="line"><span>import hashlib</span></span>
<span class="line"><span>import datetime</span></span>
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
<span class="line"><span>def make_confirm_string(user):</span></span>
<span class="line"><span>    now = datetime.datetime.now().strftime(&quot;%Y-%m-%d %H:%M:%S&quot;)</span></span>
<span class="line"><span>    code = hash_code(user.name, now)</span></span>
<span class="line"><span>    models.ConfirmString.objects.create(code=code, user=user)</span></span>
<span class="line"><span>    return code</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def send_email(email, code):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    from django.core.mail import EmailMultiAlternatives</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    subject = &#39;来自www.liujiangblog.com的注册确认邮件&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    text_content = &#39;&#39;&#39;注册测试的分享！\\</span></span>
<span class="line"><span>                    如果你看到这条消息，说明你的邮箱服务器不提供HTML链接功能，请联系管理员！&#39;&#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    html_content = &#39;&#39;&#39;</span></span>
<span class="line"><span>                    &lt;p&gt;感谢注册&lt;a href=&quot;http://{}/confirm/?code={}&quot; target=blank&gt;test.com&lt;/a&gt;，\\</span></span>
<span class="line"><span>                    测试注册的分享！&lt;/p&gt;</span></span>
<span class="line"><span>                    &lt;p&gt;请点击站点链接完成注册确认！&lt;/p&gt;</span></span>
<span class="line"><span>                    &lt;p&gt;此链接有效期为{}天！&lt;/p&gt;</span></span>
<span class="line"><span>                    &#39;&#39;&#39;.format(&#39;127.0.0.1:8000&#39;, code, settings.CONFIRM_DAYS)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [email])</span></span>
<span class="line"><span>    msg.attach_alternative(html_content, &quot;text/html&quot;)</span></span>
<span class="line"><span>    msg.send()</span></span>
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
<span class="line"><span>            if not user.has_confirmed:</span></span>
<span class="line"><span>                message = &#39;该用户还未经过邮件确认！&#39;</span></span>
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
<span class="line"><span>                code = make_confirm_string(new_user)</span></span>
<span class="line"><span>                send_email(email, code)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                message = &#39;请前往邮箱进行确认！&#39;</span></span>
<span class="line"><span>                return render(request, &#39;login/confirm.html&#39;, locals())</span></span>
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
<span class="line"><span>    return redirect(&quot;/login/&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def user_confirm(request):</span></span>
<span class="line"><span>    code = request.GET.get(&#39;code&#39;, None)</span></span>
<span class="line"><span>    message = &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        confirm = models.ConfirmString.objects.get(code=code)</span></span>
<span class="line"><span>    except:</span></span>
<span class="line"><span>        message = &#39;无效的确认请求！&#39;</span></span>
<span class="line"><span>        return render(request, &#39;login/confirm.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    c_time = confirm.c_time</span></span>
<span class="line"><span>    now = datetime.datetime.now()</span></span>
<span class="line"><span>    if now &gt; c_time + datetime.timedelta(settings.CONFIRM_DAYS):</span></span>
<span class="line"><span>        confirm.user.delete()</span></span>
<span class="line"><span>        message = &#39;您的邮件已经过期！请重新注册！&#39;</span></span>
<span class="line"><span>        return render(request, &#39;login/confirm.html&#39;, locals())</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        confirm.user.has_confirmed = True</span></span>
<span class="line"><span>        confirm.user.save()</span></span>
<span class="line"><span>        confirm.delete()</span></span>
<span class="line"><span>        message = &#39;感谢确认，请使用账户登录！&#39;</span></span>
<span class="line"><span>        return render(request, &#39;login/confirm.html&#39;, locals())</span></span></code></pre></div><h2 id="五、功能展示" tabindex="-1">五、功能展示 <a class="header-anchor" href="#五、功能展示" aria-label="Permalink to &quot;五、功能展示&quot;">​</a></h2><p>首先，通过admin后台删除原来所有的用户。</p><p>进入注册页面，如下图所示：</p><p><img src="`+e+'" alt="image"></p><p>点击注册后，跳转到提示信息页面，2秒后再跳转到登录页面。</p><p>尝试登录用户，但提示还未进行邮件确认：</p><p><img src="'+l+'" alt="image"></p><p>进入admin后台，查看刚才建立的用户，可以看到其处于未确认状态：</p><p><img src="'+i+'" alt="image"></p><p>进入你的测试邮箱，查看注册邮件：</p><p>点击链接，自动跳转到确认成功提示页面，2秒后再跳转到登录页面。这个时候再次查看admin后台，可以看到用户已经处于登录确认状态，并且确认码也被自动删除了，不会第二次被使用：</p><p><img src="'+t+'" alt="image"></p><p>使用该用户正常登录吧！Very Good！一切都很不错！</p><h2 id="六、总结说明" tabindex="-1">六、总结说明 <a class="header-anchor" href="#六、总结说明" aria-label="Permalink to &quot;六、总结说明&quot;">​</a></h2><p>关于邮件注册，还有很多内容可以探讨，比如定时删除未在有效期内进行邮件确认的用户，这个可以用Django的celery实现，或者使用Linux的cronb功能。</p><p>关于邮件注册的工作逻辑，项目里只是抛砖引玉，做个展示，并不够严谨，也需要你自己根据实际环境去设计。</p><p>最后，其实Django生态圈有一个现成的邮件注册模块django-registration，但是这个模块灵活度不高，并且绑定了Auth框架，有兴趣的可以去看看其英文文档，中文资料较少。</p>',64),o=[r];function d(m,u,g,h,_,f){return a(),n("div",null,o)}const v=s(c,[["render",d]]);export{b as __pageData,v as default};
