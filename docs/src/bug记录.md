- js渲染商品列表for遍历bug：forEach解决

















# Git

- git修改远程仓库内容，导致与本地文件发生冲突，提示报错：error: failed to push some refs to 'git@github.com:zhoufengyang0101/node.git'

  解决：先将文件提交到缓存区然后

  `git pull future master`将远程指定分支拉下来进行合并，然后在push
  
- gitee 在 push 代码项目时，需要用户名和密码验证，错误一次后不在提示。使用管理员命令打开git-bash.exe输入:`git config --system --unset credential.helper`，再次进行push就会弹出输入用户名和密码，用户名是git登录的邮箱和密码。`git config --global credential.helper store`配置下次弹出存储为永久。







vue项目node环境版本改变：

报错信息：

> Module build failed (from ./node_modules/sass-loader/dist/cjs.js):
> Error: Missing binding E:\HTML\vue-cli\one\node_modules\node-sass\vendor\win32-x64-83\binding.node
> Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 14.x  

解决：`npm rebuild node-sass`









- 父盒子设置最小高度后，子元素设置百分百高度无效：

  原因：父元素设置最小高度并非是固定高度值，子元素相对父元素没有固定的参考高度。

  解决：给父元素相对定位，子元素绝对定位，top,bottom,left,right 为 0







#  VUE

props接收的数据在mounted和created中使用是undefined，

因为props是异步的，可以在watch中使用，那个数据变化时。





























前后端跨域使用cookie-session

后端不能使用允许请求源为*  可以使用白名单数组

![image-20210616102445465](C:\Users\11091\AppData\Roaming\Typora\typora-user-images\image-20210616102445465.png)

![image-20210616102507488](C:\Users\11091\AppData\Roaming\Typora\typora-user-images\image-20210616102507488.png)







# element-UI

[Vue warn]: Error in nextTick: "TypeError: Cannot read property 'map' of null found in

![image-20210621230843998](C:\Users\11091\AppData\Roaming\Typora\typora-user-images\image-20210621230843998.png)

https://guobao.blog.csdn.net/article/details/107756965?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-5.control





# Nginx：

- 进程无法结束：

查看进程：tasklist /fi  "imagename eq nginx.exe"

杀死进程：taskkill /f /pid 11808 /pid 10720

使用start nginx启动  nginx -s stop关闭



- nginx上线vue项目（history）刷新页面404：

解决： 添加try_files配置

```nginx
server {
    server_name 'localhost';
    root 'E:/GP23/vue/missevan/dist';
    listen 8088;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /mobileWeb {
        proxy_pass https://www.missevan.com;
    }

}
```









# React 

使用antd 轮播图报错：

```nginx
react-dom.development.js:6202 Unable to preventDefault inside passive event listener invocation.
# preventDefault @ react-dom.development.js:6202
onTouchMove @ carousel.js:400
callCallback @ react-dom.development.js:3945
invokeGuardedCallbackDev @ react-dom.development.js:3994
invokeGuardedCallback @ react-dom.development.js:4056
invokeGuardedCallbackAndCatchFirstError @ react-dom.development.js:4070
executeDispatch @ react-dom.development.js:8243
processDispatchQueueItemsInOrder @ react-dom.development.js:8275
processDispatchQueue @ react-dom.development.js:8288
dispatchEventsForPlugins @ react-dom.development.js:8299
(anonymous) @ react-dom.development.js:8508
batchedEventUpdates$1 @ react-dom.development.js:22396
batchedEventUpdates @ react-dom.development.js:3745
dispatchEventForPluginEventSystem @ react-dom.development.js:8507
attemptToDispatchEvent @ react-dom.development.js:6005
dispatchEvent @ react-dom.development.js:5924
unstable_runWithPriority @ scheduler.development.js:468
dispatchUserBlockingUpdate @ react-dom.development.js:5894
```

在源码中找到并注释：

```js
// event.preventDefault(); // $FlowFixMe - flow is not aware of `unknown` in IE
```

