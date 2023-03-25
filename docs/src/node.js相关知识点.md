



# 1. 常用内置模块



####  1.1 os  操作系统

os模块提供了与操作系统相关的实用方法和属性。

1. `os.EOL`:  操作系统特定的行末标志（换行符）。POSIX上是`\n`，Windows上是`\r\n`
2. `os.constants`:  包含错误码、进程信号等常用的操作系统特定的常量。
3. `os.cpus()`:  返回一个对象数组，包含有关每个逻辑CPU内核的信息。
4. `os.freemem()`:  以整数的形式返回空闲的系统内存量（以字节为单位）。
5. `os.getPriority([pid])`:  返回由pid指定的进程的调度优先级(v10.10.0)。若没提供或为0，则返回当前进程的优先级。
6. `os.homedir()`:  返回当前用户的主目录的字符串路径。
7. `os.hostname()`:  以字符串的形式返回操作系统的主机名。
8. `os.loadavg()`:  返回一个数组，包含1/5/15分钟的平均负载。
9. `os.networkInterfaces()`:  返回一个对象，该对象包含已分配了网络地址的网络接口。
10. `os.setPriority([pid, ]priority)`: 设置指定进程的优先级(v10.10.0)。
11. `os.tmpdir()`:  以字符串的形式返回操作系统的默认临时文件目录。
12. `os.totalmem()`:  以整数的形式返回系统内存总量（字节）。
13. `os.type()`:  返回操作系统名字。
14. `os.uptime()`:  返回系统正常运行的时间。
15. `os.userinfo([options])`:  返回关于当前用户的有效信息（v6.0.0）。`options`: encoding(Buffer实例) | utf-8(默认)。
16. `os.version()`:  返回操作系统内核版本标识的字符串（v13.11.0）。

#### 1.2 path  路径

path模块提供了一些实用工具，用于处理文件和目录的路径。path模块的默认操作会因Node.js应用程序运行所在的操作系统而异。

1. `path.basename(path[, ext])`:  返回path的最后一部分。eg: `path.basename("http://nodejs.cn/api/path.html")`返回："path.html";

2. `path.delimiter`:  提供平台特定的路径定界符。eg：

   ```javascript
   // windows下：
   console.log(process.env.PATH);
   // C:\ProgramData\Oracle\Java\javapath;D:\java\bin;D:\python\;
   console.log(process.env.PATH.split(path.delimiter));
   /* [
   'C:\\ProgramData\\Oracle\\Java\\javapath',
   'D:\\java\\bin',
   'D:\\python\\',
   ] */
   
   // 在POSIX上是以 ：
   ```

3. `path.dirname(path)`:  返回path的目录名。尾部的目录分割符会被忽略（如果path不是字符串抛出异常）。eg:  `path.dirname('/future/node/path.html')`  返回：`'/future/node'`

4. `path.extname(path)`:  返回path的扩展名。即'.html'。

5. `path.format(pathObject)`:  从对象返回路径字符串。与`path.parse()`相反。pathObject： {dir | root | base | name | ext}; dir 存在时忽略root，base存在时忽略ext、name。

6. `path.isAbsolute(path)`:  返回path是否为绝对路径的布尔值。

7. `path.join([...paths])`:  拼接所有给定的path片段（每一个片段必须是字符串，否则报错）。

8. `path.normalize(path)`:  规范化给定的path，解析'..'和'.'片段。

9. `path.parse(path)`:  返回一个对象，对象类型如`path.format()`

10. `path.relative(from, to)`:  返回from到to的相对路径。

11. `path.sep`:   提供平台特定的路径片段分隔符。

    

#### 1.3 url  地址

url模块用于处理与解析URL。

url提供了两套API来处理URL：一个是旧版本传统的API，一个是实现了WHATWG标准的新API。

```javascript
// 新版本使用URL类
const myURL = new URL('http://www.baidu.com');

// 旧版本使用url模块
const url = require('url');
const myURL = url.parse('http://www.baidu.com');
```
WHATWG的URL接口：

URL类：

`const url = new URL(input[, base])`

- input 要解析的绝对或相对的URL。相对路径需要base
- base <string> | <URL>

**URL === require('url').URL**

1. `url.hash`:  获取及设置hash部分
2. `url.host`:  获取及设置主机部分
3. `url.hostname`: 获取及设置URL的主机名部分
4. `url.href`:  获取及设置序列化的URL（全部）
5. `url.origin`:  获取只读的序列化的URL的origin（端口号及之前）
6. `url.password`:  获取及设置URL的密码部分
7. `url.pathname`:  获取及设置URL的路径部分（username类似）
8. `url.port`:  获取及设置URL的端口部分（0-65535）
9. `url.protocol`:  获取及设置URL的协议部分
10. `url.search`:  获取及设置URL的序列化查询部分（？和#之间）
11. `url.searchParams`:  获取表示URL查询参数的URLSearchParams对象。
12. `url.toString()`:  在URL对象上调用tostring()方法将返回序列化的URL。返回值与`url.href`和`url.toJSON()`相同

**`URLSearchParams`类：**

提供对URL查询部分的读写权限。

`new URLSearchParams()`  实例化一个新的空的`URLSearchParams`对象。

可以传入string类型参数实例化为一个`URLSearchParams`对象。

传入object类型参数按照键值对的方式生成`URLSearchParams`对象。

也可以是iterable(可迭代对象)

