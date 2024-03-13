import{_ as s,c as n,o as a,a5 as t}from"./chunks/framework.BthLuVtL.js";const p="/assets/127-1.DwPxN3PV.png",l="/assets/127-2.SD7ffSvF.png",f=JSON.parse('{"title":"11.资产详细页面","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB11.md","filePath":"python-demo/CMDB11.md"}'),e={name:"python-demo/CMDB11.md"},g=t(`<h1 id="_11-资产详细页面" tabindex="-1">11.资产详细页面 <a class="header-anchor" href="#_11-资产详细页面" aria-label="Permalink to &quot;11.资产详细页面&quot;">​</a></h1><hr><p>在资产的详细页面，我们将尽可能地将所有的信息都显示出来，并保持美观、整齐。</p><p>教程中实现了主要的服务器资产页面，对于其它类型的资产详细页面，可参照完成，并不复杂。</p><p>完整的detail.html页面代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% extends &#39;base.html&#39; %}</span></span>
<span class="line"><span>{% load static %}</span></span>
<span class="line"><span>{% block title %}资产详细{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block css %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block breadcrumb %}</span></span>
<span class="line"><span>&lt;!-- Content Header (Page header) --&gt;</span></span>
<span class="line"><span>    &lt;section class=&quot;content-header&quot;&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;</span></span>
<span class="line"><span>        资产详细</span></span>
<span class="line"><span>        &lt;small&gt;asset info&lt;/small&gt;</span></span>
<span class="line"><span>      &lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;ol class=&quot;breadcrumb&quot;&gt;</span></span>
<span class="line"><span>        &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&lt;i class=&quot;fa fa-dashboard&quot;&gt;&lt;/i&gt; 主页&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;资产总表&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li class=&quot;active&quot;&gt;资产详细&lt;/li&gt;</span></span>
<span class="line"><span>      &lt;/ol&gt;</span></span>
<span class="line"><span>    &lt;/section&gt;</span></span>
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block content %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- Main content --&gt;</span></span>
<span class="line"><span>    &lt;section class=&quot;content&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;!-- Default box --&gt;</span></span>
<span class="line"><span>      &lt;div class=&quot;box&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          &lt;div class=&quot;box-header with-border&quot;&gt;</span></span>
<span class="line"><span>          &lt;h3 class=&quot;box-title&quot;&gt;&lt;strong class=&quot;btn btn-block btn-primary btn-lg&quot;&gt;资产：{{ asset.name }}&lt;/strong&gt;&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          &lt;div class=&quot;box-tools pull-right&quot;&gt;</span></span>
<span class="line"><span>            &lt;button type=&quot;button&quot; class=&quot;btn btn-box-tool&quot; data-widget=&quot;collapse&quot; data-toggle=&quot;tooltip&quot; title=&quot;Collapse&quot;&gt;</span></span>
<span class="line"><span>              &lt;i class=&quot;fa fa-minus&quot;&gt;&lt;/i&gt;&lt;/button&gt;</span></span>
<span class="line"><span>            &lt;button type=&quot;button&quot; class=&quot;btn btn-box-tool&quot; data-widget=&quot;remove&quot; data-toggle=&quot;tooltip&quot; title=&quot;Remove&quot;&gt;</span></span>
<span class="line"><span>              &lt;i class=&quot;fa fa-times&quot;&gt;&lt;/i&gt;&lt;/button&gt;</span></span>
<span class="line"><span>          &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          &lt;div class=&quot;box-body&quot;&gt;</span></span>
<span class="line"><span>          &lt;h4&gt;&lt;b&gt;概览:&lt;/b&gt;&lt;/h4&gt;</span></span>
<span class="line"><span>            &lt;table border=&quot;1&quot; class=&quot;table  table-responsive&quot; style=&quot;border-left:3px solid deepskyblue;border-bottom:1px solid deepskyblue&quot; &gt;</span></span>
<span class="line"><span>                &lt;thead&gt;</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;类型&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;SN&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;业务线&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;制造商&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;管理IP&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;机房&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;标签&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;更新日期&lt;/th&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/thead&gt;</span></span>
<span class="line"><span>                &lt;tbody&gt;</span></span>
<span class="line"><span>                &lt;tr&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.get_asset_type_display }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.sn }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.business_unit|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.manufacturer|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.manage_ip|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.idc|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;</span></span>
<span class="line"><span>                        {% for tag in asset.tags.all %}</span></span>
<span class="line"><span>                        &lt;label class=&quot;label label-primary&quot;&gt;{{ tag.name }}&lt;/label&gt;</span></span>
<span class="line"><span>                        {% empty %}</span></span>
<span class="line"><span>                            -</span></span>
<span class="line"><span>                        {% endfor %}</span></span>
<span class="line"><span>                    &lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.m_time }}&lt;/td&gt;</span></span>
<span class="line"><span>                &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/tbody&gt;</span></span>
<span class="line"><span>            &lt;/table&gt;</span></span>
<span class="line"><span>            &lt;br /&gt;</span></span>
<span class="line"><span>            &lt;table border=&quot;1&quot; class=&quot;table  table-responsive&quot; style=&quot;border-left:3px solid deepskyblue;border-bottom:1px solid deepskyblue&quot;&gt;</span></span>
<span class="line"><span>                &lt;thead&gt;</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;合同&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;价格&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;购买日期&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;过保日期&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;管理员&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;批准人&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;备注&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;批准日期&lt;/th&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/thead&gt;</span></span>
<span class="line"><span>                &lt;tbody&gt;</span></span>
<span class="line"><span>                &lt;tr&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.contract.name|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.price|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.purchase_day|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.expire_day|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.admin|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.approved_by|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.memo|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.m_time }}&lt;/td&gt;</span></span>
<span class="line"><span>                &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/tbody&gt;</span></span>
<span class="line"><span>            &lt;/table&gt;</span></span>
<span class="line"><span>          &lt;h4&gt;&lt;b&gt;服务器:&lt;/b&gt;&lt;/h4&gt;</span></span>
<span class="line"><span>            &lt;table border=&quot;1&quot; class=&quot;table  table-responsive&quot; style=&quot;border-left:3px solid green;border-bottom:1px solid green&quot;&gt;</span></span>
<span class="line"><span>                &lt;thead&gt;</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;服务器类型&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;型号&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;宿主机&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;Raid类型&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;OS类型&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;OS发行版本&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;OS版本&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;添加方式&lt;/th&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/thead&gt;</span></span>
<span class="line"><span>                &lt;tbody&gt;</span></span>
<span class="line"><span>                &lt;tr&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.server.get_sub_asset_type_display }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.server.model|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.server.hosted_on.id|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.server.raid_type|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.server.os_type|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.server.os_distribution|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.server.os_release|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.server.get_created_by_display }}&lt;/td&gt;</span></span>
<span class="line"><span>                &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/tbody&gt;</span></span>
<span class="line"><span>            &lt;/table&gt;</span></span>
<span class="line"><span>        &lt;h4&gt;&lt;b&gt;CPU:&lt;/b&gt;&lt;/h4&gt;</span></span>
<span class="line"><span>            &lt;table border=&quot;1&quot; class=&quot;table  table-responsive&quot; style=&quot;border-left:3px solid purple;border-bottom:1px solid purple&quot;&gt;</span></span>
<span class="line"><span>                &lt;thead&gt;</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;th  style=&quot;width: 45%&quot;&gt;CPU型号&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th  style=&quot;width: 15%&quot;&gt;物理CPU个数&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;CPU核数&lt;/th&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/thead&gt;</span></span>
<span class="line"><span>                &lt;tbody&gt;</span></span>
<span class="line"><span>                &lt;tr&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.cpu.cpu_model|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.cpu.cpu_count|default:&#39;1&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;td&gt;{{ asset.cpu.cpu_core_count|default:&#39;1&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/tbody&gt;</span></span>
<span class="line"><span>            &lt;/table&gt;</span></span>
<span class="line"><span>        &lt;h4&gt;&lt;b&gt;内存:&lt;/b&gt;&lt;/h4&gt;</span></span>
<span class="line"><span>        &lt;table border=&quot;1&quot; class=&quot;table  table-responsive&quot; style=&quot;border-left:3px solid orangered;border-bottom:1px solid orangered&quot;&gt;</span></span>
<span class="line"><span>                &lt;thead&gt;</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;th style=&quot;width:5%;&quot;&gt;序号&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;型号&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;容量&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;插槽&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;制造商&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;SN&lt;/th&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/thead&gt;</span></span>
<span class="line"><span>                &lt;tbody&gt;</span></span>
<span class="line"><span>                {% for ram in asset.ram_set.all %}</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ forloop.counter }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ ram.model|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ ram.capacity|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ ram.slot }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ ram.manufacturer|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ ram.sn|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                {% empty %}</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                {% endfor %}</span></span>
<span class="line"><span>                &lt;/tbody&gt;</span></span>
<span class="line"><span>            &lt;/table&gt;</span></span>
<span class="line"><span>        &lt;h4&gt;&lt;b&gt;硬盘:&lt;/b&gt;&lt;/h4&gt;</span></span>
<span class="line"><span>        &lt;table border=&quot;1&quot; class=&quot;table  table-responsive&quot; style=&quot;border-left:3px solid brown;border-bottom:1px solid brown&quot;&gt;</span></span>
<span class="line"><span>                &lt;thead&gt;</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;th style=&quot;width:5%;&quot;&gt;序号&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;型号&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;容量&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;插槽&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;接口类型&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;制造商&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;SN&lt;/th&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/thead&gt;</span></span>
<span class="line"><span>                &lt;tbody&gt;</span></span>
<span class="line"><span>                {% for disk in asset.disk_set.all %}</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ forloop.counter }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ disk.model|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ disk.capacity|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ disk.slot|default:&#39;N/A&#39;  }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ disk.get_interface_type_display }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ disk.manufacturer|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ disk.sn}}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                {% empty %}</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                {% endfor %}</span></span>
<span class="line"><span>                &lt;/tbody&gt;</span></span>
<span class="line"><span>            &lt;/table&gt;</span></span>
<span class="line"><span>        &lt;h4&gt;&lt;b&gt;网卡:&lt;/b&gt;&lt;/h4&gt;</span></span>
<span class="line"><span>        &lt;table border=&quot;1&quot; class=&quot;table  table-responsive&quot; style=&quot;border-left:3px solid #a59b1a;border-bottom:1px solid #a59b1a&quot;&gt;</span></span>
<span class="line"><span>                &lt;thead&gt;</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;th style=&quot;width:5%;&quot;&gt;序号&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;名称&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;型号&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;MAC&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;IP&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;掩码&lt;/th&gt;</span></span>
<span class="line"><span>                        &lt;th&gt;绑定地址&lt;/th&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                &lt;/thead&gt;</span></span>
<span class="line"><span>                &lt;tbody&gt;</span></span>
<span class="line"><span>                {% for nic in asset.nic_set.all %}</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ forloop.counter }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ nic.name|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ nic.model }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ nic.mac  }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ nic.ip_address|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ nic.net_mask|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;{{ nic.bonding|default:&#39;N/A&#39; }}&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                {% empty %}</span></span>
<span class="line"><span>                    &lt;tr&gt;</span></span>
<span class="line"><span>                        &lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;</span></span>
<span class="line"><span>                    &lt;/tr&gt;</span></span>
<span class="line"><span>                {% endfor %}</span></span>
<span class="line"><span>                &lt;/tbody&gt;</span></span>
<span class="line"><span>            &lt;/table&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;!-- /.box-body --&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;box-footer&quot;&gt;</span></span>
<span class="line"><span>          &lt;i class=&quot;fa fa-angle-double-left&quot;&gt;&lt;/i&gt;&amp;nbsp;&amp;nbsp;&lt;a href=&quot;{% url &#39;assets:index&#39; %}&quot;&gt;&lt;strong&gt;返回资产列表页&lt;/strong&gt;&lt;/a&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;!-- /.box-footer--&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>      &lt;!-- /.box --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;/section&gt;</span></span>
<span class="line"><span>    &lt;!-- /.content --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block script %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% endblock %}</span></span></code></pre></div><p>主要代码全部集中在<code>&lt;section class=&quot;content&quot;&gt;</code>里，分别用几个表格将概览、服务器、CPU、内存、硬盘和网卡的信息展示出来了。并且，AdminLTE为我们提供了一个折叠的功能，也是非常酷的。</p><p>这个HTML文件没有太多需要额外解释的内容，都是一些很基础的模板语言，构造<code>&lt;table&gt;</code>，然后插入数据。如果没有数据，就以‘N/A’代替。最后在底部添加一个返回资产总表的链接。</p><p>下面是展示图：</p><p><img src="`+p+'" alt="image"></p><p><img src="'+l+'" alt="image"></p><hr>',12),i=[g];function c(o,d,r,u,h,b){return a(),n("div",null,i)}const m=s(e,[["render",c]]);export{f as __pageData,m as default};
