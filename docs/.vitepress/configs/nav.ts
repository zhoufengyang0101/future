/**
 * 顶部导航栏
 */
import type { DefaultTheme } from 'vitepress'

const origin = ''

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '首页',
    link: ''
  },
  {
    text: 'About me',
    link: ''
  },
  {
    text: '下拉',
    items: [
      { text: 'Item A', link: '/item-1' },
      { text: 'Item B', link: '/item-2' },
      { text: 'Item C', link: '/item-3' }
    ]
  }
]