1. `urlSearchParams.append(name, value)`:  在查询字符串中附加一个新的键值对。
2. `urlSearchparams.delete(name)`:  删除所有键为name的键值对。
3. `urlSearchParams.entries()`:  在查询中的每个键值对上返回一个ES6 Iterator。迭代器的每一项都是一个Array，第一项为键，第二项为值。
4. `urlSearchParams.get(name)`:  返回键是name的第一个值，没有返回null。
5. `urlSearchParams.getAll(name)`: 返回所有键为name的值，没有返回一个空数组。
6.  `urlSearchParams.has(name)`:  返回是否有name对应的键值对的布尔值。
7. `urlSearchParams(name, value)`:  设置键值对，如果name存在，将第一对的值设为value并删除其他。
8. `urlSearchParams.sort()`:  按现有名称就地排序所有的名称-值对。使用*稳定排序算法完成排序*。
9. `urlSearchParams.toString()`:  返回查询参数序列化后的字符串，必要时存在百分号编码字符。



#### 1.4  querystring  查询字符串

querystring模块提供用于解析和格式化URL查询字符串的实用工具。

1. `querystring.parse(str[, sep[,eq,[,options]]])`:  将URL查询字符串str解析为键值对的集合。也可以使用`.decode()` 
   - str  要解析的URl查询字符串
   - sep  用于在查询字符串中分割键值对的子字符串，默认为“&”
   - eq  用于在查询字符串中分割键和值的子字符串，默认“=”
   - options  参考官网
2. `querystring.stringify(obj[,sep[,eq[,options]]])`  :  遍历对线自身属性从给定的obj生成URL查询字符串。也可以使用`.encode()`。
3. `querystring.escape(str)` :  对URL查询字符串的特定要求进行了优化的方式对给定的str执行URL百分比编码。
4. `querystring.unescape(str)`： 解码

#### 1.5 fs 文件系统

 fs模块使能够以一种模仿标准POSIX函数的方式与文件系统进行交互

所有的文件操作都具有同步的、回调的、以及基于promise的形式。

```js
// 同步使用
try {
    fs.unlinkSync('/tep/hello');
    console.log('/temp/hello 已被成功删除');
} catch (err) {
    // 错误处理
}
// 回调使用
fs.unlink('/tmp/hello', (err) => {
    if(err) throw err;
    console.log('/tmp/hello 已被成功删除')
})

// promise使用
(async function(path) {
    try {
        await fs.unlink(path);
        console.log('成功删除');
    } catch (err) {
        console.log('错误', err.message);
    }
})('/tmp/hello')
```

### 1.5.1 文件读取

- fs.readFile(path[,options], callback) **异步读取**
- fs.readFileSync(path[, options]) **同步读取**

#### 1.6 http 

创建服务

```js
const http = require("http");

const serve = http.createServer();

serve.on("request", (req, res) => {
    console.log("接收请求")
})

serve.listen(3000, '0.0.0.0', () => {
    console.log("http://127.0.0.1:3000");
})
```



#### 1.7  events事件触发器

大多数 Node.js 核心 API 构建于惯用的异步事件驱动架构，其中某些类型的对象（又称触发器，Emitter）会触发命名事件来调用函数（又称监听器，Listener）。

```js
const EventEmitter = require("events");

cosnt event = new EventEmitter();

// 订阅
event.on("future", data => {
    console.log(data);
})

// 发布
event.emit("future", "message");
```



#### 1.8 readline 逐行读取

readline模块提供了一个接口，用于一次一行地读取可读流中的数据。

```js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('吃了吗', answer => {
    console.log(answer);
    rl.close();
})
```

`Interface`类：

继承自 <EventEmitter>

`readline.Interface`类的实例就是使用`readline.createInterface()`方法构造的。每个实例都关联一个input可读流和一个output可写流。output流用于为到达的用户输入打印提示，并从input流读取。



`close`事件：

一旦触发`close`事件，`readline.Interface`实例就完成了。调用监听器时不传入任何参数。

触发`close`事件的情况：

- 调用`rl.close()`方法，且`readline.Interface`实例放弃对input流和output流的控制。
- input流收到其end事件
- input流接收到`ctrl+D`以发信号`SIGINT`，并且`readline.Interface`实例上没有注册`SIGINT`事件监听器。

`line`事件：

每当`input`流接收到行尾输入（`\n`,`\r`或`\r\n`）时就会触发`line`事件。这种情况通常发生在当用户按下`Enter`或`Return`。

```js
// 调用监听器函数时会带上包含接收到的那一行输入的字符串
rl.on('line', input => {
	console.log(input);
})
```



`pause`事件：

调用监听器函数时不传入任何参数。

- `input`流被暂停
- `input`流未暂停，且接收到`SIGINT`事件。



`resume`事件：

`input`流回复时触发。调用监听器函数时不传入任何参数





# 2. cluster(集群)

单个Node.js实例运行在单个线程线程中。为了充分利用多核系统，有时需要启用一组Node.js进程去处理负载任务。

