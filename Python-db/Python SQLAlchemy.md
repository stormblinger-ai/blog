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

