import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const t="/assets/107-1.pw2Ifzry.png",l="/assets/107-2.Cl3QEp5H.png",o="/assets/107-3.BFn0R6df.png",e="/assets/107-4.BN9oBTKX.png",i="/assets/107-5.BelTs6Bu.png",y=JSON.parse('{"title":"5. 前端页面设计","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login5.md","filePath":"python-demo/login5.md"}'),c={name:"python-demo/login5.md"},r=p(`<h1 id="_5-前端页面设计" tabindex="-1">5. 前端页面设计 <a class="header-anchor" href="#_5-前端页面设计" aria-label="Permalink to &quot;5. 前端页面设计&quot;">​</a></h1><hr><p>基本框架搭建好了后，我们就要开始丰富页面内容了。最起码，得有一个用户登录的表单不是么？（注册的事情我们先放一边。）</p><h2 id="一、-使用原生html页面" tabindex="-1">一、 使用原生HTML页面 <a class="header-anchor" href="#一、-使用原生html页面" aria-label="Permalink to &quot;一、 使用原生HTML页面&quot;">​</a></h2><p>删除原来的<code>login.html</code>文件中的内容，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;登录&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;div style=&quot;margin: 15% 40%;&quot;&gt;</span></span>
<span class="line"><span>        &lt;h1&gt;欢迎登录！&lt;/h1&gt;</span></span>
<span class="line"><span>       &lt;form action=&quot;/login/&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span>            &lt;p&gt;</span></span>
<span class="line"><span>                &lt;label for=&quot;id_username&quot;&gt;用户名：&lt;/label&gt;</span></span>
<span class="line"><span>                &lt;input type=&quot;text&quot; id=&quot;id_username&quot; name=&quot;username&quot; placeholder=&quot;用户名&quot; autofocus required /&gt;</span></span>
<span class="line"><span>            &lt;/p&gt;</span></span>
<span class="line"><span>            &lt;p&gt;</span></span>
<span class="line"><span>                &lt;label for=&quot;id_password&quot;&gt;密码：&lt;/label&gt;</span></span>
<span class="line"><span>                &lt;input type=&quot;password&quot; id=&quot;id_password&quot; placeholder=&quot;密码&quot; name=&quot;password&quot; required &gt;</span></span>
<span class="line"><span>            &lt;/p&gt;</span></span>
<span class="line"><span>            &lt;input type=&quot;submit&quot; value=&quot;确定&quot;&gt;</span></span>
<span class="line"><span>        &lt;/form&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>简单解释一下：</p><ul><li>form标签主要确定目的地url和发送方法；</li><li>p标签将各个输入框分行；</li><li>label标签为每个输入框提供一个前导提示，还有助于触屏使用；</li><li>placeholder属性为输入框提供占位符；</li><li>autofocus属性为用户名输入框自动聚焦</li><li>required表示该输入框必须填写</li><li>passowrd类型的input标签不会显示明文密码</li></ul><p>以上功能都是HTML5原生提供的，可以减少你大量的验证和JS代码，更详细的用法，请自行学习。</p><p><strong>特别声明：所有前端的验证和安全机制都是不可信的，恶意分子完全可以脱离浏览器伪造请求数据！</strong></p><p>启动服务器，访问<code>http://127.0.0.1:8000/login/</code>，可以看到如下图的页面：</p><p><img src="`+t+'" alt="image"></p><h2 id="二、引入bootstrap-4" tabindex="-1">二、引入Bootstrap 4 <a class="header-anchor" href="#二、引入bootstrap-4" aria-label="Permalink to &quot;二、引入Bootstrap 4&quot;">​</a></h2><p>如果你的实际项目真的使用上面的那个页面外观，妥妥的被老板打死。代码虽然简单，速度虽然快，但没有CSS和JS，样子真的令人无法接受，在颜值即正义的年代，就是错误。</p><p>然而，大多数使用Django的人都不具备多高的前端水平，通常也没有专业的前端工程师配合，自己写的CSS和JS却又往往惨不忍睹。怎么办？没关系，我们有现成的开源前端CSS框架！Bootstrap4就是最好的CSS框架之一！</p><p>想要在HTML页面中使用Bootstrap4，最方便的方法就是使用国内外的免费CDN（如果app的使用环境不可以使用外部网络，也可以使用内部的CDN，或者静态文件）。</p><p>这里推荐BootCDN：<a href="https://www.bootcdn.cn/%EF%BC%8C%E9%80%9F%E5%BA%A6%E6%AF%94%E8%BE%83%E5%BF%AB%EF%BC%8C%E6%9C%89%E5%A4%A7%E9%87%8F%E7%9A%84%E4%B8%8D%E5%90%8C%E7%89%88%E6%9C%AC%E7%9A%84CDN%E3%80%82" target="_blank" rel="noreferrer">https://www.bootcdn.cn/，速度比较快，有大量的不同版本的CDN。</a></p><p><img src="'+l+`" alt="image"></p><p>这里直接给出HTML标签，复制粘贴即可：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CSS：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;link href=&quot;https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>以及JS：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script src=&quot;https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js&quot;&gt;&lt;/script&gt;</span></span></code></pre></div><p>由于Bootstrap依赖JQuery，所以我们也需要使用CDN引用JQuery 3.3.1:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script src=&quot;https://cdn.bootcss.com/jquery/3.3.1/jquery.js&quot;&gt;&lt;/script&gt;</span></span></code></pre></div><p>另外，从Bootstrap4开始，额外需要popper.js的支持，依旧使用CDN的方式引入:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script src=&quot;https://cdn.bootcss.com/popper.js/1.15.0/umd/popper.js&quot;&gt;&lt;/script&gt;</span></span></code></pre></div><p>下面，我们就可以创建一个漂亮美观的登录页面了，具体代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;!doctype html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>  &lt;head&gt;</span></span>
<span class="line"><span>    &lt;!-- Required meta tags --&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, shrink-to-fit=no&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- 上述meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ --&gt;</span></span>
<span class="line"><span>    &lt;!-- Bootstrap CSS --&gt;</span></span>
<span class="line"><span>    &lt;link href=&quot;https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;登录&lt;/title&gt;</span></span>
<span class="line"><span>  &lt;/head&gt;</span></span>
<span class="line"><span>  &lt;body&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;container&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;col&quot;&gt;</span></span>
<span class="line"><span>              &lt;form class=&quot;form-login&quot; action=&quot;/login/&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span>                  &lt;h3 class=&quot;text-center&quot;&gt;欢迎登录&lt;/h3&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    &lt;label for=&quot;id_username&quot;&gt;用户名：&lt;/label&gt;</span></span>
<span class="line"><span>                    &lt;input type=&quot;text&quot; name=&#39;username&#39; class=&quot;form-control&quot; id=&quot;id_username&quot; placeholder=&quot;Username&quot; autofocus required&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;form-group&quot;&gt;</span></span>
<span class="line"><span>                    &lt;label for=&quot;id_password&quot;&gt;密码：&lt;/label&gt;</span></span>
<span class="line"><span>                    &lt;input type=&quot;password&quot; name=&#39;password&#39; class=&quot;form-control&quot; id=&quot;id_password&quot; placeholder=&quot;Password&quot; required&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;div&gt;</span></span>
<span class="line"><span>                  &lt;a href=&quot;/register/&quot; class=&quot;text-success &quot;&gt;&lt;ins&gt;新用户注册&lt;/ins&gt;&lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary float-right&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>              &lt;/form&gt;</span></span>
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
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>访问一下login页面，看起来如下：</p><p><img src="`+o+'" alt="image"></p><h2 id="三、添加静态文件" tabindex="-1">三、添加静态文件 <a class="header-anchor" href="#三、添加静态文件" aria-label="Permalink to &quot;三、添加静态文件&quot;">​</a></h2><p>然而，上面的登录页面在宽度上依然不太合适，背景也单调，所以一般我们会写一些CSS代码，同时使用背景图片。</p><p>在工程根目录下的login目录下，新建一个static目录，再到static目录里创建一个login目录，这种目录的创建方式和模板文件templates的创建方式都是一样的思维，也就是让重用app变得可能，并且不和其它的app发生文件路径和名称上的冲突。</p><p>继续在<code>/login/static/login</code>目录下创建一个css和一个image目录，css中添加我们为登录视图写的css文件，这里是<code>login.css</code>，image目录中，拷贝进来你想要的背景图片，这里是<code>bg.jpg</code>。最终目录结构如下：</p><p><img src="'+e+`" alt="image"></p><p>下面我们修改一下login.html的代码，主要是引入了login.css文件，注意最开头的<code>{% load static %}</code>，表示我们要加载静态文件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% load static %}</span></span>
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
<span class="line"><span>              &lt;form class=&quot;form-login&quot; action=&quot;/login/&quot; method=&quot;post&quot;&gt;</span></span>
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
<span class="line"><span>                  &lt;a href=&quot;/register/&quot; class=&quot;text-success &quot;&gt;&lt;ins&gt;新用户注册&lt;/ins&gt;&lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary float-right&quot;&gt;登录&lt;/button&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>              &lt;/form&gt;</span></span>
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
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>而login.css文件的代码如下，注意其中背景图片bg.jpg的引用方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>body {</span></span>
<span class="line"><span>  height: 100%;</span></span>
<span class="line"><span>  background-image: url(&#39;../image/bg.jpg&#39;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.form-login {</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>  max-width: 330px;</span></span>
<span class="line"><span>  padding: 15px;</span></span>
<span class="line"><span>  margin: 0 auto;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.form-login{</span></span>
<span class="line"><span>  margin-top:80px;</span></span>
<span class="line"><span>  font-weight: 400;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.form-login .form-control {</span></span>
<span class="line"><span>  position: relative;</span></span>
<span class="line"><span>  box-sizing: border-box;</span></span>
<span class="line"><span>  height: auto;</span></span>
<span class="line"><span>  padding: 10px;</span></span>
<span class="line"><span>  font-size: 16px;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.form-login .form-control:focus {</span></span>
<span class="line"><span>  z-index: 2;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.form-login input[type=&quot;text&quot;] {</span></span>
<span class="line"><span>  margin-bottom: -1px;</span></span>
<span class="line"><span>  border-bottom-right-radius: 0;</span></span>
<span class="line"><span>  border-bottom-left-radius: 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.form-login input[type=&quot;password&quot;] {</span></span>
<span class="line"><span>  margin-bottom: 10px;</span></span>
<span class="line"><span>  border-top-left-radius: 0;</span></span>
<span class="line"><span>  border-top-right-radius: 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>form a{</span></span>
<span class="line"><span>  display: inline-block;</span></span>
<span class="line"><span>  margin-top:25px;</span></span>
<span class="line"><span>  font-size: 12px;</span></span>
<span class="line"><span>  line-height: 10px;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>好了，现在可以重启服务器，刷新登录页面，看看效果了：</p><p><img src="`+i+'" alt="image"></p><p>以上关于前端的相关内容，实在难以一言述尽，需要大家具备一定的基础。做Django开发，其实就是全栈开发，没有一定的前端能力，很难做好。前端知识薄弱的同学，可以考虑我的前端视频教程，浅显易懂，不会太难太深入，那是前端工程师的要求；也不会太简单，足以应付Django的前端开发需求。</p>',40),u=[r];function g(d,q,h,m,b,f){return a(),n("div",null,u)}const _=s(c,[["render",g]]);export{y as __pageData,_ as default};