`cluster`模块可以创建共享服务器端口的子进程。

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);
    // 衍生工作进程
    for(let i = 0; i < numCPUs; i++) {
        cluter.fork();
    }
    cluster.on('exit', (work, code, signal) => {
        console.log(`工作进程${worker.process.pid}已退出`);
    })
} else {
    // 工作进程可以共享任何TCP连接
    // 在本例子中，共享的是http服务器
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end("你好世界\n");
    }).listen(3000);
    console.log(`工作进程${process.pid}已启动`);
}
```



# 3. express框架

## 3.1 中间件

中间件可以理解为业务流程的中间处理环节。

在express中当一个请求到达服务器之后，可以在给客户响应之前连续调用多个中间件，对本次请求和返回相应数据进行处理。（middleware）

- 内置中间件

- 第三方中间件

  - body-parser 帮助解析获取post数据

    ```js
    app.use(body.urlencoded({extended: false}))
    app.use(body.json())
    ```

    

- 自定义中间件

自定义中间件，其本质就是定义一个处理请求的函数，只是此函数除了request和response参数外还必须包含一个next参数，此参数作用让中间件能够让流程向下执行，直到匹配到的路由中发送响应给客户端。中间件最后必须要执行next()否则不会继续执行下去。



**在express中操作cookie的模块cookie-parser模块。**





# 4. 模板引擎

## 4.1 **ssr（服务器端渲染）**

ssr(Server Side Rendering): 传统的渲染方式，由服务端把完整的页面响应给客户。这样减少了一次客户端到服务端的一次http请求，加快响应速度，一般用于首屏渲染的性能优化。

优点： 

- 有利于SEO（搜索引擎）
- 页面渲染时间短

缺点：

- 服务器压力过大
- 不利于前后端分离，开发效率低

## 4.2**csr(客户端渲染)**

CSR（Client Side Rendering）: 是一种目前流行的渲染方式，页面由js渲染，js运行与浏览器端，所以称客户端渲染。

优点：

- 前后端并行开发，提升开发效率

缺点：

- 首屏渲染事件比较长（首屏加载速度慢）
- 不利于SEO

## 4.3 art-template

网址：http://aui.github.io/art-template/zh-cn/
	http://aui.github.io/art-template/express/

一个简约超快的模板引擎

标准语法更容易读写，原始语法具有较强的逻辑处理能力

特性：
- 接近javascript渲染极限的性能
- 调试友好，语法运行时错误日志精确到模板所在行，支持在模板文件上打断点
- 支持express、koa、webpack
- 支持模板继承和子模板
- 浏览器版本仅6kb大小

安装：
`npm i -S art-template express-art-template`

```js
// 指定art-template模板，并指定模块后缀为.html
app.engine('html', require('express-art-template'));
// 指定模板视图路径
app.set('views', path.join(__dirname, 'views'));

// 使用
app.get(uri,(req,res)=>{
	res.render(模板,{
		username: '张三'
	})
})

// art-template 支持标准语法和原始语法
// 原始语法和Ejs一样
// 输出
//标准语法
{{ username }} /* 有转义输出   未转义输出 */ {{@ username }}
// 原始语法
<%= username %> /* 有转义输出  未转义输出 */ <%- username %>

// 条件判断
{{if 条件}} … {{else if 条件}} … {{/if}}
<%if (条件){%> … <%}else if (条件){%> … <%}%>

// 循环
// 支持 数组和对象的迭代  默认元素变量为$value 下标为$index  可以自定义 {{each target val key}}
{{each target}}
    {{$index}} {{$value}}
{{/each}}
<% for(var i = 0; i < target.length; i++){ %>
    <%= i %> <%= target[i] %>
<% } %>
    
// 子模板 --- 模板包含
{{include './header.art'}}
<% include('./header.art') %>
// 注：在子模板中不要有html、head和body标签

// 模板继承   模板布局  布局文件
// 父模板  layout.html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{block 'title'}}My Site{{/block}}</title>
</head>
<body>
	<!-- block占位符 content此占位的名称 -->
    {{block 'content'}}{{/block}}
</body>
</html>

// 继承父模板 index.html
<!--extend 继承 -->
{{extend './layout.html'}}
{{block 'title'}}首页{{/block}}
{{block 'content'}}
	<p>This is just an awesome page.</p>
{{/block}}
// 注：渲染 index.html后，将自动应用布局骨架

```



# 5、Express

## 5.1、介绍

网址：https://www.expressjs.com.cn/

Express 是基于 Node.js 平台，快速、开放、极简的 **Web 开发框架**。搭建web服务器

Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。

使用Express开发框架可以非常方便、快速的创建Web网站的服务器或API接口的服务器

## 5.2、基本使用

### 5.2.1、安装

在项目目录中，打开cmd命令窗口，执行如下命令

`npm init -y`

`npm i -S express`

`npm i -D nodemon`  # 执行node程序，并实时监听文件变化,文件有变化时，无需重启，它会自动重启

### 5.2.2、创建web服务

```js
const express = require('express')
// 创建web服务
const app = express()
// 监听 get请求
// req 请求对象
// res 响应对象
app.get('请求URI',(req,res)=>{
  // 向客户端响应数据
  res.send({id:1,name:'张三'})
})

