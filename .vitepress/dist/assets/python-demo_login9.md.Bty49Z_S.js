import{_ as l,c as i,m as s,a as n,t as e,a5 as p,o}from"./chunks/framework.BthLuVtL.js";const t="/assets/111-1.CK9ZY3MQ.png",b=JSON.parse('{"title":"9. session会话","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login9.md","filePath":"python-demo/login9.md"}'),c={name:"python-demo/login9.md"},r=p(`<h1 id="_9-session会话" tabindex="-1">9. session会话 <a class="header-anchor" href="#_9-session会话" aria-label="Permalink to &quot;9. session会话&quot;">​</a></h1><hr><p>因为因特网HTTP协议的特性，每一次来自于用户浏览器的请求（request）都是无状态的、独立的。通俗地说，就是无法保存用户状态，后台服务器根本就不知道当前请求和以前及以后请求是否来自同一用户。对于静态网站，这可能不是个问题，而对于动态网站，尤其是京东、天猫、银行等购物或金融网站，无法识别用户并保持用户状态是致命的，根本就无法提供服务。你可以尝试将浏览器的cookie功能关闭，你会发现将无法在京东登录和购物。</p><p>为了实现连接状态的保持功能，网站会通过用户的浏览器在用户机器内被限定的硬盘位置中写入一些数据，也就是所谓的Cookie。通过Cookie可以保存一些诸如用户名、浏览记录、表单记录、登录和注销等各种数据。但是这种方式非常不安全，因为Cookie保存在用户的机器上，如果Cookie被伪造、篡改或删除，就会造成极大的安全威胁，因此，现代网站设计通常将Cookie用来保存一些不重要的内容，实际的用户数据和状态还是以Session会话的方式保存在服务器端。</p><p>但是，必须清楚的是<strong>Session依赖Cookie</strong>！不同的地方在于Session将所有的数据都放在服务器端，用户浏览器的Cookie中只会保存一个非明文的识别信息，比如哈希值。</p><p>Django提供了一个通用的Session框架，并且可以使用多种session数据的保存方式：</p><ul><li>保存在数据库内</li><li>保存到缓存</li><li>保存到文件内</li><li>保存到cookie内</li></ul><p>通常情况，没有特别需求的话，请使用保存在数据库内的方式，尽量不要保存到Cookie内。</p><p>Django的session框架默认启用，并已经注册在app设置内，如果真的没有启用，那么参考下面的内容添加有说明的那两行，再执行migrate命令创建数据表，就可以使用session了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># Application definition</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSTALLED_APPS = [</span></span>
<span class="line"><span>    &#39;django.contrib.admin&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.auth&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.contenttypes&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.sessions&#39;,    # 这一行</span></span>
<span class="line"><span>    &#39;django.contrib.messages&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.staticfiles&#39;,</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MIDDLEWARE = [</span></span>
<span class="line"><span>    &#39;django.middleware.security.SecurityMiddleware&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.sessions.middleware.SessionMiddleware&#39;,  # 这一行</span></span>
<span class="line"><span>    &#39;django.middleware.common.CommonMiddleware&#39;,</span></span>
<span class="line"><span>    &#39;django.middleware.csrf.CsrfViewMiddleware&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.auth.middleware.AuthenticationMiddleware&#39;,</span></span>
<span class="line"><span>    &#39;django.contrib.messages.middleware.MessageMiddleware&#39;,</span></span>
<span class="line"><span>    &#39;django.middleware.clickjacking.XFrameOptionsMiddleware&#39;,</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>当session启用后，传递给视图request参数的HttpRequest对象将包含一个session属性，就像一个字典对象一样。你可以在Django的任何地方读写<code>request.session</code>属性，或者多次编辑使用它。</p><p>下面是session使用参考：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>class backends.base.SessionBase</span></span>
<span class="line"><span>        # 这是所有会话对象的基类，包含标准的字典方法:</span></span>
<span class="line"><span>        __getitem__(key)</span></span>
<span class="line"><span>            Example: fav_color = request.session[&#39;fav_color&#39;]</span></span>
<span class="line"><span>        __setitem__(key, value)</span></span>
<span class="line"><span>            Example: request.session[&#39;fav_color&#39;] = &#39;blue&#39;</span></span>
<span class="line"><span>        __delitem__(key)</span></span>
<span class="line"><span>            Example: del request.session[&#39;fav_color&#39;]  # 如果不存在会抛出异常</span></span>
<span class="line"><span>        __contains__(key)</span></span>
<span class="line"><span>            Example: &#39;fav_color&#39; in request.session</span></span>
<span class="line"><span>        get(key, default=None)</span></span>
<span class="line"><span>            Example: fav_color = request.session.get(&#39;fav_color&#39;, &#39;red&#39;)</span></span>
<span class="line"><span>        pop(key, default=__not_given)</span></span>
<span class="line"><span>            Example: fav_color = request.session.pop(&#39;fav_color&#39;, &#39;blue&#39;)</span></span>
<span class="line"><span>        # 类似字典数据类型的内置方法</span></span>
<span class="line"><span>        keys()</span></span>
<span class="line"><span>        items()</span></span>
<span class="line"><span>        setdefault()</span></span>
<span class="line"><span>        clear()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 它还有下面的方法：</span></span>
<span class="line"><span>        flush()</span></span>
<span class="line"><span>            # 删除当前的会话数据和会话cookie。经常用在用户退出后，删除会话。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        set_test_cookie()</span></span>
<span class="line"><span>            # 设置一个测试cookie，用于探测用户浏览器是否支持cookies。由于cookie的工作机制，你只有在下次用户请求的时候才可以测试。</span></span>
<span class="line"><span>        test_cookie_worked()</span></span>
<span class="line"><span>            # 返回True或者False，取决于用户的浏览器是否接受测试cookie。你必须在之前先调用set_test_cookie()方法。</span></span>
<span class="line"><span>        delete_test_cookie()</span></span>
<span class="line"><span>            # 删除测试cookie。</span></span>
<span class="line"><span>        set_expiry(value)</span></span>
<span class="line"><span>            # 设置cookie的有效期。可以传递不同类型的参数值：</span></span>
<span class="line"><span>        • 如果值是一个整数，session将在对应的秒数后失效。例如request.session.set_expiry(300) 将在300秒后失效.</span></span>
<span class="line"><span>        • 如果值是一个datetime或者timedelta对象, 会话将在指定的日期失效</span></span>
<span class="line"><span>        • 如果为0，在用户关闭浏览器后失效</span></span>
<span class="line"><span>        • 如果为None，则将使用全局会话失效策略</span></span>
<span class="line"><span>        失效时间从上一次会话被修改的时刻开始计时。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        get_expiry_age()</span></span>
<span class="line"><span>            # 返回多少秒后失效的秒数。对于没有自定义失效时间的会话，这等同于SESSION_COOKIE_AGE.</span></span>
<span class="line"><span>            # 这个方法接受2个可选的关键字参数</span></span>
<span class="line"><span>        • modification:会话的最后修改时间（datetime对象）。默认是当前时间。</span></span>
<span class="line"><span>        •expiry: 会话失效信息，可以是datetime对象，也可以是int或None</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        get_expiry_date()</span></span>
<span class="line"><span>            # 和上面的方法类似，只是返回的是日期</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        get_expire_at_browser_close()</span></span>
<span class="line"><span>            # 返回True或False，根据用户会话是否是浏览器关闭后就结束。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        clear_expired()</span></span>
<span class="line"><span>            # 删除已经失效的会话数据。</span></span>
<span class="line"><span>        cycle_key()</span></span>
<span class="line"><span>            # 创建一个新的会话秘钥用于保持当前的会话数据。django.contrib.auth.login() 会调用这个方法。</span></span></code></pre></div><p>基本上背下来上面的内容，Django的session你就可以信手拈来了。</p><h2 id="一、使用session" tabindex="-1">一、使用session <a class="header-anchor" href="#一、使用session" aria-label="Permalink to &quot;一、使用session&quot;">​</a></h2><p>下面结合我们的项目实战，使用session。</p><p>首先，修改<code>login/views.py</code>中的login()视图函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def login(request):</span></span>
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
<span class="line"><span>            if user.password == password:</span></span>
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
<span class="line"><span>    return render(request, &#39;login/login.html&#39;, locals())</span></span></code></pre></div><p>通过下面的if语句，我们不允许重复登录：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>if request.session.get(&#39;is_login&#39;,None):</span></span>
<span class="line"><span>    return redirect(&quot;/index/&quot;)</span></span></code></pre></div><p>通过下面的语句，我们往session字典内写入用户状态和数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>request.session[&#39;is_login&#39;] = True</span></span>
<span class="line"><span>request.session[&#39;user_id&#39;] = user.id</span></span>
<span class="line"><span>request.session[&#39;user_name&#39;] = user.name</span></span></code></pre></div><p>你完全可以往里面写任何数据，不仅仅限于用户相关！</p><p>既然有了session记录用户登录状态，那么就可以完善我们的登出视图函数了：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def logout(request):</span></span>
<span class="line"><span>    if not request.session.get(&#39;is_login&#39;, None):</span></span>
<span class="line"><span>        # 如果本来就未登录，也就没有登出一说</span></span>
<span class="line"><span>        return redirect(&quot;/login/&quot;)</span></span>
<span class="line"><span>    request.session.flush()</span></span>
<span class="line"><span>    # 或者使用下面的方法</span></span>
<span class="line"><span>    # del request.session[&#39;is_login&#39;]</span></span>
<span class="line"><span>    # del request.session[&#39;user_id&#39;]</span></span>
<span class="line"><span>    # del request.session[&#39;user_name&#39;]</span></span>
<span class="line"><span>    return redirect(&quot;/login/&quot;)</span></span></code></pre></div><p>flush()方法是比较安全的一种做法，而且一次性将session中的所有内容全部清空，确保不留后患。但也有不好的地方，那就是如果你在session中夹带了一点‘私货’，会被一并删除，这一点一定要注意。</p><h2 id="二、在index页面中验证登录" tabindex="-1">二、在index页面中验证登录 <a class="header-anchor" href="#二、在index页面中验证登录" aria-label="Permalink to &quot;二、在index页面中验证登录&quot;">​</a></h2><p>有了用户状态，就可以根据用户登录与否，展示不同的页面，比如在index页面中显示当前用户的名称：</p><p>修改index.html的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;首页&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;h1&gt;{{ request.session.user_name }}!  欢迎回来！&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;p&gt;</span></span>
<span class="line"><span>    &lt;a href=&quot;/logout/&quot;&gt;登出&lt;/a&gt;</span></span>
<span class="line"><span>&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div>`,30),d=p('<p>重新启动服务器，进行登录和登出测试：</p><p><img src="'+t+`" alt="image"></p><p>可以看出，在已经login的状态下，手动从浏览器地址栏中访问/login/也依然进入的是index页面。在logout的状态下，都会跳转到login页面。但是，需要注意的是，我们目前还没有编写index未登录限制访问的代码。</p><p>修改index视图函数，添加相关限制：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def index(request):</span></span>
<span class="line"><span>    if not request.session.get(&#39;is_login&#39;, None):</span></span>
<span class="line"><span>        return redirect(&#39;/login/&#39;)</span></span>
<span class="line"><span>    return render(request, &#39;login/index.html&#39;)</span></span></code></pre></div>`,5);function u(a,g,_,h,m,k){return o(),i("div",null,[r,s("p",null,[n("注意其中的模板语言，"),s("code",null,e(a.request),1),n("这个变量会被默认传入模板中，可以通过圆点的调用方式，获取它内部的"),s("code",null,e(a.request.session),1),n("，再进一步的获取session中的内容。其实"),s("code",null,e(a.request),1),n("中的数据远不止此，例如"),s("code",null,e(a.request.path),1),n("就可以获取先前的url地址。")]),d])}const v=l(c,[["render",u]]);export{b as __pageData,v as default};
