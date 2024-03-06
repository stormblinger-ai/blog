![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

文 | 某某白米饭  

来源：Python 技术「ID: pythonall」

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/t8ibUxVnMTLPLUyAAdaDETpj5xxGvtM5pcns01OplkMfZrYaMeHJUFDOGIAjbOpGab87wO7uZhjEwv0WnhPbq1A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "金属质感分割线")

在日常中有时需将 html 文件转换为 pdf、word 文件。网上免费的大多数不支持多个文件转换的情况，而且在转换几个后就开始收费了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/SAy0yVjKWyw6NibqSb5DCfibXwD0LatfOnUSPiaAiabkiaHoPw6zz3VlqcODYgRpJuxdMXibhpjUGT8jibporULa65e6g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

### 转 pdf  

转 pdf 中使用 pdfkit 库，它可以让 web 网页直接转为 pdf 文件，多个 url 可以合并成一个文件。

#### 安装 pdfkit 库

```
pip3 install pdfkit
```

#### 安装 wkhtmltopdf 文件

pdfkit 是基于 wkhtmltopdf 的 python 封装库，所以需要安装 wkhtmltopdf 软件。

下载地址：https://wkhtmltopdf.org/downloads.html

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在windows 系统中，需要将 wkhtmltopdf.exe 文件路径配置在系统环境变量中。  

#### url 生成 pdf

这里使用 baidu 首页和 bing 首页作为示例

```
import pdfkit# 第一个参数可以是列表，放入多个域名，第二个参数是生成的 PDF 名称pdfkit.from_url(['www.baidu.com','www.bing.com'],'search.pdf')
```

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 本地 html 文件生成 pdf

提前将需要转换的 html 存储到本地，也可以使用 python 爬虫代码抓取 html 文件到本地。

```
import pdfkitpdfkit.from_file('/Users/xx/Desktop/html/baidu.html', 'search.pdf')
```

### 转 word

使用 pypandoc 库将 html 转换为 word 文件，pypandoc 是一个支持多种文件格式转换的 Python 库，它用到了 pandoc 软件，所以需要在电脑上安装 pandoc 软件

#### 安装 pypandoc 库

```
pip install pypandoc
```

#### 安装 pandoc 软件

pypandoc 是基于 pandoc 软件的库，所以要安装一下 pandoc (https://github.com/jgm/pandoc/releases/tag/2.11.4)，pandoc 支持多种类型转换。下图是 pandoc 的转换类型。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 使用  

将 html 文件提前存储在本地，也可以用爬虫将需要转换的 html 文件在代码中抓取后使用。

```
import pypandoc# convert_file('原文件','目标格式','目标文件')output = pypandoc.convert_file('/Users/xx/Desktop/html/baidu.html', 'docx', outputfile="baidu.doc")
```

pypandoc 无法对 word 进行排版，所以需要小伙伴们进行 2 次排版。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 总结

利用好 Python 第三方库类，可以为小伙伴写出各种个性化定制的小程序

**PS：**公号内回复「Python」即可进入Python 新手学习交流群，一起 [100 天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247486409&idx=1&sn=bee54e90931441489977f68df8339d5f&chksm=fbdad344ccad5a52dd503a3b4eb3c67bd79e3a50634acac8a28b42ebfb476833475182b62806&scene=21#wechat_redirect)

  

**老规矩**，兄弟们还记得么，**右下角的 “在看” 点一下**，如果感觉文章内容不错的话，记得分享朋友圈让更多的人知道！

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

【**代码**获取方式****】

识别文末二维码，回复：210223

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493793&idx=1&sn=0e15e840675145b03a7e364b4deac1a9&chksm=c1724091f605c9870bba36db6db59685a1cd5c054aecfd4f3757c196e96cbdddd5dd7d599ba7&scene=21#wechat_redirect>，如有侵权，请联系删除。