// 监听POST请求
app.post('请求URI',(req,res)=>{})
put/delete/use 等
app.use() 模糊接受所有的请求
// 启动服务
app.listen(8080,()=>{})
```

 

### 5.2.3、获取URL中查询参数

通过 `req.query` 对象，可以访问到客户端通过查询字符串的形式发送到服务器的参数

```js
app.get('/',(req,res)=>{
  console.log(req.query)
})
```

缺点：字段可见，url不优雅，不利于seo

优点：路由不用定义，可以在地址中直接添加，所以一般用于搜索

 

### 5.2.4、URL中动态参数

通过 req.params 对象，可以访问到 URL 中动态参数

```js
app.get('/:id',(req,res)=>{
  console.log(req.params)
})
```

缺点：必须要先在程序中定义，才能使用,所以它使用，一般都固定页面

优点: url地址简洁，字段不可见，有利于seo

 

### 5.2.5、静态资源管理

express提供了一个非常好用的方法，叫做 `express.static()`，通过此方法，可以非常方便地创建一个静态web资源服务器

`app.use(express.static('public'))`

现在可以访问public目录下所有的文件 

挂载路径前缀,希望是访问到指定的路径后才触发到静态资源管理

`app.use('public', express.static('public'))`

​                               

## 5.3、路由

### 5.3.1、概述

路由在生活中如拨打服务电话时，按数字几能处理什么样的处理，它就是类似于按键与服务之间的映射关系。

在Express中，路由指的就是客户端发起的请求与服务器端处理方法之间的映射关系。

 

### 5.3.2、定义路由

express中的路由分3部份组件，分别是请求类型、请求uri和对应的处理函数。

当一个客户端请求到达服务端之后，先经过路由规则匹配，只有匹配成功之后，才会调用对应的处理函数。在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的函数进行处理。

`app.<get/post/put/delete/use>(uri,(req,res)=>{})`

 

### 5.3.3、模块化路由

在开发项目时，如果将所有的路由规则都挂载到入口文件中，程序编写和维护都变化更加困难。所以express为了路由的模块化管理功能，通过`express.Router()`方法创建路由模块化处理程序，可以将不同业务需求分开到不同的模块中，从而便于代码的维护和项目扩展。

路由模块化处理可以分为以下步骤来完成

- 创建独立js空白文件(最后是统一放在一个目录下)

- 在js中使用`express.Router()`方法创建路由模块对象

- 使用路由对象完成路由规则的对应的业务编写

- 使用模块化导出(`module.exports=router`)

- 在主入口文件中能过`app.use`方法来注册定义的路由模块

 

## 5.4、中间件

### 5.4.1、中间件理解

中间件可以理解为业务流程的中间处理环节。如生活中吃一般炒青菜，大约分为如下几步骤

 

express中当一个请求到达的服务器之后，可以在给客户响应之前连续调用多个中间件，来对本次请求和返回响应数据进行处理。(`middleware`)

 

### 5.4.2、中间件分类

中间件可以分类可分如下几类

- 内置中间件 也就是express本身自带无带npm安装

- 第三方中间件

- 非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中可以通过npm进行安装第三方中间件并配置，从而提高项目的开发效率。例如body-parser 此中间件可以很方便帮助我们获取到post提交过来的数据。

- 自定义中间件 开发者自己编写的

### 5.4.3、自定义中间件

自定义中间件，其本质就是定义一个处理请求的函数，只是此函数中除了有request和response参数外还必须包含一个next参数，此参数作用让中间件能够让流程向下执行下去直到匹配到的路由中发送响应给客户端。也可以通过给request对象添加属性来进行中间件数据的向下传递

```js
function mfn(req,res,next){
  // 中间件最后一定要执行此函数，否则程序无法向下执行下去
  next()
}

// 使用中间件来实现错误的统一处理,即错误级别中间件
app.get(uri,(req,res)=){
  // 如果处理有异常 抛出一个自定义错误
  throw new Error('服务器内部错误')
  res.send('hello')
})
 
// 自定义中间件完成错误级别中间件
app.use((err,req,res,next)=>{
  // 此处err必须为第1个参数，它会获取得到 throw抛出的异常信息
  console.log(err.message)
  res.send(err.message)
})
```



### 5.4.4、内置中间件

express也提供了好用的内置中间件，如提供一个静态资源管理的中间件，通过此中间件就可以帮助为我们快速搭建一个静态资源服务器

`app.use(express.static('托管目录地址'))`

### 5.4.5、第三方中间件

express搭建的web服务器中想要接受表单中的post数据可以通过第3方中间件帮助解析获取post数据 **body-parser**

- 安装

`npm i -S body-parser`

- 通过中间件调用 `app.use(body.urlencoded({extended: false}))`

  创建 `application/x-www-form-urlencoded` 解析

- 在匹配的路由中通过 req.body获数post中数据

 

## 5.5、cookie和session

### 5.5.1、cookie

HTTP是一个无状态协议，客户端每次发出请求时候，下一次请求得不到上一次请求的数据，我们如何将上一次请求和下一次请求的数据关联起来呢？如用户登录成功后，跳转到其他页面时候，其他的页面是如何知道该用户已经登录了呢？此时就可以使用到cookie中的值来判断用户是否登录，cookie可以保持用户数据。

cookie它是一个由浏览器和服务器共同协作实现的(cookie是存储于浏览器中)。cookie分为如下几步实现：

- 服务器端向客户端发送cookie并指定cookie的过期时间。

- 浏览器将cookie保存起来。

- 之后每次请求都会将cookie发向服务器端，在cookie没有过期时间内服务器都可以得到cookie中的值。

express中操作的cookie使用 cookie-parser模块

 `npm i -S cookie-parser`

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// 中间件引入
app.use(cookieParser());

app.get('/', (req, res) => {
 // 服务器端通过req来获取cookie数据
 if (req.cookies.username) {
  console.log(req.cookies);
  res.send('再次欢迎你');
 } else {
// cookie设置过期时间为1天
// maxAge 设置cookie过期时间 毫秒
  res.cookie('username', 'admin', {maxAge: 86400*1000});
  res.send('欢迎你~');
 }
});
 
app.listen(3000)
```

 

