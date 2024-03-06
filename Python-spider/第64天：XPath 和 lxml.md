![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywLjBeypUfNdlr6ZdIra2w9ORhQYvYoibXz5lP1ZWhCraZcTviaVchoZPBEcAPsmOfH217EJAx2q45Q/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

XPath 和 lxml
------------

XPath 全称为 Xml Path Language，即 Xml 路径语言，是一种在 Xml 文档中查找信息的语言。它提供了非常简洁的路径选择表达式，几乎所有的节点定位都可以用它来选择。

XPath 可以用于 Xml 和 Html，在爬虫中经常使用 XPath 获取 Html 文档内容。

lxml 是 Python 语言用 Xpath 解析 XML、Html文档功能最丰富的、最容易的功能模块。

XPath 术语
--------

### 节点

在 XPath 中有七种节点分别是元素、属性、文本、文档、命名空间、处理指令、注释，前3种节点为常用节点

请看下面的 Html 例子，(注：这个例子全文都需要使用)

```
<!DOCTYPE html>
```

在上面的例子中

```
<html> 为文档节点
```

### 节点关系

在 XPath中有多中节点关系分别是父节点、子节点、同胞节点、先辈节点、后代节点

在上面的例子中

1.  父节点：每个元素以及属性都有一个父节点，如：div 节点的父节点是 body 节点
    
2.  子节点：元素节点可有零个、一个或多个子节点，如：第一个 ul 节点的子节点是4个 li 节点
    
3.  同胞节点：拥有相同的父节点的节点，如：两个 div 节点是同胞节点
    
4.  先辈节点：某节点的父节点、父节点的父节点...，如：ul 节点的先辈节点有 div 节点、body 节点
    
5.  后代节点：某个节点的子节点，子节点的子节点...，如：body 节点的后代节点有div 节点、ul 节点、li 节点
    

XPath 语法
--------

### 基本语法

| 表达式 | 描述 |
| --- | --- |
| nodeName | 选择nodeName节点的所有子节点 |
| / | 从根节点开始 |
| // | 从匹配的节点开始选择节点 |
| . | 选择当前节点 |
| .. | 选择当前节点的父节点 |
| @ | 选择元素 |
| \* | 匹配任意元素节点 |
| @\* | 匹配任意属性节点 |

用上面的 Html 文档举个例子

| 路径表达式 | 描述 |
| --- | --- |
| body | 选取 body 的所有子节点 |
| /html | 选取 html 节点 |
| //div | 选取所有 div 节点 |
| //div/./h4 | div 节点下的 h4 节点 |
| ../div | 选取当前节点的父节点下的所有 div 节点 |
| //@class | 所有带有 class 元素的节点 |
| //\* | 选择所有节点 |
| //@\* | 选择所有属性节点 |

### 常用函数

| 表达式 | 描述 |
| --- | --- |
| position() | 返回节点的 index 位置 |
| last() | 返回节点的个数 |
| contains(string1,string2) | string1 是否包含 string2 |
| text() | 返回文本节点 |
| comment() | 返回注释节点 |
| normalize-space(string) | 去除首位空格，中间多个空格用一个空格代替 |
| substring(string,start,len) | 返回从 start 位置开始的指定长度的子字符串,第一个字符下标为1 |
| substring-before(string1,string2) | 返回string1中位于第一个string2之前的部分 |
| substring-after(string1,string2) | 返回string1中位于第一个string2之后的部分 |

同样用上面的Html文档举个例子

| 路径表达式 | 描述 |
| --- | --- |
| //div\[position()>1\] | 选择第二个 div 节点 |
| //div\[last()\] | 选择最后一个 div 节点 |
| contains(//h4\[2\],'手机') | 第二个 h4 标签是否包含手机字符串 |
| //li/text() | li 节点中的文本内容 |
| //div/comment() | div 节点下的 html 注释 |
| normalize-space(//li\[@class='blank'\]) | li 节点下 class属性为 blank 的文本去掉空格 |
| substring(//h4\[1\],1,2) | 第一个 h4 节点的前2个字 |
| substring-before(//h4\[1\],'品牌商') | 第一个 h4 节点的品牌商字符串之前的字符串 |
| substring-after(//h4\[1\],'品牌商') | 第一个 h4 节点的品牌商字符串之后的字符串 |

### 谓语

XPath 中的谓语就是删选表达式，相当于 SQL 中的 Where 条件，谓语被嵌在 \[ \] 中

| 路径表达式 | 描述 |
| --- | --- |
| //div\[1\] | 选择第一个 div 节点 |
| //div\[2\]/ul/li\[last()\] | 选择第二个 div 节点下的最后一个 li 节点 |
| //div\[2\]/ul/li\[position()>3\] | 选择第二个 div 节点下的前两个 li 节点 |
| //ul\[@class\] | 选择所有带 class 属性的 ul 节点 |
| //ul\[@class='computer'\] | 选择 class 属性为 computer 的 ul 节点 |
| //h4\[span = 4\] | 选择 h4 节点下 span 值等于4的节点 |

### Xpath 结语

以上内容介绍了 XPath 的基本语法，下面将介绍 XPath 如何在 Python 中使用。

lxml 模块
-------

### 安装

```
sudo pip3 install lxml==4.4.1
```

### 解析 HTML 文档

lxml.etree 一个强大的 Xml 处理模块，etree 中的 ElementTree 类是一个主要的类，用于对XPath的解析、增加、删除和修改节点。

```
from lxml import etree
```

etree.parse() 函数可以解析一个网页文件还可以解析字符串， 在网页中下载的数据一般都是字符串形式的，使用 parse(StringIO(str)) 将整个页面内容解析加载构建一个 ElementTree 对象，ElementTree 可以使用 XPath 语法精准找到需要的数据。

1.加载页面到内存

```
from lxml import etree
```

结果：

```
<lxml.etree._ElementTree object at 0x10bd6b948>
```

2.获取所有 li 标签数据

```
li_list = html.xpath('//li')
```

结果：

```
类型：
```

3.获取带 class='blank' 属性数据

```
blank_li_list = html.xpath('//li[@class="blank"]')
```

结果：

```
类型：
```

4.属性操作

```
ul = html.xpath('//ul')[1]
```

结果：

```
class="ul"
```

5.获取最后一个div标签数据

```
last_div = html.xpath('//div[last()]')
```

结果

```
div
```

6.添加子节点

```
child = etree.Element("child")
```

7.删除子元素

```
# 查找并设置第一个查询到的元素
```

8.遍历元素后代

```
body = html.find("body")
```

结果

```
body
```

工具
--

1.  在 google 浏览器开发者模式下，Elements 界面选择元素后右键 Copy，可以 Copy 元素的 XPath 路径
    
2.  XPath Helper 是一个 google 浏览器插件，可以验证 XPath 是否正确
    

总结
--

1.  学习了 XPAth 的知识，可以快速匹配单个或多个元素节点和属性，在工作中大大加快了工作的效率。
    
2.  lxml 是一个 Python 中强大的 Xml 和 Html 处理模块，结合 XPath 的使用在程序中快速、便捷的分析、修改网页内容。
    

> 示例代码：https://github.com/JustDoPython/python-100-day/tree/master/day-064

  

**系列文章**

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

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493370&idx=1&sn=a339464415bcc7774d972e48824f1af4&chksm=c1724ecaf605c7dc6a0e43e534b76bb66c3a709115e0f576b75e56f69ec68e4b0c3177c840ce&scene=21#wechat_redirect>，如有侵权，请联系删除。