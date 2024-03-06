![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

用户登录功能是 Web 系统一个基本功能，是为用户提供更好服务的基础，在 Flask 框架中怎么做用户登录功能呢？今天我们学习一下 Flask 的用户登录组件 `Flask-Login`  

Python 之所以如此强大和流行，除了本身易于学习和功能丰富之外，最重要的是因为各种类库和组件，可以说没有 Python 做不了的事情，只有不知道的组件。

但是同一个问题领域中的组件或类库名称、功能可能近似，版本多而混乱，会给使用者造成了困扰，比如之前讲述的 `Flask-Bootstrap` 和 `Bootstrap-Flask` ，以及今天要讲述的用户登录，由于方式多样，功能相似，所以出现了很多类似的框架，比如 `Flask-Login` 、`Flask-Auth` 、`Flask-Security` 等等

之所以选择 `Flask-Login`，是因为它基于`Session`，适合做有 UI 交互的用户登录，用我们学习了的 Flask 表单做演示，更容易理清用户登录的流程

用户登录说明
------

`Flask-Login` 和其他 Flask 组件并没有太大区别，有必要开始之前了解下用户登录的步骤：

1.  登录：用户提供登录凭证（如用户名和密码）提交给服务器
    
2.  建立会话：服务器验证用户提供的凭证，如果通过验证，则建立会话（ `Session` ），并返回给用户一个会话号（ `Session id` ）
    
3.  验证：用户在后续的交互中提供会话号，服务器将根据会话号（ `Session id` ）确定用户是否有效
    
4.  登出：当用户不再与服务器交互时，注销与服务器建立的会话
    

  

依据以上步骤，我们设计一个应用场景，作为实现：

*   提供一个主页，需要登录才能访问
    
*   如果没有登录，跳转到登录页面，登录成功再跳回
    
*   登录成功后，可以点击登出退出登录
    
*   在登录页面提供注册连接，点击后跳转到注册页面
    
*   注册完成后，跳转到登录页面
    

安装
--

使用 `pip` 安装 `Flask-Login` 组件：

```
pip install flask-login
```

如果一切正常，可以将 `Flask-Login` 模块引入:

```
>>> from flask-login import LoginManager
```

> 本次实践中，会用到 `Flask Form` 相关功能，请确保已经安装了 `Flask-WTF` 组件，详见 **Web 开发 Form**

初始化
---

先实例化 `login_manager` 对象，然后用它来初始化应用：

```
from flask import Flask
```

*   表单交互时，所以要设置`secret_key`，以防跨域攻击（ CSRF ）
    
*   登录管理对象 `login_manager` 的 `login_view` 属性，指定登录页面的视图函数 (登录页面的 `endpoint`)，即验证失败时要跳转的页面，这里设置为登录页
    

用户模块
----

### 用户数据

要做用户验证，需要维护用户记录，为了方便演示，使用一个全局列表 `USERS` 来记录用户信息，并且初始化了两个用户信息：

```
from werkzeug.security import generate_password_hash
```

用户信息只包含最基本的信息：

*   `name` 为登录用户名
    
*   `password` 为登录密码，**切忌：无论如何不要在系统中存放用户密码的明文**，幸运的是模块 `werkzeug.security` 提供了 `generate_password_hash` 方法，使用 sha256 加密算法将字符串变为密文
    
*   `id` 为用户识别码，相当于主键
    

基于用户信息，定义两方法，用来创建( `create_user` )和获取( `get_user` )用户信息:

```
from werkzeug.security import generate_password_hash
```

*   `create_user` 接受用户名和密码，创建用户记录，对密码明文进行加密，并添加用户 `ID` (使用 `uuid` 模板的 `uuid4`方法生成一个全球唯一码)，存储到 `USERS` 列表中
    
*   `get_user` 接受用户名，从 `USERS` 列表中查找用户记录，没有返回空
    

### 用户类

下面创建一个用户类，类维护用户的登录状态，是生成 `Session` 的基础，`Flask-Login` 提供了用户基类 `UserMixin`，方便定义自己的用户类，我们定义一个 `User`：

```
from flask_login import UserMixin  # 引入用户基类
```

*   实例化方法接受一个用户记录，即 `USERS` 列表中的一个元素，用来初始化成员变量
    
*   `get_id` 方法返回用户实例的 `ID`，这是必须实现的，不然 `Flask-Login` 将无法判断用户是否被验证
    
*   `get` 是个静态方法，即可以通过类之间调用，是为了在获取验证后的用户实例时用的，必须接受参数 `ID`，返回`ID` 所以对应的用户实例
    
*   `verify_password` 方法接受一个明文密码，与用户实例中的密码做校验，将被用在用户验证的判断逻辑中
    

### 加载登录用户

有了用户类，并且实现了 `get` 方法，就可以实现 `login_manager` 的 `user_loader` 回调函数了，`user_loader` 的作用是根据 `Session` 信息加载登录用户，它根据用户`ID`，返回一个用户实例:

```
@login_manager.user_loader  # 定义获取登录用户的方法
```

登录页面
----

页面包括后台和展现(可以理解成前台)两部分

### 后台

根据前面介绍的 `Form` 相关知识 (参见**Web 开发 Form** )，需要定义一个 `Form`类，用来设置页面的元素和规则:

```
from wtforms import StringField, PasswordField
```

*   定义用户名和密码两个字段，分别是字符类型字段和密码类型字段，密码类型字段会在页面上显示为密码形式，以提高安全性
    
*   为两个字段设置必填规则
    

然后定义一个用户登录的视图函数 `login`:

```
from flask import render_template, redirect, url_for, request
```

分析下视图函数的逻辑:

*   视图函数同时支持 `GET` 和 `POST` 方法
    
*   `form.validate_on_submit()` 可以判断用户是否完整的提交了表单，只对`POST` 有效，所以可以用来判断请求方式
    
*   如果是 `POST` 请求，获取提交数据，通过 `get_user` 方法查找是否存在该用户
    
*   如果用户存在，则创建用户实体，并校验登录密码
    
*   校验通过后，调用 `login_user` 方法创建用户 `Session`，然后跳转到请求参数中 `next` 所指定的地址或者首页 (不用担心如何设置 `next`，还记得上面设置的 `login_manager.login_view = 'login'` 吗？对，未登录访问时，会跳转到`login`，并且带上 `next` 查询参数)
    
*   非 `POST` 请求，或者未经过验证，会显示 `login.html` 模板渲染后的结果
    

### 前台

在 `templates` 模板下创建登录页面的模板 `login.html`:

```
{% macro render_field(field) %} <!-- 定义字段宏 -->
```

*   `render_field` 是 Jinja2 模板引擎的宏，接受表单字段将其渲染成 Html 代码，并格式化错误信息
    
*   `emsg` 错误信息单独做了处理，如果存在会显示出来
    
*   `form` 中并没有 `action` 属性，默认为当前路径
    

需要验证的页面
-------

为了方便演示，将首页作为需要验证的页面，通过验证将看到登录者欢迎信息，页面上还有个登出链接

首页视图函数 `index`:

```
from flask import render_template, url_for
```

*   注解 `@login_required` 会做用户登录检测，如果没有登录要方法此视图函数，就被跳转到 `login` 接入点( `endpoint` )
    
*   `current_user` 是当前登录者，是`User` 的实例，是 `Flask-Login` 提供全局变量（ 类似于全局变量 `g` ）
    
*   `username` 是模板中的变量，可以将当前登录者的用户名传入 `index.html` 模板
    

首页模板 `index.html`:

```
<h1>欢迎 {{ username }}！</h1>
```

登出视图函数 `logout`:

```
from flask import redirect, url_for
```

*   只有登录了才有必要登出，所以加上注解 `@login_required`
    
*   `logout_user` 方法和 `login_user` 相反，由于注销用户的 `Session`
    
*   登出视图不需要模板，直接跳转到登录页，实际项目中可以增加一个登出页，展示些有趣的东西
    

小试牛刀
----

终于可以试试了，加上启动代码:

```
if __name__ == '__main__':
```

启动项目，如果一切正常将看到类似的反馈：

```
python app.py
```

访问 localhost:5000，将看到登录页，主要浏览器地址上的 `next` 查询参数:

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

显示结果

  

  

填写正确的用户名和密码，点击登录，将进入首页:

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

显示结果

  

  

用户注册
----

上面的演示了，已存在用户登录的情况，不存在用户需要完成注册才能登录。

注册功能和登录很类似，页面上多了密码确认字段，并且需要验证两次输入的密码是否一致，后台逻辑是：如果用户不存在，且通过检验，将用户数据保存到`USERS` 列表中，跳转到 `login` 页面。

关于具体实现这里不做详细讲解了，本节代码示例中有实现，可以参考。

如果您来实现注册功能的话打算怎么做？欢迎交流

Flask-Login 其他特性
----------------

上面的实例中使用了一些 `Flask-Login` 的基本特性，`Flask-Login` 还提供了一些其他重要特性

### 记住我

记住我，并不是用户登出之后，再次登录时自动填写用户名和密码（这是浏览器的功能），而是在用户意外退出后（比如关闭浏览器）不用再次登录。

如果用户本地的 `cookie` 失效了，`Flask-Login` 会自动将用户 `Session` 放入 `cookie`中。

开启方法是将 `login_user` 方法的命名参数 `remember` 设置为 `True`，此功能默认是关闭的

### Session 防护

`Session` 信息一般存放在 `cookie` 中，但是 `cookie` 不够安全，容易被窃取其中 `Session` 信息，伪造用户登录系统，幸运的是 `Flask-Login` 提供了 `Session` 防护机制，提供有 `basic` 和 `strong` 两种保护等级，通过 `login_manager.session_protection` 来开关和设置等级，默认等级为 `basic`，如果设置为 `None` 将关闭 `Session` 防护机制。

在保护机制开启的情况下，每次请求会根据用户的特征（一般指有用户IP、浏览器类型生成的哈希码）与 `Session` 中的对比，如果无法匹配则要求用户重新登录，在强模式下( `strong` )一旦匹配失败会删除登录者 `Session`，以消除攻击者重构 `cookie`的可能

### Request Loader

有时候因为一些原因不想或者无法使用 `cookie`，可以将 `Session` 记录在其他地方，比如 `Header` 中或者请求参数中，那么构造用户 `Session` 时就需要将 `user_loader`替换为 `request_loader`，`request_loader` 将 `request` 作为参数，这样就可以从请求的任何数据中获取 `Session` 信息了

总结
--

本节课程主要通过一个简单的用户登录实例，介绍了 `Flask-Login` 组件的使用，大体步骤是：引入 `Flask-Login` 模块，初始化应用，构造登录用户类，设置登录页面入口，使用 `login_user` 创建用户`Session`， 用 `user_loader` 恢复登录者，用 `logout_user` 推出登录，还有在视图函数中如何进行用户验证等，最后介绍了一些额外的 `Flask-Login` 特性。

用户登录是 `Web` 应用的一个常用而又复杂的功能，除了今天介绍的 `Session` 方式之外，还有基于 `RESTful` 的非状态的 `token`方式，以及第三方认证机制，比如微信、支付宝等，后面会陆续讲解，敬请期待。

**参考**

*   https://zhuanlan.zhihu.com/p/23137867
    
*   https://blog.csdn.net/sinat\_29315627/article/details/74177792
    
*   http://www.bjhee.com/flask-ext9.html
    
*   http://www.pythondoc.com/flask-restful/third.html
    
*   https://flask-login.readthedocs.io/en/latest/
    
*   https://flask-httpauth.readthedocs.io/en/latest/
    
*   https://www.jianshu.com/p/8c87099f72a5
    

  

> 示例代码：Python-100-days-day057

**系列文章**

   [](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484008&idx=1&sn=139381d84bf0be36e9c6473dccc166b2&chksm=fbdadae5ccad53f326da33c05d97292c685d4837e9f98b54f1b6e5a63db79d1861777555e044&scene=21#wechat_redirect) [第56天：Python 爬虫之 urllib 包基本使用](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484012&idx=1&sn=33790b1361d2ed7c090e5ce8480e9b35&chksm=fbdadae1ccad53f7bf78b4afad749378c3a2a285c6f10457248dfbe06dbfa176d66fccee0012&scene=21#wechat_redirect)

    [](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484001&idx=1&sn=4e2c5ea82ae2f522b0db7299432e4a36&scene=21#wechat_redirect)[第55天：爬虫介绍](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484008&idx=1&sn=139381d84bf0be36e9c6473dccc166b2&chksm=fbdadae5ccad53f326da33c05d97292c685d4837e9f98b54f1b6e5a63db79d1861777555e044&scene=21#wechat_redirect)  

    [第54天：Python 多线程 Event](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484001&idx=1&sn=4e2c5ea82ae2f522b0db7299432e4a36&scene=21#wechat_redirect)

    [第53天：Python 线程池](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483997&idx=1&sn=151b01fc5ca95faab9f93f46c0732dbc&scene=21#wechat_redirect)

    [第52天：Python multiprocessing 模块](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483988&idx=1&sn=feaacd91b6e6dfae36a9b84027fce4d8&scene=21#wechat_redirect)

    [第51天：Python Queue 入门](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483984&idx=1&sn=e95fc2ddbd5e60c59e3ed76c5cc0cfb7&scene=21#wechat_redirect)

    [第0-50天：从0学习Python 0-50合集](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483997&idx=2&sn=f05987ffa38202522793f4dd787fb957&scene=21#wechat_redirect)  

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**PS：**公号内回复 ：Python，即可进入Python 新手学习交流群，一起**[100天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483671&idx=1&sn=2dc45e9363f86a6938b0c30da0b2a0ba&chksm=fbdad99accad508c083bfa72007b30d6a13a22b4a3c035c4c38bd7c9bb7da46aa42d93c5e14d&scene=21#wechat_redirect)**

\-END-  

**Python 技术  
**

****关于 Python 都在这里****

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493363&idx=1&sn=16d798f00a133e7d0b3c5e198b84d78f&chksm=c1724ec3f605c7d587c982d1b6405184e15ec0b4cdf705777d41a461c2f9e8821f0808632990&scene=21#wechat_redirect>，如有侵权，请联系删除。