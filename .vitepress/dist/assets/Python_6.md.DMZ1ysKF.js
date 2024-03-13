import{_ as s,c as a,o as n,a5 as p}from"./chunks/framework.BthLuVtL.js";const u=JSON.parse('{"title":"Python 数字类型：整数、浮点数、复数","description":"","frontmatter":{},"headers":[],"relativePath":"Python/6.md","filePath":"Python/6.md"}'),t={name:"Python/6.md"},e=p(`<h1 id="python-数字类型-整数、浮点数、复数" tabindex="-1">Python 数字类型：整数、浮点数、复数 <a class="header-anchor" href="#python-数字类型-整数、浮点数、复数" aria-label="Permalink to &quot;Python 数字类型：整数、浮点数、复数&quot;">​</a></h1><p>更新：2022-07-31 02:04</p><p>Python 包括三种表示数字的数字类型:整数、浮点数和复数。</p><h2 id="整数类型" tabindex="-1">整数类型 <a class="header-anchor" href="#整数类型" aria-label="Permalink to &quot;整数类型&quot;">​</a></h2><p>在 Python 中，整数是没有小数部分的零、正或负整数，并且具有无限的精度，例如 0、100、-10。以下是 Python 中有效的整数文字。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; 0</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>&gt;&gt;&gt; 100</span></span>
<span class="line"><span>100</span></span>
<span class="line"><span>&gt;&gt;&gt; -10</span></span>
<span class="line"><span>-10</span></span>
<span class="line"><span>&gt;&gt;&gt; 1234567890</span></span>
<span class="line"><span>1234567890</span></span>
<span class="line"><span>&gt;&gt;&gt; y=5000000000000000000000000000000000000000000000000000000</span></span>
<span class="line"><span>5000000000000000000000000000000000000000000000000000000</span></span></code></pre></div><p>整数可以是二进制、八进制和十六进制值。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; 0b11011000 # 二进制</span></span>
<span class="line"><span>216</span></span>
<span class="line"><span>&gt;&gt;&gt; 0o12 # 八进制</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>&gt;&gt;&gt; 0x12 # 十六进制</span></span>
<span class="line"><span>15</span></span></code></pre></div><p>所有整数文字或变量都是<code>int</code>类的对象。使用<code>type()</code>方法获取类名，如下图。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt;type(100)</span></span>
<span class="line"><span>&lt;class &#39;int&#39;&gt; # 返回整数类型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt;&gt;&gt; x=1234567890</span></span>
<span class="line"><span>&gt;&gt;&gt; type(x)</span></span>
<span class="line"><span>&lt;class &#39;int&#39;&gt; # 返回整数类型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt;&gt;&gt; y=5000000000000000000000000000000000000000000000000000000</span></span>
<span class="line"><span>&gt;&gt;&gt; type(y) # 返回整数类型</span></span>
<span class="line"><span>&lt;class &#39;int&#39;&gt;</span></span></code></pre></div><p>非零整数中不允许在最前面出现0，例如 000123 是无效数字，0000 是 0。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; x=01234567890</span></span>
<span class="line"><span>SyntaxError: invalid token</span></span></code></pre></div><p>Python 不允许逗号作为数字分隔符。请使用下划线<code>_</code>作为分隔符。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; x=1_234_567_890</span></span>
<span class="line"><span>&gt;&gt;&gt; x</span></span>
<span class="line"><span>1234567890</span></span></code></pre></div><p>请注意，整数必须不带小数部分(小数点)。如果包含了小数点，那它就是一个浮点数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; x=5</span></span>
<span class="line"><span>&gt;&gt;&gt; type(x)</span></span>
<span class="line"><span>&lt;class &#39;int&#39;&gt;</span></span>
<span class="line"><span>&gt;&gt;&gt; x=5.0</span></span>
<span class="line"><span>&gt;&gt;&gt; type(x)</span></span>
<span class="line"><span>&lt;class &#39;float&#39;&gt; #这里返回是浮点型</span></span></code></pre></div><p><code>int()</code>函数将字符串或浮点数转换为整数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; int(&#39;100&#39;)</span></span>
<span class="line"><span>100</span></span>
<span class="line"><span>&gt;&gt;&gt; int(&#39;-10&#39;)</span></span>
<span class="line"><span>-10</span></span>
<span class="line"><span>&gt;&gt;&gt; int(&#39;5.5&#39;)</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>&gt;&gt;&gt; int(&#39;100&#39;, 2)</span></span>
<span class="line"><span>4</span></span></code></pre></div><h3 id="二进制的" tabindex="-1">二进制的 <a class="header-anchor" href="#二进制的" aria-label="Permalink to &quot;二进制的&quot;">​</a></h3><p>在 Python 中，0 和 1 的组合中有八位数字的数字 0b 代表二进制数。 例如，0b11011000 是相当于整数 216 的二进制数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; x=0b11011000</span></span>
<span class="line"><span>&gt;&gt;&gt; x</span></span>
<span class="line"><span>216</span></span>
<span class="line"><span>&gt;&gt;&gt; x=0b_1101_1000</span></span>
<span class="line"><span>&gt;&gt;&gt; x</span></span>
<span class="line"><span>216</span></span>
<span class="line"><span>&gt;&gt;&gt; type(x)</span></span>
<span class="line"><span>&lt;class &#39;int&#39;&gt;</span></span></code></pre></div><h3 id="八进制的" tabindex="-1">八进制的 <a class="header-anchor" href="#八进制的" aria-label="Permalink to &quot;八进制的&quot;">​</a></h3><p>以 0o 或 0O 为前缀的数字代表一个八进制数字。 例如 0O12 相当于整数 10。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; x=0o12</span></span>
<span class="line"><span>&gt;&gt;&gt; x</span></span>
<span class="line"><span>10</span></span>
<span class="line"><span>&gt;&gt;&gt; type(x)</span></span>
<span class="line"><span>&lt;class &#39;int&#39;&gt;</span></span></code></pre></div><h3 id="十六进制的" tabindex="-1">十六进制的 <a class="header-anchor" href="#十六进制的" aria-label="Permalink to &quot;十六进制的&quot;">​</a></h3><p>以 0x 或 0X 为前缀的数字表示十六进制号。 例如 0x12 相当于整数 18。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; x=0x12</span></span>
<span class="line"><span>&gt;&gt;&gt; x</span></span>
<span class="line"><span>18</span></span>
<span class="line"><span>&gt;&gt;&gt; type(x)</span></span>
<span class="line"><span>&lt;class &#39;int&#39;&gt;</span></span></code></pre></div><h2 id="浮点数" tabindex="-1">浮点数 <a class="header-anchor" href="#浮点数" aria-label="Permalink to &quot;浮点数&quot;">​</a></h2><p>在 Python 中，浮点数(float)是正负实数，小数部分由十进制符号<code>.</code>或科学符号<code>E</code>或<code>e</code>、 表示，例如 1234.56、3.142、-1.55、0.23。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; f=1.2</span></span>
<span class="line"><span>&gt;&gt;&gt; f</span></span>
<span class="line"><span>1.2</span></span>
<span class="line"><span>&gt;&gt;&gt; type(f)</span></span>
<span class="line"><span>&lt;class &#39;float&#39;&gt;</span></span></code></pre></div><p>浮点数可以用下划线<code>_</code>分隔，例如<code>123_42.222_013</code>是有效的浮点数。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; f=123_42.222_013</span></span>
<span class="line"><span>&gt;&gt;&gt; f</span></span>
<span class="line"><span>12342.222013</span></span></code></pre></div><p>浮动的最大大小取决于您的系统。超出其最大大小的浮动称为“inf”、“Inf”、“infinity”或“INFINITY”。对于大多数系统来说，Float <code>2e400</code>将被认为是无穷大。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; f=2e400</span></span>
<span class="line"><span>&gt;&gt;&gt; f</span></span>
<span class="line"><span>inf</span></span></code></pre></div><p>科学记数法被用作表示有许多数字的浮点数的简短表示法。例如:345.56789 表示为 3.4556789e2 或 3.4556789E2</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; f=1e3</span></span>
<span class="line"><span>&gt;&gt;&gt; f</span></span>
<span class="line"><span>1000.0</span></span>
<span class="line"><span>&gt;&gt;&gt; f=1e5</span></span>
<span class="line"><span>&gt;&gt;&gt; f</span></span>
<span class="line"><span>100000.0</span></span>
<span class="line"><span>&gt;&gt;&gt; f=3.4556789e2</span></span>
<span class="line"><span>&gt;&gt;&gt; f</span></span>
<span class="line"><span>345.56789</span></span></code></pre></div><p>使用<code>float()</code>函数将字符串、int 转换为 float。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; float(&#39;5.5&#39;)</span></span>
<span class="line"><span>5.5</span></span>
<span class="line"><span>&gt;&gt;&gt; float(&#39;5&#39;)</span></span>
<span class="line"><span>5.0</span></span>
<span class="line"><span>&gt;&gt;&gt; float(&#39;     -5&#39;)</span></span>
<span class="line"><span>-5.0</span></span>
<span class="line"><span>&gt;&gt;&gt; float(&#39;1e3&#39;)</span></span>
<span class="line"><span>1000.0</span></span>
<span class="line"><span>&gt;&gt;&gt; float(&#39;-Infinity&#39;)</span></span>
<span class="line"><span>-inf</span></span>
<span class="line"><span>&gt;&gt;&gt; float(&#39;inf&#39;)</span></span>
<span class="line"><span>inf</span></span></code></pre></div><h2 id="复数" tabindex="-1">复数 <a class="header-anchor" href="#复数" aria-label="Permalink to &quot;复数&quot;">​</a></h2><p>复数是有实部和虚部的数。例如，5 + 6j 是复数，其中 5 是实部，6 乘以 j 是虚部。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; a=5+2j</span></span>
<span class="line"><span>&gt;&gt;&gt; a</span></span>
<span class="line"><span>(5+2j)</span></span>
<span class="line"><span>&gt;&gt;&gt; type(a)</span></span>
<span class="line"><span>&lt;class &#39;complex&#39;&gt;</span></span></code></pre></div><p>你必须用 J 或 J 作为虚部。使用其他字符会引发语法错误。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; a=5+2k</span></span>
<span class="line"><span>SyntaxError: invalid syntax</span></span>
<span class="line"><span>&gt;&gt;&gt; a=5+j</span></span>
<span class="line"><span>SyntaxError: invalid syntax</span></span>
<span class="line"><span>&gt;&gt;&gt; a=5i+2j</span></span>
<span class="line"><span>SyntaxError: invalid syntax</span></span></code></pre></div><h2 id="算术运算符" tabindex="-1">算术运算符 <a class="header-anchor" href="#算术运算符" aria-label="Permalink to &quot;算术运算符&quot;">​</a></h2><p>下表列出了整数值的算术运算符:</p><table><thead><tr><th>操作员</th><th>描述</th><th>例子</th></tr></thead><tbody><tr><td>+(加法)</td><td>在运算符的两侧添加操作数。</td><td>&gt; &gt; &gt; a = 10b = 20</td></tr></tbody></table><p>T2&gt;T4&gt;a+b T6】30 | | -(减法) | 从左侧操作数中减去右侧操作数。 | &gt; &gt; &gt; a = 10b = 20</p><h2 id="复数的算术运算" tabindex="-1">复数的算术运算 <a class="header-anchor" href="#复数的算术运算" aria-label="Permalink to &quot;复数的算术运算&quot;">​</a></h2><p>复数的加法和减法很简单。实部和虚部相加/相减得到结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; a=6+4j</span></span>
<span class="line"><span>&gt;&gt;&gt; a+2</span></span>
<span class="line"><span>(8+4j)</span></span>
<span class="line"><span>&gt;&gt;&gt; a*2</span></span>
<span class="line"><span>(12+8j)</span></span>
<span class="line"><span>&gt;&gt;&gt; a/2</span></span>
<span class="line"><span>(3+2j)</span></span>
<span class="line"><span>&gt;&gt;&gt; a**2</span></span>
<span class="line"><span>(20+48j)</span></span>
<span class="line"><span>&gt;&gt;&gt; b=3+2j</span></span>
<span class="line"><span>&gt;&gt;&gt; a+b    </span></span>
<span class="line"><span>(9+6j)    </span></span>
<span class="line"><span>&gt;&gt;&gt; a-b    </span></span>
<span class="line"><span>(3+2j)</span></span></code></pre></div><p>算术运算符也可以用于两个复数，如下所示。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&gt;&gt;&gt; a=6+4j</span></span>
<span class="line"><span>&gt;&gt;&gt; b=3+2j</span></span>
<span class="line"><span>&gt;&gt;&gt; a+b    </span></span>
<span class="line"><span>(9+6j)    </span></span>
<span class="line"><span>&gt;&gt;&gt; a-b    </span></span>
<span class="line"><span>(3+2j)</span></span>
<span class="line"><span>&gt;&gt;&gt; a*b    </span></span>
<span class="line"><span>(10+24j)</span></span></code></pre></div><p>这两个复数相乘的过程非常类似于两个二项式相乘。将第一个数字中的每个项乘以第二个数字中的每个项。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>a=6+4j             </span></span>
<span class="line"><span>b=3+2j             </span></span>
<span class="line"><span>c=a*b              </span></span>
<span class="line"><span>c=(6+4j)*(3+2j)    </span></span>
<span class="line"><span>c=(18+12j+12j+8*-1)</span></span>
<span class="line"><span>c=10+24j</span></span></code></pre></div><h2 id="内置函数" tabindex="-1">内置函数 <a class="header-anchor" href="#内置函数" aria-label="Permalink to &quot;内置函数&quot;">​</a></h2><p>可以使用以下函数将一种类型的数值对象转换为另一种类型:</p><table><thead><tr><th>内置函数</th><th>描述</th></tr></thead><tbody><tr><td>int</td><td>从浮点数或包含数字的字符串中返回整数对象。</td></tr><tr><td>float</td><td>从包含带小数点或科学表示法的数字的数字或字符串中返回浮点数对象。</td></tr><tr><td>complex</td><td>返回一个有实部和虚部的复数。</td></tr><tr><td>hex</td><td>将十进制整数转换为前缀为 0x 的十六进制数。</td></tr><tr><td>oct</td><td>将十进制整数转换为前缀为 0o 的八进制表示形式。</td></tr><tr><td>pow</td><td>返回指定数字的幂。</td></tr><tr><td>abs</td><td>返回一个数字的绝对值，不考虑它的符号。</td></tr><tr><td>round</td><td>返回四舍五入的数字。</td></tr></tbody></table>`,57),l=[e];function i(c,g,o,d,h,r){return n(),a("div",null,l)}const v=s(t,[["render",i]]);export{u as __pageData,v as default};
