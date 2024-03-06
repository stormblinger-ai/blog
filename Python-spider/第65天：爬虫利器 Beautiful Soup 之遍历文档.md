![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywPATZYyMrycw8KTl1BQlpWfVm09IWVBSX8aiclac5I9bmk1l38WcFibTZE39t4hz34ibpe3gpibOWfaA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

Beautiful Soup 简介
-----------------

Beautiful Soup 是一个可以从 HTML 或 XML 文件中提取数据的 Python 库，它提供了一些简单的操作方式来帮助你处理文档导航，查找，修改文档等繁琐的工作。因为使用简单，所以 Beautiful Soup 会帮你节省不少的工作时间。

Beautiful Soup 安装
-----------------

你可以使用如下命令安装 Beautiful Soup。二选一即可。

```
$ easy_install beautifulsoup4
```

Beautiful Soup 不仅支持 Python 标准库中的 HTML 解析器，还支持很多第三方的解析器，比如 lxml，html5lib 等。初始化 Beautiful Soup 对象时如果不指定解析器，那么 Beautiful Soup 将会选择最合适的解析器（前提是你的机器安装了该解析器）来解析文档，当然你也可以手动指定解析器。这里推荐大家使用 lxml 解析器，功能强大，方便快捷，而且该解析器是唯一支持 XML 的解析器。

你可以使用如下命令来安装 lxml 解析器。二选一即可。

```
$ easy_install lxml
```

Beautiful Soup 小试牛刀
-------------------

Beautiful Soup 使用来起来非常简单，你只需要传入一个文件操作符或者一段文本即可得到一个构建完成的文档对象，有了该对象之后，就可以对该文档做一些我们想做的操作了。而传入的文本大都是通过爬虫爬取过来的，所以 Beautiful Soup 和 requests 库结合使用体验更佳。

```
# demo 1
```

Beautiful Soup 将复杂的 HTML 文档转换成一个复杂的树形结构，每个节点都是 Python 对象，所有对象可以归纳为 4 种: Tag，NavigableString，BeautifulSoup，Comment。

Tag 就是 HTML 的一个标签，比如 div，p 标签等，也是我们用的最多的一个对象。

NavigableString 指标签内部的文字，直译就是可遍历的字符串。

BeautifulSoup 指一个文档的全部内容，可以当成一个 Tag 来处理。

Comment 是一个特殊的 NavigableString，其输出内容不包括注视内容。

为了故事的顺利发展，我们先定义一串 HTML 文本，下文的所有例子都是基于这段文本的。

```
html_doc = """
```

### 子节点

Tag 有两个很重要的属性，name 和 attributes。期中 name 就是标签的名字，attributes 是标签属性。标签的名字和属性是可以被修改的，注意，这种修改会直接改变 BeautifulSoup 对象。

```
# demo 2
```

由以上例子我么可以看出，可以直接通过点属性的方法来获取 Tag，但是这种方法只能获取第一个标签。同时我们可以多次调用点属性这个方法，来获取更深层次的标签。

```
# demo 3
```

如果想获得所有的某个名字的标签，则可以使用 find\_all(tag\_name) 函数。

```
# demo 4
```

我们可以使用 .contents 将 tag 以列表方式输出，即将 tag 的子节点格式化为列表，这很有用，意味着可以通过下标进行访问指定节点。同时我们还可以通过 .children 生成器对节点的子节点进行遍历。

```
# demo 5
```

.children 只可以获取 tag 的直接节点，而获取不到子孙节点，.descendants 可以满足你。

```
# demo 6
```

### 父节点

通过 .parent 属性获取标签的父亲节点。title 的父标签是 head，html 的父标签是 BeautifulSoup 对象，而 BeautifulSoup 对象的父标签是 None。

```
# demo 7
```

同时，我们可以通过 parents 得到指定标签的所有父亲标签。

```
# demo 8
```

### 兄弟节点

通过 .next\_sibling 和 .previous\_sibling 来获取下一个标签和上一个标签。

```
# demo 9
```

你可能会纳闷，调用了两次 next\_sibling 怎么只有一个输出呢，这方法是不是有 bug 啊。事实上是 div 的第一个 next\_sibling 是**div 和 p 之间的换行符**。这个规则对于 previous\_sibling 同样适用。

另外，我们可以通过 .next\_siblings 和 .previous\_siblings 属性可以对当前节点的兄弟节点迭代输出。在该例子中，我们在每次输出前加了前缀，这样就可以更直观的看到 dib 的第一个 previous\_sibling 是换行符了。

```
# demo 10
```

### 前进和后退

通过 .next\_element 和 .previous\_element 获取指定标签的前一个或者后一个被解析的对象，注意这个和兄弟节点是有所不同的，兄弟节点是指有相同父亲节点的子节点，而这个前一个或者后一个是按照文档的解析顺序来计算的。

比如在我们的文本 html\_doc 中，head 的兄弟节点是 body（不考虑换行符），因为他们具有共同的父节点 html，但是 head 的下一个节点是 title。即`soup.head.next_sibling=title soup.head.next_element=title`。

```
# demo 11
```

同时这里还需要注意的是 title 下一个解析的标签不是 body，而是 title 标签内的内容，因为 html 的解析顺序是打开 title 标签，然后解析内容，最后关闭 title 标签。

另外，我们同样可以通过 .next\_elements 和 .previous\_elements 来迭代文档树。由遗下例子我们可以看出，换行符同样会占用解析顺序，与迭代兄弟节点效果一致。

```
# demo 12
```

Beautiful Soup 总结
-----------------

本章节介绍了 Beautiful Soup 的使用场景以及操作文档树节点的基本操作，看似很多东西其实是有规律可循的，比如函数的命名，兄弟节点或者下一个节点的迭代函数都是获取单个节点函数的复数形式。

同时由于 HTML 或者 XML 这种循环嵌套的复杂文档结构，致使操作起来甚是麻烦，掌握了本文对节点的基本操作，将有助于提高你写爬虫程序的效率。

### 代码地址

> 示例代码：https://github.com/JustDoPython/python-100-day/tree/master/day-065

### 参考内容

https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html#

**系列文章**

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

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493371&idx=1&sn=bb5ab9ce684c0c5df262a0086023a672&chksm=c1724ecbf605c7dde777e9946eeae6341fd641b03fc2d88321e4b609ad356c8d3fdc493a9bb7&scene=21#wechat_redirect>，如有侵权，请联系删除。