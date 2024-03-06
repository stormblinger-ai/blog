![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

Selenium 环境配置好之后，我们就可以使用 Selenium 来操作浏览器，做一些我们想做的事情了。在我们爬取网页过程中，经常发现我们想要获得的数据并不能简单的通过解析 HTML 代码获取，这些数据是通过 AJAX 异步加载方式或经过 JS 渲染后才呈现在页面上显示出来。这种情况下我们就可以使用 Selenium 来模拟浏览器浏览页面，进而解决 JavaScript 渲染的问题。

浏览器设置
-----

### 打开浏览器

我们用最简洁的代码来打开 Chrome 浏览器，并访问 http://www.baidu.com 这个网站：

```
from selenium import webdriver
```

我们可以看到桌面会弹出一个浏览器窗口，并打开了百度的首页，如下图：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

selenium-open-browser  

注意红框圈住的部分，这表示这个窗口是我们程序打开的，现在浏览器的控制权在我们的程序中，我们可以用代码让浏览器摆出各种姿势了！

### 设置浏览器参数

为了避免每次运行程序都打开一个窗口，我们也可以设置无窗口访问，只需添加浏览器参数即可：

```
from selenium import webdriver
```

常见的浏览器参数还有：

```
# 启动就最大化
```

还有其他好多参数，具体可参见 https://peter.sh/experiments/chromium-command-line-switches/ ，该网站罗列了所有的参数。

### 设置代理

设置代理很简单，只需要添加一个浏览器参数就行：

```
chrome_options.add_argument('--proxy-server=http://{ip}:{port}')
```

在参数里面加上代理的 IP 和端口号。

获取页面元素
------

### 获取单个元素

selenium 查找元素有两种方法：第一种是指定使用哪种方法去查找元素，比如指定 CSS 选择器或者根据 xpath 去查找；另一种是直接使用 find\_element() ，传入的第一个参数为需要使用的元素查找方法，第二个参数为查找值。来看下例：

```
from selenium import webdriver
```

上面例子中，我们通过不同的方式来获取百度的搜索框，并且打印 tag\_name 属性，最终的结果都是一样的：input 。

### 获取多个元素

我们也可以通过 find\_elements() 方法获取多个属性，结果会以 list 的形式返回。我们来看例子：

```
from selenium import webdriver
```

上例中，我们通过 class\_name 来获取百度首页上方的百度导航，接着将获取到的导航栏的名称打印了出来。

页面操作
----

我们可以使用 selenium 来模拟页面操作，例如鼠标点击事件，键盘事件等。我们来看一下例子：

```
from selenium import webdriver
```

在例子中，我们先是找到百度的搜索框对应的元素，然后模拟在搜索框中输入关键词 “selenium”，接下来模拟点击"百度一下"按钮，我们可以看到页面中出现了搜索 “selenium” 的结果。

接着我们使用 clear() 方法清空了搜索框，然后模拟输入关键词 “python” 并且模拟键盘的 enter 键操作，同样获得了搜索 “python” 的结果。

当然，我们还可以模拟鼠标右击、双击、拖拽等操作，就留给大家自己去探索了。

浏览器操作
-----

### 等待加载

请求网页时，可能会存在 AJAX 异步加载的情况。而 selenium 只会加载主网页，并不会考虑到 AJAX 的情况。因此，使用时需要等待一些时间，让网页加载完全后再进行操作。

#### 隐式等待

使用隐式等待时，如果 webdriver 没有找到指定的元素，将继续等待指定元素出现，直至超出设定时间，如果还是没有找到指定元素，则抛出找不到元素的异常。默认等待时间为 0。隐式等待是对整个页面进行等待。需要特别说明的是：隐性等待对整个 driver 的周期都起作用，所以只要设置一次即可。

我们来看下例：

```
from selenium import webdriver
```

这个例子中，我先打开浏览器访问百度首页，然后在搜索框输入 “Selenium” 关键字，再回车查询。百度会根据输入的关键词在页面的右边展示“相关术语”，这一步是异步加载，需要时间来查询和传输，而我们设置的等待时间是 0，所以肯定会超时。运行后我们会看到报错：

```
# 报错信息
```

当我们把等待时间设置为 10 秒时，我们会看到控制台的正确打印了。

#### 显式等待

显式等待是对指定的元素进行等待。首先判定等待条件是否成立，如果成立，则直接返回；如果条件不成立，则等待最长时间为设置的等待时间，如果超过等待时间后仍然没有满足等待条件，则抛出异常。

我们来看一下例子：

```
from selenium import webdriver
```

运行这段代码，在打印 element1 的时候肯定会报错，因为此时页面右边的“相关术语”还没加载出来。我们注释掉获取和打印 element1 的这两行，然后设置一个显式的等待条件和 10 秒的等待时间，element2 就可以顺利打印出来了。

### 浏览器前进和后退

我们可以通过 selenium 来操纵浏览器的前进和后退，方法很简单，分别是 back() 和 forward()。来看下例：

```
from selenium import webdriver
```

我们首先依次打开百度、微博和知乎三个网站（中间设置的等待时间是为了更好地看演示效果）。然后我们调用返回上个页面方法，可以看到浏览器返回到了微博页面，接着我们调用前进到下个页面方法，可以看到浏览器回到了知乎页面。

### 操作 Cookie

我们可以通过 selenium 来设置浏览器的 cookie，包括添加 cookie ，删除 cookie ，获取 cookie 等操作。我们来看个例子：

```
from selenium import webdriver
```

在上例中，我们通过 add\_cookie() 方法，来设置 cookie 的名称和值，通过给 delete\_cookie() 方法传递 cookie 的名称来删除 cookie，还可以通过 get\_cookies() 和 delete\_all\_cookies() 来获取所有 cookie 以及删除所有 cookie 。

### 标签管理

有些时候我们需要在浏览器里切换标签页，或者增加一个新标签页，或者删除一个标签页，都可以使用 selenium 来实现。我们来看例子：

```
from selenium import webdriver
```

大家运行代码就可以体会到切换标签页和访问网页的变化，中间加了等待是为了延迟变化。另外，注意标签页从左往右是从 0 开始编号的。

总结
--

本节给大家介绍了 Selenium 的常见使用方法，利用这些方法我们可以很轻易地去操纵浏览器，让浏览器按照我们预设的规则来顺序执行操作指令。当然本文中列举的只是 selenium 的一部分操作，还有很多丰富的功能等着大家自己去探索。如果你能够熟练地运用和组合这些操作，你会发现还有更多复杂好玩的事情等着你去探索！

> 文中示例代码：https://github.com/JustDoPython/python-100-day/tree/master/day-069

  

**系列文章**

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

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493375&idx=1&sn=064acbd5e371b136d65a2b956a88e415&chksm=c1724ecff605c7d9e9d5a7a5c2a0c81e6131532d7ed0373192264166c116f7684a94a2c82c6b&scene=21#wechat_redirect>，如有侵权，请联系删除。