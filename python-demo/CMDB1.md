# 1.项目需求分析



------

## 一、CMDB简介

**CMDB (Configuration Management Database)配置管理数据库**:

CMDB用于存储与管理企业IT架构中设备的各种配置信息，它与所有服务支持和服务交付流程都紧密相联，支持这些流程的运转、发挥配置信息的价值，同时依赖于相关流程保证数据的准确性。

CMDB是ITIL(Information Technology Infrastructure Library，信息技术基础架构库)的基础，常常被认为是构建其它ITIL流程的先决条件而优先考虑，ITIL项目的成败与是否成功建立CMDB有非常大的关系。

CMDB的核心是对整个公司的IT硬件/软件资源进行自动/手动收集、变更操作，说白了也就是对IT资产进行自动化管理，这也是本项目的重点。

## 二、项目需求分析

**本项目不是一个完整的的CMDB系统，重点针对服务器资产的自动数据收集、报告、接收、审批、更新和展示，搭建一个基础的面向运维的主机管理平台。**

下面是项目需求的总结：

- 尽可能存储所有的IT资产数据，但不包括鼠标键盘外设、优盘、显示器这种属于行政部门管理的设备；
- 硬件信息可自动收集、报告、分析、存储和展示；
- 具有后台管理人员的工作界面；
- 具有前端可视化展示的界面；
- 具有日志记录功能；
- 数据可手动添加、修改和删除。

当然，实际的CMDB项目需求绝对不止这些，还有诸如用户管理、权限管理、API安全认证、REST设计等等。

## 三、资产分类

资产种类众多，不是所有的都需要CMDB管理，也不是什么都是CMDB能管理的。

下面是一个大致的分类，不一定准确、全面：

资产类型包括：

- 服务器
- 存储设备
- 安全设备
- 网络设备
- 软件资产

服务器又可分为：

- 刀片服务器
- PC服务器
- 小型机
- 大型机
- 其它

存储设备包括：

- 磁盘阵列
- 网络存储器
- 磁带库
- 磁带机
- 其它

安全设备包括：

- 防火墙
- 入侵检测设备
- 互联网网关
- 漏洞扫描设备
- 数字签名设备
- 上网行为管理设备
- 运维审计设备
- 加密机
- 其它

网络设备包括：

- 路由器
- 交换器
- 负载均衡
- VPN
- 流量分析
- 其它

软件资产包括：

- 操作系统授权
- 大型软件授权
- 数据库授权
- 其它

其中，服务器是运维部门最关心的，也是CMDB中最主要、最方便进行自动化管理的资产。

服务器又可以包含下面的部件：

- CPU
- 硬盘
- 内存
- 网卡

除此之外，我们还要考虑下面的一些内容：

- 机房
- 业务线
- 合同
- 管理员
- 审批员
- 资产标签
- 其它未尽事宜

------

大概对资产进行了分类之后，就要详细考虑各细分数据条目了。

**共有数据条目：**

有一些数据条目是所有资产都应该有的，比如：

- 资产名称
- 资产sn
- 所属业务线
- 设备状态
- 制造商
- 管理IP
- 所在机房
- 资产管理员
- 资产标签
- 合同
- 价格
- 购买日期
- 过保日期
- 批准人
- 批准日期
- 数据更新日期
- 备注

另外，不同类型的资产还有各自不同的数据条目，例如服务器：

**服务器：**

- 服务器类型
- 添加方式
- 宿主机
- 服务器型号
- Raid类型
- 操作系统类型
- 发行版本
- 操作系统版本

**其实，在开始正式编写CMDB项目代码之前，对项目的需求分析准确与否，数据条目的安排是否合理，是决定整个CMDB项目成败的关键。这一部分工作看似简单其实复杂，看似无用其实关键，做好了，项目基础就牢固，没做好，推到重来好几遍很正常！**