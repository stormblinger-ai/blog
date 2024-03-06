![图片](https://mmbiz.qpic.cn/mmbiz_jpg/SAy0yVjKWywF1B2sqROJSwGqkBTnf3iaCY0NicU3iaflojDougbyrWHezpZkPo7ViaglL4pQgXEANKZGRsts1PA2TQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

文 | 太阳雪  

来源：Python 技术「ID: pythonall」

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/t8ibUxVnMTLPLUyAAdaDETpj5xxGvtM5pcns01OplkMfZrYaMeHJUFDOGIAjbOpGab87wO7uZhjEwv0WnhPbq1A/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1 "金属质感分割线")

  

无论是日常办公还是编程，总是离不开 Excel，用来导入导出数据，记录数据，统计分析，画原型，甚至在日本有位老爷爷用 Excel 来创作绘画

虽然 Excel 功能强大，操作便利，但是有些场景下还是不太方便，例如 将大量数据导入到 Excel，将 Excel 中的数据读取到系统中，或者按照某种结构格式化下原有数据，批量处理大量 Excel 文档等，幸运的是，有很多 Python 库可以帮助我们用程序来控制 Excel，完成难以手工完成的任务，现在就来了解下吧

Python 下的 Excel 库
-----------------

Python 中有大量的原生和第三方 Excel 操作包，各有所长，不过对于刚使用 Python 与 Excel 交互的同学来说，可能有点目不暇接，所以先简单梳理一下常见的一些 Excel 包

*   **OpenPyXL** 是个读写 Excel 2010 xlsx/xlsm/xltx/xltm 的 Python 库，简单易用，功能广泛，单元格格式/图片/表格/公式/筛选/批注/文件保护等等功能应有尽有，图表功能是其一大亮点
    
*   **xlwings** 是一个基于 BSD 授权协议的 Python 库，可以轻松的使用 Python 操作 Excel，也可以在 Excel 中调用 Python，以接近 VBA 语法的实现 Excel 编程，支持 Excel 宏，并且可以作为 Web 服务器，提供 REST API 接口
    
*   **pandas** 数据处理是 pandas 的立身之本，Excel 作为 pandas 输入/输出数据的容器
    
*   **win32com** 从命名上就可以看出，这是一个处理 windows 应用的扩展，Excel 只是该库能实现的一小部分功能。该库还支持 office 的众多操作。需要注意的是，该库不单独存在，可通过安装 pypiwin32 或者 pywin32 获取
    
*   **Xlsxwriter** 拥有丰富的特性，支持图片/表格/图表/筛选/格式/公式等，功能与 openpyxl 相似，优点是相比 openpyxl 还支持 VBA 文件导入，迷你图等功能，缺点是不能打开/修改已有文件，意味着使用 xlsxwriter 需要从零开始
    
*   **DataNitro** 一个 Excel 的付费插件，内嵌到 Excel 中，可完全替代 VBA，在 Excel 中使用 python 脚本。既然被称为 Excel 中的 python，同时可以与其他 python 库协同。
    
*   **xlutils** 基于 xlrd/xlwt，老牌 python 包，算是该领域的先驱，功能特点中规中矩，比较大的缺点是仅支持 xls 文件。
    

概括一下：

*   不想使用 GUI 而又希望赋予 Excel 更多的功能，openpyxl 与 xlsxwriter，二者可选其一；
    
*   需要进行科学计算，处理大量数据，建议 pandas+xlsxwriter 或者 pandas + openpyxl，是不错的选择；
    
*   想要写 Excel 脚本，会 Python 但不会 VBA，可考虑 xlwings 或 DataNitro；
    
*   win32com 功能还是性能都很强大，不过需要一定的 windows 编程经验才能上手，它相当于是 windows COM 的封装，另外文档不够完善
    

OpenPyXL
--------

OpenPyXl 几乎可以实现所有的 Excel 功能，而且接口清晰，文档丰富，学习成本相对较低，今天就以 OpenPyXL 为例，了解下如何操作 Excel

### 安装

用 pip 安装

```
pip install openpyxl
```

安装成功后，可以跑通下面测试：

```
python -c "import openpyxl"
```

### 基本概念

*   workbook 相当于一个 Excel 文件档，每个被创建和打开的 Excel 文件都是独立的 Workbook 对象
    
*   sheet Excel 文档中的表单，每个 Excel 文档至少需要一个 sheet
    
*   cell 单元格，是不可分割的基本数据存储单元
    

### 小试牛刀

先来看跑个测试

```
from openpyxl import Workbook
```

需要注意的是：

*   新创建的 workbook 对象，会自带一个名为 Sheet 的表单，Office Excel 新建会创建 3 个
    
*   创建的 workbook 会将第一个 `表单` 激活，通过 wb.active 获取引用
    
*   像 `python-docx` work 库一样，save 方法会立即保存，不会有任何提示，建议选择不同文件名来保存
    

常用功能
----

OpenPyXl 功能很多，从单元格处理到图表展示，涵盖了几乎全部的 Excel 功能，这里就一些常用的功能做展示，更多的用法可以参考 OpenPyXl 文档（文末参考里有链接）

### 创建和打开 Excel

小试牛刀部分看到了如何创建一个 Excel

如果要加载一个已存在的 Excel 文件，需要用 `load_workbook` 方法，给定文件路径，返回 workbook 对象：

```
from openpyxl import load_workbook
```

`load_workbook` 除了参数 `filename`外为还有一些有用的参数：

*   `read_only`：是否为只读模式，对于超大型文件，要提升效率有帮助
    
*   `keep_vba` ：是否保留 vba 代码，即打开 Excel 文件时，开启并保留宏
    
*   `guess_types`：是否做在读取单元格数据类型时，做类型判断
    