### 5.5.2、session

  cookie操作很方便，但是使用cookie安全性不高，cookie中的所有数据存储在客户端浏览器中，数据很容易被伪造；所以一些重要的数据就不能放在cookie当中了，并且cookie还有一个缺点就是不能存放太多的数据，一般浏览大约在4k左右，为了解决这些问题，session就产生了，session中的数据保留在服务端的。

  把数据放到cookie中是不安全的，我们可以在cookie中存放一个`sessionId`值,该`sessionId`会与服务器端之间会产生映射关系，如果`sessionId`被篡改的话，那么它就不会与服务器端数据之间产生映射，因此安全性就更好，并且session的有效期一般比较短，一般都是设置是20分钟左右，如果在20分钟内客户端与服务端没有产生交互，服务端就会将数据删除。

session的原理是通过一个`sessionid`来进行的，`sessionid`是放在客户端的cookie中，当请求到来时候，服务端会检查cookie中保存的`sessionid`是否有，并且与服务端的session数据映射起来，进行数据的保存和修改，也就是说当我们浏览一个网页时候，服务端会随机生成一个1024比特长的字符串，然后存在cookie中的`sessionid`字段中，当我们下次访问时，cookie会带有`sessionid`这个字段。

express中操作的cookie使用 `cookie-seesion`模块 

`cnpm i -S cookie-session`

```js
const express = require('express');
const session = require('cookie-session');
const app = express(); 

app.use(session({
 name: 'sessionId',
 // 给sessionid加密的key,随便填写s
 secret: 'afsfwefwlfjewlfewfef',
 //maxAge: 20 * 60 * 1000 // 20分钟
}));
 
app.get('/, (req, res) => {
 if(!req.session['view']){
  req.session['view'] = 1;
 }else{
  req.session['view']++;
 }
 res.send(`欢迎您第 ${req.session['view']} 次访问！`);
})

app.listen(3000)
```



 

# 6、模板引擎

## 6.1、介绍

在一个web应用程序中，如果只是使用服务器端代码来编写客户端html代码，前后端不分离，那么会造成很大的工作量，而且写出来的代码会比较难以阅读和维护。如果只是使用客户端的静态的HTML文件，那么后端的逻辑也会比较难以融入到客户端的HTML代码中。为了便于维护，且使后端逻辑能够比较好的融入前端的HTML代码中，同时便于维护，很多第三方开发者就开发出了各种Nodejs模板引擎，其中比较常用的就是Jade/Pug/Ejs和art-template 等模板引擎。

## 6.2、页面渲染模式

### 6.2.1、ssr(服务器端渲染)

`ssr (Server Side Rendering)` ：传统的渲染方式，由服务端把渲染的完整的页面吐给客户端。这样减少了一次客户端到服务端的一次http请求，加快相应速度，一般用于首屏的性能优化。

优缺点：

1、利用SEO（搜索引擎）

2、页面渲染时间短

3、服务器压力过大

### 6.2.2、csr(客户端渲染)

`CSR(Client Side Rendering)`：是一种目前流行的渲染方式，页面由js渲染，js运行于浏览器端，所以称客户端渲染。

优缺点：

1、前后端并行开发，开发速度提升

2、首屏渲染时间比较长（首屏加载速度慢）

3、不利于SEO

## 6.3、art-template

网址：http://aui.github.io/art-template/zh-cn/

   http://aui.github.io/art-template/express/

art-template 是一个简约、超快的模板引擎。

模板引擎渲染速度测试

 

**特性**

- 拥有接近 JavaScript 渲染极限的的性能

- 调试友好：语法、运行时错误日志精确到模板所在行；支持在模板文件上打断点（Webpack Loader）

- 支持 Express、Koa、Webpack

- 支持模板继承与子模板

- 浏览器版本仅 6KB 大小

## 6.4、安装与配置art-template

在express项目中通过npm来进行安装

\# 安装

`npm i -S art-template express-art-template`

\# 模板引擎配置

// 指定art-template模板，并指定模块后缀为.html

`app.engine('html', require('express-art-template'));`

// 指定模板视图路径

`app.set('views', path.join(__dirname, 'views'));`

 

## 6.5、语法

art-template 支持标准语法与原始语法。标准语法可以让模板易读写，而原始语法拥有强大的逻辑表达能力。标准语法支持基本模板语法以及基本 JavaScript 表达式；原始语法支持任意 JavaScript 语句，这和 `Ejs`一样。



```js
// 控制层返回数据
app.get(uri,(req,res)=>{
  res.render(模板,{
   username: '张三'
  })
})
// 模板视图层输出显示
#### 输出  
//标准语法
{{ username }}
// 有转义输出  未转义输出 
{{@ username }}

// 原始语法
<%= username %> 
// 有转义输出 未转义输出 
<%- username %>

#### 条件判断
{{if 条件}} … {{else if 条件}} … {{/if}}
<%if (条件){%> … <%}else if (条件){%> … <%}%>

#### 循环

// 支持 数组和对象的迭代 默认元素变量为$value 下标为$index 可以自定义 {{each target val key}}

{{each target}}
{{$index}} {{$value}}
{{/each}}

<% for(var i = 0; i < target.length; i++){ %>
 <%= i %> <%= target[i] %>
<% } %>

#### 子模板 --- 模板包含
{{include './header.art'}}
<% include('./header.art') %>
```

 

