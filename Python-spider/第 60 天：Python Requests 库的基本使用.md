![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

  

之前我们用了 urllib 库，这个作为入门的工具还是不错的，对了解一些爬虫的基本理念，掌握爬虫爬取的流程有所帮助。入门之后，我们就需要学习一些更加高级的内容和工具来方便我们的爬取。那么这一节来简单介绍一下 requests 库的基本用法。

介绍
--

首先让我们来看 Requests 官方的介绍：

```
Requests is an elegant and simple HTTP library for Python, built for human beings.
```

翻译过来就是：Requests 是为人类写的一个优雅而简单的 Python HTTP 库。这个介绍很直白了，让我们先来感受一下 Requests 的威力。

```
import requests
```

这个请求如果用 urllib 来实现，代码如下：

```
import urllib.parse
```

从感官上就能看出来，使用 urllib 在 URL 、参数等方面会复杂一些。这只是冰山一角，实际使用中 Requests 还有好多方面超越 urllib ，它并不是浪得虚名，接下来的学习中你就会感受到。

安装
--

使用pip命令

```
$ pip3 install requests
```

或者也可以使用 easy\_install 命令安装

```
$ easy_install requests
```

发送请求
----

使用 Requests 发送网络请求非常简单。

我们首先需要导入 Requests 模块：

```
import requests
```

然后，我们就可以尝试获取某个网页。本例子中，我们来获取 Github 的公共时间线：

```
r = requests.get('https://api.github.com/events')
```

现在，我们有一个名为 r 的 Response 对象。我们可以从这个对象中获取所有我们想要的信息。

Requests 简便的 API 意味着所有 HTTP 请求类型都是显而易见的。例如，你可以这样发送一个 HTTP POST 请求：

```
r = requests.post('http://httpbin.org/post', data = {'key':'value'})
```

简单，对吧？那么其他 HTTP 请求类型：PUT，DELETE，HEAD 以及 OPTIONS 又是如何的呢？都是一样的简单：

```
r = requests.put('http://httpbin.org/put', data = {'key':'value'})
```

传递参数
----

我们在发送请求时，经常需要向服务端发送请求参数，通常参数都是以键/值对的形式置于 URL 中，跟在一个问号的后面。例如， httpbin.org/get?key=val。Requests 允许你使用 params 关键字参数，以一个字符串字典来提供这些参数。举例来说，如果你想传递 key1=value1 和 key2=value2 到 httpbin.org/get ，那么你可以使用如下代码：

```
payload = {'key1': 'value1', 'key2': 'value2'}
```

通过打印输出该 URL，你能看到 URL 已被正确编码。

注意字典里值为 None 的键都不会被添加到 URL 的查询字符串里。

你还可以将一个列表作为值传入：

```
payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
```

响应内容
----

我们可以通过返回读取服务器响应的内容，以 请求百度首页为例：

```
import requests
```

Requests 会自动解码来自服务器的内容，大多数 unicode 字符集都能被无缝地解码。

请求发出后，Requests 会基于 HTTP 头部对响应的编码作出有根据的推测。当你访问 r.text 之时，Requests 会使用其推测的文本编码。你可以通过 r.encoding 来获取 Requests 使用的编码：

```
r.encoding
```

并且能够使用 r.encoding 属性来改变它：

```
r.encoding = 'ISO-8859-1'
```

如果你改变了编码，每当你访问 r.text ，Request 都将会使用 r.encoding 的新值。

### 二进制响应内容

对于非文本请求（例如图片），你也能以字节的方式访问请求响应体，Requests 会自动为你解码 gzip 和 deflate 传输编码的响应数据。

例如，以请求返回的二进制数据创建一张图片，你可以使用如下代码：

```
import requests
```

### JSON 响应内容

Requests 中有一个内置的 JSON 解码器，可以帮助你处理 JSON 数据：

```
r = requests.get('https://api.github.com/events')
```

如果 JSON 解码失败， r.json() 就会抛出一个异常。

```
r = requests.get('https://www.baidu.com')
```

需要注意的是，成功调用 r.json() 并不意味着响应的成功。有的服务器会在失败的响应中包含一个 JSON 对象（比如 HTTP 500 的错误细节）。这种 JSON 会被解码返回。要检查请求是否成功，请使用 r.raise\_for\_status() 或者检查 r.status\_code 是否和你的期望相同。

### 原始响应内容

在极少数情况下，你可能想获取来自服务器的原始套接字响应，那么你可以访问 r.raw。这个时候请确保在初始请求中设置了 stream=True。具体你可以这么做：

```
r = requests.get('https://api.github.com/events', stream=True)
```

设置请求头
-----

如果你在爬取某个页面内容的时候，发现获取的数据为空，但是直接用浏览器访问 URL 没问题，这时候很有可能是你被服务器识别为爬虫用户了，怎么办呢？我们应该要模拟浏览器去请求，这时候你需要为请求添加 HTTP 头部信息，只要简单地传递一个 dict 给 headers 参数就可以了。

例如，我们设置一下 User-Agent ：

```
url = 'http://www.baidu.com'
```

可以看到，请求的 User-Agent 已经变成了设置的 myagent/2.21.0。

复杂的 POST 请求
-----------

我们在使用 POST 请求的时候，打印一下 r.text 会发现每次都会出现几个关键字：

```
{
```

这些关键字都可以在 POST 的参数里面设置。其中 headers 和 args 我们前面已经讲过，分别表示请求头和参数信息。origin 是指请求的路由 ip，url 是我们请求的 url，其他几个我们都是可以设置的。下面我们就来看看其他几个关键字怎么设置。

### 设置data参数

如果你在 POST 请求时想提交表单，也只需要简单的传递一个字典给 data 参数即可。你的数据字典在发出请求时会自动编码为表单形式：

```
payload = {'key1': 'value1', 'key2': 'value2'}
```

你也可以为 data 参数传入一个元组列表。Requests 会自动将其转换成一个列表：

```
payload = (('key1', 'value1'), ('key1', 'value2'))
```

### 设置 json 参数

Requests 允许你使用 json 直接传递参数，然后它就会被自动编码。

```
payload = {'some': 'data'}
```

注意，这里不仅赋值给 json 了，而且还自动赋值给 data 了，json 里面的键值对也被自动编码到 data 中了。

### 设置文件参数

Requests 上传文件很简单：

```
files = {'file': open('test.txt', 'rb')}
```

你也可以增加一个参数，把字符串发送到上传的文件中，例如：

```
files = {'file': ('test.txt', 'some,data,to,send\nanother,row,to,send\n')}
```

响应状态码和响应头
---------

我们可以从服务器响应的结果中获取状态码和响应头的信息，例如：

```
r = requests.get('http://httpbin.org/get')
```

为方便引用，Requests还附带了一个内置的状态码查询对象：

```
print(r.status_code == requests.codes.ok)
```

我们还可以查看响应的响应头信息：

```
r = requests.get('http://httpbin.org/get')
```

要获取响应头的某个字段值，我们可以这样：

```
print(r.headers['Content-Encoding'])
```

Cookie
------

如果一个响应中包含了 cookie ，那么我们可以利用 cookies 变量来拿到:

```
url = 'http://example.com/some/cookie/setting/url'
```

以上程序仅是样例，运行程序并不会得到下面的返回。需要包含 cookie 的响应才可以得到。

另外可以利用 cookies 变量来向服务器发送 cookies 信息：

```
cookies = dict(cookies_are='working')
```

可以看到我们设置 cookies 参数后，返回中就包含了我们设置的信息。

Cookie 的返回对象为 RequestsCookieJar，它和字典类似，适合跨域名跨路径使用，也就是说我们可以为不同的域名或者路径设置不同的 cookie 。你还可以把 Cookie Jar 传到 Requests 中：

```
jar = requests.cookies.RequestsCookieJar()
```

重定向与请求历史
--------

默认情况下，除了 HEAD 请求, Requests 会自动处理所有重定向。

可以使用响应对象的 history 方法来追踪重定向。

Response.history 是一个 Response 对象的列表，这个对象列表按照从最老到最近的请求进行排序。

例如，Github 将所有的 HTTP 请求重定向到 HTTPS：

```
r = requests.get('http://github.com')
```

如果你使用的 Mac ，在运行这段代码时报错：ConnectionResetError: \[Errno 54\] Connection reset by peer。你需要升级你系统的 openssl，具体方法请自行百度关键词“mac 更新OpenSSL”，更新之后就不会报错了。

我们还可以通过 allow\_redirects 参数禁用重定向处理：

```
r = requests.get('http://github.com', allow_redirects=False)
```

超时
--

你可以通过设置 timeout 参数来告诉 requests 在经过以 timeout 参数设定的秒数时间之后停止等待响应。

```
requests.get('http://github.com', timeout=0.001)
```

这里通过设置极短的超时时间导致请求停止等待响应，从而引发报错。注意 timeout 仅对连接过程有效，与响应体的下载无关。timeout 并不是整个下载响应的时间限制，而是如果服务器在 timeout 秒内没有应答，将会引发一个异常。

总结
--

本文给大家介绍了 Requests 的基本用法，如果你对爬虫有了一定的基础，那么肯定可以很快上手，因为 Requests 使用起来简直太方便了。话不多说，感觉上手实践吧！

> 文中示例代码：python-100-days

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493366&idx=1&sn=52a4e0a23b1a09243c2c3baece858538&chksm=c1724ec6f605c7d090cbe2fe293d8e2944575c892806eb49a35f95e10562f4ad2a1284f2c15e&scene=21#wechat_redirect>，如有侵权，请联系删除。