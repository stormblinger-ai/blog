![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

MongoDB 是一款面向文档型的 `NoSQL` 数据库，是一个基于分布式文件存储的开源的非关系型数据库系统，其内容是以 `K/V` 形式存储，结构不固定，它的字段值可以包含其他文档、数组和文档数组等。其采用的 `BSON`（二进制 JSON ）的数据结构，可以提高存储和扫描效率，但空间开销会有些大。今天就为大家简单介绍下在 Python 中使用 MongoDB 。

安装 PyMongo 库
------------

在 Python 中操作 MongoDB ，需要使用 `PyMongo` 库，执行如下命令安装：

```
pip3 install pymongo
```

连接 MongoDB 数据库
--------------

连接时需要使用 PyMongo 库里面的 MongoClient 模块，有两种方式可以创建连接，默认只需要传入IP和端口号即可。如果数据库存在账号密码，则需要指定连接的数据库，并进行鉴权才能连接成功。

```
#导入 MongoClient 模块
```

MongoDB 数据库操作
-------------

成功连接数据库，接下来我们开始介绍通过 MongoClient 模块如何对 mongoDB 数据库进行 `CURD` 的操作。

### 获取数据库和集合

首先要指定需要操作的数据库和集合，这里的数据库可以对应为 `Mysql` 的 `DataBase`，集合对应为 `Mysql` 的 `Table`。需要注意的是在 mongoDB 中，不需要提前创建数据库和集合，在你操作它们时如果没有则会自动创建，但都是延时创建的，在添加 `Document` 时才会真正创建。

```
# 指定操作数据库的两种方式
```

### 数据的插入操作

在 MongoDB 中，每条数据其实都有一个 `_id` 属性作为唯一标识。如果没有显式指明该属性，MongoDB 会自动产生一个 `ObjectId` 类型的 `_id` 属性，`insert()` 方法会在执行后返回 `_id` 值。不过在 PyMongo 3.x 版本中，官方已经不推荐使用 `insert()` 方法，而是推荐使用`insert_one()` 和 `insert_many()` 方法来分别插入单条记录和多条记录。

```
# 要插入到集合中的对象
```

### 数据的查询操作

查询需要使用 `find_one()` 或 `find()` 方法，其中 `find_one()` 查询得到的是单个结果，即一条记录，`find()` 则返回一个生成器对象。下面我们就来查询上面刚插入的数据，如果查询不到数据则返回 `None` ，代码如下：

```
# 通过条件查询一条记录，如果不存在则返回None
```

上面查询条件中我们用到了 `$gt` 的比较运算符，关于查询条件中的比较运算符和功能运算符对照表如下：

| 符号 | 含义 | 举例 |
| --- | --- | --- |
| $gt | 大于 | {'page': {'$gt': 50} |
| $lt | 小于 |   
 |
| $lte | 小于等于 |   
 |
| $gte | 大于等于 |   
 |
| $ne | 不等于 |   
 |
| $in | 在范围内 | {'page': {'$in': \[50, 100\]}} |
| $nin | 不在范围内 | {'page': {'$nin': \[50, 100\]}} |
| $regex | 匹配正则表达式 | {'name': {'$regex': '^张.\*'}} |
| $exists | 属性是否存在 | {'name': {'$exists': True}} |
| $type | 类型判断 | {'name': {'$type': 'string'}} |
| $mod | 数字模操作 | {'page': {'$mod': \[80, 10\]}} |
| $text | 文本查询 | {'$text': {'$search': 'Java'}} |
| $where | 高级条件查询 | {'$where': 'obj. author == obj. full\_name'} |

### 数据的更新操作

更新操作和插入操作类似，`PyMongo` 提供了两种更新方法，即 `update_one()` 和 `update_many()` 方法，其中 `update_one()` 方法只会更新满足条件的第一条记录。

> 注意：
> 
> *   如果使用 $set，则只更新 book 对象内存在的字段，如果更新前还有其他字段，则不更新也不删除。
>     
> *   如果不使用 $set，则会把更新前的数据全部用 book 对象替换，如果原本存在其他字段则会被删除。
>     

```
# 查询一条记录
```

### 集合的删除操作

删除数据同样推荐使用两个方法 `delete_one()` 和 `delete_many()` ，其中 `delete_one()` 为删除第一条符合条件的记录。具体操作代码如下：

```
# 删除满足条件的第一条记录
```

### 其他数据库操作

除了以上标准的数据库操作外，`PyMongo` 还提供了以下通用且方便的操作方法，比如 `limit()` 方法用来读取指定数量的数据`skip()` 方法用来跳过指定数量的数据等，具体请看如下代码：

```
# 查询返回满足条件的记录然后删除
```

> 注意：在数据量在在千万、亿级别庞大的时候，查询时最好 `skip()` 的值不要太大，这样很可能导致内存溢出。

### 数据索引操作

默认情况下，数据插入时已经有一个 `_id` 索引了，当然我们还可以创建自定义索引。

```
# unique=True时，创建一个唯一索引，索引字段插入相同值时会自动报错，默认为False
```

总结
--

本文为大家介绍了 Python 中如何创建连接 MongoDB 数据库，并通过代码的方式展示了对 MongoDB 数据的增删改查以及排序索引等操作，通过以上学习个人感觉操作起来还是比较简单方便的。今天就先介绍到这里，以后还会为大家介绍其他数据库的操作。

参考
--

PyMongo 文档：https://pymongo.readthedocs.io/en/stable/

> 示例代码：https://github.com/JustDoPython/python-100-day

  

**系列文章**

  

[第77天：Python 操作 SQLite](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484166&idx=1&sn=8bb4b3fd75225574be9b4ebcd82d17c6&scene=21#wechat_redirect)

[第76天：Python Scrapy 模拟登陆](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484160&idx=1&sn=bed56426a561b3b72b24aaafb31963a8&scene=21#wechat_redirect)

[第75天：Python 操作 Redis 数据库介绍](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484133&idx=1&sn=82fc8710e240d128948b45c9374b3b6d&scene=21#wechat_redirect)

[第74天：Python newspaper 框架](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484133&idx=1&sn=82fc8710e240d128948b45c9374b3b6d&scene=21#wechat_redirect)

[第73天：itchat 微信机器人简介](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484131&idx=1&sn=c6aa24082a585651520111ef3e4b4307&chksm=fbdada6eccad5378d510c0b293dd1cf2fbd912568e7ca733c8f0b551b25df98c8a85ef7785c6&scene=21#wechat_redirect)

[第72天：PySpider框架的使用](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484119&idx=1&sn=04bbb6b27efa099aecdddc5baed2ae53&chksm=fbdada5accad534c1059eb424d19594756eb1fd0753dd2159dd89d55066ed0bfc996c45853f5&scene=21#wechat_redirect)

[第71天：Python Scrapy 项目实战](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484100&idx=1&sn=62af99ea4f77f0033ee15d1e5c4a5815&chksm=fbdada49ccad535f06f30c8dc1f6ec67e3c2693492ae95a6d2e5c3dc7675144752cc1b519bdc&scene=21#wechat_redirect)

[从 0 学习 Python 0 - 70 大合集总结](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484100&idx=2&sn=45f7a3ca94b9a7f1e29fbdfac02affe5&chksm=fbdada49ccad535fd99d4f4b4266673450f54ef2ba96cad541cd3552dde75fa1eb442472f413&scene=21#wechat_redirect)

  

**PS：**公号内回复 ：Python，即可进入Python 新手学习交流群，一起**[100天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483671&idx=1&sn=2dc45e9363f86a6938b0c30da0b2a0ba&chksm=fbdad99accad508c083bfa72007b30d6a13a22b4a3c035c4c38bd7c9bb7da46aa42d93c5e14d&scene=21#wechat_redirect)**

\-END-  

**Python 技术  
**

****关于 Python 都在这里****

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493386&idx=1&sn=621abaebf97bab10b559336655cbf123&chksm=c1724f3af605c62c8c73c944654d4327d3043df9e60c1541112805b091a3ea2712aad82e1546&scene=21#wechat_redirect>，如有侵权，请联系删除。