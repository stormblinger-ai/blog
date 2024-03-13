import{_ as s,c as a,o as n,a5 as p}from"./chunks/framework.BthLuVtL.js";const e="/assets/113-1.ByHANRxt.png",t="/assets/113-2.DeZ0WZeT.png",x=JSON.parse('{"title":"11.Django发送邮件","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login11.md","filePath":"python-demo/login11.md"}'),l={name:"python-demo/login11.md"},i=p(`<h1 id="_11-django发送邮件" tabindex="-1">11.Django发送邮件 <a class="header-anchor" href="#_11-django发送邮件" aria-label="Permalink to &quot;11.Django发送邮件&quot;">​</a></h1><hr><p>通常而言，我们在用户注册成功，实际登陆之前，会发送一封电子邮件到对方的注册邮箱中，表示欢迎。进一步的还可能要求用户点击邮件中的链接，进行注册确认。</p><p>下面就让我们先看看如何在Django中发送邮件吧。</p><h2 id="一、在django中发送邮件" tabindex="-1">一、在Django中发送邮件 <a class="header-anchor" href="#一、在django中发送邮件" aria-label="Permalink to &quot;一、在Django中发送邮件&quot;">​</a></h2><p>其实在Python中已经内置了一个smtp邮件发送模块，Django在此基础上进行了简单地封装。</p><p>首先，我们需要在项目的settings文件中配置邮件发送参数，分别如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>EMAIL_BACKEND = &#39;django.core.mail.backends.smtp.EmailBackend&#39;</span></span>
<span class="line"><span>EMAIL_HOST = &#39;smtp.sina.com&#39;</span></span>
<span class="line"><span>EMAIL_PORT = 25</span></span>
<span class="line"><span>EMAIL_HOST_USER = &#39;xxx@sina.com&#39;</span></span>
<span class="line"><span>EMAIL_HOST_PASSWORD = &#39;xxxxxxxxxxx&#39;</span></span></code></pre></div><ul><li>第一行指定发送邮件的后端模块，大多数情况下照抄！</li><li>第二行，不用说，发送方的smtp服务器地址，建议使用新浪家的；</li><li>第三行，smtp服务端口，默认为25；</li><li>第四行，你在发送服务器的用户名；</li><li>第五行，对应用户的密码。</li></ul><p>特别说明：</p><ul><li>某些邮件公司可能不开放smtp服务</li><li>某些公司要求使用ssl安全机制</li><li>某些smtp服务对主机名格式有要求</li></ul><p>这些都是前人踩过的坑。如果你在测试中出现了问题，请不要找Django的麻烦，99%的原因和你的邮件服务有关。</p><p>配置好了参数，就可以先测试一下邮件功能了。</p><p>在项目根目录下新建一个<code>send_mail.py</code>文件，然后写入下面的内容：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import os</span></span>
<span class="line"><span>from django.core.mail import send_mail</span></span>
<span class="line"><span></span></span>
<span class="line"><span>os.environ[&#39;DJANGO_SETTINGS_MODULE&#39;] = &#39;mysite.settings&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:   </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    send_mail(</span></span>
<span class="line"><span>        &#39;测试邮件&#39;,</span></span>
<span class="line"><span>        &#39;测试邮件的分享！&#39;,</span></span>
<span class="line"><span>        &#39;xxx@sina.com&#39;,</span></span>
<span class="line"><span>        [&#39;xxx@qq.com&#39;],</span></span>
<span class="line"><span>    )</span></span></code></pre></div><p>对于send_mail方法，第一个参数是邮件主题subject；第二个参数是邮件具体内容；第三个参数是邮件发送方，需要和你settings中的一致；第四个参数是接受方的邮件地址列表。请按你自己实际情况修改发送方和接收方的邮箱地址。</p><p>另外，由于我们当前是单独运行<code>send_mail.py</code>文件，无法自动链接Django环境，需要通过os模块对环境变量进行设置，也就是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>os.environ[&#39;DJANGO_SETTINGS_MODULE&#39;] = &#39;mysite.settings&#39;</span></span></code></pre></div><p>运行<code>send_mail.py</code>文件，注意不是运行Django服务器。然后到你的目的地邮箱查看邮件是否收到。</p><p><img src="`+e+`" alt="image"></p><h2 id="二、发送html格式的邮件" tabindex="-1">二、发送HTML格式的邮件 <a class="header-anchor" href="#二、发送html格式的邮件" aria-label="Permalink to &quot;二、发送HTML格式的邮件&quot;">​</a></h2><p>通常情况下，我们发送的邮件内容都是纯文本格式。但是很多情况下，我们需要发送带有HTML格式的内容，比如说超级链接。一般情况下，为了安全考虑，很多邮件服务提供商都会禁止使用HTML内容，幸运的是对于以<code>http</code>和<code>https</code>开头的链接还是可以点击的。</p><p>下面是发送HTML格式的邮件例子。删除<code>send_mail.py</code>原来的所有内容，添加下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import os</span></span>
<span class="line"><span>from django.core.mail import EmailMultiAlternatives</span></span>
<span class="line"><span></span></span>
<span class="line"><span>os.environ[&#39;DJANGO_SETTINGS_MODULE&#39;] = &#39;mysite.settings&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    subject, from_email, to = &#39;来自test.com的测试邮件&#39;, &#39;xxx@sina.com&#39;, &#39;xxx@qq.com&#39;</span></span>
<span class="line"><span>    text_content = &#39;欢迎访问www.liujiangblog.com，这里测试邮件！&#39;</span></span>
<span class="line"><span>    html_content = &#39;&lt;p&gt;欢迎访问&lt;a href=&quot;http://www.liujiangblog.com&quot; target=blank&gt;test.com&lt;/a&gt;，这里是测试邮件，来自Django的分享！&lt;/p&gt;&#39;</span></span>
<span class="line"><span>    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])</span></span>
<span class="line"><span>    msg.attach_alternative(html_content, &quot;text/html&quot;)</span></span>
<span class="line"><span>    msg.send()</span></span></code></pre></div><p>其中的<code>text_content</code>是用于当HTML内容无效时的替代txt文本。</p><p>打开测试用的接收邮箱，可以看到链接能够正常点击，如下图所示：</p><p><img src="`+t+'" alt="image"></p><p>这个<code>send_mail.py</code>文件只是一个测试脚本，使用完毕后可以从项目里删除。</p>',28),o=[i];function c(d,m,_,g,r,h){return n(),a("div",null,o)}const b=s(l,[["render",c]]);export{x as __pageData,b as default};
