import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BthLuVtL.js";const l="/assets/125-1.x7hYOmO0.png",t="/assets/125-2.Noan9h_B.png",e="/assets/125-3.CCBX3EAn.png",i="/assets/125-4.B8yBKXW-.png",o="/assets/125-5.Dmn0tDyx.png",k=JSON.parse('{"title":"9.前端框架AdminLTE","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/CMDB9.md","filePath":"python-demo/CMDB9.md"}'),c={name:"python-demo/CMDB9.md"},u=p('<h1 id="_9-前端框架adminlte" tabindex="-1">9.前端框架AdminLTE <a class="header-anchor" href="#_9-前端框架adminlte" aria-label="Permalink to &quot;9.前端框架AdminLTE&quot;">​</a></h1><hr><p>作为CMDB资产管理项目，必须有一个丰富、直观、酷炫的前端页面。</p><p>适合运维平台的前端框架有很多，开源的也不少，这里选用的是AdminLTE。</p><p><img src="'+l+'" alt="image"></p><p>AdminLTE托管在GitHub上，可以通过下面的地址下载：</p><p><a href="https://github.com/ColorlibHQ/AdminLTE/releases" target="_blank" rel="noreferrer">https://github.com/ColorlibHQ/AdminLTE/releases</a></p><p><img src="'+t+`" alt="image"></p><p>这里我们下载的是2.4.10版本，其官方文档地址：<a href="https://adminlte.io/docs/2.4/installation" target="_blank" rel="noreferrer">https://adminlte.io/docs/2.4/installation</a></p><p>AdminLTE自带JQuery和Bootstrap3框架插件，无需另外下载。</p><p>AdminLTE自带多种配色皮肤，可根据需要实时调整。</p><p>AdminLTE是移动端自适应的，无需单独考虑。</p><p>AdminLTE自带大量插件，比如表格、Charts等等，可根据需要载入。</p><h2 id="一、创建base-html" tabindex="-1">一、创建base.html <a class="header-anchor" href="#一、创建base-html" aria-label="Permalink to &quot;一、创建base.html&quot;">​</a></h2><p>AdminLTE源文件根目录下有个<code>starter.html</code>页面文件，可以利用它修改出我们CMDB项目需要的基本框架。</p><p>在项目的根目录cmdb下新建static目录，在settings文件中添加下面的配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>STATICFILES_DIRS = [</span></span>
<span class="line"><span>    os.path.join(BASE_DIR, &quot;static&quot;),</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>为了以后扩展的方便，在<code>CMDB/static/</code>目录下再创建一级目录<code>adminlet-2.4.10</code>，将 AdminLTE源文件包里的<code>bower_components</code>、<code>dist</code>和<code>plugins</code>三个文件夹，全部拷贝到<code>adminlet-2.4.10</code>目录中，这样做的话文件会比较大，比较多，但可以防止出现引用文件找不到、插件缺失等情况的发生，等以后对AdminLTE非常熟悉了，可以对其中无用的文件进行删减。</p><p>在cmdb根目录下的templates目录中，新建<code>base.html</code>文件，将AdminLTE源文件包中的<code>starter.html</code>中的内容拷贝过去。然后，根据我们项目的具体情况修改文件引用、页面框架、title、CSS、主体和script块。这一部分工作量还是蛮大的，很繁琐，下面给出成品：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% load static %}</span></span>
<span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;!--</span></span>
<span class="line"><span>This is a starter template page. Use this page to start your new project from</span></span>
<span class="line"><span>scratch. This page gets rid of all links and provides the needed markup only.</span></span>
<span class="line"><span>--&gt;</span></span>
<span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>  &lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span>  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;</span></span>
<span class="line"><span>  &lt;title&gt;{% block title %}base{% endblock %}&lt;/title&gt;</span></span>
<span class="line"><span>  &lt;!-- Tell the browser to be responsive to screen width --&gt;</span></span>
<span class="line"><span>  &lt;meta content=&quot;width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no&quot; name=&quot;viewport&quot;&gt;</span></span>
<span class="line"><span>  &lt;link rel=&quot;stylesheet&quot; href=&quot;{% static &#39;adminlet-2.4.10/bower_components/bootstrap/dist/css/bootstrap.min.css&#39; %}&quot;&gt;</span></span>
<span class="line"><span>  &lt;!-- Font Awesome --&gt;</span></span>
<span class="line"><span>  &lt;link rel=&quot;stylesheet&quot; href=&quot;{% static &#39;adminlet-2.4.10/bower_components/font-awesome/css/font-awesome.min.css&#39; %}&quot;&gt;</span></span>
<span class="line"><span>  &lt;!-- Ionicons --&gt;</span></span>
<span class="line"><span>  &lt;link rel=&quot;stylesheet&quot; href=&quot;{% static &#39;adminlet-2.4.10/bower_components/Ionicons/css/ionicons.min.css&#39; %}&quot;&gt;</span></span>
<span class="line"><span>  &lt;!-- Theme style --&gt;</span></span>
<span class="line"><span>  &lt;link rel=&quot;stylesheet&quot; href=&quot;{% static &#39;adminlet-2.4.10/dist/css/AdminLTE.min.css&#39; %}&quot;&gt;</span></span>
<span class="line"><span>  &lt;!-- AdminLTE Skins. We have chosen the skin-blue for this starter</span></span>
<span class="line"><span>        page. However, you can choose any other skin. Make sure you</span></span>
<span class="line"><span>        apply the skin class to the body tag so the changes take effect. --&gt;</span></span>
<span class="line"><span>  &lt;link rel=&quot;stylesheet&quot; href=&quot;{% static &#39;adminlet-2.4.10/dist/css/skins/skin-blue.min.css&#39; %}&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    {% block css %}{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;!--</span></span>
<span class="line"><span>BODY TAG OPTIONS:</span></span>
<span class="line"><span>=================</span></span>
<span class="line"><span>Apply one or more of the following classes to get the</span></span>
<span class="line"><span>desired effect</span></span>
<span class="line"><span>|---------------------------------------------------------|</span></span>
<span class="line"><span>| SKINS         | skin-blue                               |</span></span>
<span class="line"><span>|               | skin-black                              |</span></span>
<span class="line"><span>|               | skin-purple                             |</span></span>
<span class="line"><span>|               | skin-yellow                             |</span></span>
<span class="line"><span>|               | skin-red                                |</span></span>
<span class="line"><span>|               | skin-green                              |</span></span>
<span class="line"><span>|---------------------------------------------------------|</span></span>
<span class="line"><span>|LAYOUT OPTIONS | fixed                                   |</span></span>
<span class="line"><span>|               | layout-boxed                            |</span></span>
<span class="line"><span>|               | layout-top-nav                          |</span></span>
<span class="line"><span>|               | sidebar-collapse                        |</span></span>
<span class="line"><span>|               | sidebar-mini                            |</span></span>
<span class="line"><span>|---------------------------------------------------------|</span></span>
<span class="line"><span>--&gt;</span></span>
<span class="line"><span>&lt;body class=&quot;hold-transition skin-blue sidebar-mini&quot;&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;wrapper&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;!-- Main Header --&gt;</span></span>
<span class="line"><span>  &lt;header class=&quot;main-header&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- Logo --&gt;</span></span>
<span class="line"><span>    &lt;a href=&quot;#&quot; class=&quot;logo&quot;&gt;</span></span>
<span class="line"><span>      &lt;!-- mini logo for sidebar mini 50x50 pixels --&gt;</span></span>
<span class="line"><span>      &lt;span class=&quot;logo-mini&quot;&gt;&lt;b&gt;CMDB&lt;/b&gt;&lt;/span&gt;</span></span>
<span class="line"><span>      &lt;!-- logo for regular state and mobile devices --&gt;</span></span>
<span class="line"><span>      &lt;span class=&quot;logo-lg&quot;&gt;&lt;b&gt;CMDB&lt;/b&gt;&lt;/span&gt;</span></span>
<span class="line"><span>    &lt;/a&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- Header Navbar --&gt;</span></span>
<span class="line"><span>    &lt;nav class=&quot;navbar navbar-static-top&quot; role=&quot;navigation&quot;&gt;</span></span>
<span class="line"><span>      &lt;!-- Sidebar toggle button--&gt;</span></span>
<span class="line"><span>      &lt;a href=&quot;#&quot; class=&quot;sidebar-toggle&quot; data-toggle=&quot;push-menu&quot; role=&quot;button&quot;&gt;</span></span>
<span class="line"><span>        &lt;span class=&quot;sr-only&quot;&gt;Toggle navigation&lt;/span&gt;</span></span>
<span class="line"><span>      &lt;/a&gt;</span></span>
<span class="line"><span>      &lt;!-- Navbar Right Menu --&gt;</span></span>
<span class="line"><span>      &lt;div class=&quot;navbar-custom-menu&quot;&gt;</span></span>
<span class="line"><span>        &lt;ul class=&quot;nav navbar-nav&quot;&gt;</span></span>
<span class="line"><span>          &lt;!-- Messages: style can be found in dropdown.less--&gt;</span></span>
<span class="line"><span>          &lt;li class=&quot;dropdown messages-menu&quot;&gt;</span></span>
<span class="line"><span>            &lt;!-- Menu toggle button --&gt;</span></span>
<span class="line"><span>            &lt;a href=&quot;#&quot; class=&quot;dropdown-toggle&quot; data-toggle=&quot;dropdown&quot;&gt;</span></span>
<span class="line"><span>              &lt;i class=&quot;fa fa-envelope-o&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>              &lt;span class=&quot;label label-success&quot;&gt;4&lt;/span&gt;</span></span>
<span class="line"><span>            &lt;/a&gt;</span></span>
<span class="line"><span>            &lt;ul class=&quot;dropdown-menu&quot;&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;header&quot;&gt;You have 4 messages&lt;/li&gt;</span></span>
<span class="line"><span>              &lt;li&gt;</span></span>
<span class="line"><span>                &lt;!-- inner menu: contains the messages --&gt;</span></span>
<span class="line"><span>                &lt;ul class=&quot;menu&quot;&gt;</span></span>
<span class="line"><span>                  &lt;li&gt;&lt;!-- start message --&gt;</span></span>
<span class="line"><span>                    &lt;a href=&quot;#&quot;&gt;</span></span>
<span class="line"><span>                      &lt;div class=&quot;pull-left&quot;&gt;</span></span>
<span class="line"><span>                        &lt;!-- User Image --&gt;</span></span>
<span class="line"><span>                        &lt;img src=&quot;{% static &#39;adminlet-2.4.10/dist/img/user2-160x160.jpg&#39; %}&quot; class=&quot;img-circle&quot; alt=&quot;User Image&quot;&gt;</span></span>
<span class="line"><span>                      &lt;/div&gt;</span></span>
<span class="line"><span>                      &lt;!-- Message title and timestamp --&gt;</span></span>
<span class="line"><span>                      &lt;h4&gt;</span></span>
<span class="line"><span>                        Support Team</span></span>
<span class="line"><span>                        &lt;small&gt;&lt;i class=&quot;fa fa-clock-o&quot;&gt;&lt;/i&gt; 5 mins&lt;/small&gt;</span></span>
<span class="line"><span>                      &lt;/h4&gt;</span></span>
<span class="line"><span>                      &lt;!-- The message --&gt;</span></span>
<span class="line"><span>                      &lt;p&gt;Why not buy a new awesome theme?&lt;/p&gt;</span></span>
<span class="line"><span>                    &lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;/li&gt;</span></span>
<span class="line"><span>                  &lt;!-- end message --&gt;</span></span>
<span class="line"><span>                &lt;/ul&gt;</span></span>
<span class="line"><span>                &lt;!-- /.menu --&gt;</span></span>
<span class="line"><span>              &lt;/li&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;footer&quot;&gt;&lt;a href=&quot;#&quot;&gt;See All Messages&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>            &lt;/ul&gt;</span></span>
<span class="line"><span>          &lt;/li&gt;</span></span>
<span class="line"><span>          &lt;!-- /.messages-menu --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          &lt;!-- Notifications Menu --&gt;</span></span>
<span class="line"><span>          &lt;li class=&quot;dropdown notifications-menu&quot;&gt;</span></span>
<span class="line"><span>            &lt;!-- Menu toggle button --&gt;</span></span>
<span class="line"><span>            &lt;a href=&quot;#&quot; class=&quot;dropdown-toggle&quot; data-toggle=&quot;dropdown&quot;&gt;</span></span>
<span class="line"><span>              &lt;i class=&quot;fa fa-bell-o&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>              &lt;span class=&quot;label label-warning&quot;&gt;10&lt;/span&gt;</span></span>
<span class="line"><span>            &lt;/a&gt;</span></span>
<span class="line"><span>            &lt;ul class=&quot;dropdown-menu&quot;&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;header&quot;&gt;You have 10 notifications&lt;/li&gt;</span></span>
<span class="line"><span>              &lt;li&gt;</span></span>
<span class="line"><span>                &lt;!-- Inner Menu: contains the notifications --&gt;</span></span>
<span class="line"><span>                &lt;ul class=&quot;menu&quot;&gt;</span></span>
<span class="line"><span>                  &lt;li&gt;&lt;!-- start notification --&gt;</span></span>
<span class="line"><span>                    &lt;a href=&quot;#&quot;&gt;</span></span>
<span class="line"><span>                      &lt;i class=&quot;fa fa-users text-aqua&quot;&gt;&lt;/i&gt; 5 new members joined today</span></span>
<span class="line"><span>                    &lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;/li&gt;</span></span>
<span class="line"><span>                  &lt;!-- end notification --&gt;</span></span>
<span class="line"><span>                &lt;/ul&gt;</span></span>
<span class="line"><span>              &lt;/li&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;footer&quot;&gt;&lt;a href=&quot;#&quot;&gt;View all&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>            &lt;/ul&gt;</span></span>
<span class="line"><span>          &lt;/li&gt;</span></span>
<span class="line"><span>          &lt;!-- Tasks Menu --&gt;</span></span>
<span class="line"><span>          &lt;li class=&quot;dropdown tasks-menu&quot;&gt;</span></span>
<span class="line"><span>            &lt;!-- Menu Toggle Button --&gt;</span></span>
<span class="line"><span>            &lt;a href=&quot;#&quot; class=&quot;dropdown-toggle&quot; data-toggle=&quot;dropdown&quot;&gt;</span></span>
<span class="line"><span>              &lt;i class=&quot;fa fa-flag-o&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>              &lt;span class=&quot;label label-danger&quot;&gt;9&lt;/span&gt;</span></span>
<span class="line"><span>            &lt;/a&gt;</span></span>
<span class="line"><span>            &lt;ul class=&quot;dropdown-menu&quot;&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;header&quot;&gt;You have 9 tasks&lt;/li&gt;</span></span>
<span class="line"><span>              &lt;li&gt;</span></span>
<span class="line"><span>                &lt;!-- Inner menu: contains the tasks --&gt;</span></span>
<span class="line"><span>                &lt;ul class=&quot;menu&quot;&gt;</span></span>
<span class="line"><span>                  &lt;li&gt;&lt;!-- Task item --&gt;</span></span>
<span class="line"><span>                    &lt;a href=&quot;#&quot;&gt;</span></span>
<span class="line"><span>                      &lt;!-- Task title and progress text --&gt;</span></span>
<span class="line"><span>                      &lt;h3&gt;</span></span>
<span class="line"><span>                        Design some buttons</span></span>
<span class="line"><span>                        &lt;small class=&quot;pull-right&quot;&gt;20%&lt;/small&gt;</span></span>
<span class="line"><span>                      &lt;/h3&gt;</span></span>
<span class="line"><span>                      &lt;!-- The progress bar --&gt;</span></span>
<span class="line"><span>                      &lt;div class=&quot;progress xs&quot;&gt;</span></span>
<span class="line"><span>                        &lt;!-- Change the css width attribute to simulate progress --&gt;</span></span>
<span class="line"><span>                        &lt;div class=&quot;progress-bar progress-bar-aqua&quot; style=&quot;width: 20%&quot; role=&quot;progressbar&quot;</span></span>
<span class="line"><span>                             aria-valuenow=&quot;20&quot; aria-valuemin=&quot;0&quot; aria-valuemax=&quot;100&quot;&gt;</span></span>
<span class="line"><span>                          &lt;span class=&quot;sr-only&quot;&gt;20% Complete&lt;/span&gt;</span></span>
<span class="line"><span>                        &lt;/div&gt;</span></span>
<span class="line"><span>                      &lt;/div&gt;</span></span>
<span class="line"><span>                    &lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;/li&gt;</span></span>
<span class="line"><span>                  &lt;!-- end task item --&gt;</span></span>
<span class="line"><span>                &lt;/ul&gt;</span></span>
<span class="line"><span>              &lt;/li&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;footer&quot;&gt;</span></span>
<span class="line"><span>                &lt;a href=&quot;#&quot;&gt;View all tasks&lt;/a&gt;</span></span>
<span class="line"><span>              &lt;/li&gt;</span></span>
<span class="line"><span>            &lt;/ul&gt;</span></span>
<span class="line"><span>          &lt;/li&gt;</span></span>
<span class="line"><span>          &lt;!-- User Account Menu --&gt;</span></span>
<span class="line"><span>          &lt;li class=&quot;dropdown user user-menu&quot;&gt;</span></span>
<span class="line"><span>            &lt;!-- Menu Toggle Button --&gt;</span></span>
<span class="line"><span>            &lt;a href=&quot;#&quot; class=&quot;dropdown-toggle&quot; data-toggle=&quot;dropdown&quot;&gt;</span></span>
<span class="line"><span>              &lt;!-- The user image in the navbar--&gt;</span></span>
<span class="line"><span>              &lt;img src=&quot;{% static &#39;adminlet-2.4.10/dist/img/user2-160x160.jpg&#39; %}&quot; class=&quot;user-image&quot; alt=&quot;User Image&quot;&gt;</span></span>
<span class="line"><span>              &lt;!-- hidden-xs hides the username on small devices so only the image appears. --&gt;</span></span>
<span class="line"><span>              &lt;span class=&quot;hidden-xs&quot;&gt;系统管理员&lt;/span&gt;</span></span>
<span class="line"><span>            &lt;/a&gt;</span></span>
<span class="line"><span>            &lt;ul class=&quot;dropdown-menu&quot;&gt;</span></span>
<span class="line"><span>              &lt;!-- The user image in the menu --&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;user-header&quot;&gt;</span></span>
<span class="line"><span>                &lt;img src=&quot;{% static &#39;adminlet-2.4.10/dist/img/user2-160x160.jpg&#39; %}&quot; class=&quot;img-circle&quot; alt=&quot;User Image&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                &lt;p&gt;</span></span>
<span class="line"><span>                  系统管理员</span></span>
<span class="line"><span>                  &lt;small&gt;2019-4-12&lt;/small&gt;</span></span>
<span class="line"><span>                &lt;/p&gt;</span></span>
<span class="line"><span>              &lt;/li&gt;</span></span>
<span class="line"><span>              &lt;!-- Menu Body --&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;user-body&quot;&gt;</span></span>
<span class="line"><span>                &lt;div class=&quot;row&quot;&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;col-xs-4 text-center&quot;&gt;</span></span>
<span class="line"><span>                    &lt;a href=&quot;#&quot;&gt;Followers&lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;col-xs-4 text-center&quot;&gt;</span></span>
<span class="line"><span>                    &lt;a href=&quot;#&quot;&gt;Sales&lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                  &lt;div class=&quot;col-xs-4 text-center&quot;&gt;</span></span>
<span class="line"><span>                    &lt;a href=&quot;#&quot;&gt;Friends&lt;/a&gt;</span></span>
<span class="line"><span>                  &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;!-- /.row --&gt;</span></span>
<span class="line"><span>              &lt;/li&gt;</span></span>
<span class="line"><span>              &lt;!-- Menu Footer--&gt;</span></span>
<span class="line"><span>              &lt;li class=&quot;user-footer&quot;&gt;</span></span>
<span class="line"><span>                &lt;div class=&quot;pull-left&quot;&gt;</span></span>
<span class="line"><span>                  &lt;a href=&quot;#&quot; class=&quot;btn btn-default btn-flat&quot;&gt;Profile&lt;/a&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>                &lt;div class=&quot;pull-right&quot;&gt;</span></span>
<span class="line"><span>                  &lt;a href=&quot;#&quot; class=&quot;btn btn-default btn-flat&quot;&gt;Sign out&lt;/a&gt;</span></span>
<span class="line"><span>                &lt;/div&gt;</span></span>
<span class="line"><span>              &lt;/li&gt;</span></span>
<span class="line"><span>            &lt;/ul&gt;</span></span>
<span class="line"><span>          &lt;/li&gt;</span></span>
<span class="line"><span>        &lt;/ul&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/nav&gt;</span></span>
<span class="line"><span>  &lt;/header&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;!-- Left side column. contains the logo and sidebar --&gt;</span></span>
<span class="line"><span>  &lt;aside class=&quot;main-sidebar&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- sidebar: style can be found in sidebar.less --&gt;</span></span>
<span class="line"><span>    &lt;section class=&quot;sidebar&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;!-- Sidebar user panel (optional) --&gt;</span></span>
<span class="line"><span>      &lt;div class=&quot;user-panel&quot;&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;pull-left image&quot;&gt;</span></span>
<span class="line"><span>          &lt;img src=&quot;{% static &#39;adminlet-2.4.10/dist/img/user2-160x160.jpg&#39; %}&quot; class=&quot;img-circle&quot; alt=&quot;User Image&quot;&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;pull-left info&quot;&gt;</span></span>
<span class="line"><span>          &lt;p&gt;Admin&lt;/p&gt;</span></span>
<span class="line"><span>          &lt;!-- Status --&gt;</span></span>
<span class="line"><span>          &lt;a href=&quot;#&quot;&gt;&lt;i class=&quot;fa fa-circle text-success&quot;&gt;&lt;/i&gt;在线&lt;/a&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;!-- search form (Optional) --&gt;</span></span>
<span class="line"><span>      &lt;form action=&quot;#&quot; method=&quot;get&quot; class=&quot;sidebar-form&quot;&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;input-group&quot;&gt;</span></span>
<span class="line"><span>          &lt;input type=&quot;text&quot; name=&quot;q&quot; class=&quot;form-control&quot; placeholder=&quot;Search...&quot;&gt;</span></span>
<span class="line"><span>          &lt;span class=&quot;input-group-btn&quot;&gt;</span></span>
<span class="line"><span>              &lt;button type=&quot;submit&quot; name=&quot;search&quot; id=&quot;search-btn&quot; class=&quot;btn btn-flat&quot;&gt;&lt;i class=&quot;fa fa-search&quot;&gt;&lt;/i&gt;</span></span>
<span class="line"><span>              &lt;/button&gt;</span></span>
<span class="line"><span>            &lt;/span&gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>      &lt;/form&gt;</span></span>
<span class="line"><span>      &lt;!-- /.search form --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;!-- Sidebar Menu --&gt;</span></span>
<span class="line"><span>      &lt;ul class=&quot;sidebar-menu&quot; data-widget=&quot;tree&quot;&gt;</span></span>
<span class="line"><span>        &lt;li class=&quot;header&quot;&gt;导航栏&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;!-- Optionally, you can add icons to the links --&gt;</span></span>
<span class="line"><span>        &lt;li&gt;&lt;a href=&quot;{% url &#39;assets:dashboard&#39; %}&quot;&gt;&lt;i class=&quot;fa fa-dashboard&quot;&gt;&lt;/i&gt; &lt;span&gt;仪表盘&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li&gt;&lt;a href=&quot;{% url &#39;assets:index&#39; %}&quot;&gt;&lt;i class=&quot;fa fa-table&quot;&gt;&lt;/i&gt; &lt;span&gt;资产总表&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>      &lt;/ul&gt;</span></span>
<span class="line"><span>      &lt;!-- /.sidebar-menu --&gt;</span></span>
<span class="line"><span>    &lt;/section&gt;</span></span>
<span class="line"><span>    &lt;!-- /.sidebar --&gt;</span></span>
<span class="line"><span>  &lt;/aside&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;!-- Content Wrapper. Contains page content --&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;content-wrapper&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    {% block breadcrumb %}{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- Main content --&gt;</span></span>
<span class="line"><span>    &lt;section class=&quot;content container-fluid&quot;&gt;</span></span>
<span class="line"><span>        {#        主体内容全放到这里！#}</span></span>
<span class="line"><span>        {% block content %}{% endblock %}</span></span>
<span class="line"><span>    &lt;/section&gt;</span></span>
<span class="line"><span>    &lt;!-- /.content --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>  &lt;!-- /.content-wrapper --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;!-- Main Footer --&gt;</span></span>
<span class="line"><span>  &lt;footer class=&quot;main-footer&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- To the right --&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;pull-right hidden-xs&quot;&gt;</span></span>
<span class="line"><span>      http://www.liujiangblog.com</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;!-- Default to the left --&gt;</span></span>
<span class="line"><span>    &lt;strong&gt;Copyright &amp;copy; 2019 &lt;a href=&quot;http://www.liujiangblog.com&quot; target=&quot;_blank&quot;&gt;刘江的Django教程&lt;/a&gt;.&lt;/strong&gt; All rights reserved.</span></span>
<span class="line"><span>  &lt;/footer&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;!-- ./wrapper --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- REQUIRED JS SCRIPTS --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- jQuery 3 --&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;{% static &#39;adminlet-2.4.10/bower_components/jquery/dist/jquery.min.js&#39; %}&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;!-- Bootstrap 3.3.7 --&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;{% static &#39;adminlet-2.4.10/bower_components/bootstrap/dist/js/bootstrap.min.js&#39; %}&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;!-- AdminLTE App --&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;{% static &#39;adminlet-2.4.10/dist/js/adminlte.min.js&#39; %}&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block script %}{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    $(&#39;ul.sidebar-menu li&#39;).each(function(i){</span></span>
<span class="line"><span>        if($(this).children().first().attr(&#39;href&#39;)===&#39;{{ request.path }}&#39;){</span></span>
<span class="line"><span>            $(this).addClass(&#39;active&#39;);</span></span>
<span class="line"><span>        }else{</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div><p>其中，在代码的底部，为了让侧边栏根据当前url的不同，实现不同的激活active状态，编写了一段简单的js代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    $(&#39;ul.sidebar-menu li&#39;).each(function(i){</span></span>
<span class="line"><span>        if($(this).children().first().attr(&#39;href&#39;)===&#39;{{ request.path }}&#39;){</span></span>
<span class="line"><span>            $(this).addClass(&#39;active&#39;);</span></span>
<span class="line"><span>        }else{</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span> });</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre></div><h2 id="二、创建路由、视图" tabindex="-1">二、创建路由、视图 <a class="header-anchor" href="#二、创建路由、视图" aria-label="Permalink to &quot;二、创建路由、视图&quot;">​</a></h2><p>这里设计了三个视图和页面，分别是：</p><ul><li>dashboard：仪表盘，图形化的数据展示</li><li>index：资产总表，表格的形式展示资产信息</li><li>detail：单个资产的详细信息页面</li></ul><p>将<code>assets/urls.py</code>修改成下面的样子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.urls import path</span></span>
<span class="line"><span>from assets import views</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app_name = &#39;assets&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>urlpatterns = [</span></span>
<span class="line"><span>    path(&#39;report/&#39;, views.report, name=&#39;report&#39;),</span></span>
<span class="line"><span>    path(&#39;dashboard/&#39;, views.dashboard, name=&#39;dashboard&#39;),</span></span>
<span class="line"><span>    path(&#39;index/&#39;, views.index, name=&#39;index&#39;),</span></span>
<span class="line"><span>    path(&#39;detail/&lt;int:asset_id&gt;/&#39;, views.detail, name=&quot;detail&quot;),</span></span>
<span class="line"><span>    path(&#39;&#39;, views.dashboard),   </span></span>
<span class="line"><span>]</span></span></code></pre></div><p>在<code>assets/views.py</code>中，增加下面三个视图：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>from django.shortcuts import get_object_or_404</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def index(request):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    assets = models.Asset.objects.all()</span></span>
<span class="line"><span>    return render(request, &#39;assets/index.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def dashboard(request):</span></span>
<span class="line"><span>    pass</span></span>
<span class="line"><span>    return render(request, &#39;assets/dashboard.html&#39;, locals())</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def detail(request, asset_id):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    以显示服务器类型资产详细为例，安全设备、存储设备、网络设备等参照此例。</span></span>
<span class="line"><span>    :param request:</span></span>
<span class="line"><span>    :param asset_id:</span></span>
<span class="line"><span>    :return:</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    asset = get_object_or_404(models.Asset, id=asset_id)</span></span>
<span class="line"><span>    return render(request, &#39;assets/detail.html&#39;, locals())</span></span></code></pre></div><p>注意需要提前<code>from django.shortcuts import get_object_or_404</code>导入<code>get_object_or_404()</code>方法，这是一个常用的内置方法。</p><h2 id="三、创建模版" tabindex="-1">三、创建模版 <a class="header-anchor" href="#三、创建模版" aria-label="Permalink to &quot;三、创建模版&quot;">​</a></h2><h3 id="_1-dashboard-html" tabindex="-1">1.dashboard.html <a class="header-anchor" href="#_1-dashboard-html" aria-label="Permalink to &quot;1.dashboard.html&quot;">​</a></h3><p>在assets目录下创建<code>templates/assets/dashboard.html</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% extends &#39;base.html&#39; %}</span></span>
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
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block script %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% endblock %}</span></span></code></pre></div><h3 id="_2-index-html" tabindex="-1">2.index.html <a class="header-anchor" href="#_2-index-html" aria-label="Permalink to &quot;2.index.html&quot;">​</a></h3><p>在assets目录下创建<code>templates/assets/index.html</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% extends &#39;base.html&#39; %}</span></span>
<span class="line"><span>{% load static %}</span></span>
<span class="line"><span>{% block title %}资产总表{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block css %}{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block breadcrumb %}</span></span>
<span class="line"><span>&lt;!-- Content Header (Page header) --&gt;</span></span>
<span class="line"><span>    &lt;section class=&quot;content-header&quot;&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;</span></span>
<span class="line"><span>        资产总表</span></span>
<span class="line"><span>        &lt;small&gt;assets list&lt;/small&gt;</span></span>
<span class="line"><span>      &lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;ol class=&quot;breadcrumb&quot;&gt;</span></span>
<span class="line"><span>        &lt;li&gt;&lt;a href=&quot;#&quot;&gt;&lt;i class=&quot;fa fa-dashboard&quot;&gt;&lt;/i&gt; 主页&lt;/a&gt;&lt;/li&gt;</span></span>
<span class="line"><span>        &lt;li class=&quot;active&quot;&gt;资产总表&lt;/li&gt;</span></span>
<span class="line"><span>      &lt;/ol&gt;</span></span>
<span class="line"><span>    &lt;/section&gt;</span></span>
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block content %}</span></span>
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block script %}</span></span>
<span class="line"><span>{% endblock %}</span></span></code></pre></div><h3 id="_3-detail-html" tabindex="-1">3.detail.html <a class="header-anchor" href="#_3-detail-html" aria-label="Permalink to &quot;3.detail.html&quot;">​</a></h3><p>在assets目录下创建<code>templates/assets/detail.html</code>文件，写入下面的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{% extends &#39;base.html&#39; %}</span></span>
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
<span class="line"><span>{% endblock %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% block script %}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{% endblock %}</span></span></code></pre></div><p>以上三个模板都很简单，就是下面的流程：</p><ul><li>extends继承‘base.html’；</li><li><code>{% load static %}</code>载入静态文件；</li><li><code>{% block title %}资产详细{% endblock %}</code>，定制title;</li><li><code>{% block css %}</code>，载入当前页面的专用CSS文件；</li><li><code>{% block breadcrumb%}</code>定制顶部面包屑导航;</li><li><code>{% block script %}</code>，载入当前页面的专用js文件；</li><li>最后在<code>{% block content %}</code>中， 填充页面的主体内容</li></ul><h2 id="四、访问页面" tabindex="-1">四、访问页面 <a class="header-anchor" href="#四、访问页面" aria-label="Permalink to &quot;四、访问页面&quot;">​</a></h2><p>重启CMDB服务器，访问<code>http://192.168.0.100:8000/assets/dashboard/</code>，可以看到下面的页面。</p><p><img src="`+e+'" alt="image"></p><p>访问<code>http://192.168.0.100:8000/assets/index/</code>，可以看到下面的页面：</p><p><img src="'+i+'" alt="image"></p><p>访问<code>http://192.168.0.100:8000/assets/detail/1/</code>，可以看到下面的页面(需要已经有了资产对象)：</p><p><img src="'+o+'" alt="image"></p><p>如果你的配色和我的不一样，没关系，都可以调整的，在base.html中有说明注释。</p>',50),g=[u];function d(r,q,h,m,b,f){return a(),n("div",null,g)}const _=s(c,[["render",d]]);export{k as __pageData,_ as default};
