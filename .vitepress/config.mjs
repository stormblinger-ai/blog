import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wildfire - 腿哥AI站",
  description: "站点描述",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // aside: "left", // 设置右侧侧边栏在左侧显示
    // logo
    logo: '/logo.svg',
    // 搜索
    search: {
      provider: 'local'
    },
    // 上层右侧
    nav: [
      { text: 'python', 
        items: [
          {text: 'python基础',link: '/Python/index'},
          {text: 'python爬虫',link: '/Python-spider/index'},
          {text: 'python数据库操作',link: '/Python-db/index'},
          {text: 'python数据分析可视化',link: '/Python-datav/index'},


        ]
    },
      { text: '鸿蒙', 
      items: [
        {text: '测试',link: '/Python/index'},
        
      ]
    },
      { text: '全栈项目', items: [
        {text: '登录注册系统',link: '/Python-demo/基于Django2.2的注册登录管理系统'},
        {text: '资产管理系统',link: '/Python-demo/资产管理系统'},
        {text: '懂车帝可视化',link: '/Python-demo/懂车帝可视化'},

        

        
      ] },
      { text: '报错汇总', items: [
        {text: '常见问题',link: '/docs/bug'},
        
      ] },
      
    ],
    // 文章页侧边栏
    sidebar: {
      // 当用户位于 `Python` 目录时，会显示此侧边栏
      '/Python/': [
        {
          text: 'Python入门',
          collapsed: false,
          items: [
            { text: 'Python是什么', link: '/Python/1' },
            { text: '在 Windows 和 Linux 上安装 Python', link: '/Python/2' },
            { text: 'Python 语法', link: '/Python/3' },
            { text: 'Python 关键字', link: '/Python/4' },
            { text: 'Python 数据类型', link: '/Python/5' },
            { text: 'Python 数字类型：整数、浮点数、复数', link: '/Python/6' },
            { text: 'Python 字符串', link: '/Python/7' },
            { text: 'Python 列表', link: '/Python/8' },
            { text: 'Python 元组', link: '/Python/9' },
            { text: 'Python 集合', link: '/Python/10' },
            { text: 'Python 字典', link: '/Python/11' },
            { text: 'Python if、elif、else条件', link: '/Python/12' },
            { text: 'Python while循环', link: '/Python/13' },
            { text: 'Python for循环', link: '/Python/14' },

          ]
        },
        {
          text: 'Python函数与面向对象',
          collapsed: false,
          items: [
            { text: 'Python 函数', link: '/Python/15' },
            { text: 'Python 中的 Lambda 函数和匿名函数', link: '/Python/16' },
            { text: 'Python 中的变量作用域', link: '/Python/17' },
            { text: 'Python 中的__main__和__name__', link: '/Python/18' },
            { text: 'Python 生成器函数', link: '/Python/19' },
            { text: 'Python 列表推导', link: '/Python/20' },
            { text: 'Python 中的递归', link: '/Python/21' },
            { text: 'Python 错误类型', link: '/Python/22' },
            { text: 'Python 中的异常处理', link: '/Python/23' },
            { text: 'Python assert语句', link: '/Python/24' },
            { text: 'Python 类', link: '/Python/25' },
            { text: 'Python 中的继承', link: '/Python/26' },
            { text: 'Python 公共、受保护、私有成员', link: '/Python/27' },
            { text: 'Python 中的装饰器', link: '/Python/28' },
            { text: 'Python 属性装饰器——@property', link: '/Python/29' },
            { text: 'Python 类方法装饰器@classmethod', link: '/Python/30' },
            { text: 'Python 中使用@staticmethod装饰器定义静态方法', link: '/Python/31' },
            { text: 'Python 魔术方法', link: '/Python/32' },



          ]
        },
       
      ], // Python目录
      '/Python-db/': [
        {
          text: 'Python数据库操作',
          collapsed: false,
          items: [
            { text: 'SQLAlchemy', link: '/Python-db/Python SQLAlchemy' },
            { text: 'MySQL', link: '/Python-db/Python 操作 MySQL' },
            { text: 'Redis', link: '/Python-db/Redis 数据库介绍' },
            {text: 'SQLite', link: '/Python-db/SQLite'},
            {text: 'Mongodb', link: '/Python-db/MongoDB'},
          ]
        },
      ],
      '/Python-demo/': [
        {
          text: "登录注册系统", 
          collapsed: false,
          items: [
          {text: '说明', link: '/Python-demo/基于Django2.2的注册登录管理系统'},
          {text: '1. 搭建项目环境', link: '/Python-demo/login1'},
          {text: '2. 设计数据模型', link: '/Python-demo/login2'},
          {text: '3. admin后台', link: '/Python-demo/login3'},
          {text: '4. url路由和视图', link: '/Python-demo/login4'},
          {text: '5. 前端页面设计', link: '/Python-demo/login5'},
          {text: '6. 登录视图', link: '/Python-demo/login6'},
          {text: '7. Django表单', link: '/Python-demo/login7'},
          {text: '8. 图片验证码', link: '/Python-demo/login8'},
          {text: '9. session会话', link: '/Python-demo/login9'},
          {text: '10. 注册视图', link: '/Python-demo/login10'},
          {text: '11.Django发送邮件', link: '/Python-demo/login11'},
          {text: '12. 邮件注册确认', link: '/Python-demo/login12'},
          
          ]
        },
        {
          text: "资产管理系统",
          collapsed: false,
          items: [
            {text: '1.项目需求分析', link: '/Python-demo/CMDB1'},
            {text: '2.模型设计', link: '/Python-demo/CMDB2'},
            {text: '3.数据收集客户端', link: '/Python-demo/CMDB3'},
            {text: '4.收集Windows数据', link: '/Python-demo/CMDB4'},
            {text: '5.Linux下收集数据', link: '/Python-demo/CMDB5'},
            {text: '6.新资产待审批区', link: '/Python-demo/CMDB6'},
            {text: '7.审批新资产', link: '/Python-demo/CMDB7'},
            {text: '8.已上线资产更新', link: '/Python-demo/CMDB8'},
            {text: '9.前端框架AdminLTE', link: '/Python-demo/CMDB9'},
            {text: '10.资产总表', link: '/Python-demo/CMDB10'},
            {text: '11.资产详细页面', link: '/Python-demo/CMDB11'},
            {text: '12.dashboard仪表盘', link: '/Python-demo/CMDB12'},

          ]
        },
        {
          text: '懂车帝可视化',
          collapsed: false,
          items: []
        },
        
      ],
    }, // sidebar内容至此结束

    socialLinks: [
      { icon: 'github', link: 'https://github.com/stormblinger-ai' }
    ],
    footer: {
      copyright: "Copyright@ 2024 Brother Tui",
    }
    
  },
  
})
