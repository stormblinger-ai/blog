![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

文 | 潮汐  

来源：Python 技术「ID: pythonall」

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/t8ibUxVnMTLPLUyAAdaDETpj5xxGvtM5pcns01OplkMfZrYaMeHJUFDOGIAjbOpGab87wO7uZhjEwv0WnhPbq1A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "金属质感分割线")

  

学习Python是做数分析的最基础的一步，数据分析离不开数据可视化。Python第三方库中我们最常用的可视化库是 pandas，matplotlib，pyecharts， 当然还有 Tableau，另外最近在学习过程中发现另一款可视化神器-Plotly，它是一款用来做数据分析和可视化的在线平台，功能非常强大, 可以在线绘制很多图形比如条形图、散点图、饼图、直方图等等。除此之外，它还支持在线编辑，以及多种语言 python、javascript、matlab、R等许多API。它在python中使用也非常简单，直接用`pip install plotly` 安装好即可使用。本文将结合 `plotly` 库在 `jupyter notebook` 中来进行图形绘制。

使用 Plotly 可以画出很多媲美Tableau的高质量图，如下图所示：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 折线点图

折现点图画图步骤如下：首先在 Pycharm 界面输入 `jupyter notebook`后进入网页编辑界面，新建一个文件，导入相应的包即可进行图形绘制：

`# import pkg   from plotly.graph_objs import Scatter,Layout   import plotly   import plotly.offline as py   import numpy as np   import plotly.graph_objs as go      `

`#设置编辑模式   plotly.offline.init_notebook_mode(connected=True)      `

`#制作折线图   N = 150   random_x = np.linspace(0,1,N)   random_y0 = np.random.randn(N)+7   random_y1 = np.random.randn(N)   random_y2 = np.random.randn(N)-7      trace0 = go.Scatter(       x = random_x,       y = random_y0,       mode = 'markers',       name = 'markers'   )   trace1 = go.Scatter(       x = random_x,       y = random_y1,       mode = 'lines+markers',       name = 'lines+markers'   )   trace2 = go.Scatter(       x = random_x,       y = random_y2,       mode = 'lines',       name = 'lines'   )   data = [trace0,trace1,trace2]   py.iplot(data)   `

显示结果如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 直方图

`# 直方图   trace0 = go.Bar(       x = ['Jan','Feb','Mar','Apr', 'May','Jun',            'Jul','Aug','Sep','Oct','Nov','Dec'],       y = [20,15,25,16,18,28,19,67,12,56,14,27],       name = 'Primary Product',       marker=dict(           color = 'rgb(49,130,189)'       )   )   trace1 = go.Bar(       x = ['Jan','Feb','Mar','Apr', 'May','Jun',            'Jul','Aug','Sep','Oct','Nov','Dec'],       y = [29,14,32,14,16,19,25,14,10,12,82,16],       name = 'Secondary Product',       marker=dict(           color = 'rgb(204,204,204)'       )   )   data = [trace0,trace1]   py.iplot(data)   `

显示结果如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 散点图

`# 散点图   trace1 = go.Scatter(        y = np.random.randn(700),       mode = 'markers',       marker = dict(           size = 16,           color = np.random.randn(800),           colorscale = 'Viridis',           showscale = True       )   )   data = [trace1]   py.iplot(data)   `

显示结果如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

总结
--

今天的文章主要学习可视化神器-plotpy 的相关操作，希望在平时的工作中有所应用。更多的内容详见 https://plotly.com/python/

**PS：**公号内回复「Python」即可进入Python 新手学习交流群，一起 [100 天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247486409&idx=1&sn=bee54e90931441489977f68df8339d5f&chksm=fbdad344ccad5a52dd503a3b4eb3c67bd79e3a50634acac8a28b42ebfb476833475182b62806&scene=21#wechat_redirect)

  

**老规矩**，兄弟们还记得么，**右下角的 “在看” 点一下**，如果感觉文章内容不错的话，记得分享朋友圈让更多的人知道！

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

【**代码**获取方式****】

识别文末二维码，回复：201112

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493676&idx=1&sn=14e2669c66e2bf674142d66ea3c4de7f&chksm=c172401cf605c90a6a2cd2dfc34110f579a4a4e78865dbe67ba6ce5b899b9480c664ed6a55fa&scene=21#wechat_redirect>，如有侵权，请联系删除。