```html
// 注：在子模板中不要有html、head和body标签
#### 模板继承  模板布局 布局文件

父模板 layout.html

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
  <title>{{block 'title'}}My Site{{/block}}</title>
</head>
<body>
  <!-- block占位符 content此占位的名称 -->
  {{block 'content'}}{{/block}}
</body>
</html>

继承父模板 index.html

<!--extend 继承 -->
{{extend './layout.html'}}
{{block 'title'}}首页{{/block}}
{{block 'content'}}
   <p>This is just an awesome page.</p>
{{/block}}

注：渲染 index.html后，将自动应用布局骨架
```

 # 7、 mongodb

## 7.1、简介

`Mongodb`是一个介于关系数据库和非关系数据库之间的产品(`Nosql`)，是非关系数据库当中功能最丰富，最像关系数据库的，语法有点类似**`javascript`**面向对象的查询语言，它是一个面向集合的，模式自由的文档型数据库。`Mongodb`数据库旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

 

## 7.2、安装软件

下载地址：https://www.mongodb.com/download-center/community

下载windows的安装版本，进行安装，也可以网上下载免安装版本进行使用。

mac安装：https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x-tarball/

- 下载压缩包文件

https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-4.4.6.tgz

- 解压下载文件

`tar -zxvf mongodb-macos-x86_64-4.4.tgz`

- 移动目录

`mv /xxx/mongodb-macos-x86_64-4.4 /usr/local/mongodb`

// 创建数据目录

`mkdir -p /usr/local/mongodb/data`

`mkdir -p /usr/local/ /mongodb/logs`

// 启动

`mongod --dbpath /usr/local/mongodb/data --logpath /usr/local/mongodb/logs/mongo.log --fork`

 

## 7.3、常用数据库指令

通过客户端的命令进入到`mongodb`服务中

`mongo`命令进入客户端

`show dbs` 查看数据库

`show tables/show collections` 查看集合(查看当前库里面的表)

db 查看当前数据库

use 数据库 切换或创建数据库  如果数据库存在则切换，不存在则先创建后切换

 

\# 添加一个集合对象并向此集合中添加文档

// 集合名有则添加文档，集合不存在时先帮创建集合后创建文件

db.集合名.**insert**(json对象);

`db.c1.insert({name:'user1'})`;

\# 查看集合

`db.c1.find()`

\# `{ "_id" : ObjectId("5c0fa4758878caa23d36c0fb"), "name" : "zhangsan" }`

 

\# 删除当前的数据库 `db.dropDatabase();`

\# 删除集合 db.集合名.drop();



查看所有的数据库列表

show dbs

创建数据库或切换数据库

use数据数据库存在则切换，如果数据库不存在则创建并切换

use 数据库名 

use创建的数据库只是一个空的数据库，没有集合，所以show dbs不显示空数据库

可以使用db命令来查看当前所在的数据库名称

给mydb数据库中创建一个user的集合，并向集合中添加文档数据

查看当前数据库中的集合列表

 

## 7.4、增删改查

### 7.4.1、添加

向集合中添加文档数据

\# 添加单条文档数据

`db.collection.insertOne({ key: value })`

\# 添加多条文档数据

`db.collection.insertMany([{}, {}, {}])`

\# 可以添加单条也可以多条数据

`db.collection.insert( {} )`

`db.collection.insert([{}, {} ])`

 

### 7.4.2、删除

删除集合中已存在的文档数据

\# 删除单条文档

`db.collection.deleteOne({ key: value })`

\# 删除符合条件多条文档

`db.collection.deleteMany({key: value})`

\# 删除全部数据

`collection.deleteMany({});`

`key:value`  表示 等于的 意思

### 7.4.3、查询 find

查看所有和指定字段

`db.c1.find()`;  # 获取全部

`db.c1.find({})`; # 获取全部

\# 条件  

查询指定的字段

db.集合.find({条件},{字段名:[0/1]}) 0不要字段显示, 1要记录显示

\# 字段值为1取出相对应字段数据 0就表示不取出 _id默认会显示，只有指定为0才不会显示

`db.c1.find({name:"user11"},{name:1})；`

 

条件表达式查看

\### 条件表达式

\# 年龄大于5的

`db.c1.find({age:{$gt:5}}); age > 5`

\# 年龄大于等于5的

`db.c1.find({age:{$gte:5}}); age >= 5`

\# 年龄小于5的

`db.c1.find({age:{$lt:5}}); age < 5`

\# 年龄小于等于5的

`db.c1.find({age:{$lte:5}}); age <= 5`

\# 年龄不等于5的

`db.c1.find({age:{$ne:5}}); age != 5`

\# 在一个指定的数值中查询 $in  年龄在不在这几个指定数值当中

`db.c1.find({age:{$in:[1,2,3]})`

 

\## 且关系 and

`db.集合.find({age:{$lt:5},name:"user11"})`

 

\## 或关系 or

`db.集合.find({$or:[{条件1},{条件2}]})`

`db.c1.find({$or:[{age:{$ne:5}},{name: "user11"}]});`

db.集合.find({字段名:/正则/i})

i 不区分大小写

u 支持中文

 

统计总记录数

\# 统计记录数量 count

`db.c1.count();`

`db.c1.find().count();`

 

排序查询

\# 排序

\# 1 升序  -1 降序   字段

\# 以age字段来升序

`db.c1.find().sort({age:1})`

\# 以age字段来降序

db.c1.find().sort({age:-1})

 

分页查询

\# 指定获取几条 skip/limit  分页

