![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

Redis 作为常用的 NoSql 数据库，主要用于缓存数据，提高数据读取效率，那在 Python 中应该如果连接和操作 Redis 呢？今天就为大概简单介绍下，在 Python 中操作 Redis 常用命令。

安装 redis
--------

首先还是需要先安装 redis 模块，使用如下命令：

```
$ pip3 install redis
```

创建 redis 连接池
------------

安装成功后就可以在代码中导入模块，然后通过创建连接池的方式，连接到 Redis 服务器，创建代码如下：

```
import redis   #导入redis模块
```

> 需要注意的是，设置 `decode_responses=True`，写入的 Key/Value 对中的 Value 为 string 类型，不加则写入的为字节类型。

Redis 操作方法
----------

Redis 支持五种类型的数据操作，分别为字符串、 List、 Hash、 Set、 zSet类型，还有一些方法是不区分类型操作的。上面我们已经连接到 Redis 服务器，接下来为大家介绍各类型基本的操作方法。

### 字符串类型方法

*   单键值操作
    

set(name, value, ex=None, px=None, nx=False, xx=False)

> **参数说明：**
> 
> *   ex：过期时间（秒）
>     
> *   px：过期时间（毫秒）
>     
> *   nx：如果设置为True，则只有name不存在时，当前set操作才执行
>     
> *   xx：如果设置为True，则只有name存在时，当前set操作才执行
>     

使用方法如下：

```
# key="color",value="red"，设置过期时间5秒
```

*   批量键值操作
    

可以批量对多个 key 赋值，也可以同时获取多个 key 的值，使用方法如下：

```
# 批量赋值
```

*   其他操作
    

除了基础的赋值和取值，可以在赋新值时返回旧值，还可将返回值通过索引来截取，也可以在 key 对应值后追回值等，具体使用可见以下代码：

```
# 设置新值为blue，同时返回设置前的值
```

### list 类型方法

list 的特点：一个有序的列表，列表中的元素可以重复，并且可以在列表前后或中间任意位置插入新元素，具体使用方式见如下代码：

```
# 每个新增元素都插入到list最左边，如果list不存在则会新建
```

### hash 类型方法

hash 的特点：一个 key 对应一个 value，并且 key 不允许重复，可以单个操作，也可以批量键值操作，下面列举了常用方法的使用方法：

```
# 单键值操作
```

### set 类型方法

set 的特点：一个无序的元素集合，集合中元素不能重复，可以随机 pop 元素，两个集合可以取交集，并集，差集运算。

```
# 增加集合元素，如集合不存在则新建
```

### zset 类型方法

zset 的特点：一个不允许重复的集合，集合中元素是有序的，每个元素有两个值：值和分数，分数专门用来做排序。

```
# 增加集合元素，如集合不存在则新建
```

### 其他操作方法

以下操作方法针对 redis 任意数据类型（字符串，list，hash，set，zset），可以删除 key ，查询 key 是否存在，还可设置超时，重命名 key 的名称等：

```
# 删除key为color的对象
```

总结
--

本文为大家介绍了 Python 中如何创建连接 Redis 数据库，并通过代码的方式展示了 Redis 支持的各数据类型的操作方法，通过学习发现操作起来还是很方便的，接下来还会为大家介绍其他数据库的操作。

> 示例代码：https://github.com/JustDoPython/python-100-day/tree/master/day-075

> 参考：https://github.com/andymccurdy/redis-py

**系列文章**

  

**[第74天：Python newspaper 框架](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484133&idx=1&sn=82fc8710e240d128948b45c9374b3b6d&chksm=fbdada68ccad537e372e3b65512d025a6199c7274c9ef19c2b0bc1610480197d31b89dc5b5a8&scene=21#wechat_redirect)**  

**[第73天：itchat 微信机器人简介](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484131&idx=1&sn=c6aa24082a585651520111ef3e4b4307&chksm=fbdada6eccad5378d510c0b293dd1cf2fbd912568e7ca733c8f0b551b25df98c8a85ef7785c6&scene=21#wechat_redirect)  
**

**[第72天：PySpider框架的使用](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484119&idx=1&sn=04bbb6b27efa099aecdddc5baed2ae53&chksm=fbdada5accad534c1059eb424d19594756eb1fd0753dd2159dd89d55066ed0bfc996c45853f5&scene=21#wechat_redirect)  
**

**[第71天：Python Scrapy 项目实战](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484100&idx=1&sn=62af99ea4f77f0033ee15d1e5c4a5815&chksm=fbdada49ccad535f06f30c8dc1f6ec67e3c2693492ae95a6d2e5c3dc7675144752cc1b519bdc&scene=21#wechat_redirect)  
**

**[从 0 学习 Python 0 - 70 大合集总结](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484100&idx=2&sn=45f7a3ca94b9a7f1e29fbdfac02affe5&chksm=fbdada49ccad535fd99d4f4b4266673450f54ef2ba96cad541cd3552dde75fa1eb442472f413&scene=21#wechat_redirect)**

  

**PS：**公号内回复 ：Python，即可进入Python 新手学习交流群，一起**[100天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483671&idx=1&sn=2dc45e9363f86a6938b0c30da0b2a0ba&chksm=fbdad99accad508c083bfa72007b30d6a13a22b4a3c035c4c38bd7c9bb7da46aa42d93c5e14d&scene=21#wechat_redirect)**

\-END-  

**Python 技术  
**

****关于 Python 都在这里****

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493383&idx=1&sn=e531947ef1bc67ebddabcf634308fc17&chksm=c1724f37f605c62114a9c9c12e48c3dabc9c1d3cea7905b0afc3df766382fd02e168d0c157f1&scene=21#wechat_redirect>，如有侵权，请联系删除。