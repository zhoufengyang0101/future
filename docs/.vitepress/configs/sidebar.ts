/**
 * 左侧侧边栏
 */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
    {
        text: '学习笔记',
        items: [
          { text: '环境配置命令记录', link: '/环境配置命令记录' },
          { text: '前端基础知识复习总结', link: '/前端基础知识复习总结' },
          { text: 'bug记录', link: '/bug记录' },
          { text: 'JS知识点', link: '/JS知识点' },
          { text: 'nodeJs相关知识点', link: '/node.js相关知识点' },
          { text: 'React', link: '/React' },
          { text: 'TypeScript', link: '/TypeScript' },
          { text: 'Vue', link: '/Vue' },
        ]
      }
]