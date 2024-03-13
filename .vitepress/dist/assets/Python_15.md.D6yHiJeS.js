import{_ as s,c as i,o as a,a5 as n}from"./chunks/framework.BthLuVtL.js";const o=JSON.parse('{"title":"Python 函数","description":"","frontmatter":{},"headers":[],"relativePath":"Python/15.md","filePath":"Python/15.md"}'),p={name:"Python/15.md"},t=n(`<h1 id="python-函数" tabindex="-1">Python 函数 <a class="header-anchor" href="#python-函数" aria-label="Permalink to &quot;Python 函数&quot;">​</a></h1><p>更新：2022-07-24 09:58</p><p>Python 包含许多内置函数。这些函数执行预定义的任务，并且可以根据需要在任何程序中调用。但是，如果您没有找到合适的内置函数来满足您的目的，您可以定义一个。我们现在将看到如何在 Python 程序中定义和使用函数。</p><h2 id="定义函数" tabindex="-1">定义函数 <a class="header-anchor" href="#定义函数" aria-label="Permalink to &quot;定义函数&quot;">​</a></h2><p>函数是一个可重用的编程语句块，用于执行特定的任务。为了定义一个函数，Python 提供了<code>def</code>关键字。以下是定义函数的语法。</p><p>Syntax:</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> function_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(parameters):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;docstring&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    statement1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    statement2</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    ...</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    ...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [expr]</span></span></code></pre></div><p>关键字<code>def</code>后面跟一个合适的标识符作为函数的名称和括号。一个或多个参数可以任选地在括号内提及。括号后的<code>:</code>符号开始缩进块。</p><p>函数体中的第一个语句可以是字符串，称为<code>docstring</code>。它解释了函数/类的功能。 文档字符串不是强制性的。</p><p>函数体包含一个或多个执行某些操作的语句。也可以使用传递关键字。</p><p>可选地，函数块中的最后一条语句是 return 语句。它将执行控制发送回调用环境。如果在返回之前添加了一个表达式，它的值也会返回到调用代码中。</p><p>以下示例定义了<code>greet()</code>函数。</p><p>Example: User-defined Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;This function displays &#39;Hello World!&#39;&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello World!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>以上，我们已经定义了<code>greet()</code>函数。第一个语句是一个 docstring，它提到了这个函数的功能。第二种类似的方法是打印方法，将指定的字符串显示到控制台。 注意没有退货单。</p><p>要调用一个已定义的函数，只需在代码中的任何地方使用它的名称作为语句。例如，上面的函数可以用括号<code>greet()</code>来调用。</p><p>Example: Calling User-defined Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet()</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello World!</span></span></code></pre></div><p>默认情况下，如果返回语句不存在，所有函数都会返回<code>None</code>。</p><p>Example: Calling User-defined Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">val </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> greet() </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(val)</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span></span></code></pre></div><p>帮助()功能显示文档字符串，如下图所示。</p><p>Example: Calling User-defined Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;&gt;&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> help</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(greet)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Help on function greet </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> module __main__:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    greet()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        This function displays </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello World!&#39;</span></span></code></pre></div><h2 id="功能参数" tabindex="-1">功能参数 <a class="header-anchor" href="#功能参数" aria-label="Permalink to &quot;功能参数&quot;">​</a></h2><p>可以定义一个函数来接收一个或多个参数(也称为参数)，并在功能块内使用它们进行处理。参数/自变量可以被赋予合适的正式名称。<code>greet()</code>函数现在被定义为接收名为<code>name</code>的字符串参数。在该功能中，<code>print()</code>语句被修改以显示发送给接收参数的问候信息。</p><p>Example: Parameterized Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name):  </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># calling function with argument</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123</span></span></code></pre></div><p>函数定义中使用的参数名称为形式参数。调用函数时实际使用的对象称为实际参数。</p><p>使用<code>parameter:type</code>语法，函数参数可以有注释来指定参数的类型。例如，以下注释了参数类型字符串。</p><p>Example: Parameterized Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):  </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># calling function with string argument</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># raise an error for int argument</span></span></code></pre></div><h2 id="多个参数" tabindex="-1">多个参数 <a class="header-anchor" href="#多个参数" aria-label="Permalink to &quot;多个参数&quot;">​</a></h2><p>一个函数可以有多个参数。下面的函数接受三个参数。</p><p>Example: Parameterized Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name1, name2, name3):  </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name1, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39; , &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name2 , </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, and &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name3)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bill&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Yash&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># calling function with string argument</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve, Bill, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Yash</span></span></code></pre></div><h2 id="未知的参数数量" tabindex="-1">未知的参数数量 <a class="header-anchor" href="#未知的参数数量" aria-label="Permalink to &quot;未知的参数数量&quot;">​</a></h2><p>如果您不知道用户将要传递的参数数量，Python 中的函数可以通过将<code>*</code>放在参数之前来获得未知数量的参数。</p><p>Example: Parameterized Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">names):  </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, names[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, names[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, names[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bill&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Yash&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve, Bill, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Yash</span></span></code></pre></div><p>下面的函数可以处理任意数量的参数。</p><p>Example: Parameterized Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">names):</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">end</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> len</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(names) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i:</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(names[i], </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">end</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;, &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bill&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Yash&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bill&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Yash&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Kapil&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;John&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Amir&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve, Bill, Yash,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve, Bill, Yash, Kapil, John, Amir</span></span></code></pre></div><h2 id="带有关键字参数的函数" tabindex="-1">带有关键字参数的函数 <a class="header-anchor" href="#带有关键字参数的函数" aria-label="Permalink to &quot;带有关键字参数的函数&quot;">​</a></h2><p>为了调用带有参数的函数，必须提供相同数量的实际参数。但是，可以通过以任何顺序使用参数名传递参数值来调用函数。例如，下面使用参数名传递值。</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(firstname, lastname):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, firstname, lastname)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">lastname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Jobs&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">firstname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># passing parameters in any order using keyword argument</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve Jobs</span></span></code></pre></div><h2 id="关键字参数-kwarg" tabindex="-1">关键字参数**kwarg <a class="header-anchor" href="#关键字参数-kwarg" aria-label="Permalink to &quot;关键字参数**kwarg&quot;">​</a></h2><p>该函数可以有一个前缀为<code>**</code>的参数。这种类型的参数初始化为新的有序映射，接收任何多余的关键字参数，默认为相同类型的新空映射。</p><p>Example: Parameterized Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">person):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, person[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;firstname&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],  person[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;lastname&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">firstname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">lastname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Jobs&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">lastname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Jobs&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">firstname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">firstname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bill&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">lastname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Gates&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">age</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">55</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">firstname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bill&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># raises KeyError</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve Jobs</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve Jobs</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Bill Gates</span></span></code></pre></div><p>使用<code>**</code>参数时，参数的顺序无关紧要。但是，参数的名称必须相同。 使用<code>paramter_name[&#39;keyword_argument&#39;]</code>访问关键字参数的值。</p><p>如果函数访问关键字参数，但是调用代码没有传递该关键字参数，那么它将引发<code>KeyError</code>异常，如下所示。</p><p>Example: Parameterized Function</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">person):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, person[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;firstname&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],  person[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;lastname&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">firstname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bill&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># raises KeyError, must provide &#39;lastname&#39; arguement</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Traceback (most recent call last):</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  File </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&lt;pyshell#21&gt;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, line </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">module</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    greet(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">firstname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Bill&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  File </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&lt;pyshell#19&gt;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, line </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> greet</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello &#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, person[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;firstname&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],  person[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;lastname&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">KeyError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;lastname&#39;</span></span></code></pre></div><h2 id="带默认值的参数" tabindex="-1">带默认值的参数 <a class="header-anchor" href="#带默认值的参数" aria-label="Permalink to &quot;带默认值的参数&quot;">​</a></h2><p>定义函数时，可以为其参数指定默认值。如果在调用函数时传递了适当的实际参数，则该默认值将被替换。但是，如果没有提供实际参数，将在函数内部使用默认值。</p><p>下面的<code>greet()</code>函数是用具有默认值<code>&#39;Guest&#39;</code>的<code>name</code>参数定义的。 只有通过一些实际的参数，才会被替换。</p><p>Example: Parameter with Default Value</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> greet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Guest&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">greet(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Steve&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Guest</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hello Steve</span></span></code></pre></div><h2 id="带返回值的函数" tabindex="-1">带返回值的函数 <a class="header-anchor" href="#带返回值的函数" aria-label="Permalink to &quot;带返回值的函数&quot;">​</a></h2><p>大多数时候，我们需要函数的结果用于进一步的处理。因此，当函数返回时，它也应该返回值。</p><p>用户定义的函数也可以通过在 return 语句前放置一个表达式来向调用环境返回值。在这种情况下，返回值必须赋给某个变量。</p><p>Example: Return Value</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a, b): </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b</span></span></code></pre></div><p>可以调用上面的函数并提供值，如下所示。</p><p>Example: Parameter with Default Value</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">total</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(total)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">total</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(total)</span></span></code></pre></div><p>Output</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">35</span></span></code></pre></div>`,89),h=[t];function l(e,k,E,d,r,g){return a(),i("div",null,h)}const c=s(p,[["render",l]]);export{o as __pageData,c as default};