`db.c1.find().limit(3);`

`db.c1.find().skip(1).limit(3);`

 

### 7.4.4、修改

根据条件修改已存在集合中的文档数据

// 设置

```js
\# 只修改单条文档
db.collection.updateOne({key:value}, { $set: { key: value }})

\# 修改符合条件所有文档数据
db.collection.updateMany({key:value}, { $set: { key: value }})

// 字段的值的自增和自减
db.collection.updateOne({key:value}, { $inc: { key: 1 }})
db.collection.updateMany({key:value}, { $inc: { key: 1 }})
```



# 8、Node操作mongodb

## 8.1、Mongoose介绍

网址：http://www.mongoosejs.net/docs/index.html

mongoose是Node环境下异步操作mongodb数据库的扩展，仅限于Node环境下使用。

使用mongoose操作mongodb数据步骤：

- 使用npm安装mongoose

- 导入模块，连接mongodb数据库

- 定义Schema (类似于使用mysql时定义表结构)

- 定义model

- 使用model进行数据增删改查操作

## 8.2、连接数据库

使用npm安装mongoose模块，并在使用模块中导入

\# 安装mongoose

>  npm i -S mongoose

\# 导入模块

> const mongoose = require('mongoose')

\# 连接数据库 返回promise对象

`mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })`

**connect****方法参2****在新版本需添加，否则会有警告提示**

`useNewUrlParser`：当前URL字符串分析器已弃用，将在将来的版本中删除。要使用新的解析器，请将选项`{usenewurlparser:true}`传递给`mongoclient.connect`。

`useUnifiedTopology`：当前服务器发现和监视引擎已弃用，将在将来的版本中删除。要使用新的服务器发现和监视引擎，请将选项`{useUnifiedTopology:true}`传递给`mongoclient`构造函数

 

## 8.3、定义Schema

Schema是mongoose中会用到的一种数据模式，可以理解为数据表结构的定义；每个schema会映射到mongodb中的一个集合，它不具备操作数据库的能力。Schema中定义数据校验，默认值，字段名，字段类型等特性。

```js
// 创建用户集合规则

const UserSchema = new mongoose.Schema({
 // 字段名/域名称
 name: {
  	// 指字域类型
    type: String,
    // 必填字段
    required: true,
    // 字段最小长度 minlength 用于字符串类型
 	 minlength: 2
 },
 age: {
    type: Number,
    // 默认值
     default:10,
     // 字段最小值 min用于数字类型
     min: 1
 },
 pwd: String,
 email: String,
 // 定义此字段为 字符串数组类型
 hobbies: [String]
})
```

 

## 8.4、定义model

model 是由schema 生成的模型，可以对数据库的操作



```js
// 参数1：model名称
// 参数2：schema名称
// 参数3：操作的数据集合  如果参数3没有填写则以 参1的复数形式为操作数据集合名称

const UserModel = mongoose.model('User', UserSchema, 'users')


## 模型curd相关方法
Model.insertMany({key:value})

Model.deleteMany({条件},err=>{})

Model.deleteOne({条件},err=>{})

Model.countDocuments({条件})

Model.find({条件},{可选字段返回:0/1},{skip:0,limit:10})

Model.findOne({条件},{可选字段返回:0/1})

Model.updateMany({条件},{$set:{key:value}},res=>{})

Model.updateOne({条件},{$set:{key:value}},res=>{})
```



 



# 9、websocket

## 9.1 为什么使用WebSocket协议

因为HTTP协议有一个缺陷：通信只能先由客户端发起，然后服务器再做出响应，并不能由服务器主动向客户端推送消息。HTTP是**半双工协议**

WebSocket 协议最大的特点是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息。WebSocket是**全双工**通讯的网络技术。

- 单工
- 半双工
- 全双工

## 9.2 双向通信

目前实现的方式有：

- 轮询
- 长轮询
- iframe
- WebSocket

### 9.2.1 轮询

客户端和服务器之间会一直进行连接，每隔一段事件客户端就会主动发送请求给服务器端询问一次。这种方式连接数会很多，而且每次发送请求都会有Http的Header头，会很消耗流量。

短轮询：浏览器每隔一段时间就会发送http请求，服务器在接收到请求后，**不论有没有数据更新都会直接进行响应。** 

本质：还是浏览器发送请求，服务器接收请求的过程。通过客户端不断地请求，使客户端实时收到服务端的数据的变化。

优点：比较简单，易于理解。

缺点：需要不断的建立http连接，严重浪费了服务器端和客户端的资源。用户增加时，服务端的压力就会变大。

```js
// 服务器
app.get('/', (req, res) => {
    res.send(Date.now())
})

// 客户端
setInterval(function() {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:3000/", "true")
    xhr.onreadystatechange = function() {
        if(xhr.status === 200 && xhr.readyState === 4) {
            document.innerHtml = xhr.response
        }
    }
    xhr.send()
}, 1000)
```



###  9.2.2 长轮询（服务器推）

长轮询就是对轮询的改进版，客户端发送HTTP给服务之后，看有没有新消息，如果没有新消息，就一直等待，当有新消息的时候，才返回给客户端。在某种程度上减小了网络带宽问题。

长轮询：首先由客户端向服务器发起请求，当服务器收到客户端发来的请求后，服务器端不会直接进行响应，而是先**将这个请求挂起**，然后判断服务器端数据是否有更新，如果有更新，则进行响应，如果一直没有数据，则到达一定的时间限制才返回。客户端相应处理函数在处理完服务器返回的信息后，会再次发出请求，重新建立连接。

