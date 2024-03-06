![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

每年的 3、4 月份都是金三银四跳槽季，企业一般也会选择在这个时期调整职工的薪资，小伙伴在这个时候也会心里痒痒，在招聘网站上看看是否有合适的机会，需要的 Python 技能是否符合年限等等情况。这里以招聘网站为例抓取魔都近一个月的招聘数据，生成柱状图与词云。

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyykC0tKGr1GJjRSM78Yx9l7BNlpPTXeHcUdI58VufV0I5dLvydQWHxh2a3SV7sv5aibibpYYr2pjd1A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 抓取招聘网站数据

首先将魔都 近 1 个月的招聘职位都抓取出来，使用 requests 模块和 BeautifulSoup 模块

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyykC0tKGr1GJjRSM78Yx9l79YiaEbXQDa3KhriaFMN62do8mRNz7wUm8ERYib8VGJm7sYibRDb623Lnfg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

```
# -*- coding: utf-8 -*-
```

抓取网站内容结果图

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyykC0tKGr1GJjRSM78Yx9l7F2BP3y9UQia7xxXAibdE2GNPoELGmkEB2uJXnrHnrHibkSMY0G1Ol21Kg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 分词

在这一步需要对招聘信息中的职位信息进行人工的初步删选，过滤掉常用字存入 filterWords 变量中，然后利用结巴分词(https://github.com/fxsjy/jieba)基于TF-IDF算法将职位信息进行分词，并统计技术词语出现的次数。

```
from jieba import analyse
```

分词结果图

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyykC0tKGr1GJjRSM78Yx9l7aZafPHjAylLad9IbEVgzDibsjxzlXfjnlNsVV9IMekc1WhP4c4UoiagQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 技能图表

在分词中，分出了 12663 个词这些词大多都是常用字，需要进一次筛选出多个高频的 Python 技能利用 matplotlib 模块画出柱状图。

```
import matplotlib.pyplot as plt
```

图表

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyykC0tKGr1GJjRSM78Yx9l7RIBT9k1Oic7KRrkicDCj45gJuCtR95pkAdiaSqeA1w2ibt4kDlKscuiaebw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 词云

最后将分词数据生成一个词云，将 Python 图标作为底图使用。

```
def getWorldCloud():
```

最后生成的词云图

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyykC0tKGr1GJjRSM78Yx9l7tQeYdl1OC3j9u3EIhNC2mvric3RPZle9lr3dibX3KE4bhzZRcPZqDTew/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 总结

本文主要是从招聘网站抓取 Python 工作职责并生成柱状图和词云，展示企业需要哪些 Python 技能，从而在面试前学会并运用这些技能。在生成最后结果的过程中存在 2 点不完美的情况，一点是存在人工筛选另一个是在分词中没有完全过滤掉通用字。随着小编的 Python 技能树的增长，有理由相信在不久这 2 种情况将完全避免。

> 示例代码：求职需要的 Python 技能

  

  

**PS：**公号内回复「Python」即可进入 Python 新手学习交流群，一起 [**100天计划！**](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484479&idx=2&sn=170c2384133328c9bfee5c94e93c4814&chksm=fbdadcb2ccad55a492f2c8d9736c80b0b893ec771c47b08e3f46c18075f5eae88ee1d16d27b9&scene=21#wechat_redirect)  

\-END-  

**Python 技术  
**

****关于 Python 都在这里****

  

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywvq4Aff6E1TSyTplN8mCoy8vNAtgC1ltRPHoPTgKwHv3DcwGEmCL0fTJRtqwkOH1I67JKff5PWjw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493459&idx=1&sn=d75a93f8821992fd12482b3821cb6d91&chksm=c1724f63f605c675a1a01afcfcc0433a1d246e06755e28c396f63f551a67d20bf772f242dbb6&scene=21#wechat_redirect>，如有侵权，请联系删除。