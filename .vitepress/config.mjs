import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wildfire - 腿哥AI站",
  description: "站点描述",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // aside: "left", // 设置右侧侧边栏在左侧显示
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
      { text: '鸿蒙', link: '/' },
      { text: 'AI实战', link: '/' },
      
    ],
    // 文章页侧边栏
    sidebar: {
      // 当用户位于 `Python` 目录时，会显示此侧边栏
      '/Python/': [
        {
          text: 'Python入门',
          collapsed: false,
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      copyright: "Copyright@ 2024 Brother Tui",
    }
    
  },
  
})
