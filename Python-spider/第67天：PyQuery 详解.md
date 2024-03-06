![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywZMFiavZgibm3Vof2qqKCHOO2scagYtODVKHXbL506Bm8q2j2PRBs6PPvjmr6Evpu6JjcKCtIfI6pQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

PyQuery 库是一个非常强大又灵活的网页解析库，如果你有前端开发经验，那么你应该接触过 jQuery ,那么 PyQuery 就是你非常绝佳的选择，PyQuery 是 Python 仿照 jQuery 的严格实现，语法与 jQuery 几乎完全相同。

安装
--

跟安装其他库一样：

```
>>> pip3 install pyquery
```

安装了之后，在程序里面就可以引用了，引用方法跟其他库类似：

```
from pyquery import PyQuery as pq
```

初始化
---

PyQuery 可以将 HTML 字符串初始化为对象，也可以将 HTML 文件初始化为对象，甚至可以将请求的响应初始化为对象。下面我们一个个来介绍。

### 初始化字符串

对于一个标准的 HTML 字符串，PyQuery 可以直接初始化为对象：

```
html = """
```

我们可以看到，HTML 字符串初始化后，打印出来的是一个 PyQuery 对象。

如果我们的字符串不是 HTML 格式内容，PyQuery 会自动加上段落标签将字符串内容包装成 HTML 内容。例如：

```
test = '''
```

### 初始化 HTML 文件

初始化文件，只需要加个 filename 参数，指明 文件路径即可：

```
#filename参数为html文件路径
```

如果文件不是 HTML 文件，那么初始化的时候会自动加上 HTML 标签。例如：

```
#filename参数为html文件路径
```

我的 test.txt 文件中只有一行内容：this is a txt。初始化完后，自动添加了 HTML 标签。

### 初始化请求响应

我们可以把请求的网址内容初始化为 PyQuery 对象，只需要加个参数 url ，将网址赋值给它即可。例如：

```
response = pq(url='https://www.baidu.com')
```

我们请求百度的首页，然后初始化为对象，后面内容较多，因此省略。

常用 CSS 选择器
----------

PyQuery 里面 CSS 选择器的用法跟 jQuery 里面是一样的，例如，针对上面的 HTML 字符串内容，我们获取 id 为 container 的标签，然后打印出来：

```
doc = pq(html)
```

我们也可以用 class 选择器，例如：

```
print(type(doc('.li2')))
```

再复杂一点，我们可以使用多层选择器，例如：

```
print(doc('html #container'))
```

当然，我们同样可以根据 CSS 选择器修改 HTML 标签的内容：

```
li2 = doc('.li2')
```

这里我们给 class 为“li2”的标签加了字体的大小，可以看到返回的内容中有了 style 属性。

虽然 PyQuery 有修改 HTML 内容的方法，但是我们一般不会用到，因为我们一般是解析 HTML 内容，而不是去修改它，大家了解一下即可。

伪类选择器
-----

伪类（Pseudo-classes）是指在 HTML 中，同一个标签，根据其不同的状态，有不同的显示样式。详细的用法可以参考：https://www.runoob.com/css/css-pseudo-classes.html ，里面有详细的介绍。

我们主要应用伪类选择器来解析 HTML，获取我们所需的数据。例如：

```
pseudo_doc = pq(html)
```

我们也可以用 contains 方法来筛选内容，例如：

```
html = """
```

我们可以看到，如果查找的结果有多条记录，那么结果会将多条记录拼在一起。当然，如果查找的内容不存在，就会返回空。

查找标签
----

我们可以按照条件在 Pyquery 对象中查找符合条件的标签，类似于 BeautifulSoup 中的 find 方法。例如，我要查找 id 为 container 的标签：

```
#打印id为container的标签
```

我要查找 id 为 container 的标签的子标签，使用 children 方法就可以实现：

```
#打印id为container的标签的子标签
```

查找父标签，我们可以用 parent 方法：

```
#打印id为container的标签的父标签
```

查找兄弟标签，我们用 siblings 方法：

```
#打印class为li2的标签的兄弟标签
```

标签信息的提取
-------

前面我们讲的都是怎么定位到标签，这只是我们解析数据的第一步，接下来我们需要从标签中提取我们需要的信息。

如果你需要提取标签的属性值，可以用 .attr() 方法，例如：

```
#获取li2的class属性值
```

如果你细腰提取标签内的文本，我们可以用 .text() 方法，例如：

```
#获取li2的文本
```

如果要获取某个标签下面的所有文本（包含子标签的），怎么做？我们来看下个例子：

```
#获取html标签下面的所有文本
```

很简单，我们只需要找到这个标签，使用 .text() 方法。

如果我们要获取某个标签下面的所有文本，但是要排除某些标签的文本，该怎么做？我们来看下个例子：

```
#排除部分标签文本
```

我们可以用 .remove() 来删除某些标签，上面例子中可以看到，我们把 title 标签去掉了，title 标签对应的内容 China 也就去掉了。

PyQuery 处理复杂的网址请求
-----------------

前面我们介绍了 PyQuery 可以获取网址请求的 HTML 内容，并转化为对象。我们在请求 URL 时，或许会遇到需要附带一些参数的情况，这些自定义的参数在 PyQuery 请求时也是支持的，例如 cookies 和 headers，我们看例子：

```
cookies = {'Cookie':'cookie'}
```

总结
--

这篇文章给大家介绍了 PyQuery 的常见使用方法，大家如果用的熟练的话，还是可以极大地节约我们解析 HTML 网页内容的时间的。PyQuery 可以称得上是爬虫神器，还有一些用法由于篇幅有限，没有进行介绍。大家可以去官网详细查看，官网地址：https://pythonhosted.org/pyquery/ 。

> 文中示例代码：https://github.com/JustDoPython/python-100-day/tree/master/day-067

**系列文章**

**[第66天：爬虫利器 Beautiful Soup 之搜索文档](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484074&idx=1&sn=b5fb525981319cbf6557a60599440b99&chksm=fbdada27ccad53316c0c7c8e230082c627adc1121cd6890a16ee6a15871d8cde717ef4805313&scene=21#wechat_redirect)**

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

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493373&idx=1&sn=e6c57f94791d1110ad95c8453af7890a&chksm=c1724ecdf605c7db25cf6a93f174c522568ae6d088778ca960e81ff18607b1e97ac0eddcc127&scene=21#wechat_redirect>，如有侵权，请联系删除。