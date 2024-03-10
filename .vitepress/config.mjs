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
          {text: 'python实战',link: '/Python-demo/index'},


        ]
    },
      { text: '鸿蒙', 
      items: [
        {text: '测试',link: '/Python/index'},
        
      ]
    },
      { text: '全栈项目', items: [
        {text: '测试',link: '/Python/index'},
        
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
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
          ]
        },
        {
          text: 'Python学习方法',
          collapsed: false,
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
          ]
        },
      ], // Python目录
     
      
    }, // sidebar内容至此结束

    socialLinks: [
      { icon: 'github', link: 'https://github.com/stormblinger-ai' }
    ],
    footer: {
      copyright: "Copyright@ 2024 Brother Tui",
    }
    
  },
  
})