优点：相对短轮询减少了很多不必要的http请求次数，相比之下节约了资源。

缺点：连接挂起也会导致资源浪费。

```js
// 服务器
app.get('/', (req, res) => {
	let timer = setInterval(() => {
        let seconds = new Date().getSeconds()
        if(seconds === 50) {
            res.send(Date.now())
            clearInterval(timer)
        }
    }, 1000)
})

// 客户端
;(function send() {
    let xhr = new XHRHttpRequest()
    xhr.open('GET', 'http://localhost:3000', true)
    chr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.state === 200) {
            document.innerHtml = xhr.response
            send()
        }
    }
    xhr.send()
})();
```

### 9.2.3 iframe

通过在HTML页面里嵌入一个隐藏的iframe,然后将这个iframe的src属性设为对一个长连接的请求,服务器端就能源源不断地往客户推送数据。



### 9.2.4 SSE

SSE 也叫 EventSource 是服务器推送的一个网络事件接口。一个EventSource实例会对HTTP服务开启一个**持久化**的连接，以 text/event-stream 格式发送事件，会一直保持开启直到被要求关闭。

SSE（Server-Sent Events）的方式是**单向通信**的，只能由服务端向客户端推送消息，如果客户端要发送信息就是属于下一个http请求了。

服务器发送事件（Server-sent Events）是基于 WebSocket 协议的一种服务器向客户端发送事件和数据的单向通讯。

HTML5 服务器发送事件（server-sent event）允许网页获得来自服务器的更新。



缺点:

- 不能处理客户端请求流
- 因为是明确指定用于传输UTF-8数据的，所以对于传输二进制流是低效率的。



实现：

```js
// 服务器返回一定要按照必须的格式
res.setHeader("content-type", "text/event-stream")
res.send("event: 类型\ndata:数据\n\n")
// 另外两个字段
// ID: 每一条事件流ID
// Retry: 告知浏览器在所有的连接丢失之后重新连接等待的时间，在自动重连过程中，之前收到的最后一个事件流ID会被发送到服务端。

## 服务器
app.get('/ajax', (req, res) => {
  res.setHeader("content-type", "text/event-stream")
  setInterval(() => {
    let dt = Date.now()
    if (new Date().getSeconds() % 2 == 0) {
      res.write("event:message\ndata:" + dt + "\n\n")
    }
  }, 1000);
})

# 客户端
const es = new EventSource(url);
## 接受服务器发送过来的数据
es.onmessage = ev=> ev.data
```



### 9.2.5 WebSocket

WebSocket 协议是基于HTML5定义的一个新协议。

与传统的http协议不同，该协议允许有服务器主动向客户端推送信息。使用WebSocket协议最大的缺点是在服务端的配置比较复杂。

WebSocket是一个全双工的协议，也就是通信双方是平等的，可以相互发送消息。









# 10. webpack





# 11. Node事件循环

## 1. 介绍

单线程编程会因阻塞I/O导致硬件资源得不到更优的使用。

多线程编程也因为编程中的死锁、状态同步等问题让开发人员头痛。

Node在两者之间给出了解决方案：利用单线程、远离多线程死锁、状态同步等问题；利用异步I/O，让单线程远离阻塞，更好的使用CPU。

实际上，node只是在应用层属于单线程，底层其实通过`libuv`维护了一个阻塞I/O调用的线程池。

>但是：在应用层面，JS是单线程的，业务代码中不能存在耗时过长的代码，否则可能会严重拖后续代码（包括回调）的处理。如果遇到需要复杂的业务计算时，应当想办法启用独立进程或交给其他服务进行处理。



**异步I/O**

在Node中，JS是单线程执行的没错，但是内部完成I/O工作的另有线程池，使用一个主进程和多个I/O线程来模拟异步I/O。

当主线程发起I/O调用时，I/O操作会被放在I/O线程来执行，主线程继续执行下面的任务，在I/O线程完成操作后会呆着数据通知主线程发起回调。



**事件循环**

事件循环是Node的执行模型，正是这种模型使得回调函数非常普遍。

在进程启动时，Node便会创建一个类似while(true)的循环，执行每次循环的过程就是判断有没有待处理的事件，如果有，就取出事件及其相关的回调并执行他们。然后进入下一个循环。如果不再有事件处理，就退出进程。

Event loop是一种程序结构，是实现异步的一种机制。Event loop可以简单理解为：

- 所有任务都在主线程上执行，形成一个执行栈（execution context stack）。
- 主线程之外，还存在一个“任务队列”（task queue）。系统把异步任务放到“任务队列”之中，然后主线程继续执行后续的任务。
- 一旦“执行栈”中的所有任务执行完毕，系统就会读取“任务队列”。如果这个时候，异步任务已经结束了等待状态，就会从任务队列进入执行栈，恢复执行。
- 主线程不断地重复以上三步。



**Node中事件循环阶段解析：**

- timers
- I/O callbacks
- idle,prepare
- poll
- check
- close callbacks

**timer**

timers阶段会执行`setTimeout`和`setInterval`一个timer指定的时间并不是准确时间，而是在到达这个时间后尽快执行回调，可能会因为系统正在执行别的事务而延迟执行。

下限的事件有一个范围：`[1, 2147483647]`，如果设定的时间不在这个范围，将被设置为1.

*2147483647是2^31-1，是32位操作系统中最大的符号型整型常量*

