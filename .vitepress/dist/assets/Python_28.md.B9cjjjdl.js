import{_ as s,c as i,o as a,a5 as t}from"./chunks/framework.BthLuVtL.js";const y=JSON.parse('{"title":"Python 中的装饰器","description":"","frontmatter":{},"headers":[],"relativePath":"Python/28.md","filePath":"Python/28.md"}'),n={name:"Python/28.md"},e=t(`<h1 id="python-中的装饰器" tabindex="-1">Python 中的装饰器 <a class="header-anchor" href="#python-中的装饰器" aria-label="Permalink to &quot;Python 中的装饰器&quot;">​</a></h1><p>更新：2022-07-24 09:58</p><p>在编程中，装饰器是一种设计模式，它动态地向对象添加额外的职责。在 Python 中，一个函数是一阶对象。 因此，Python 中的装饰器在不修改函数的情况下，动态地向函数添加额外的责任/功能。</p><p>在 Python 中，一个函数可以作为参数传递给另一个函数。也可以在另一个函数内部定义一个函数，一个函数可以返回另一个函数。</p><p>因此，Python 中的装饰器是一个接收另一个函数作为参数的函数。参数函数的行为是由装饰器扩展的，并没有实际修改它。可以使用@decorator 语法在函数上应用 decorator 函数。</p><p>让我们逐步理解 Python 中的装饰器。</p><p>假设我们有<code>greet()</code>功能，如下所示。</p><p>Example: A Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello! &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">end</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>现在，我们可以通过将上面的函数传递给另一个函数来扩展它的功能，而无需修改它，如下所示。</p><p>Example: A Function with Argument</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mydecorator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(fn):</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    fn()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;How are you?&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>上图，<code>mydecorator()</code>函数以一个函数为自变量。它调用参数函数，还打印一些附加的东西。因此，它扩展了<code>greet()</code>功能的功能，而没有对其进行修改。 然而，它并不是真正的装饰者。</p><p>Example: Calling Function in Python Shell</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mydecorator(greet)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello! How are you</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">?</span></span></code></pre></div><p><code>mydecorator()</code>不是 Python 中的装饰器。Python 中的装饰器可以使用<code>@decorator_function_name</code>语法在任何适当的函数上定义，以扩展底层函数的功能。</p><p>以下定义了上述<code>greet()</code>功能的装饰器。</p><p>Example: A Decorator Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mydecorator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(fn):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> inner_function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():        </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        fn()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;How are you?&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> inner_function</span></span></code></pre></div><p><code>mydecorator()</code>函数是以函数(任何不取任何参数的函数)为参数的装饰函数。 内部函数<code>inner_function()</code>可以访问外部函数的参数，所以它在调用参数函数之前或之后执行一些代码来扩展功能。 <code>mydecorator</code>函数返回一个内部函数。</p><p>现在，我们可以使用<code>mydecorator</code>作为装饰器来应用于不接受任何参数的函数，如下所示。</p><p>Example: Applying Decorator</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">@mydecorator</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello! &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">end</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>现在，调用上面的<code>greet()</code>函数会给出如下输出。</p><p>Example: Calling a Decorated Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> greet()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello! How are you</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">?</span></span></code></pre></div><p><code>mydecorator</code>可以应用于任何不需要任何参数的函数。例如:</p><p>Example: Applying Decorator</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">@mydecorator</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> dosomething</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;I am doing something.&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">end</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Example: Calling Decorated Function in Python Shell</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dosomething()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">I am doing something. How are you</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">?</span></span></code></pre></div><p>典型的装饰函数如下所示。</p><p>Decorator Function Syntax</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mydecoratorfunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(some_function): </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># decorator function</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> inner_function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(): </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # write code to extend the behavior of some_function()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        some_function() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># call some_function</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # write code to extend the behavior of some_function()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> inner_function </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># return a wrapper function</span></span></code></pre></div><h2 id="内置装饰器" tabindex="-1">内置装饰器 <a class="header-anchor" href="#内置装饰器" aria-label="Permalink to &quot;内置装饰器&quot;">​</a></h2><p>Python 库包含许多内置装饰器，作为定义属性、类方法、静态方法等的快捷方式。</p><table><thead><tr><th>装饰者</th><th>描述</th></tr></thead><tbody><tr><td>@property</td><td>将方法声明为属性的 setter 或 getter 方法。</td></tr><tr><td>@classmethod</td><td>将方法声明为类的方法，可以使用类名调用该方法。</td></tr><tr><td>@staticmethod</td><td>将方法声明为静态方法。</td></tr></tbody></table><p>接下来了解内置 decorator <code>@property</code>。*****</p>`,38),p=[e];function h(l,k,d,o,r,c){return a(),i("div",null,p)}const E=s(n,[["render",h]]);export{y as __pageData,E as default};