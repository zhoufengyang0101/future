import { defineConfig } from 'vitepress'

import { head, nav, sidebar } from './configs'

export default defineConfig({
    /* 输出文件目录 默认 ./.vitepress/dist*/
    // outDir: '../dist',

    lang: 'zh-CN',
    title: 'Future',
    description: '描述',
    head,
    base: '/future-press/',

    lastUpdated: true,
    /* 生成干净的URL 删除URL中的.html */

    cleanUrls: true,
    /* 映射路由 */
    // rewrites: {
    //     'source/:page': 'destination/:page'
    // },

    /* 源目录 存放md文件的目录 */
    // srcDir: './src',

    /* 排除哪些文件 */
    srcExclude: ['**/README.md', '**/TODO.md'],

    /* 缓存目录 默认 ./.vitepress/cache */
    // cacheDir: './.vitepress/cache',

    /* 忽略死链接 默认false 设置true不会因为死链接构建失败 */
    ignoreDeadLinks: true,

    /* 是否展示更新时间 依据commit */
    // lastUpdated: true,

    /* 主题 默认true支持切换深色模式 设置为dark打开默认深色 */
    appearance: true,

    /* markdown 配置 */
    markdown: {
        theme: 'material-theme-palenight',
        lineNumbers: true,
        // anchors: {
        //     slugify(str) {
        //         return encodeURIComponent(str)
        //     }
        // }
    },


    /* 主题配置 */
    themeConfig: {
        i18nRouting: false,

        logo: '/logo.png',
        siteTitle: 'Future',

        nav,
        sidebar,
        /* 右侧大纲配置 */
        outline: {
            level: 'deep',
            label: '本页目录'
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/zhoufengyang0101' }
        ],

        footer: {
            message: '如有转载或 CV 的请标注本站原文地址',
            copyright: 'Copyright © 2019-present future'
        },

        darkModeSwitchLabel: '外观',
        returnToTopLabel: '返回顶部',
        lastUpdatedText: '上次更新',

        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        }
    },

    /* vite 配置 */
    vite: {
        // Vite config options
    },

    /* vue 配置 */
    vue: {
        // @vitejs/plugin-vue options
    },

    /* build hooks */
    /* 在构建（SSG）完成后但在 VitePress CLI 进程退出之前 */
    // async buildEnd(siteConfig) {
    //     // ...
    // },
    /* SSG 渲染完成时调用。它将允许您在 SSG 期间处理传送内容。 */
    // async postRender(context) {
    //     // ...
    // },
    /* 生成页面之前修改头部 */
    // async transformHead(context) {
    //     // ...
    // },
    /* 保存在磁盘之前（before saving to disk）修改页面内容  */
    // async transformHtml(code, id, context) { 
    //     // ...
    // },
    /* 转换pageData每个页面 */
    // async transformPageData(pageData) {
    //     // pageData.contributors = await getPageContributors(pageData.relativePath)
    //     // or
    //     // return {
    //     //     contributors: await getPageContributors(pageData.relativePath)
    //     // }
    // }
})