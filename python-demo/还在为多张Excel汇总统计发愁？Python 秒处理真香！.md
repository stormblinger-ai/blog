![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

文 | 闲欢  

来源：Python 技术「ID: pythonall」

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/t8ibUxVnMTLPLUyAAdaDETpj5xxGvtM5pcns01OplkMfZrYaMeHJUFDOGIAjbOpGab87wO7uZhjEwv0WnhPbq1A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "金属质感分割线")

  

为什么越来越多的非程序员白领都开始学习 Python ？他们可能并不是想要学习 Python 去爬取一些网站从而获得酷酷的成就感，而是工作中遇到好多数据分析处理的问题，用 Python 就可以简单高效地解决。本文就通过一个实际的例子来给大家展示一下 Python 是如何应用于实际工作中高效解决复杂问题的。

### 背景

小明就职于一家户外运动专营公司，他们公司旗下有好多个品牌，并且涉及到很多细分的行业。小明在这家公司任数据分析师，平时都是通过 Excel 来做数据分析的。今天老板丢给他一个任务：下班前筛选出集团公司旗下最近一年销售额前五名的品牌以及销售额。

对于 Excel 大佬来说，这不就是分分钟的事吗？小明并没有放在眼里，直到市场部的同事将原始的数据文件发给他，他才意识到事情并没有那么简单：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表格文件（数据来源于网络）  

这并不是想象中的排序取前五就行了。这总共有90个文件，按常规的思路来看，他要么将所有文件的内容复制到一张表中进行分类汇总，要么将每张表格进行分类汇总，然后再最最终结果进行分类汇总。

想想这工作量，再想想截止时间，小明挠了挠头，感觉到要渐渐头秃。

### 思路分析

这种体力活，写程序解决是最轻松的啦。小明这时候想到了他的程序员好朋友小段，于是他把这个问题抛给了小段。

小段缕了下他那所剩无几的头发，说：so easy，只需要找潘大师即可。

小明说：你搞不定吗？还要找其他人！

小段苦笑说：不不不，潘大师是 Python 里面一个处理数据的库，叫 Pandas ，俗称 潘大师。

小明说：我不管什么大师不大师，就说需要多久搞定。

小段说：给我几分钟写程序，再跑几秒钟就好了！

小明发过去了膜拜大佬的表情。

小段略微思考了下，整理了一下程序思路：

*   计算每张表每一行的销售额，用“访客数 \* 转化率 \* 客单价”就行。
    
*   将每张表格根据品牌汇总销售额。
    
*   将所有表格的结果汇总成一张总表
    
*   在总表中根据品牌汇总销售额并排序
    

### 编码

第零步，读取 Excel :

```
import pandas as pddf = pd.read_excel("./tables/" + name)
```

第一步，计算每张表格内的销售额：

```
df['销售额'] = df['访客数'] * df['转化率'] * df['客单价']
```

第二步，将每张表格根据品牌汇总销售额：

```
df_sum = df.groupby('品牌')['销售额'].sum().reset_index()
```

第三步，将所有表格的结果汇总成一张总表：

```
result = pd.DataFrame()result = pd.concat([result, df_sum])
```

第四步，在总表中根据品牌汇总销售额并排序：

```
final = result.groupby('品牌')['销售额'].sum().reset_index().sort_values('销售额', ascending=False)
```

最后，我们来看看完整的程序：

```
import pandas as pdimport osresult = pd.DataFrame()for name in os.listdir("./tables"):    try:        df = pd.read_excel("./tables/" + name)        df['销售额'] = df['访客数'] * df['转化率'] * df['客单价']        df_sum = df.groupby('品牌')['销售额'].sum().reset_index()        result = pd.concat([result, df_sum])    except:        print(name)        passfinal = result.groupby('品牌')['销售额'].sum().reset_index().sort_values('销售额', ascending=False)pd.set_option('display.float_format', lambda x: '%.2f' % x)print(final.head())
```

最后的结果是这样的：

```
       品牌           销售额15   品牌-5 1078060923.628   品牌-17 1064495314.964   品牌-13 1038560274.213   品牌-12 1026115153.0013   品牌-3 1006908609.07
```

可以看到最终的前五已经出来了，整个程序运行起来还是很快的。

几分钟之后，小段就把结果给小明发过去了，小明感动得内牛满面，直呼改天请吃饭，拜师学艺！

### 总结

本文主要是想通过一个实际的案例来向大家展示潘大师（Pandas）的魅力，特别是应用于这种表格处理，可以说是太方便了。写过程序的可能都有点熟悉的感觉，这种处理方式有点类似于 SQL 查询语句。潘大师不仅能使我们的程序处理起来变得更简单高效，对于需要经常处理表格的非程序员也是非常友好的，上手起来也比较简单。

  

**PS：**公号内回复「Python」即可进入Python 新手学习交流群，一起 [100 天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247486409&idx=1&sn=bee54e90931441489977f68df8339d5f&chksm=fbdad344ccad5a52dd503a3b4eb3c67bd79e3a50634acac8a28b42ebfb476833475182b62806&scene=21#wechat_redirect)

  

**老规矩**，兄弟们还记得么，**右下角的 “在看” 点一下**，如果感觉文章内容不错的话，记得分享朋友圈让更多的人知道！

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

【**代码**获取方式****】

识别文末二维码，回复：200924

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493628&idx=1&sn=d09cc8b35f73d38a6b6abff3b45482e6&chksm=c1724fccf605c6da8fe04bf4874834cbe6c925d60f89756c3270e9cda0bcbd20ac91e4ad2933&scene=21#wechat_redirect>，如有侵权，请联系删除。