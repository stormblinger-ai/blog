import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const l="/assets/119-1.DvvczoUf.png",e="/assets/119-2.CNBnnl4p.png",f=JSON.parse('{"title":"3.数据收集客户端","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB3.md","filePath":"python-demo/CMDB3.md"}'),i={name:"python-demo/CMDB3.md"},t=p('<h1 id="_3-数据收集客户端" tabindex="-1">3.数据收集客户端 <a class="header-anchor" href="#_3-数据收集客户端" aria-label="Permalink to &quot;3.数据收集客户端&quot;">​</a></h1><hr><p>CMDB最主要的管理对象是各种类型大量的服务器，其数据信息自然不可能通过手工收集，必须以客户端的方式，定时自动收集并报告给远程的服务器。</p><p>下面，让我们暂时忘掉Django，进入Python运维的世界......</p><h2 id="一、客户端程序组织" tabindex="-1">一、客户端程序组织 <a class="header-anchor" href="#一、客户端程序组织" aria-label="Permalink to &quot;一、客户端程序组织&quot;">​</a></h2><p>编写客户端，不能一个py脚本包打天下，要有组织有目的，通常我们会采取下面的结构：</p><p><img src="'+l+`" alt="image"></p><p>在Pycharm中，项目根目录下，创建一个Client目录，作为客户端的根目录。</p><p>在Client下，创建下面的包。注意是包，不是文件夹：</p><ul><li>bin：客户端启动脚本的所在目录</li><li>conf：配置文件目录</li><li>core：核心代码目录</li><li>log：日志文件目录</li><li>plugins：插件或工具目录</li></ul><h2 id="二、开发数据收集客户端" tabindex="-1">二、开发数据收集客户端 <a class="header-anchor" href="#二、开发数据收集客户端" aria-label="Permalink to &quot;二、开发数据收集客户端&quot;">​</a></h2><h3 id="_1-程序入口脚本" tabindex="-1">1.程序入口脚本 <a class="header-anchor" href="#_1-程序入口脚本" aria-label="Permalink to &quot;1.程序入口脚本&quot;">​</a></h3><p>在bin目录中新建<code>main.py</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#!/usr/bin/env python</span></span>
<span class="line"><span># -*- coding:utf-8 -*-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>完全可以把客户端信息收集脚本做成windows和linux两个不同的版本。</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BASE_DIR = os.path.dirname(os.getcwd())</span></span>
<span class="line"><span># 设置工作目录，使得包和模块能够正常导入</span></span>
<span class="line"><span>sys.path.append(BASE_DIR)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from core import handler</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    handler.ArgvHandler(sys.argv)</span></span></code></pre></div><p><strong>在pycharm中可能出现导入失败的红色波浪线警告信息，其实是可以导入的，请忽略它。</strong></p><ul><li>通过os和sys模块的配合，将当前客户端所在目录设置为工作目录，如果不这么做，会无法导入其它模块；</li><li>handler模块是核心代码模块，在core目录中，我们一会来实现它。</li><li>以后调用客户端就只需要执行<code>python main.py 参数</code>就可以了</li></ul><p><strong>这里有个问题一定要强调一下，那就是Python解释器的调用，执行命令的方式和代码第一行<code>#!/usr/bin/env python</code>的指定方式一定不能冲突，要根据你的实际情况实际操作和修改代码！</strong></p><h3 id="_2-主功能模块" tabindex="-1">2.主功能模块 <a class="header-anchor" href="#_2-主功能模块" aria-label="Permalink to &quot;2.主功能模块&quot;">​</a></h3><p>在core下，创建<code>handler.py</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># -*- coding:utf-8 -*-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import json</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>import urllib.parse</span></span>
<span class="line"><span>import urllib.request</span></span>
<span class="line"><span>from core import info_collection</span></span>
<span class="line"><span>from conf import settings</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ArgvHandler(object):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __init__(self, args):</span></span>
<span class="line"><span>        self.args = args</span></span>
<span class="line"><span>        self.parse_args()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def parse_args(self):</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        分析参数，如果有参数指定的方法，则执行该功能，如果没有，打印帮助说明。</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        if len(self.args) &gt; 1 and hasattr(self, self.args[1]):</span></span>
<span class="line"><span>            func = getattr(self, self.args[1])</span></span>
<span class="line"><span>            func()</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            self.help_msg()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def help_msg():</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        帮助说明</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        msg = &#39;&#39;&#39;</span></span>
<span class="line"><span>        参数名               功能</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        collect_data        测试收集硬件信息的功能</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        report_data         收集硬件信息并汇报</span></span>
<span class="line"><span>        &#39;&#39;&#39;</span></span>
<span class="line"><span>        print(msg)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def collect_data():</span></span>
<span class="line"><span>        &quot;&quot;&quot;收集硬件信息,用于测试！&quot;&quot;&quot;</span></span>
<span class="line"><span>        info = info_collection.InfoCollection()</span></span>
<span class="line"><span>        asset_data = info.collect()</span></span>
<span class="line"><span>        print(asset_data)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def report_data():</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        收集硬件信息，然后发送到服务器。</span></span>
<span class="line"><span>        :return:</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>        # 收集信息</span></span>
<span class="line"><span>        info = info_collection.InfoCollection()</span></span>
<span class="line"><span>        asset_data = info.collect()</span></span>
<span class="line"><span>        # 将数据打包到一个字典内，并转换为json格式</span></span>
<span class="line"><span>        data = {&quot;asset_data&quot;: json.dumps(asset_data)}</span></span>
<span class="line"><span>        # 根据settings中的配置，构造url</span></span>
<span class="line"><span>        url = &quot;http://%s:%s%s&quot; % (settings.Params[&#39;server&#39;], settings.Params[&#39;port&#39;], settings.Params[&#39;url&#39;])</span></span>
<span class="line"><span>        print(&#39;正在将数据发送至： [%s]  ......&#39; % url)</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            # 使用Python内置的urllib.request库，发送post请求。</span></span>
<span class="line"><span>            # 需要先将数据进行封装，并转换成bytes类型</span></span>
<span class="line"><span>            data_encode = urllib.parse.urlencode(data).encode()</span></span>
<span class="line"><span>            response = urllib.request.urlopen(url=url, data=data_encode, timeout=settings.Params[&#39;request_timeout&#39;])</span></span>
<span class="line"><span>            print(&quot;\\033[31;1m发送完毕！\\033[0m &quot;)</span></span>
<span class="line"><span>            message = response.read().decode()</span></span>
<span class="line"><span>            print(&quot;返回结果：%s&quot; % message)</span></span>
<span class="line"><span>        except Exception as e:</span></span>
<span class="line"><span>            message = &#39;发送失败&#39; + &quot;   错误原因：  {}&quot;.format(e)</span></span>
<span class="line"><span>            print(&quot;\\033[31;1m发送失败，错误原因： %s\\033[0m&quot; % e)</span></span>
<span class="line"><span>        # 记录发送日志</span></span>
<span class="line"><span>        with open(settings.PATH, &#39;ab&#39;) as f:  # 以byte的方式写入，防止出现编码错误</span></span>
<span class="line"><span>            log = &#39;发送时间：%s \\t 服务器地址：%s \\t 返回结果：%s \\n&#39; % (time.strftime(&#39;%Y-%m-%d %H:%M:%S&#39;), url, message)</span></span>
<span class="line"><span>            f.write(log.encode())</span></span>
<span class="line"><span>            print(&quot;日志记录成功！&quot;)</span></span></code></pre></div><p>说明：</p><ul><li>handler模块中只有一个ArgvHandler类；</li><li>在main模块中也是实例化了一个ArgvHandler类的对象，并将调用参数传递进去；</li><li>首先，初始化方法会保存调用参数，然后执行parse_args()方法分析参数；</li><li>如果ArgvHandler类有参数指定的功能，则执行该功能，如果没有，打印帮助说明。</li><li>目前ArgvHandler类只有两个核心方法：<code>collect_data</code>和<code>report_data</code>；</li><li><code>collect_data</code>收集数据并打印到屏幕，用于测试；<code>report_data</code>方法才会将实际的数据发往服务器。</li><li>数据的收集由<code>info_collection.InfoCollection</code>类负责，一会再看；</li><li><code>report_data</code>方法会将收集到的数据打包到一个字典内，并转换为json格式；</li><li>然后通过settings中的配置，构造发送目的地url；</li><li>通过Python内置的urllib.parse对数据进行封装；</li><li>通过urllib.request将数据发送到目的url；</li><li>接收服务器返回的信息；</li><li>将成功或者失败的信息写入日志文件中。</li></ul><p>以后，我们要测试数据收集，执行<code>python main.py collect_data</code>；要实际往服务器发送收集到的数据，则执行<code>python main.py report_data</code>。</p><h3 id="_3-配置文件" tabindex="-1">3.配置文件 <a class="header-anchor" href="#_3-配置文件" aria-label="Permalink to &quot;3.配置文件&quot;">​</a></h3><p>要将所有可能修改的数据、常量、配置等都尽量以配置文件的形式组织起来，尽量不要在代码中写死任何数据。</p><p>在conf中，新建<code>settings.py</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># -*- coding:utf-8 -*-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 远端接收数据的服务器</span></span>
<span class="line"><span>Params = {</span></span>
<span class="line"><span>    &quot;server&quot;: &quot;192.168.0.100&quot;,</span></span>
<span class="line"><span>    &quot;port&quot;: 8000,</span></span>
<span class="line"><span>    &#39;url&#39;: &#39;/assets/report/&#39;,</span></span>
<span class="line"><span>    &#39;request_timeout&#39;: 30,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 日志文件配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PATH = os.path.join(os.path.dirname(os.getcwd()), &#39;log&#39;, &#39;cmdb.log&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 更多配置，请都集中在此文件中</span></span></code></pre></div><p>这里，配置了服务器地址、端口、发送的url、请求的超时时间，以及日志文件路径。请根据你的实际情况进行修改。</p><h3 id="_4-信息收集模块" tabindex="-1">4.信息收集模块 <a class="header-anchor" href="#_4-信息收集模块" aria-label="Permalink to &quot;4.信息收集模块&quot;">​</a></h3><p>在core中新建<code>info_collection.py</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># -*- coding:utf-8 -*-</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span>import platform</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class InfoCollection(object):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def collect(self):</span></span>
<span class="line"><span>        # 收集平台信息</span></span>
<span class="line"><span>        # 首先判断当前平台，根据平台的不同，执行不同的方法</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            func = getattr(self, platform.system().lower())</span></span>
<span class="line"><span>            info_data = func()</span></span>
<span class="line"><span>            formatted_data = self.build_report_data(info_data)</span></span>
<span class="line"><span>            return formatted_data</span></span>
<span class="line"><span>        except AttributeError:</span></span>
<span class="line"><span>            sys.exit(&quot;不支持当前操作系统： [%s]! &quot; % platform.system())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def linux():</span></span>
<span class="line"><span>        from plugins.collect_linux_info import collect</span></span>
<span class="line"><span>        return collect()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def windows():</span></span>
<span class="line"><span>        from plugins.collect_windows_info import Win32Info</span></span>
<span class="line"><span>        return Win32Info().collect()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @staticmethod</span></span>
<span class="line"><span>    def build_report_data(data):</span></span>
<span class="line"><span>        # 留下一个接口，方便以后增加功能或者过滤数据</span></span>
<span class="line"><span>        pass</span></span>
<span class="line"><span>        return data</span></span></code></pre></div><p>该模块的作用很简单：</p><ul><li>首先通过Python内置的platform模块获取执行main脚本的操作系统类别，通常是windows和Linux，暂时不支持其它操作系统；</li><li>根据操作系统的不同，反射获取相应的信息收集方法，并执行；</li><li>如果是客户端不支持的操作系统，比如苹果系统，则提示并退出客户端。</li></ul><p>因为windows和Linux两大操作系统的巨大平台差异，我们必须写两个收集信息的脚本。</p><p>到目前为止，我们的客户端结构如下图所示：</p><p><img src="`+e+'" alt="image"></p><hr>',37),o=[t];function c(r,d,u,h,m,_){return a(),n("div",null,o)}const q=s(i,[["render",c]]);export{f as __pageData,q as default};
