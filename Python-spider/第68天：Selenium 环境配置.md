![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWyziagILorxp2NDAKBO6r0Vr48FDLLqsGqNVGqq2QoSe9FShJakcJkWgKlPcnormMuBS1etZjs2mGog/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

如果你做过 Web 测试的工作，那么你应该明白 Web 测试中最重要的一部分工作就是自动化测试。自动化测试，顾名思义就是让浏览器自动运行，而无需手动操作。这和我们爬虫工作原理有些相似，我们爬虫也需要让浏览器运行网址来获取我们需要的内容。所以我们今天来介绍一款自动化测试工具—— Selenium ，并将它运用到爬虫中来。

什么是 Selenium
------------

我们首先来看看百度上搜索 selenium 的结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyziagILorxp2NDAKBO6r0Vr4ickbG9Uticr6Npe0YxKDk4bJJQfNRagZZjwGs5ZzRCehr0G73QYib8ziaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

它的官网标题后面副标题是“Web Browser Automation”，什么意思？直译过来就是 Web 浏览器自动化，很直白很明显对不对？

我们再来看看官网的定义：

> Selenium automates browsers. That's it! What you do with that power is entirely up to you. Primarily, it is for automating web applications for testing purposes, but is certainly not limited to just that. Boring web-based administration tasks can (and should!) be automated as well.

> Selenium has the support of some of the largest browser vendors who have taken (or are taking) steps to make Selenium a native part of their browser. It is also the core technology in countless other browser automation tools, APIs and frameworks.

从这两段定义来看，大意就是 Selenium 的初衷是为 Web 应用自动化测试而生，但是它的用处不限于此，怎么使用完全取决于你。你可以用它来自动化处理一些基于 Web 的任务。各大浏览器厂商也将 Selenium 嵌入到它们的浏览器中了。Selenium 也广泛应用于其他的自动化工具、 API 和框架中。

Selenium 的环境搭建
--------------

### 安装 Selenium 工具包

跟其他 Python 工具包一样，有两种安装方式：一种是命令行安装：

> pip install -U selenium

另一种是下载 Python 安装包文件，然后再手动安装。下载地址为 https://pypi.org/project/selenium/#files ，下载后解压压缩包，然后用命令行进入该压缩包的根目录，输入命令进行安装：

> python setup.py install

个人还是比较推荐前一种安装方式，简单省心，一个命令就搞定。

### 安装浏览器驱动

对于 Selenium 3，要使用其功能，我们需要安装浏览器驱动。每个浏览器厂家都有自己的驱动，本文以 Chrome 浏览器为例，向大家介绍怎么安装浏览器驱动。

Chrome 的每个浏览器版本都会有对应版本的驱动， 所以我们第一步是要知道我们浏览器的版本。Chrome 浏览器的版本信息在“设置->关于 Chrome”里面可以找到，具体可以参照下图：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

找到浏览器版本后，我们到 http://chromedriver.storage.googleapis.com/index.html 下载对应的 chromedriver 。以前的老版本都是2.x的版本，大家需要到网上搜一下版本对应关系。Chrome 从版本70之后就很好找了，所以建议大家将 Chrome 版本升级至最新的，驱动也好找些。

进入每个具体的 chromedriver 版本目录之后，我们可以看到下面这样的页面：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

大家根据自己的操作系统，选择对应的文件下载即可。

下载完成后，解压压缩包，会得到 chromedriver 的驱动。不同的操作系统有不同的安装方式：

Windows 操作系统的安装关键步骤是：

> ① 把下载成功的驱动包chromedriver.exe解压出来，放在谷歌浏览器安装目录下的Application目录中（鼠标右键点击谷歌图标，选择属性，可在起始位置查看谷歌目录）。

> ② 然后配置系统环境变量在path中添加chromedriver.exe的路径。

> ③ 将chromedriver.exe放在C盘中windows文件夹下的SysWOW64，如果是32位系统则放在System32中。

笔者用的是 Mac 操作系统， Mac 系统安装驱动在网上搜索可以搜到两种方法：第一种是将 chromedriver 复制到 /usr/bin 目录下， 另一种是将 chromedriver 复制到 /usr/local/bin 目录下。

笔者采取的是第二种方案，因为第一种方案存在一个问题：Mac 对 /usr/bin 这个路径有权限的限制，即使你是 root 用户，也无法正常移动文件过去，这时，需关闭 Mac 的 SIP 方法 ，具体操作可参考：https://jingyan.baidu.com/article/e5c39bf5d13bf939d76033cf.html 。

至于网上说的将 chromedriver 驱动文件复制到 /usr/bin 或者 /usr/local/bin 后，需要在环境变量里面配置相应的目录，笔者试过不配置也没问题，当然配置了也不会出问题，所以为了省事，可以不用配置。

接下来，我们在命令行输入如下命令就可以查看我们的 chromedriver 版本了：

> chromedriver --version

返回的版本号信息：

> ChromeDriver 78.0.3904.11 (eaaae9de6b8999773fa33f92ce1e1bbe294437cf-refs/branch-heads/3904@{#86})

看到这个就表示 Chrome 驱动安装成功了。

现在我们来用最简单的语句测试一下，看能不能运行 Selenium：

```
from selenium import webdriver
```

我们会看到弹出一个浏览器，闪了一下就消失了，同时在命令行有报错信息，报错信息的最后一行是：

> selenium.common.exceptions.SessionNotCreatedException: Message: session not created: This version of ChromeDriver only supports Chrome version 78

大意就是目前的 chromedriver 版本只支持 78版本的 Chrome 浏览器，直白点就是浏览器驱动和浏览器的版本不匹配，这里我的浏览器是77版本，下载的驱动是78版本，所以导致报错。

下载77版本的驱动，替换掉 /usr/local/bin 目录下的驱动，然后重新运行上面的程序，我们会发现弹出来 Chrome 浏览器窗口，并打开了百度首页，这就代表我们的程序正常运行了，我们的环境配置成功了。

总结
--

本节给大家简单介绍了 Selenium ， 以及对应的环境配置。其中环境配置是比较繁琐的，不同的操作系统不同的机器可能会出现各种各样的问题，这也是我们技术人员最头疼的地方，大家需要耐住性子慢慢来解决。环境配置好后，后面我们就可以用 Selenium 去做一些很 Cool 的事情了！

> 文中示例代码：https://github.com/JustDoPython/python-100-day/tree/master/day-068

**系列文章**

**[第67天：PyQuery 详解](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484078&idx=1&sn=c144047aab43206123682156295cd717&chksm=fbdada23ccad5335c6001a2a1e20f0bdffb59fdebb366b1cbe9217af8b2fbd91dc07541b43c2&scene=21#wechat_redirect)**

[**第66天：****爬虫利器 Beautiful Soup 之搜索文档**](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484074&idx=1&sn=b5fb525981319cbf6557a60599440b99&chksm=fbdada27ccad53316c0c7c8e230082c627adc1121cd6890a16ee6a15871d8cde717ef4805313&scene=21#wechat_redirect)

**[第65天：爬虫利器 Beautiful Soup 之遍历文档](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484070&idx=1&sn=5ee609ecd7ed2f1545c0dd9ab60a2bbc&chksm=fbdada2bccad533d8920853d851c802a088744c4c867352e03a178d3b812ddf1e8c20730b675&scene=21#wechat_redirect)**  

**[第64天：XPath 和 lxml](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484066&idx=1&sn=007c09d8178afce051e0ad787191d0dd&chksm=fbdada2fccad53394641c189c51a183d9621bc88d6bd027920115d1602ba7e41baa616b7b2f1&scene=21#wechat_redirect)**

**[第63天：正则表达式](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484062&idx=1&sn=2596dbedf36369cb4c8aa9351d4b2c71&chksm=fbdada13ccad5305afdb419ad7cd3fc333b346e5f3587bd3a174aebcecd58bf6f8e0d9f213ac&scene=21#wechat_redirect)**

**[第62天：HTTP 入门](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484058&idx=1&sn=57e9525fe40a83de9c0cd29809d160b0&chksm=fbdada17ccad53017f73d69b4f031f7b1d7adca993f93b332ec8f4708434b9b7ae70a55d151b&scene=21#wechat_redirect)**

**[第61天：Python Requests 库高级用法](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484049&idx=1&sn=c260f993dab358370904531a9fffb010&chksm=fbdada1cccad530acf3a2cba5de5fcd3543670d1576ed957c7e47ac2c7178a0d24b830a90490&scene=21#wechat_redirect)**

**[从 0 学习 Python 0 - 60 大合集总结](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484049&idx=2&sn=26f28abcdefd030f2fc294f9cca9d140&chksm=fbdada1cccad530a4b619aa4cc2ea75886d02aa0b2d244029e2ac2cffd67e284ea13494c0ed8&scene=21#wechat_redirect)**

**PS：**公号内回复 ：Python，即可进入Python 新手学习交流群，一起**[100天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483671&idx=1&sn=2dc45e9363f86a6938b0c30da0b2a0ba&chksm=fbdad99accad508c083bfa72007b30d6a13a22b4a3c035c4c38bd7c9bb7da46aa42d93c5e14d&scene=21#wechat_redirect)**

\-END-  

**Python 技术  
**

****关于 Python 都在这里****

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493374&idx=1&sn=6180713d275d63616883ec74c2d76110&chksm=c1724ecef605c7d89b88e61d5df35b3759951c5b318b70f663df8615eb7ec591a5b4d7785704&scene=21#wechat_redirect>，如有侵权，请联系删除。