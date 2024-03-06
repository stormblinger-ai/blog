![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

文 | 某某白米饭  

来源：Python 技术「ID: pythonall」

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/t8ibUxVnMTLPLUyAAdaDETpj5xxGvtM5pcns01OplkMfZrYaMeHJUFDOGIAjbOpGab87wO7uZhjEwv0WnhPbq1A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "金属质感分割线")

psutil 是一个跨平台库（http://pythonhosted.org/psutil）能够获取到系统运行的进程和系统利用率（包括CPU、内存、磁盘、网络等）信息。主要用来做系统监控，性能分析，进程管理。支持 Linux、Mac OS、Windows 系统。

本文以 psutil 模块获取系统信息开发一个监控 Mac OS 系统的平台。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/SAy0yVjKWywK7XrgreTZpiaqjqDka2CEXXHuYqcgUy1KlpO71beBibwkCJRCWxkndedP1prAibm45KPkk9ZsI6ZtA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

### 准备工作

#### 技术选择

*   监控的系统是 Mac OS 系统
    
*   监控系统模块选择 psutil 模块
    
*   Web 框架选择的是 Flask 框架
    
*   前端 UI 选择的是 Bootstrap UI
    
*   动态可视化图表选择 Pyecharts 模块
    

#### 安装 psutil

```
pip3 install psutil
```

#### 安装 Flask、pyecharts、Bootstrap

*   Flask 的教程是在公众号文章：Web 开发 Flask 介绍
    
*   Pyecharts 的教程在公众号文章：Python 图表利器 pyecharts，按照官网 (http://pyecharts.org/#/zh-cn/web\_flask) 文档整合 Flask 框架，并使用定时全量更新图表。
    
*   Bootstrap 是一个 前端的 Web UI，官网地址是 (https://v4.bootcss.com)
    

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWywK7XrgreTZpiaqjqDka2CEXEpCIW6cGUzocTic9SfCBmljNNvzUYWfnM6u0S4O2icsk1ACyRAYlGt2w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 获取系统信息

#### CPU信息

通过 psutil 获取 CPU 信息

```
>>> import psutil
```

在监控平台上每 2 秒请求 url 获取 CPU 负载，并动态显示图表

```
cpu_percent_dict = {}
```

示例结果

![图片](https://mmbiz.qpic.cn/mmbiz_gif/SAy0yVjKWywK7XrgreTZpiaqjqDka2CEXHu2OicjXGyoicX4g88quG3cN3zHAFcfZU724PEg7EgBvVibsg7QU74rZA/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

#### 内存

通过 psutil 获取内存和交换区信息

```
# 系统内存信息 总内存/立刻可用给进程使用的内存/内存负载/已使用内存/空闲内存/当前正在使用或者最近使用的内存/未使用的内存/永久在内存
```

在监控平台上每 2 秒请求 url 获取内存负载，并动态显示图表

```
def memory():
```

示例结果

![图片](https://mmbiz.qpic.cn/mmbiz_gif/SAy0yVjKWywK7XrgreTZpiaqjqDka2CEXKrVaS3f0wicu69QHvROyiazg6JdhvnBgVnv05Vm5oXlzZaQXdvVT6Owg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

#### 磁盘

通过 psutil 获取磁盘大小、分区、使用率和磁盘IO

```
# 磁盘分区情况
```

在监控平台上每 2 秒请求 url 获取磁盘信息，并动态显示图表

```
disk_dict = {'disk_time':[], 'write_bytes': [], 'read_bytes': [], 'pre_write_bytes': 0, 'pre_read_bytes': 0, 'len': -1}
```

示例结果

![图片](https://mmbiz.qpic.cn/mmbiz_gif/SAy0yVjKWywK7XrgreTZpiaqjqDka2CEXbj5Z04TdxibyPw5q6WVJ9Cmydu1LKSEcGW45j6H27U5UwKD4uic8ibUsg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

#### 网卡

通过 psutil 获取网络接口和网络连接的信息

```
# 获取网络字节数和包的个数 发送的字节数/收到的字节数/发送的包数/收到的包数
```

在监控平台上每 2 秒请求 url 获取网卡IO，并动态显示图表

```
net_io_dict = {'net_io_time':[], 'net_io_sent': [], 'net_io_recv': [], 'pre_sent': 0, 'pre_recv': 0, 'len': -1}
```

示例结果

![图片](https://mmbiz.qpic.cn/mmbiz_gif/SAy0yVjKWywK7XrgreTZpiaqjqDka2CEXuZcia6WrXSXwqz4VzibScaNm0wRXdP4kS8WgehwNjfOrKONbUPibbIOXg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

#### 进程

通过 psutil 可以获取所有进程的信息

```
# 所有进程的 pid
```

列出所有不需要权限的进程

```
def process():
```

示例结果

![图片](https://mmbiz.qpic.cn/mmbiz_gif/SAy0yVjKWywK7XrgreTZpiaqjqDka2CEXV7rm16h9gXqWkcVxWhXokcbhybSWPxQVkIXbOxoveW3J2HsyceIiauw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

process.gif

### 总结

本文以 Psutil + Flask + Pyecharts + Bootstrap 开发一个简单的系统监控平台，可以算做是本公众号内容的一个学以致用。在 Psutil 还有许多方法文章没有列举感兴趣的小伙伴可以去尝试并使用。

**PS：**公号内回复 ：Python，即可进入Python 新手学习交流群，一起[100天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483671&idx=1&sn=2dc45e9363f86a6938b0c30da0b2a0ba&chksm=fbdad99accad508c083bfa72007b30d6a13a22b4a3c035c4c38bd7c9bb7da46aa42d93c5e14d&scene=21#wechat_redirect)  

  

**老规矩**，兄弟们还记得么，**右下角的 “在看” 点一下**，如果感觉文章内容不错的话，记得分享朋友圈让更多的人知道！

![图片](https://mmbiz.qpic.cn/mmbiz_png/mT3t1FknBibCwkz30aAWY4M0yYuBhsHAzoTPyrQr9yNNbMuHLhSOvDVAOnz4OffOVDfmzU8WuhOtuYeu997kPQw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_gif/7ibzJsmgW5wguO21SlkBAdxJgAicEOVCzDiaObyzEAEMTI527clib7gHvKfBtDu8MJZLwwEIVuVBmqfn01fmLDdTfQ/640?wxfrom=5&wx_lazy=1)

【**代码**获取方式****】

识别文末二维码，回复：200429

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyyW38JOVCg5WRiaUxojp6b5oIUcTmEpeE0XxCOXjVQFJTSWQzbDzJialeMy3xLA7yZ8ymz2JcIy9Cuw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493493&idx=1&sn=fecac60c2a8f27b97dff94d3a49c01bf&chksm=c1724f45f605c653ed03c1e4d4eb4f1a8321702a27f1cdb730ae4d7cd370e1c44acb2a43aa79&scene=21#wechat_redirect>，如有侵权，请联系删除。