*   `data_only`：是否将公式转换为结果，即包含公式的单元格，是否显示最近的计算结果
    
*   `keep_links`：是否保留外部链接
    

### 操作 sheet

```
from openpyxl import Workbook
```

*   每个 Workbook 中都有一个被激活的 sheet，一般都是第一个，可以通过 active 直接获取
    
*   可以通过 sheet 名来获取 sheet 对象
    
*   创建 sheet时需要提供 sheet 名称参数，如果该名称的 sheet 已经存在，则会在名称后添加 1，再有重复添加 2，以此类推
    
*   获得 sheet 对象后，可以设置 名称（title），背景色等属性
    
*   同一个 Workbook 对象中，可以复制 sheet，需要将源 sheet 对象作为参数，复制的新 sheet 会在最末尾
    
*   可以删除一个 sheet，参数是目标 sheet 对象
    

### 操作单元格

单元格（cell）是 Excel 中存放数据的最小单元，就是图形界面中的一个个小格子

OpenPyXl 可以操作单个单元格，也可以批量操作单元格

#### 单独操作

单独操作，即通过 Excel 单元格名称或者行列坐标获取单元格，进行操作

```
ws1 = wb.create_sheet("Mysheet")  #创建一个sheet
```

*   可以通过单元格名称设置，类似于 sheet 的某种属性
    
*   也可以通过行列坐标类设置
    

#### 批量操作

需要一下子操作多个单元格时，可以用批量操作来提高效率

*   指定行列
    

```
# 操作单列
```

*   所有行或者列
    

```
# 所有行
```

*   设置整行数据
    

```
ws.append((1,2,3))
```

#### 合并单元格

```
# 合并
```

*   sheet 对象的 merge\_cells 方法是合并单元格，unmerge\_cells 是解除合并
    
*   分别有两种参数形式，一种是用单元格名称方式指定，另一种是通过命名参数指定
    
*   注意：对于没有合并过单元格的位置调用 unmerge\_cells 时会报错
    

### 单元格格式

OpenPyXl 用6种类来设置单元格的样式

*   `NumberFormat` 数字
    
*   `Alignment` 对齐
    
*   `Font` 字体
    
*   `Border` 边框
    
*   `PatternFill` 填充
    
*   `Protection` 保护
    

```
from openpyxl.styles import Font, PatternFill, Border, Side, Alignment, Protection
```

*   引入字体类
    
*   用 cell 方法，为单元格设置值的同时，设置格式
    
*   每种格式都有特定的属性，为其设置特定的格式对象
    
*   数字格式有点区别，通过设置格式名称来完成，numbers.FORMAT\_PERCENTAGE 是个字符串
    
*   Border 类，需要配合 Side 类使用，它们都在 openpyxl.styles 中定义
    
*   需要注意的是，单元格样式属性只能通过样式对象赋予，而无法通过样式属性来修改，例如 `ws.cell(1, 1).font.color = '00FF00'` 会报错，如果真要换，需要重新创建一个样式实体，重新赋值
    

上面展示的是单个单元格格式的设置，也可以批量设置，有两种方式，一种是循环范围内的所有单元格，逐个设置，另一种是对整列或者整行设置：

```
font = Font(bold=True)
```

更多样式类的定义和参数，可参 OpenPyXl 文档

### 图表

图表是 Excel 中很重要的部分，作为数据可视化的高效工具，利用 OpenPyXl 可以用编程的方式，在 Excel 中制作图表，创建过程和直接在 Excel 中差不多，下面以柱状图和圆饼图为例做演示

#### 柱状图

```
from openpyxl import Workbook
```

*   引入柱状图类 BarChart 和 数据应用类 Reference
    
*   创建 Workbook，并为活动 Sheet 添加数据
    
*   创建柱状图对象，设置图表属性，type 为 `col` 为列状图，`bar` 为水平图
    
*   创建数据引用对象，指定从那个 sheet 以及数据范围
    
*   创建系列数据引用对象
    
*   将数据和系列加入到图表对象中
    
*   最后将图表对象用 add\_chart 添加到 sheet 里
    

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

柱状图

#### 圆饼图

```
from openpyxl import Workbook
```

*   引入饼图类 PieChart 和 数据应用类 Reference
    
*   创建图表数据
    
*   创建图表对象，设置图表标题
    
*   定义标签数据引用和数据引用，并将其加入到图表
    
*   将图表对象添加到 sheet 的指定位置
    

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

圆饼图  

总结
--

今天以 OpenPyXl 库为例，了解了 Python 操作 Excel 的基本方法，限于篇幅，无法全面的清晰的介绍更多功能，期望通过这篇短文，激发起您多程序化操作 Excel 的兴趣，让让工作、学习更高效，就如那句名言一样：“ 人生苦短，我用 Python”

参考
--

*   OpenPyXl 文档 https://openpyxl.readthedocs.io
    
*   Excel 作画 https://zhuanlan.zhihu.com/p/34917620
    
*   https://www.jianshu.com/p/be1ed0c5218e
    
*   https://www.douban.com/note/706513912/
    
*   https://blog.csdn.net/weixin\_41595432/article/details/79349995
    
      
    

**老规矩**，兄弟们还记得么，**右下角的 “在看” 点一下**，如果感觉文章内容不错的话，记得分享朋友圈让更多的人知道！

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

【**代码**获取方式****】

识别文末二维码，回复：200413

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本文转自 <https://mp.weixin.qq.com/s?__biz=MzkxNDI3NjcwMw==&mid=2247493476&idx=1&sn=06e29196c16dfe9d70872315b9454a2b&chksm=c1724f54f605c6422a4610b20a14c26175fafb36449de6fe6161bdd0623547145b86dcae1592&scene=21#wechat_redirect>，如有侵权，请联系删除。