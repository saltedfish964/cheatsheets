const path = require('path');

const clickCopy = require('./plugin/click-copy/index');
const demoContainer = require('./plugin/demo-container/index');

module.exports = {
  base: '/cheatsheets/',
  title: 'SaltedFish\'s Cheatsheets',
  description: 'SaltedFish\'s Cheatsheets',

  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  themeConfig: {
    smoothScroll: true,
    nav: [
      { text: '备忘', link: '/cheatsheets/', ariaLabel: '备忘' },
      { text: '组件', link: '/component/', ariaLabel: '组件' },
    ],
    sidebar: {
      '/cheatsheets/': [
        {
          title: 'Npm',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cheatsheets/', '淘宝镜像'],
          ]
        },
        {
          title: 'Git',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cheatsheets/git/often', '常用命令'],
          ]
        },
        {
          title: 'Go',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cheatsheets/go/base', '基础'],
          ]
        },
        {
          title: 'CSS',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cheatsheets/css/table-border', 'table 边框'],
          ]
        },
        {
          title: 'Wechat Mini-Program',
          collapsable: true,
          sidebarDepth: 1,
          children: [
            ['/cheatsheets/wechat-mini-program/playbill', '生成海报'],
          ]
        },
      ],
      '/component/': [
        {
          title: '开发指南',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'quickstart',
          ]
        },
        {
          title: '组件',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'icon',
            'tabs',
            'calendar',
            'scroll',
            'time',
            'animated-number',
            'color',
          ]
        },
      ]
    },
  },
  plugins: [
    [clickCopy, {
      copyMessage: '复制成功',
      showInMobile: false,
    }],
    demoContainer,
    '@vuepress/medium-zoom',
    [
      '@vuepress/plugin-register-components',
      {
        components: [
          {
            name: 'v-calendar',
            path: path.join(__dirname, '../../components/v-calendar/calendar.vue'),
          }
        ]
      },
    ],
  ],
}