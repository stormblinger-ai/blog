![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

Scrapy 框架实现爬虫的基本原理
==================

Scrapy 就是封装好的框架，你可以专心编写爬虫的核心逻辑，无需自己编写与爬虫逻辑无关的代码，套用这个框架就可以实现以上功能——爬取到想要的数据。如果暂时理解不深也没关系，后边会结合实例具体介绍。

Python 爬虫基本流程
=============

A 发起请求———B 解析内容———C 获取响应内容———D 保存数据
-----------------------------------

A 通过 HTTP 向目标站点发起请求，即发送一个 Request ，请求可以包含额外的 headers 等信息，等待服务器响应。

B 得到的内容可能是 HTML ，可以用正则表达式、网页解析库进行解析。可能是 Json ，可以直接转为 Json 对象解析，可能是二进制数据，可以做保存或者进一步的处理。

C 如果服务器能正常响应，会得到一个 Response ， Response 的内容便是所要获取的页面内容，类型可能有 HTML ， Json 字符串，二进制数据（如图片视频）等类型。

D 保存形式多样，可以存为文本，也可以保存至数据库，或者保存特定格式的文件。

搭建自己本机环境如下：Windows7 64bit———Python3.7———Pycharm64

安装 Python———安装 Pycharm———安装 Scrapy———新建爬虫项目
-------------------------------------------

简单解释：将 Python 比作 Java ，那么 Pycharm 就相当于 eclipse ， Pycharm 就是 Python 语言的运行环境 IDE 工具。

安装 Python
=========

在 Python 的官网 www.python.org 中找到最新版本的 Python 安装包，点击进行下载，请注意，当你的电脑是32位的机器，请选择32位的安装包，如果是64位的，请选择64位的安装包；

我自己机器是 win7 64bit 所以我下载的是 python-3.7.4.amd64.exe，其中的 add python 3.7 to PATH 一定要勾选。

另外安装 python 路径不要有中文和空格，避免以后麻烦。后边就点击下一步即可。

如果忘记勾选则需要手动添加环境变量：（需要添加两个：c:\\python3.7.0;c:\\python3.7.0\\Scripts）

右键计算机——点击属性——点击高级系统设置——高级——环境变量——用户变量——PATH  添加自己安装 python 的路径。

安装 Pycharm
==========

本篇对于环境的搭建只是起到抛砖引玉的作用，建议大家以下边做参考。

https://www.runoob.com/w3cnote/pycharm-windows-install.html

安装 Scrapy
=========

由于安装 Scrapy 不是本系列重点，所以仅展示 Windows 系统上安装 Scrapy 的步骤。注意：一定按顺序安装。Cmd 进入 dos 窗口：

```
C:\Users\Administrator>python
```

如果中途安装遇到问题请及时 Google 查阅资料，查阅就是积累的过程。

Scrapy 创建新项目：
=============

Pycharm 中用 alt+F12 切换到命令行，在命令行输入：

```
(venv2) E:\>scrapy startproject peilv
```

就会生成 Scrapy 项目，项目名称是 peilv ，结构如下：主要改写2个文件：“items、settings”，新增2个文件：“爬虫主程序”、itemcsvexporter。

```
peilv
```

items.py：
=========

```
# -*- coding: utf-8 -*-
```

settings.py：
============

```
# -*- coding: utf-8 -*-
```

itemcsvexporter.py：
===================

```
from scrapy.conf import settings
```

爬虫主程序.py：(下一篇详细介绍)
==================

```
# -*- coding: utf-8 -*-
```

改写完程序后，最终执行命令：Pycharm 用 alt+F12 切换到命令行在项目 peilv 路径上执行：

```
(venv2) E:\>cd peilv\peilv 
```

其中 FBP 是在“爬虫主程序.py”定义的——name = 'FBP'，“-o BaseData.csv” 是将爬取的数据输出到 csv 文件中。

总结
--

以上我们以一个实战项目为依托，将建立 Scrapy 项目的过程从零开始，深入浅出，让读者能够实践爬虫的整个过程。

代码地址
----

> 示例代码：https://github.com/JustDoPython/python-100-day/tree/master/day-070

  

**系列文章**

**[第69天：Selenium详解](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484091&idx=1&sn=f8bd237496d39835969e5f7c610e2f21&chksm=fbdada36ccad5320602d87f8866d52e5cb38959e2447196635fd813e99c631ff71002d23d195&scene=21#wechat_redirect)**

**[第68天：Selenium 环境配置](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484085&idx=1&sn=b8f1738d2650f73fa3810b5b8a54e4ac&chksm=fbdada38ccad532e1c066fe513802b5e33d5c5f1fb78e0b12703787fa9ae8498112af6d5d985&scene=21#wechat_redirect)**

**[第67天：PyQuery 详解](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484078&idx=1&sn=c144047aab43206123682156295cd717&chksm=fbdada23ccad5335c6001a2a1e20f0bdffb59fdebb366b1cbe9217af8b2fbd91dc07541b43c2&scene=21#wechat_redirect)**  

**[第66天：爬虫利器 Beautiful Soup 之搜索文档](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484074&idx=1&sn=b5fb525981319cbf6557a60599440b99&chksm=fbdada27ccad53316c0c7c8e230082c627adc1121cd6890a16ee6a15871d8cde717ef4805313&scene=21#wechat_redirect)**

**[第65天：爬虫利器 Beautiful Soup 之遍历文档](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484070&idx=1&sn=5ee609ecd7ed2f1545c0dd9ab60a2bbc&chksm=fbdada2bccad533d8920853d851c802a088744c4c867352e03a178d3b812ddf1e8c20730b675&scene=21#wechat_redirect)**

**[第64天：XPath 和 lxml](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484066&idx=1&sn=007c09d8178afce051e0ad787191d0dd&chksm=fbdada2fccad53394641c189c51a183d9621bc88d6bd027920115d1602ba7e41baa616b7b2f1&scene=21#wechat_redirect)  
**

**[第63天：正则表达式](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484062&idx=1&sn=2596dbedf36369cb4c8aa9351d4b2c71&chksm=fbdada13ccad5305afdb419ad7cd3fc333b346e5f3587bd3a174aebcecd58bf6f8e0d9f213ac&scene=21#wechat_redirect)  
**

**[第62天：HTTP 入门](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484058&idx=1&sn=57e9525fe40a83de9c0cd29809d160b0&chksm=fbdada17ccad53017f73d69b4f031f7b1d7adca993f93b332ec8f4708434b9b7ae70a55d151b&scene=21#wechat_redirect)**

**[第 61 天：Python Requests 库高级用法](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484049&idx=1&sn=c260f993dab358370904531a9fffb010&chksm=fbdada1cccad530acf3a2cba5de5fcd3543670d1576ed957c7e47ac2c7178a0d24b830a90490&scene=21#wechat_redirect)**

**[从 0 学习 Python 0 - 60 大合集总结](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484049&idx=2&sn=26f28abcdefd030f2fc294f9cca9d140&chksm=fbdada1cccad530a4b619aa4cc2ea75886d02aa0b2d244029e2ac2cffd67e284ea13494c0ed8&scene=21#wechat_redirect)**

  

**PS：**公号内回复 ：Python，即可进入Python 新手学习交流群，一起**[100天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483671&idx=1&sn=2dc45e9363f86a6938b0c30da0b2a0ba&chksm=fbdad99accad508c083bfa72007b30d6a13a22b4a3c035c4c38bd7c9bb7da46aa42d93c5e14d&scene=21#wechat_redirect)**

\-END-  

**Python 技术  
**

****关于 Python 都在这里****

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493376&idx=1&sn=4100844e19b6f713cd9162b89e3488ea&chksm=c1724f30f605c6261bbe01e81a593cbed9ff00bccd4c73ad592dec2bbcc8a891f4672a297dd2&scene=21#wechat_redirect>，如有侵权，请联系删除。