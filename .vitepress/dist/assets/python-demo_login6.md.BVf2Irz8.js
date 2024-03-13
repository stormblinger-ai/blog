import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const e="/assets/108-1.Ck8xmgbW.png",t="/assets/108-2.CmAJg8dD.png",l="/assets/108-3.CDqyE2QS.png",i="/assets/108-4.CIGVGJ1s.png",o="/assets/108-5.DoaUnunW.png",v=JSON.parse('{"title":"6. 登录视图","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login6.md","filePath":"python-demo/login6.md"}'),r={name:"python-demo/login6.md"},c=p(`<h1 id="_6-登录视图" tabindex="-1">6. 登录视图 <a class="header-anchor" href="#_6-登录视图" aria-label="Permalink to &quot;6. 登录视图&quot;">​</a></h1><hr><p>数据模型和前端页面我们都已经设计好了，是时候开始完善我们的登录视图具体内容了。</p><h2 id="一、登录视图" tabindex="-1">一、登录视图 <a class="header-anchor" href="#一、登录视图" aria-label="Permalink to &quot;一、登录视图&quot;">​</a></h2><p>根据我们在路由中的设计，用户通过<code>login.html</code>中的表单填写用户名和密码，并以POST的方式发送到服务器的<code>/login/</code>地址。服务器通过<code>login/views.py</code>中的<code>login()</code>视图函数，接收并处理这一请求。</p><p>我们可以通过下面的方法接收和处理请求：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def login(request):</span></span>
<span class="line"><span>    if request.method == &quot;POST&quot;:</span></span>
<span class="line"><span>        username = request.POST.get(&#39;username&#39;)</span></span>
<span class="line"><span>        password = request.POST.get(&#39;password&#39;)</span></span>
<span class="line"><span>        print(username, password)</span></span>
<span class="line"><span>        return redirect(&#39;/index/&#39;)</span></span>
<span class="line"><span>    return render(request, &#39;login/login.html&#39;)</span></span></code></pre></div><p>说明：</p><ul><li>每个视图函数都至少接收一个参数，并且是第一位置参数，该参数封装了当前请求的所有数据；</li><li>通常将第一参数命名为request，当然也可以是别的；</li><li><code>request.method</code>中封装了数据请求的方法，如果是“POST”（全大写），将执行if语句的内容，如果不是，直接返回最后的render()结果，也就是正常的登录页面；</li><li><code>request.POST</code>封装了所有POST请求中的数据，这是一个字典类型，可以通过get方法获取具体的值。</li><li>类似<code>get(&#39;username&#39;)</code>中的键‘username’是HTML模板中表单的input元素里‘name’属性定义的值。所以在编写form表单的时候一定不能忘记添加name属性。</li><li>利用print函数在开发环境中验证数据；</li><li>利用redirect方法，将页面重定向到index页。</li></ul><p>启动服务器，然后在<code>http://127.0.0.1:8000/login/</code>的表单中随便填入用户名和密码，然后点击提交。然而，页面却出现了错误提示，如下图所示：</p><p><img src="`+e+`" alt="image"></p><p>错误原因是CSRF验证失败，请求被中断。CSRF（Cross-site request forgery）跨站请求伪造，是一种常见的网络攻击手段，具体原理和技术内容请自行百科。Django自带对许多常见攻击手段的防御机制，CSRF就是其中一种，还有XSS、SQL注入等。</p><p>解决这个问题的办法其实在Django的Debug错误页面已经给出了，我们需要在前端页面的form表单内添加一个<code>{% csrf_token %}</code>标签：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>                &lt;form class=&quot;form-login&quot; action=&quot;/login/&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span>                  {% csrf_token %}</span></span>
<span class="line"><span>                  &lt;h3 class=&quot;text-center&quot;&gt;欢迎登录&lt;/h3&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    &lt;label for=&quot;id_username&quot;&gt;用户名：&lt;/label&gt;</span></span>
<span class="line"><span>                    &lt;input type=&quot;text&quot; name=&#39;username&#39; class=&quot;form-control&quot; id=&quot;id_username&quot; placeholder=&quot;Username&quot; autofocus required&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    &lt;label for=&quot;id_password&quot;&gt;密码：&lt;/label&gt;</span></span>
<span class="line"><span>                    &lt;input type=&quot;password&quot; name=&#39;password&#39; class=&quot;form-control&quot; id=&quot;id_password&quot; placeholder=&quot;Password&quot; required&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div&gt;</span></span>
<span class="line"><span>                  &lt;a href=&quot;/register/&quot; class=&quot;text-success &quot; &gt;&lt;ins&gt;新用户注册&lt;/ins&gt;&lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary float-right&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/form&gt;</span></span></code></pre></div><p>这个标签必须放在form表单内部，但是内部的位置可以随意。</p><p>重新刷新login页面，确保csrf的标签生效，然后再次输入内容并提交。这次就可以成功地在Pycharm开发环境中看到接收的用户名和密码，同时浏览器页面也跳转到了首页。</p><h2 id="二、数据验证" tabindex="-1">二、数据验证 <a class="header-anchor" href="#二、数据验证" aria-label="Permalink to &quot;二、数据验证&quot;">​</a></h2><p>前面我们提到过，要对用户发送的数据进行验证。数据验证分前端页面验证和后台服务器验证。前端验证可以通过专门的插件或者自己写JS代码实现，也可以简单地使用HTML5的新特性。这里，我们使用的是HTML5的内置验证功能，如下图所示：</p><p><img src="`+t+`" alt="image"></p><p>它帮我们实现了下面的功能：</p><ul><li>用户名和密码这类必填字段不能为空</li><li>密码部分用圆点替代</li></ul><p>如果你还想要更强大和丰富的验证功能，比如限定密码长度不低于8位，用户名不能包含特殊字符等等，可以搜索并使用一些插件。</p><p>前端页面的验证都是用来给守法用户做提示和限制的，并不能保证绝对的安全，后端服务器依然要重新对数据进行验证。我们现在的视图函数，没有对数据进行任何的验证，如果你在用户名处输入个空格，是可以正常提交的，但这显然是不允许的。甚至，如果跳过浏览器伪造请求，那么用户名是None也可以发送过来。通常，除了数据内容本身，我们至少需要保证各项内容都提供了且不为空，对于用户名、邮箱、地址等内容往往还需要剪去前后的空白，防止用户未注意到的空格。</p><p>现在，让我们修改一下前面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def login(request):</span></span>
<span class="line"><span>    if request.method == &quot;POST&quot;:</span></span>
<span class="line"><span>        username = request.POST.get(&#39;username&#39;)</span></span>
<span class="line"><span>        password = request.POST.get(&#39;password&#39;)</span></span>
<span class="line"><span>        if username.strip() and password:  # 确保用户名和密码都不为空      </span></span>
<span class="line"><span>            # 用户名字符合法性验证</span></span>
<span class="line"><span>            # 密码长度验证</span></span>
<span class="line"><span>            # 更多的其它验证.....</span></span>
<span class="line"><span>            return redirect(&#39;/index/&#39;)</span></span>
<span class="line"><span>    return render(request, &#39;login/login.html&#39;)</span></span></code></pre></div><ul><li>get方法是Python字典类型的内置方法，它能够保证在没有指定键的情况下，返回一个None，从而确保当数据请求中没有username或password键时不会抛出异常；</li><li>通过<code>if username and password:</code>确保用户名和密码都不为空；</li><li>通过strip方法，将用户名前后无效的空格剪除；</li><li>更多的数据验证需要根据实际情况增加，原则是以最低的信任度对待发送过来的数据。</li></ul><h2 id="三、验证用户名和密码" tabindex="-1">三、验证用户名和密码 <a class="header-anchor" href="#三、验证用户名和密码" aria-label="Permalink to &quot;三、验证用户名和密码&quot;">​</a></h2><p>数据形式合法性验证通过了，不代表用户就可以登录了，因为最基本的密码对比还未进行。</p><p>通过唯一的用户名，使用Django的ORM去数据库中查询用户数据，如果有匹配项，则进行密码对比，如果没有匹配项，说明用户名不存在。如果密码对比错误，说明密码不正确。</p><p>下面贴出当前状态下，/login/views.py中的全部代码，注意其中添加了一句<code>from . import models</code>，导入我们先前编写好的model模型。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.shortcuts import render</span></span>
<span class="line"><span>from django.shortcuts import redirect</span></span>
<span class="line"><span>from . import models</span></span>
<span class="line"><span># Create your views here.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def index(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return render(request, &#39;login/index.html&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def login(request):</span></span>
<span class="line"><span>    if request.method == &quot;POST&quot;:</span></span>
<span class="line"><span>        username = request.POST.get(&#39;username&#39;)</span></span>
<span class="line"><span>        password = request.POST.get(&#39;password&#39;)</span></span>
<span class="line"><span>        if username.strip() and password:  # 确保用户名和密码都不为空</span></span>
<span class="line"><span>            # 用户名字符合法性验证</span></span>
<span class="line"><span>            # 密码长度验证</span></span>
<span class="line"><span>            # 更多的其它验证.....</span></span>
<span class="line"><span>            try:</span></span>
<span class="line"><span>                user = models.User.objects.get(name=username)</span></span>
<span class="line"><span>            except:</span></span>
<span class="line"><span>                return render(request, &#39;login/login.html&#39;)</span></span>
<span class="line"><span>            if user.password == password:</span></span>
<span class="line"><span>                return redirect(&#39;/index/&#39;)</span></span>
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
<span class="line"><span>    return redirect(&quot;/login/&quot;)</span></span></code></pre></div><p>说明：</p><ul><li>首先要在顶部导入models模块；</li><li>使用try异常机制，防止数据库查询失败的异常；</li><li>如果未匹配到用户，则执行except中的语句；注意这里没有区分异常的类型，因为在数据库访问过程中，可能发生很多种类型的异常，我们要对用户屏蔽这些信息，不可以暴露给用户，而是统一返回一个错误提示，比如用户名不存在。这是大多数情况下的通用做法。当然，如果你非要细分，也不是不行。</li><li><code>models.User.objects.get(name=username)</code>是Django提供的最常用的数据查询API，具体含义和用法可以阅读前面的章节，不再赘述；</li><li>通过<code>user.password == password</code>进行密码比对，成功则跳转到index页面，失败则返回登录页面。</li></ul><p>重启服务器，然后在登录表单内，使用错误的用户名和密码，以及我们先前在admin中创建的合法的测试用户，分别登录，看看效果。</p><h2 id="四、-添加提示信息" tabindex="-1">四、 添加提示信息 <a class="header-anchor" href="#四、-添加提示信息" aria-label="Permalink to &quot;四、 添加提示信息&quot;">​</a></h2><p>上面的代码还缺少很重要的一部分内容，也就是错误提示信息！无论是登录成功还是失败，用户都没有得到任何提示信息，这显然是不行的。</p><p>修改一下login视图：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def login(request):</span></span>
<span class="line"><span>    if request.method == &#39;POST&#39;:</span></span>
<span class="line"><span>        username = request.POST.get(&#39;username&#39;)</span></span>
<span class="line"><span>        password = request.POST.get(&#39;password&#39;)</span></span>
<span class="line"><span>        message = &#39;请检查填写的内容！&#39;</span></span>
<span class="line"><span>        if username.strip() and password:</span></span>
<span class="line"><span>            # 用户名字符合法性验证</span></span>
<span class="line"><span>            # 密码长度验证</span></span>
<span class="line"><span>            # 更多的其它验证.....</span></span>
<span class="line"><span>            try:</span></span>
<span class="line"><span>                user = models.User.objects.get(name=username)</span></span>
<span class="line"><span>            except :</span></span>
<span class="line"><span>                message = &#39;用户不存在！&#39;</span></span>
<span class="line"><span>                return render(request, &#39;login/login.html&#39;, {&#39;message&#39;: message})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            if user.password == password:</span></span>
<span class="line"><span>                print(username, password)</span></span>
<span class="line"><span>                return redirect(&#39;/index/&#39;)</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                message = &#39;密码不正确！&#39;</span></span>
<span class="line"><span>                return render(request, &#39;login/login.html&#39;, {&#39;message&#39;: message})</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return render(request, &#39;login/login.html&#39;, {&#39;message&#39;: message})</span></span>
<span class="line"><span>    return render(request, &#39;login/login.html&#39;)</span></span></code></pre></div><p>请仔细分析一下上面的登录和密码验证逻辑，以及错误提示的安排。</p><p>这里增加了message变量，用于保存提示信息。当有错误信息的时候，将错误信息打包成一个字典，然后作为第三个参数提供给render方法。这个数据字典在渲染模板的时候会传递到模板里供你调用。</p><p>为了在前端页面显示信息，还需要对<code>login.html</code>进行修改：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;form class=&quot;form-login&quot; action=&quot;/login/&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span>                  {% if message %}</span></span>
<span class="line"><span>                    &lt;div class=&quot;alert alert-warning&quot;&gt;{{ message }}&lt;/div&gt;</span></span>
<span class="line"><span>                  {% endif %}</span></span>
<span class="line"><span>                  {% csrf_token %}</span></span>
<span class="line"><span>                  &lt;h3 class=&quot;text-center&quot;&gt;欢迎登录&lt;/h3&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    &lt;label for=&quot;id_username&quot;&gt;用户名：&lt;/label&gt;</span></span>
<span class="line"><span>                    &lt;input type=&quot;text&quot; name=&#39;username&#39; class=&quot;form-control&quot; id=&quot;id_username&quot; placeholder=&quot;Username&quot; autofocus required&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    &lt;label for=&quot;id_password&quot;&gt;密码：&lt;/label&gt;</span></span>
<span class="line"><span>                    &lt;input type=&quot;password&quot; name=&#39;password&#39; class=&quot;form-control&quot; id=&quot;id_password&quot; placeholder=&quot;Password&quot; required&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div&gt;</span></span>
<span class="line"><span>                  &lt;a href=&quot;/register/&quot; class=&quot;text-success &quot; &gt;&lt;ins&gt;新用户注册&lt;/ins&gt;&lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary float-right&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/form&gt;</span></span></code></pre></div><p>Django的模板语言<code>{% if xxx %}{% endif %}</code>非常类似Python的if语句，也可以添加<code>{% else %}</code>分句。例子中，通过判断message变量是否为空，也就是是否有错误提示信息，如果有，就显示出来！这里使用了Bootstrap的警示信息类alert，你也可以自定义CSS或者JS。</p><p>好了，重启服务器，尝试用错误的和正确的用户名及密码登录，看看页面效果吧！下面是错误信息的展示：</p><p><img src="`+l+'" alt="image"></p><p><img src="'+i+'" alt="image"></p><p><img src="'+o+'" alt="image"></p>',47),u=[c];function d(g,m,q,h,f,b){return a(),n("div",null,u)}const w=s(r,[["render",d]]);export{v as __pageData,w as default};
