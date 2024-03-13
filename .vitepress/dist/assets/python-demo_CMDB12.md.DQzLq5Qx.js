import{_ as t,c as l,m as s,a as n,t as e,a5 as a,o as i}from"./chunks/framework.BthLuVtL.js";const o="/assets/128-1.DLV0KOI8.png",c="/assets/128-2.Bq345bLl.png",u="/assets/128-3.DAtRotxr.png",d="/assets/128-4.DcTskziy.png",_=JSON.parse('{"title":"12.dashboard仪表盘","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB12.md","filePath":"python-demo/CMDB12.md"}'),r={name:"python-demo/CMDB12.md"},g=a(`<h1 id="_12-dashboard仪表盘" tabindex="-1">12.dashboard仪表盘 <a class="header-anchor" href="#_12-dashboard仪表盘" aria-label="Permalink to &quot;12.dashboard仪表盘&quot;">​</a></h1><hr><p>对于运维管理平台，一个总览的dashboard仪表盘界面是必须有的，不但提升整体格调，也有利于向老板‘邀功请赏’。</p><p>dashboard页面必须酷炫吊炸天，所以界面元素应当美观、丰富、富有冲击力。</p><p>完整的dashboard.html文件代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% extends &#39;base.html&#39; %}</span></span>
<span class="line"><span>{% load static %}</span></span>
<span class="line"><span>{% block title %}仪表盘{% endblock %}</span></span>
<span class="line"><span>{% block css %}{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block breadcrumb %}</span></span>
<span class="line"><span>    &lt;!-- Content Header (Page header) --&gt;</span></span>
<span class="line"><span>    &lt;section class=&quot;content-header&quot;&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;</span></span>
<span class="line"><span>        仪表盘</span></span>
<span class="line"><span>        &lt;small&gt;dashboard&lt;/small&gt;</span></span>
<span class="line"><span>      &lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;ol class=&quot;breadcrumb&quot;&gt;</span></span>
<span class="line"><span>        &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&lt;i class=&quot;fa fa-dashboard&quot;&gt;&lt;/i&gt; 主页&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li class=&quot;active&quot;&gt;仪表盘&lt;/li&gt;</span></span>
<span class="line"><span>      &lt;/ol&gt;</span></span>
<span class="line"><span>    &lt;/section&gt;</span></span>
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block content %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;!-- Main content --&gt;</span></span>
<span class="line"><span>    &lt;section class=&quot;content&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;row&quot;&gt;</span></span>
<span class="line"><span>        &lt;!-- row --&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;col-md-12&quot;&gt;</span></span>
<span class="line"><span>          &lt;!-- jQuery Knob --&gt;</span></span>
<span class="line"><span>          &lt;div class=&quot;box box-solid&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;box-header&quot;&gt;</span></span>
<span class="line"><span>              &lt;i class=&quot;fa fa-bar-chart-o&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>              &lt;h3 class=&quot;box-title&quot;&gt;设备状态&lt;small&gt;(%)&lt;/small&gt;&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>              &lt;div class=&quot;box-tools pull-right&quot;&gt;</span></span>
<span class="line"><span>                &lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-sm&quot; data-widget=&quot;collapse&quot;&gt;&lt;i class=&quot;fa fa-minus&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>                &lt;/button&gt;</span></span>
<span class="line"><span>                &lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-sm&quot; data-widget=&quot;remove&quot;&gt;&lt;i class=&quot;fa fa-times&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>                &lt;/button&gt;</span></span>
<span class="line"><span>              &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;!-- /.box-header --&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;box-body&quot;&gt;</span></span>
<span class="line"><span>              &lt;div class=&quot;row&quot;&gt;</span></span>
<span class="line"><span>                &lt;div class=&quot;col-xs-6 col-md-2 col-md-offset-1 text-center&quot;&gt;</span></span>
<span class="line"><span>                  &lt;input type=&quot;text&quot; class=&quot;knob&quot; value=&quot;{{ up_rate }}&quot; data-width=&quot;90&quot; data-height=&quot;90&quot; data-fgColor=&quot;#00a65a&quot; data-readonly=&quot;true&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;knob-label&quot;&gt;在线&lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;!-- ./col --&gt;</span></span>
<span class="line"><span>                &lt;div class=&quot;col-xs-6 col-md-2 text-center&quot;&gt;</span></span>
<span class="line"><span>                  &lt;input type=&quot;text&quot; class=&quot;knob&quot; value=&quot;{{ o_rate }}&quot; data-width=&quot;90&quot; data-height=&quot;90&quot; data-fgColor=&quot;#f56954&quot; data-readonly=&quot;true&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;knob-label&quot;&gt;下线&lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;!-- ./col --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>                &lt;div class=&quot;col-xs-6 col-md-2 text-center&quot;&gt;</span></span>
<span class="line"><span>                  &lt;input type=&quot;text&quot; class=&quot;knob&quot; value=&quot;{{ bd_rate }}&quot; data-width=&quot;90&quot; data-height=&quot;90&quot; data-fgColor=&quot;#932ab6&quot; data-readonly=&quot;true&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;knob-label&quot;&gt;故障&lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;!-- ./col --&gt;</span></span>
<span class="line"><span>                &lt;div class=&quot;col-xs-6 col-md-2 text-center&quot;&gt;</span></span>
<span class="line"><span>                  &lt;input type=&quot;text&quot; class=&quot;knob&quot; value=&quot;{{ bu_rate }}&quot; data-width=&quot;90&quot; data-height=&quot;90&quot; data-fgColor=&quot;#3c8dbc&quot; data-readonly=&quot;true&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;knob-label&quot;&gt;备用&lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;!-- ./col --&gt;</span></span>
<span class="line"><span>                &lt;div class=&quot;col-xs-6 col-md-2 text-center&quot;&gt;</span></span>
<span class="line"><span>                  &lt;input type=&quot;text&quot; class=&quot;knob&quot; value=&quot;{{ un_rate }}&quot; data-width=&quot;90&quot; data-height=&quot;90&quot; data-fgColor=&quot;#cccccc&quot; data-readonly=&quot;true&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                  &lt;div class=&quot;knob-label&quot;&gt;未知&lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;!-- ./col --&gt;</span></span>
<span class="line"><span>              &lt;/div&gt;</span></span>
<span class="line"><span>              &lt;!-- /.row --&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;!-- /.box-body --&gt;</span></span>
<span class="line"><span>          &lt;/div&gt;</span></span>
<span class="line"><span>          &lt;!-- /.box --&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;!-- /.col --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;div class=&quot;col-md-6&quot;&gt;</span></span>
<span class="line"><span>            &lt;!-- BAR CHART --&gt;</span></span>
<span class="line"><span>          &lt;div class=&quot;box box-success&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &lt;div class=&quot;box-header with-border&quot;&gt;</span></span>
<span class="line"><span>              &lt;h3 class=&quot;box-title&quot;&gt;各状态资产数量统计：&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>              &lt;div class=&quot;box-tools pull-right&quot;&gt;</span></span>
<span class="line"><span>                &lt;button type=&quot;button&quot; class=&quot;btn btn-box-tool&quot; data-widget=&quot;collapse&quot;&gt;&lt;i class=&quot;fa fa-minus&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>                &lt;/button&gt;</span></span>
<span class="line"><span>                &lt;button type=&quot;button&quot; class=&quot;btn btn-box-tool&quot; data-widget=&quot;remove&quot;&gt;&lt;i class=&quot;fa fa-times&quot;&gt;&lt;/i&gt;&lt;/button&gt;</span></span>
<span class="line"><span>              &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;box-body&quot;&gt;</span></span>
<span class="line"><span>                {# 百度Echarts实现柱状图#}</span></span>
<span class="line"><span>                &lt;div id=&quot;barChart&quot; style=&quot;width: 600px;height:400px;&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;!-- /.box-body --&gt;</span></span>
<span class="line"><span>          &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;div class=&quot;col-md-6&quot;&gt;</span></span>
<span class="line"><span>          &lt;!-- DONUT CHART --&gt;</span></span>
<span class="line"><span>          &lt;div class=&quot;box box-danger&quot;&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;box-header with-border&quot;&gt;</span></span>
<span class="line"><span>              &lt;h3 class=&quot;box-title&quot;&gt;各类型资产数量统计：&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>              &lt;div class=&quot;box-tools pull-right&quot;&gt;</span></span>
<span class="line"><span>                &lt;button type=&quot;button&quot; class=&quot;btn btn-box-tool&quot; data-widget=&quot;collapse&quot;&gt;&lt;i class=&quot;fa fa-minus&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>                &lt;/button&gt;</span></span>
<span class="line"><span>                &lt;button type=&quot;button&quot; class=&quot;btn btn-box-tool&quot; data-widget=&quot;remove&quot;&gt;&lt;i class=&quot;fa fa-times&quot;&gt;&lt;/i&gt;&lt;/button&gt;</span></span>
<span class="line"><span>              &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;div class=&quot;box-body&quot;&gt;</span></span>
<span class="line"><span>                {# 百度Echarts实现饼状图#}</span></span>
<span class="line"><span>              &lt;div id=&quot;donutChart&quot; style=&quot;width: 600px;height:400px;&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>            &lt;!-- /.box-body --&gt;</span></span>
<span class="line"><span>          &lt;/div&gt;</span></span>
<span class="line"><span>          &lt;!-- /.box --&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;!-- /.col (RIGHT) --&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>      &lt;!-- /.row --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;/section&gt;</span></span>
<span class="line"><span>    &lt;!-- /.content --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block script %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script src=&quot;https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>    &lt;!-- AdminLTE App --&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;{% static &#39;adminlet-2.4.10/bower_components/jquery-knob/js/jquery.knob.js&#39; %}&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>    &lt;!-- page script --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 顶部服务器状态百分率圆图</span></span>
<span class="line"><span>    $(function () {</span></span>
<span class="line"><span>        /* jQueryKnob */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        $(&quot;.knob&quot;).knob({</span></span>
<span class="line"><span>             /*change : function (value) {</span></span>
<span class="line"><span>       //console.log(&quot;change : &quot; + value);</span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span>       release : function (value) {</span></span>
<span class="line"><span>       console.log(&quot;release : &quot; + value);</span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span>       cancel : function () {</span></span>
<span class="line"><span>       console.log(&quot;cancel : &quot; + this.value);</span></span>
<span class="line"><span>       },*/</span></span>
<span class="line"><span>      draw: function () {</span></span>
<span class="line"><span>             // &quot;tron&quot; case</span></span>
<span class="line"><span>        if (this.$.data(&#39;skin&#39;) == &#39;tron&#39;</span></span>
<span class="line"><span>                ) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          var a = this.angle(this.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    cv)  // Angle</span></span>
<span class="line"><span>              , sa = this.</span></span>
<span class="line"><span>                            startAngle          // Previous start angle</span></span>
<span class="line"><span>              , sat = this.startAngle         // Start angle</span></span>
<span class="line"><span>              , ea                            // Previous end angle</span></span>
<span class="line"><span>              , eat = sat + a                 // End angle</span></span>
<span class="line"><span>              , r = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          this.g.lineWidth = this.lineWidth;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          this.o.cursor</span></span>
<span class="line"><span>          &amp;&amp; (sat = eat - 0.3)</span></span>
<span class="line"><span>          &amp;&amp; (eat = eat + 0.3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          if (this.o.displayPrevious) {</span></span>
<span class="line"><span>            ea = this.startAngle + this.angle(this.value);</span></span>
<span class="line"><span>            this.o.cursor</span></span>
<span class="line"><span>            &amp;&amp; (sa = ea - 0.3)</span></span>
<span class="line"><span>            &amp;&amp; (ea = ea + 0.3);</span></span>
<span class="line"><span>            this.g.beginPath();</span></span>
<span class="line"><span>            this.g.strokeStyle = this.previousColor;</span></span>
<span class="line"><span>            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);</span></span>
<span class="line"><span>            this.g.stroke();</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          this.g.beginPath();</span></span>
<span class="line"><span>          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;</span></span>
<span class="line"><span>          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);</span></span>
<span class="line"><span>          this.g.stroke();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          this.g.lineWidth = 2;</span></span>
<span class="line"><span>          this.g.beginPath();</span></span>
<span class="line"><span>          this.g.strokeStyle = this.o.fgColor;</span></span>
<span class="line"><span>          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);</span></span>
<span class="line"><span>          this.g.stroke();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          return false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    /* END JQUERY KNOB */</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //不同状态资产数量统计 柱状图</span></span>
<span class="line"><span>    $(function () {</span></span>
<span class="line"><span>        // 基于准备好的dom，初始化echarts实例</span></span>
<span class="line"><span>        var myChart = echarts.init(document.getElementById(&#39;barChart&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 指定图表的配置项和数据</span></span>
<span class="line"><span>        var option = {</span></span>
<span class="line"><span>            color: [&#39;#3398DB&#39;],</span></span>
<span class="line"><span>            title: {</span></span>
<span class="line"><span>                text: &#39;数量&#39;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            tooltip: {},</span></span>
<span class="line"><span>            legend: { data:[&#39;&#39;]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            xAxis: {</span></span>
<span class="line"><span>                data: [&quot;在线&quot;, &quot;下线&quot;,&quot;故障&quot;,&quot;备用&quot;,&quot;未知&quot;] },</span></span>
<span class="line"><span>            yAxis: {</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            series:</span></span>
<span class="line"><span>                [{</span></span>
<span class="line"><span>                name: &#39;数量&#39;,</span></span>
<span class="line"><span>                type: &#39;bar&#39;,</span></span>
<span class="line"><span>                barWidth: &#39;50%&#39;,</span></span>
<span class="line"><span>                data: [{{ upline }}, {{ offline }}, {{ breakdown }}, {{ backup }}, {{ unknown }}]</span></span>
<span class="line"><span>            }]</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>            // 使用刚指定的配置项和数据显示图表。</span></span>
<span class="line"><span>            myChart.setOption(option);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //资产类型数量统计 饼图</span></span>
<span class="line"><span>    $(function () {</span></span>
<span class="line"><span>        // 基于准备好的dom，初始化echarts实例</span></span>
<span class="line"><span>        var myChart = echarts.init(document.getElementById(&#39;donutChart&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 指定图表的配置项和数据</span></span>
<span class="line"><span>        option = {</span></span>
<span class="line"><span>            title : {</span></span>
<span class="line"><span>                x:&#39;center&#39;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            tooltip : {</span></span>
<span class="line"><span>                trigger: &#39;item&#39;,</span></span>
<span class="line"><span>                formatter: &quot;{a} &lt;br/&gt;{b} : {c} ({d}%)&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            legend: {</span></span>
<span class="line"><span>                orient: &#39;vertical&#39;,</span></span>
<span class="line"><span>                left: &#39;left&#39;,</span></span>
<span class="line"><span>                data: [&#39;服务器&#39;,&#39;网络设备&#39;,&#39;存储设备&#39;,&#39;安全设备&#39;,&#39;软件资产&#39;]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            series : [</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    name: &#39;资产类型&#39;,</span></span>
<span class="line"><span>                    type: &#39;pie&#39;,</span></span>
<span class="line"><span>                    radius : &#39;55%&#39;,</span></span>
<span class="line"><span>                    center: [&#39;50%&#39;, &#39;60%&#39;],</span></span>
<span class="line"><span>                    data:[</span></span>
<span class="line"><span>                        {value:{{ server_number }}, name:&#39;服务器&#39;},</span></span>
<span class="line"><span>                        {value:{{ networkdevice_number }}, name:&#39;网络设备&#39;},</span></span>
<span class="line"><span>                        {value:{{ storagedevice_number }}, name:&#39;存储设备&#39;},</span></span>
<span class="line"><span>                        {value:{{ securitydevice_number }}, name:&#39;安全设备&#39;},</span></span>
<span class="line"><span>                        {value:{{ software_number }}, name:&#39;软件资产&#39;}</span></span>
<span class="line"><span>                    ],</span></span>
<span class="line"><span>                    itemStyle: {</span></span>
<span class="line"><span>                        emphasis: {</span></span>
<span class="line"><span>                            shadowBlur: 10,</span></span>
<span class="line"><span>                            shadowOffsetX: 0,</span></span>
<span class="line"><span>                            shadowColor: &#39;rgba(0, 0, 0, 0.5)&#39;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>            // 使用刚指定的配置项和数据显示图表。</span></span>
<span class="line"><span>            myChart.setOption(option);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% endblock %}</span></span></code></pre></div><h2 id="一、资产状态占比图" tabindex="-1">一、资产状态占比图 <a class="header-anchor" href="#一、资产状态占比图" aria-label="Permalink to &quot;一、资产状态占比图&quot;">​</a></h2><p>首先，制作一个资产状态百分比表盘，用于显示上线、下线、未知、故障和备用五种资产在总资产中的占比。<strong>注意是占比，不是数量！</strong></p><p>按照AdminLTE中提供的示例，在HTML中添加相应的标签，在script中添加相应的JS代码（jQueryKnob）。JS代码基本照抄，不需要改动。对于显示的圆圈，可以修改其颜色、大小、形态、是否只读等属性，可以参照AdminLTE中的范例。</p><p>最重要的是，需要从数据库中获取相应的数据，修改<code>assets/views.py</code>中的dashboard视图，最终如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>def dashboard(request):</span></span>
<span class="line"><span>    total = models.Asset.objects.count()</span></span>
<span class="line"><span>    upline = models.Asset.objects.filter(status=0).count()</span></span>
<span class="line"><span>    offline = models.Asset.objects.filter(status=1).count()</span></span>
<span class="line"><span>    unknown = models.Asset.objects.filter(status=2).count()</span></span>
<span class="line"><span>    breakdown = models.Asset.objects.filter(status=3).count()</span></span>
<span class="line"><span>    backup = models.Asset.objects.filter(status=4).count()</span></span>
<span class="line"><span>    up_rate = round(upline/total*100)</span></span>
<span class="line"><span>    o_rate = round(offline/total*100)</span></span>
<span class="line"><span>    un_rate = round(unknown/total*100)</span></span>
<span class="line"><span>    bd_rate = round(breakdown/total*100)</span></span>
<span class="line"><span>    bu_rate = round(backup/total*100)</span></span>
<span class="line"><span>    server_number = models.Server.objects.count()</span></span>
<span class="line"><span>    networkdevice_number = models.NetworkDevice.objects.count()</span></span>
<span class="line"><span>    storagedevice_number = models.StorageDevice.objects.count()</span></span>
<span class="line"><span>    securitydevice_number = models.SecurityDevice.objects.count()</span></span>
<span class="line"><span>    software_number = models.Software.objects.count()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return render(request, &#39;assets/dashboard.html&#39;, locals())</span></span></code></pre></div><p>代码很简单，分别获取资产总数量，上线、下线、未知、故障和备用资产的数量，然后计算出各自的占比，例如上线率<code>up_rate</code>。同时获取服务器、网络设备、安全设备和软件设备的数量，后面需要使用。</p>`,12),q=a('<p>完成后的页面如下图所示：</p><p><img src="'+o+`" alt="image"></p><h2 id="二、不同状态资产数量统计柱状图" tabindex="-1">二、不同状态资产数量统计柱状图 <a class="header-anchor" href="#二、不同状态资产数量统计柱状图" aria-label="Permalink to &quot;二、不同状态资产数量统计柱状图&quot;">​</a></h2><p>要绘制柱状图，不可能我们自己一步步从无到有写起，建议使用第三方插件。AdminLTE中内置的是Chartjs插件，但更建议大家使用百度开源的Echarts插件，功能更强大，更容易学习。</p><p>百度Echarts的网址是：<a href="http://echarts.baidu.com/%EF%BC%8C%E6%8F%90%E4%BE%9B%E6%8F%92%E4%BB%B6%E4%B8%8B%E8%BD%BD%E3%80%81%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3%E5%92%8C%E5%9C%A8%E7%BA%BF%E5%B8%AE%E5%8A%A9%E3%80%82" target="_blank" rel="noreferrer">http://echarts.baidu.com/，提供插件下载、说明文档和在线帮助。</a></p><p>这里，我们使用CDN的方式，直接引用Echarts：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script src=&quot;https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js&quot;&gt;&lt;/script&gt;</span></span></code></pre></div><p>使用Echarts的柱状图很简单，首先生成一个用于放置图形的容器：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;div class=&quot;col-md-6&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- BAR CHART --&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;box box-success&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;div class=&quot;box-header with-border&quot;&gt;</span></span>
<span class="line"><span>      &lt;h3 class=&quot;box-title&quot;&gt;各状态资产数量统计：&lt;/h3&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;div class=&quot;box-tools pull-right&quot;&gt;</span></span>
<span class="line"><span>        &lt;button type=&quot;button&quot; class=&quot;btn btn-box-tool&quot; data-widget=&quot;collapse&quot;&gt;&lt;i class=&quot;fa fa-minus&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>        &lt;/button&gt;</span></span>
<span class="line"><span>        &lt;button type=&quot;button&quot; class=&quot;btn btn-box-tool&quot; data-widget=&quot;remove&quot;&gt;&lt;i class=&quot;fa fa-times&quot;&gt;&lt;/i&gt;&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;box-body&quot;&gt;</span></span>
<span class="line"><span>        &lt;div id=&quot;barChart&quot; style=&quot;width: 600px;height:400px;&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;!-- /.box-body --&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p>上面的核心是<code>&lt;div id=&quot;barChart&quot; style=&quot;width: 600px;height:400px;&quot;&gt;&lt;/div&gt;</code>这句，它指明了图表的id和容器大小。其它的都是AdminLTE框架需要的元素，用于生成表头和折叠、关闭动作按钮。我们的容器是可以折叠和删除的，也是移动端自适应的。</p><p>构造了容器后，在<code>&lt;script&gt;&lt;/script&gt;</code>中，添加初始化的js代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$(function () {</span></span>
<span class="line"><span>        // 基于准备好的dom，初始化echarts实例</span></span>
<span class="line"><span>        var myChart = echarts.init(document.getElementById(&#39;barChart&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 指定图表的配置项和数据</span></span>
<span class="line"><span>        var option = {</span></span>
<span class="line"><span>            color: [&#39;#3398DB&#39;],</span></span>
<span class="line"><span>            title: {</span></span>
<span class="line"><span>                text: &#39;数量&#39;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            tooltip: {},</span></span>
<span class="line"><span>            legend: { data:[&#39;&#39;]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            xAxis: {</span></span>
<span class="line"><span>                data: [&quot;在线&quot;, &quot;下线&quot;,&quot;故障&quot;,&quot;备用&quot;,&quot;未知&quot;] },</span></span>
<span class="line"><span>            yAxis: {},</span></span>
<span class="line"><span>            series:</span></span>
<span class="line"><span>                [{</span></span>
<span class="line"><span>                name: &#39;数量&#39;,</span></span>
<span class="line"><span>                type: &#39;bar&#39;,</span></span>
<span class="line"><span>                barWidth: &#39;50%&#39;,</span></span>
<span class="line"><span>                data: [{{ upline }}, {{ offline }}, {{ breakdown }}, {{ backup }}, {{ unknown }}]</span></span>
<span class="line"><span>            }]</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>            // 使用刚指定的配置项和数据显示图表。</span></span>
<span class="line"><span>            myChart.setOption(option);</span></span>
<span class="line"><span>    });</span></span></code></pre></div><p>上面的js代码中，中文文字部分很容易理解，就是x轴的说明文字。还可以设置柱状图的颜色、宽度等特性。关键是series列表，其中的type指定该图表是什么类型，bar表示柱状图，而data就是至关重要的具体数据了，利用模板语言，将从数据库中获取的具体数值传入进来，Echarts插件会根据数值进行动态调整。</p><p><img src="`+c+`" alt="image"></p><h2 id="三、各类型资产数量统计饼图" tabindex="-1">三、各类型资产数量统计饼图 <a class="header-anchor" href="#三、各类型资产数量统计饼图" aria-label="Permalink to &quot;三、各类型资产数量统计饼图&quot;">​</a></h2><p>类似上面的柱状图，在HTML中需要先添加一个容器。不同之处在于初始化的JS代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>//资产类型数量统计 饼图</span></span>
<span class="line"><span>    $(function () {</span></span>
<span class="line"><span>        // 基于准备好的dom，初始化echarts实例</span></span>
<span class="line"><span>        var myChart = echarts.init(document.getElementById(&#39;donutChart&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 指定图表的配置项和数据</span></span>
<span class="line"><span>        option = {</span></span>
<span class="line"><span>            title : {</span></span>
<span class="line"><span>                x:&#39;center&#39;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            tooltip : {</span></span>
<span class="line"><span>                trigger: &#39;item&#39;,</span></span>
<span class="line"><span>                formatter: &quot;{a} &lt;br/&gt;{b} : {c} ({d}%)&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            legend: {</span></span>
<span class="line"><span>                orient: &#39;vertical&#39;,</span></span>
<span class="line"><span>                left: &#39;left&#39;,</span></span>
<span class="line"><span>                data: [&#39;服务器&#39;,&#39;网络设备&#39;,&#39;存储设备&#39;,&#39;安全设备&#39;,&#39;软件资产&#39;]</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            series : [</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    name: &#39;资产类型&#39;,</span></span>
<span class="line"><span>                    type: &#39;pie&#39;,</span></span>
<span class="line"><span>                    radius : &#39;55%&#39;,</span></span>
<span class="line"><span>                    center: [&#39;50%&#39;, &#39;60%&#39;],</span></span>
<span class="line"><span>                    data:[</span></span>
<span class="line"><span>                        {value:{{ server_number }}, name:&#39;服务器&#39;},</span></span>
<span class="line"><span>                        {value:{{ networkdevice_number }}, name:&#39;网络设备&#39;},</span></span>
<span class="line"><span>                        {value:{{ storagedevice_number }}, name:&#39;存储设备&#39;},</span></span>
<span class="line"><span>                        {value:{{ securitydevice_number }}, name:&#39;安全设备&#39;},</span></span>
<span class="line"><span>                        {value:{{ software_number }}, name:&#39;软件资产&#39;}</span></span>
<span class="line"><span>                    ],</span></span>
<span class="line"><span>                    itemStyle: {</span></span>
<span class="line"><span>                        emphasis: {</span></span>
<span class="line"><span>                            shadowBlur: 10,</span></span>
<span class="line"><span>                            shadowOffsetX: 0,</span></span>
<span class="line"><span>                            shadowColor: &#39;rgba(0, 0, 0, 0.5)&#39;</span></span>
<span class="line"><span>                        }</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>            // 使用刚指定的配置项和数据显示图表。</span></span>
<span class="line"><span>            myChart.setOption(option);</span></span>
<span class="line"><span>    });</span></span></code></pre></div><p>series中的type指定为pie，表示饼图，data列表动态传入各种资产类型的数量。其它的设置可参考官方文档。</p><p>为了展示的方便，我们在admin中新建一些网络设备、安全设备、软件资产等其它类型的资产，然后查看资产总表和饼图。</p><p><img src="`+u+'" alt="image"></p><p>查看dashboard如下图所示：</p><p><img src="'+d+'" alt="image"></p><h2 id="四、项目总结" tabindex="-1">四、项目总结 <a class="header-anchor" href="#四、项目总结" aria-label="Permalink to &quot;四、项目总结&quot;">​</a></h2><p>至此，CMDB项目就基本讲解完毕。</p><p>还是要强调的是，这是一个教学版，很多内容和细节没有实现，必然存在bug和不足。但不管怎么样，它至少包含CMDB资产管理的主体内容，如果你能从中有点收获，那么教程的目的就达到了。</p>',25);function h(p,b,m,v,f,y){return i(),l("div",null,[g,s("p",null,[n("在dashboard.html中修改各input框的value属性为"),s("code",null,'value="'+e(p.up_rate)+'"',1),n("（以上线率为例），这是最关键的步骤，前端会根据这个值的大小，决定圆圈的幅度。")]),q])}const k=t(r,[["render",h]]);export{_ as __pageData,k as default};
