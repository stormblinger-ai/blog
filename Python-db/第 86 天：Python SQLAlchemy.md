![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

1 简介
----

SQLAlchemy 是一个使用 Python 实现的 ORM 框架，它的设计理念是：SQL 数据库的量级和性能比对象集合重要，对象集合的抽象比表和行重要；它采用了类似于 Java 里 Hibernate 的数据映射模型；它的目标是提供能兼容众多数据库（如：SQLite、MySQL、Postgres、Oracle、MS-SQL、SQLServer 和 Firebird）的企业级持久性模型。

上面提到了 ORM，那 ORM 是什么？ORM 全称 Object Relational Mapping，中文译为对象关系映射，简单的说就是在数据库与业务实体对象之间建立了一种对应关系，我们可以用操作实体对象的方式来完成数据库的操作，ORM 封装了数据库操作，我们无需关心底层数据库是什么，也不用关心 SQL 语言，只需与数据对象交互即可。

2 使用
----

SQLAlchemy 可以支持多种数据库，本文我们以 SQLite 例，其他数据库也会做一些简单介绍。

### 2.1 安装

在使用 SQLAlchemy 之前，我们首先要进行安装，使用 pip install sqlalchemy 即可。安装好后看一下版本，如下所示：

```
>>> import sqlalchemy
```

### 2.2 创建连接

具体操作之前先看一下 SQLAlchemy Engine（引擎），如图所示：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

SQLAlchemy 通过 Engine 来驱动，从图中可以看出 Engine 内维护了一个连接池（Pool）和方言（Dialect），Pool 就是用来存放连接的，Dialect 是用来判断要连接的是哪种数据库，我们创建连接要先创建 Engine，然后再通过 Engine 来创建连接。

#### 2.2.1 SQLite

我们先来看一下如何创建 Engine，几种创建方式如下所示：

相对路径方式

```
engine = create_engine('sqlite:///foo.db')
```

绝对路径方式

```
# Unix/Mac
```

创建内存数据库

SQLite 可以创建内存数据库，其他数据库不可以。

```
engine = create_engine('sqlite://')
```

以相对路径方式为例，看一下实现示例：

```
from sqlalchemy import create_engine
```

echo=True 会将执行语句打印出来，默认为 False；数据库（foo.db）不存在会自动创建。

#### 2.2.2 其他数据库

##### MySQL

在使用之前要进行第三库的安装，使用 pip install mysqlclient 和 pip install pymysql 即可。

创建 Engine 方式如下所示：

```
# default
```

使用示例如下所示：

```
from sqlalchemy import create_engine
```

参数说明如下所示：

*   echo：值为 True 将执行语句打印出来，默认为 False。
    
*   pool\_size：连接池的大小，默认为 5，0 表示连接数无限制。
    
*   pool\_recycle：设置了 pool\_recycle 后，SQLAlchemy 会在指定时间内回收连接，单位为秒。
    

##### Oracle

创建 Engine 方式如下所示：

```
engine = create_engine('oracle://scott:tiger@127.0.0.1:1521/sidname')
```

##### PostgreSQL

创建 Engine 方式如下所示：

```
# default
```

##### SQL Server

创建 Engine 方式如下所示：

```
# pyodbc
```

### 2.3 创建表

表的创建通过映射类的方式实现，首先创建映射基类，后面的类需要继承它，如下所示：

```
from sqlalchemy.ext.declarative import declarative_base
```

创建具体映射类，如下所示：

```
from sqlalchemy import create_engine
```

执行完成后表就自动为我们创建好了，我们通过 SQLiteStudio 查看一下，结果如图所示：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2.4 建立会话

具体的操作需要使用 session，创建方式如下所示：

```
from sqlalchemy import create_engine
```

### 2.5 基本操作

#### 2.5.1 新增

我们先新增一条数据，如下所示：

```
from sqlalchemy import create_engine
```

#### 2.5.2 查询

查询操作如下所示：

```
from sqlalchemy import create_engine
```

#### 2.5.3 修改

我们将 id=1 这条数据的 name 修改一下，如下所示：

```
from sqlalchemy import create_engine
```

#### 2.5.4 删除

我们将 id=1 这条数据删除，如下所示：

```
from sqlalchemy import create_engine
```

总结
--

本文介绍了 SQLAlchemy 的基本概念和使用，对 Python 工程师使用 SQLAlchemy 提供了支撑。

参考：
---

https://docs.sqlalchemy.org/en/13/orm/tutorial.html

> 示例代码：Python-100-days-day086

**系列文章**

  

[第 85 天：NumPy 统计函数](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484213&idx=1&sn=1b832047f5a218783f4328b4451cf79c&chksm=fbdadbb8ccad52ae440e9a287fb7276f1e7e51cdb2944b78bf5430f309495ae20a0989d2bf5c&scene=21#wechat_redirect)  

[第 84 天：NumPy 数学函数](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484209&idx=1&sn=babfa49af0fb64bb23441ec5215d9ceb&chksm=fbdadbbcccad52aaa6a21bc63931dcb465ebfdc3073f130d95a93609124e40b3a443cae65c83&scene=21#wechat_redirect)  

[第 83 天：NumPy 字符串操作](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484205&idx=1&sn=21e043991451831ad254bd286508fbff&chksm=fbdadba0ccad52b6c40113f5b5dcb190dad8ce2ff189ed62e62e778ad059cafb7e0be11018f0&scene=21#wechat_redirect)  

[第 82 天：Python Web 开发之 JWT 简介](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484201&idx=1&sn=a7167814511aafee27ce526711bf0468&chksm=fbdadba4ccad52b2de37485892cc20cd27d9e6a26749531776266c1a2ef6abf45b9402ad4499&scene=21#wechat_redirect)  

[第 81 天：NumPy Ndarray 对象及数据类型](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484197&idx=1&sn=e99aeeb0039a13396277986e7857aed5&chksm=fbdadba8ccad52be7e3f041179f8e17b20d342ab876be91ee285219c1a2239abd560f025ec86&scene=21#wechat_redirect)  

[从 0 学习 Python 0 - 80 大合集总结](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484197&idx=2&sn=a7ca9a9a61fcaeef3ed09b7873bc52c8&chksm=fbdadba8ccad52be55a723b772d85e8aa09e7e2c0f61c90451b4555d7fc7f434208a8eb63bba&scene=21#wechat_redirect)  

  

**PS：**公号内回复 ：Python，即可进入Python 新手学习交流群，一起**[100天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483671&idx=1&sn=2dc45e9363f86a6938b0c30da0b2a0ba&chksm=fbdad99accad508c083bfa72007b30d6a13a22b4a3c035c4c38bd7c9bb7da46aa42d93c5e14d&scene=21#wechat_redirect)**

\-END-  

**Python 技术  
**

****关于 Python 都在这里****

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493394&idx=1&sn=982077e3055657c2aba62f97ddb48bae&chksm=c1724f22f605c6348bec9c772c76b8f5bc086dc3d79030d348fa8804641acd6d35bb905f464e&scene=21#wechat_redirect>，如有侵权，请联系删除。