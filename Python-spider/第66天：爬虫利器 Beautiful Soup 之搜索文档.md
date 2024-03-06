![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWyxZTxkrta1xDia913ibm3RCuJ3hJ1q4Mj8ON3Xjuyz7Y38aBDicKSGLDtpSYEsnGpRL6YzzHwutddyMA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

Beautiful Soup 简介
-----------------

Beautiful Soup 是一个可以从 HTML 或 XML 文件中提取数据的 Python 库，它提供了一些简单的操作方式来帮助你处理文档导航，查找，修改文档等繁琐的工作。因为使用简单，所以 Beautiful Soup 会帮你节省不少的工作时间。

上一篇文章我们介绍了如何使用 Beautiful Soup 来遍历文档中的节点，这片文章我们继续血学习如何使用 Beautiful Soup 指定文档中搜索到你想要的内容。

Beautiful Soup 搜索文档
-------------------

同样为了故事的顺利发展，我们继续使用之前的 HTML 文本，下文的所有例子都是基于这段文本的。

```
html_doc = """
```

### 过滤器

正式讲解搜索文档之前，我们有必要了解下 Beautiful Soup 的过滤器，这些过滤器在整个搜索的 API 中都有所体现，他们可以被用在 TAG 的 name 中，属性中，字符串中或他们的混合中。听起来有点绕是么，看几个例子就懂了。

1、根据 TAG 的 name 来查找标签，下面的例子会查找文档中的所有 b 标签。同时要注意统一传入 Unicode 编码以避免 Beautiful Soup 解析编码出错。

```
# demo 1
```

2、如果传入正则表达式作为参数，那么 Beautiful Soup 会通过正则表达式的 match() 来匹配内容。

```
# demo 2
```

3、如果传入列表参数，那么 Beautiful Soup 会将与列表中任一一个元素匹配的内容返回。

```
# demo 3
```

4、True 可以匹配任何值，下面的例子是查找所有的 TAG 但不会返回字符串。

```
# demo 4
```

5、方法。我们可以定义一个方法，该方法只接受一个参数，若该方法返回 True 则表示当前元素匹配并且被找到，返回 False 意味着没找到。下面的例子展示了查找所有同时包含 class 属性和 id 属性的节点。

```
# demo 5
```

大部分情况字符串过滤器就可以满足我们的需求，外加这个神奇的方法过滤器，我们就可以实现各种自定义需求了。

### find\_all() 函数

该函数搜索当前节点下的所有子节点，其签名如下`find_all( name , attrs , recursive , text , **kwargs )`。我们可以传入指定 TAG 的 name 来查找节点，上面已经举过例子了，这里不在赘述。我们来看几个其他的用法。

1、如果我们传入 find\_all() 函数不是搜索内置的参数名，那么搜索是就会将该参数对应到属性上去。下文的例子表示查找 id 为 google 的节点。

搜索指定名字的属性时可以使用的参数值包括：字符串，正则表达式，列表，True。也就是我们上文介绍过的过滤器。

```
# demo 6
```

2、按照 CSS 类名搜索，但是镖师 CSS 的关键字 class 在 Python 中是内置关键字，从 Beautiful Soup 4.1.1 版本开始，可以通过 `class_`  参数搜索有指定 CSS 类名的 TAG：

class\_ 参数同样接受不同类型的过滤器：字符串，正则表达式，方法，True。

```
# demo 7
```

同时，因为 CSS 可以有多个值，所以我们可以分别搜索 CSS 中的每个值。

```
# demo 8
```

3、不仅可以按照标签和 CSS 来搜索整个文档，还可以使用 text 来按照内容来搜索。同时 text 还可以配合其他属性一起来完成搜索任务。

```
# demo 9
```

4、限制返回数量

有时候文档树过于庞大，我们不想查查找整棵树，只想查找指定数量的节点，或者只想查找子节点，而不想查找孙子节点，指定 limit 或者 recursive 参数即可。

```
# demo 10
```

因为该对象的儿子节点没有 p 标签，所以返回的是空列表。

### find() 函数

该函数只会返回一个结果，与 find\_all(some\_args, limit=1) 是等价的，唯一的区别就是该函数直接返回结果，而 find\_all() 函数返回包含一个结果的列表。另外 find\_all() 方法没有找到目标是返回空列表, find() 方法找不到目标时,返回 None。除此之外使用上没有其他差别。

### 其他函数

除了 find\_all() 和 find() 外，Beautiful Soup 中还有 10 个用于搜索的 API，其中中五个用的是与 find\_all() 相同的搜索参数，另外 5 个与 find() 方法的搜索参数类似，区别仅是它们搜索文档的范围不同。

find\_parents() 和 find\_parent() 用来搜索当前节点的父节点。

find\_next\_siblings() 和 find\_next\_sibling() 对在当前节点后面解析的所有兄弟节点进行迭代。

find\_previous\_siblings() 和 find\_previous\_sibling() 对在当前节点前面解析的所有兄弟节点进行迭代。

find\_all\_next() 和 find\_next() 对当前节点之后的 TAG 和字符串进行迭代。

find\_all\_previous() 和 find\_previous() 对当前节点之前的 TAG 和字符串进行迭代。

以上五组函数的区别仅仅是前者返回一个所有符合搜索条件的节点列表，而后者只返回第一个符合搜索条件的节点。

因为这 10 个 API 的使用和 find\_all() 与 find() 大同小异，所有i这里不在举例，读者可以自己探索。

### CSS 选择器

在 Tag 或 BeautifulSoup 对象的 .select() 方法中传入字符串参数即可使用 CSS 选择器的语法找到 TAG。

1、通过某个标签逐层查找。

```
# demo 11
```

2、查找某个标签下的直接子标签

```
# demo 12
```

3、通过 CSS 类名直接查找

```
# demo 13
```

4、通过标签的 id 属性查找

```
# demo 14
```

5、通过属性的值来查找

```
# demo 15
```

Beautiful Soup 总结
-----------------

本章节介绍了 Beautiful Soup 关于文档搜索的相关操作，熟练掌握这些 API 的操作可以让我们更快更好找到我们想要定位的节点，不要看到这么多函数吓怕了，其实我们只需要熟练掌握 find\_all() 和 find() 两个函数即可，其余 API 的使用都大同小异，稍加练习即可快速上手。

### 代码地址

> 示例代码：https://github.com/JustDoPython/python-100-day/tree/master/day-066

### 参考内容

https://www.crummy.com/software/BeautifulSoup/bs4/doc/index.zh.html#

**系列文章**

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

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493372&idx=1&sn=2cbcd57b66985bacd7257d4b86fe7f42&chksm=c1724eccf605c7da914c670a8372d65fde236ffcf42514b2fe74aaf023523d8196421d5cc678&scene=21#wechat_redirect>，如有侵权，请联系删除。