import{_ as p,c as t,m as s,a,t as l,a5 as e,o as i}from"./chunks/framework.BthLuVtL.js";const o="/assets/110-1.CPhUWzIk.png",c="/assets/110-2.B16C0taE.png",P=JSON.parse('{"title":"8. 图片验证码","description":"","frontmatter":{},"headers":[],"relativePath":"python-demo/login8.md","filePath":"python-demo/login8.md"}'),r={name:"python-demo/login8.md"},d=e("",26),g=s("code",null,"{% if %}",-1),h=s("h2",{id:"六、查看效果",tabindex:"-1"},[a("六、查看效果 "),s("a",{class:"header-anchor",href:"#六、查看效果","aria-label":'Permalink to "六、查看效果"'},"​")],-1),u=s("p",null,"重启服务器，进入登录页面，尝试用用户名错误、密码不对、验证码不对、全对的不同情况，看看我们新增的四位验证码的效果如何。",-1),m=s("p",null,[s("img",{src:o,alt:"image"})],-1),f=s("p",null,[s("img",{src:c,alt:"image"})],-1),b=s("p",null,[a("就是这么简单！我们加入了一个防止机器人或者恶意登录的图形验证码功能，虽然界面难看了点，但底子是好的，你可以根据需要进行美化。其中验证图形码是否正确的工作都是在后台自动完成的，只需要使用"),s("code",null,"is_valid()"),a("这个forms内置的验证方法就一起进行了，完全不需要在视图函数中添加任何的验证代码，非常方便快捷！")],-1),q=s("p",null,"关于captcha的功能，当然绝不仅限于此，你可以设置六位、八位验证码，可以对图形噪点的生成模式进行定制，这些就留待你自己学习和研究了。",-1);function _(n,v,y,k,j,w){return i(),t("div",null,[d,s("p",null,[a("这里在顶部的消息处，在"),g,a("模板代码中，额外增加了一条"),s("code",null,l(n.login_form.captcha.errors),1),a("的判断，用于明确指示用户的验证码不正确。")]),h,u,m,f,b,q])}const x=p(r,[["render",_]]);export{P as __pageData,x as default};
