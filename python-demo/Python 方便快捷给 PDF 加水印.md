![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

文 | 轩辕御龙  

来源：Python 技术「ID: pythonall」

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/t8ibUxVnMTLPLUyAAdaDETpj5xxGvtM5pcns01OplkMfZrYaMeHJUFDOGIAjbOpGab87wO7uZhjEwv0WnhPbq1A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "金属质感分割线")

### 方便快捷给 PDF 加水印

有文字创作需求的同学有时候会需要将自己的作品集结为 PDF 进行分发，一方面帮助自己整理归档，另一方面也有利于作品传播。类似的需求我们已经讲过《[用 Python 抓取公号文章保存成 PDF](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484862&idx=1&sn=54d48b1028126ae1a66174d46f65b988&scene=21#wechat_redirect)》。  

出于对盗版的担忧以及对自身权益的维护，很多人都会选择给自己的 PDF 加上专属的水印以标识出处。但各种 PDF 编辑器中加水印的逻辑不同，使用方式也大相径庭，有没有一种方式可以简单快捷地对 PDF 加上水印，同时保持逻辑的一致性呢？

显然此时我们又想到了我们的老朋友：Python。使用 Python 通过编程的方式来对 PDF 加水印还有一个显而易见的好处是：在操作过程中我们会拥有更大的自由度。我们可以根据自己的特殊要求任意定制加水印的逻辑。

我们就以《[用 Python 抓取公号文章保存成 PDF](https://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247484862&idx=1&sn=54d48b1028126ae1a66174d46f65b988&scene=21#wechat_redirect)》一文中得到的 PDF 为例进行演示。下图所示即为该 PDF 文档的一部分。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

original\_pdf  

### 1\. 相应库

首先，要对 PDF 进行操作，只靠 Python 自带的库肯定是不够的，还需要求助于第三方库。这里我们用到的是`PyPDF2`这个库（好消息是，这个库不需要额外安装其他应用，开箱即可使用）。

安装方式大家已经很熟悉了，输入命令：

```
pip install PyPDF2
```

即可。

### 2\. 测试库的功能

首先我们尝试从现有 PDF 文件中提取出第一页保存为新的 PDF 文件：

```
import PyPDF2
```

PyPDF2 中有两个最常用的类：`PdfFileReader`和`PdfFileWriter`。顾名思义，这两个类分别用于读取 PDF 和写入 PDF。其中`PdfFileReader`传入参数可以是一个打开的文件对象，也可以是表示文件路径的字符串。而`PdfFileWriter`则必须传入一个以写方式打开的文件对象。

尤其要注意的是，不同于我们常见的代码、markdown 等文本格式，PDF 是二进制数据类型，因此在打开一个 PDF 格式的文件时，需要显式指定“以二进制格式写入文件内容”，即`”wb"`。

运行程序，打开`test.pdf`查看结果。可以看到效果与预期一致：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

copy\_pdf  

### 3\. 加水印

要加水印首先要制作水印，出于演示目的我们也制作了本公众号对应的水印，用到了公众号的二维码和一句友好的提示语。如下图所示：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

watermark  

> 本文用到的水印、源 PDF 等文件均随示例代码一起发布，读者可以在之后自行尝试。

出于美观和尽量不影响阅读 PDF 内容的考虑，二维码和提示语的位置较偏且尺寸并不大，并且提示语的字体和颜色也不算醒目——如果是读者自用的话，就可以尽情挥洒创作激情，爱什么狂拽酷炫尽管往上堆也没人能反对哈哈。

首先，同时打开源 PDF 和作为水印的 PDF 文件。其中，水印 PDF 文件有且仅有一页，因此我们直接使用链式操作取出`watermark.pdf`文件的第一页作为变量`watermark`的值：

```
import PyPDF2
```

按照上一节复制 PDF 内容的套路，还需要再创建一个`PyPDF2.PdfFileWriter`对象：

```
pdfWriter = PyPDF2.PdfFileWriter()
```

然后很自然地，我们需要对源 PDF 文件的内容按页遍历，将每一页的内容逐页与水印内容合并。但应该如何来对 PDF 文件进行遍历呢？

我们现在只知道对于`PyPDF2.PdfFileReader`对象，有方法`getPage`可以以索引的方式取出对应页码的内容，该如何获得相应索引呢？

好在，`PyPDF2.PdfFileReader`还提供了一个属性字段`numPages`来表示该 PDF 文件的总页数——调用方法`getNumPages`可以得到同样的结果。

对于上面的代码，源 PDF 文件实际应为 10 页，我们输出相应值可以看到与实际一致：

```
print(pdfInput.numPages)	# 10
```

这样我们就可以利用`for`循环和`range`来提供一个递增的索引，用以逐页取出 PDF 的内容了：

```
for i in range(pdfInput.numPages):
```

同时，对于单个的`page`对象，还存在一个名为`mergePage`的方法，接受另一个同为 PDF 中单个页面的对象，原地修改自身为两个页面合并之后的结果。`PyPDF2.PdfFileWriter()`则提供方法`addPage`，用以新增 PDF 页面：

```
for i in range(pdfInput.numPages):
```

循环结束之后，实际上我们加水印的工作已经基本完成。

之所以说是“基本”，是因为这个时候得到的“PDF 文件”实际上依然还只是存在于内存中的一个对象，虽然保存了我们想要的内容，但尚未保存到硬盘上，一旦程序执行结束就再也找不回来了。

因此我们还需要新建一个文件用以保存最终结果：

```
with open(outputName, "wb") as f:
```

注意文件的打开方式为`“wb”`。

到这一步，我们加水印的工作已经全部完成，效果如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

output\_pdf  

### 4\. 番外：给 PDF 加密

一般来讲，我们在发布 PDF 的同时，可能需要对文件的权限进行一定的限制，比如阻止用户直接提取 PDF 内容，因此我们可以考虑对 PDF 进行加密。

在 PyPDF2 中，`PyPDF2.PdfFileWriter()`对象提供方法`encrypt`来对 PDF 文件加密，可以同时进行用户级和拥有者级加密。

默认情况下传入一个字符串作为密码，以该字符串作为密码同时进行两种加密；也可分别指定相应密码。

第三个参数接受一个布尔值，用以指示加密类型，默认为`True`，使用 128 位加密；为`False`时使用 40 位加密。视情况决定。不过对一般 PDF 而言，40 位加密已然足够，还能提升加密效率。

注意，在内容写入硬盘时可能需要耗时较长，因此若程序“假死”，需要耐心等待一段时间。

```
import PyPDF2
```

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

encrypt  

这种情况下，为保证用户体验，建议将第一个参数，即用户级密码，设置为空字符串（`“”`）。这样一般用户打开 PDF 文件时就不必进行输入。如需特别操作时在阅读器中用拥有者口令重新打开即可。

### 5\. 总结

本文介绍了一种给 PDF 加水印的自动化方法。实际上 PyPDF2 模块的功能还不止于此，合并多个 PDF 文件、筛选 PDF 文件的特定页面等等重复性的工作同样可以使用该模块代劳。

更多用法就留待读者探索了。

**老规矩**，兄弟们还记得么，**右下角的 “在看” 点一下**，如果感觉文章内容不错的话，记得分享朋友圈让更多的人知道！

**PS：**公号内回复 ：Python，即可进入Python 新手学习交流群，一起**[100天计划！](http://mp.weixin.qq.com/s?__biz=MzU1NDk2MzQyNg==&mid=2247483671&idx=1&sn=2dc45e9363f86a6938b0c30da0b2a0ba&chksm=fbdad99accad508c083bfa72007b30d6a13a22b4a3c035c4c38bd7c9bb7da46aa42d93c5e14d&scene=21#wechat_redirect)**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

【**代码**获取方式****】

识别文末二维码，回复：200415

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493479&idx=1&sn=6c9e2ae7bb4e1d30f58415e5bc298516&chksm=c1724f57f605c641cdb2ac6cfdbfe0bc7c88fba55c059dbd0ef99a550fbf9d034ff70e95275c&scene=21#wechat_redirect>，如有侵权，请联系删除。