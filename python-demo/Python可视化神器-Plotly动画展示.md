![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

文 | 潮汐  

来源：Python 技术「ID: pythonall」

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/t8ibUxVnMTLPLUyAAdaDETpj5xxGvtM5pcns01OplkMfZrYaMeHJUFDOGIAjbOpGab87wO7uZhjEwv0WnhPbq1A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "金属质感分割线")

在之前的一篇文章[Python可视化神器-Plotly](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247487735&idx=1&sn=b7c2a16fa93872562b4abe40e05b4ee6&scene=21#wechat_redirect)展现了可视化神器-Plotly的基本使用,接下来继续本着学习的姿态继续探索可视化神器-Plotly的神奇之旅。本文介绍如何在Python中使用Plotly创建动画。

### 可视化神器 Plotly\_Express 详解

Plotly 是新一代的数据可视化神器，TopQ量化开源团队，虽然plotly功能强大，却一直没有得到广泛应用，大部分py开发人员，还在使用陈旧的matplotlib，其中最重要的原因，就是plotly的设置过于繁琐。为此，plotly推出了其简化接口：Plotly Express，简称：px。

Plotly Express是对 Plotly.py 的高级封装，内置了大量实用、现代的绘图模板，用户只需调用简单的API函数，即可快速生成漂亮的互动图表。

Plotly Express内置的图表组合，涵盖了90%常用的绘图需要，Python画图，首推Plotly Express。

### 封装图表说明

*   scatter：散点图 在散点图中，每行data\_frame由2D空间中的符号标记表示；
    
*   scatter\_3d：三维散点图 在3D散点图中，每行data\_frame由3D空间中的符号标记表示；
    
*   scatter\_polar：极坐标散点图 在极坐标散点图中，每行data\_frame由极坐标中的符号标记表示；
    
*   scatter\_ternary：三元散点图 在三元散点图中，每行data\_frame由三元坐标中的符号标记表示；
    
*   scatter\_mapbox：地图散点图 在Mapbox散点图中，每一行data\_frame都由Mapbox地图上的符号标记表示；
    
*   scatter\_geo：地理坐标散点图 在地理散点图中，每一行data\_frame都由地图上的符号标记表示；
    
*   scatter\_matrix：矩阵散点图 在散点图矩阵(或SPLOM)中，每行data\_frame由多个符号标记表示，在2D散点图的网格的每个单元格中有一个，其将每对dimensions彼此相对绘制；
    
*   density\_contour：密度等值线图（双变量分布） 在密度等值线图中，行data\_frame被组合在一起，成为轮廓标记，以可视化该值的聚合函数histfunc(例如：计数或总和)的2D分布z；
    
*   density\_heatmap：密度热力图（双变量分布） 在密度热图中，行data\_frame被组合在一起，成为彩色矩形瓦片，以可视化该值的聚合函数histfunc(例如：计数或总和)的2D分布 z；
    
*   line：线条图 在2D线图中，每行data\_frame表示为2D空间中折线标记的顶点；
    
*   line\_polar：极坐标线条图 在极线图中，每行data\_frame表示为极坐标中折线标记的顶点；
    
*   line\_ternary：三元线条图 在三元线图中，每行data\_frame表示为三元坐标中折线标记的顶点；
    
*   line\_mapbox：地图线条图 在Mapbox线图中，每一行data\_frame表示为Mapbox地图上折线标记的顶点；
    
*   line\_geo：地理坐标线条图 在地理线图中，每一行data\_frame表示为地图上折线标记的顶点；
    
*   parallel\_coordinates：平行坐标图 在平行坐标图中，每行data\_frame由折线标记表示，该折线标记穿过一组平行轴，每个平行轴对应一个平行轴 dimensions；
    
*   parallel\_categories：并行类别图 在并行类别(或平行集)图中，每行data\_frame与其他共享相同值的行组合，dimensions然后通过一组平行轴绘制为折线标记，每个平行轴对应一个dimensions；
    
*   area：堆积区域图 在堆积区域图中，每行data\_frame表示为2D空间中折线标记的顶点。连续折线之间的区域被填充；
    
*   bar：条形图 在条形图中，每行data\_frame表示为矩形标记；
    
*   bar\_polar：极坐标条形图 在极坐标条形图中，每一行都data\_frame表示为极坐标中的楔形标记；
    
*   violin：小提琴图 在小提琴图中，将data\_frame每一行分组成一个曲线标记，以便可视化它们的分布；
    
*   box：箱形图 在箱形图中，data\_frame的每一行被组合在一起成为盒须标记，以显示它们的分布；
    
*   strip：长条图 在长条图中，每一行data\_frame表示为类别中的抖动标记；l
    
*   histogram：直方图 在直方图中，每一行data\_frame被组合在一起成为矩形标记，以可视化该值的聚合函数histfunc(例如，计数或总和)的1D分布y(或者x，如果orientation是'h'时)；
    
*   choropleth：等高(值)区域地图 在等值区域图中，每行data\_frame由地图上的彩色区域标记表示；
    

### 绘制动画散点图

绘画散点图的图表是：scatter，详细代码如下：

`import plotly.express as px   df = px.data.gapminder()   px.scatter(df, x="gdpPercap", y="lifeExp", animation_frame="year", animation_group="country",              size="pop", color="continent", hover_name="country",              log_x=True, size_max=55, range_x=[100,100000], range_y=[25,90])   `

**显示结果为：**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 动画条形图

`import plotly.express as px      df = px.data.gapminder()      fig = px.bar(df, x="continent", y="pop", color="continent",     animation_frame="year", animation_group="country", range_y=[0,4000000000])   fig.show()   `

**显示结果如下：**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 总结

希望今天文章和实战对大家有所帮助，在以后的成神路上越来越顺利！

### 参考

*   https://www.jianshu.com/p/41735ecd3f75?utm\_campaign=hugo
    
*   https://plotly.com/python/animations/
    

**PS：**公号内回复「Python」即可进入Python 新手学习交流群，一起 [100 天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247486409&idx=1&sn=bee54e90931441489977f68df8339d5f&chksm=fbdad344ccad5a52dd503a3b4eb3c67bd79e3a50634acac8a28b42ebfb476833475182b62806&scene=21#wechat_redirect)

  

**老规矩**，兄弟们还记得么，**右下角的 “在看” 点一下**，如果感觉文章内容不错的话，记得分享朋友圈让更多的人知道！

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

【**神秘礼包**获取方式****】

识别文末二维码，回复：201207

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493706&idx=1&sn=359fb9b116b5826085db7777428002ed&chksm=c172407af605c96cb35b56ea1cd344cd58a727ddc86bcec8ad82ee365fcf993e2bb1bfe52939&scene=21#wechat_redirect>，如有侵权，请联系删除。