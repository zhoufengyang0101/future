



**# 工具**

\- browser-sync

\- npm i browser-sync -g

`- browser-sync start -s -f **/* --directory --watch`



# 1. Vue生命周期钩子

Vue实例被初始化

1. beforeCreated：初始化Events 和 lifecycle 

   不能访问data中的属性，获取dom访问到了未解析的模板

   使用场景： 

   - 可以在这里做一个非响应特性的初始化数据
   - 最早调用ajax请求的钩子

2. created：初始化injections 和 reactivity 即对数据的初始化（inject/provide、props、methods、data、computed、watch）

   使用场景：

   - 可以初始化data里的数据
   - 可以做ajax请求

3. beforeMount: 

   使用场景：

   - 再给一次初始化data里的数据的机会
   - 可以在这里做ajax

4. mounted:已经做完了第一次渲染，才调用的mounted

   使用场景：

   - 在DOM第一次渲染完毕后，做事情
   - 比较是个在这里做ajax

5. beforeUpdate: 在数据更新前

6. updated: 数据更新后

7. beforeDestroy: 销毁前

8. destroyed:销毁后



生命周期源码分析：

初始化时执行：（其中callHook调用生命周期）

```js
initLifecycle(vm);
initEvents(vm);
initRender(vm);
callHook(vm, 'beforeCreate');
initInjections(vm); // resolve injections before data/props
initState(vm);  // 这里初始化data/props
initProvide(vm); // resolve provide after data/props
callHook(vm, 'created');
// 在beforeCreate调用的时候是不能访问到data和props的，因为这些数据初始化在initState中
```



# 2. Vue响应性特性

响应性：必须事先在data里定义好



**响应性特例：**

> vm.fruits.length
>
> vm.fruits[0] = 'w' // debug: vm.$forceUpdate()
>
> vm.obj.y=200  // 给对象新增属性，得不到响应 debug：vm.$set(vm.obj, 'y',200) or Vue.set(vm.obj, 'y', 300)
>
> BUG原因：Object.defineProperty(), 不能监测数组变化





# 3. 计算属性、方法、watch

**计算属性：**

computed： {}

根据依赖自动返回新的值，这个值可以是响应式的

根据依赖缓存：依赖的值不发生变化，计数属性（函数）不调用

计算属性一定要有返回值

计算属性和方法的区别：计算属性是基于它们的**响应式依赖进行缓存**的。只在相关响应式依赖发生改变时它们才会重新求值。而方法是每当触发重新渲染时，调用方法将总会再次执行函数。

**方法：**

1. 事件的处理函数
2. 代码的封装



**监听器：**

1. 监听数据的变化，做一件事
2. 特别适合**异步操作**的场景

watch:{}



# 4. Vue指令

v-once 优化  渲染后失去响应性



v-for 和 v-if：

v-for：

在v-for 块中，我们可以访问所有父作用域的property。v-for还支持一个可选的第二个参数，即当前项的索引。也可以使用of替代in作为分隔符。

遍历对象时，第一个参数为值，第二个为key，第三个为索引。

遍历对象时，会按Object.keys()的结果来遍历，但是不能保证它的结果在不同的JavaScript引擎下一致。

**维护状态：**

当Vue正在更新使用v-for渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地更新每个元素，并且确保他们在每个索引位置正确渲染。

这个默认的模式是高效的，但是**只使用于不依赖子组件状态或临时DOM状态的列表渲染输出。**（表单的输入值）

为了给Vue一个提示，方便它能跟踪每个节点的身份，从而重用和重新排序现有元素，需要为每项提供一个**唯一**key 属性。

v-for：使用for in 和 for of 是相同的

Vue2中：v-if和v-for同时使用时，v-for优先级高

Vue3中：v-if和v-for同时使用时，v-if优先级高



**数组的更新检测 ：**

Vue将被侦听的数组的变更方法进行了包裹，所以它们也将触发视图更新：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

这些方法都是返回了原数组，非变更方法：filter()、concat()、slice()。它们不会变更原始数组，而总是返回一个新数组。可以将新数组替代旧数组。（用一个含有相同元素的数组替换原数组是非常高效的，Vue通过一些智能的启发式方法使DOM元素得到最大范围的重用）



v-if 和 v-show：

v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当得被销毁和重建。v-if 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做直到条件第一次变为真时，才会开始渲染条件块。

相比之下、v-show 就简单得多-不管初始条件是什么，元素总是会被渲染，并且只是简单地基于css进行切换。

一般来说，v-if 有更高的切换开销，而v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好。如果在运行时条件很少改变，则使用v-if较好。

带有 v-show 的元素**始终会被渲染并保留在DOM中**，v-show 只是简单的切换元素的property display。







# 5. Vue 事件

可以使用$event把原始DOM事件传递到事件函数。

v-on提供的事件修饰符：

- .stop  阻止事件继续传播
- .prevent   阻止标签默认行为
- .capture   使用事件捕获模式
- .self  只在当前元素自身时触发（event.target）
- .once   事件只触发一次
- .passive  告诉浏览器不想阻止事件的默认行为

使用修饰符时，顺序很重要：

v-on:click.prevent.self 会阻止所有的点击

v-on:click.self.prevent 只会阻止对元素自身的点击

**passive修饰符**

尤其提高移动端的性能

不要把passive和prevent一起使用，以为prevent将会被忽略，同时浏览器会展示一个警告，passive会告诉浏览器不想阻止事件的默认行为。





**表单修饰符：**

.lazy: 默认情况下，v-model在每次input事件触发后将输入框中的值与数据进行同步，使用lazy修饰符后转为change事件之后同步。

.number 自动将用户输入值转为数值类型。

.trim 自动过滤首尾空白字符。

# 6. Vue组件

组件是可复用的Vue实例，与new Vue接收相同的选项。（除el）

每使用一次组件，就会有一个它的新的实例被创建，因此每个组件都会各自维护自己的属性。

**组件中的data必须是一个函数**



组件有两种注册类型：**全局注册、局部注册**

全局注册的组件可以用在其被注册之后的任何新创建的Vue根实例，也包括其组件树中的所有子组件的模板中。



**传递数据：**

父 => 子: Prop

子 => 父 ：子组件使用 $emit('事件名称')  父组件通过事件名称接收v-on:事件名称=“”

​		$emit('事件名称', 'data') 通过第二个参数抛出一个值，父组件使用$event访问抛出的这个值。



在一些标签下使用组件需要通过**is**来指定组件，因为在一些标签下只有特定的标签才被看做有效内容，如ul>li。如果不使用is时，可能会遇到在ul标签之前渲染组件。

组件特性：





在组件中使用v-model：

v-model="value"  等价于：

v-bind:value="value" 和 v-on:input="value=$event.target.value"组合

```js
<custom-input
	v-bind:value="searcgText"
	v-on:input="searchText = $event"
>
</custom-input>
==>
Vue.component('custom-input', {
    propsL ['value'],
    template: `
		<input
			v-bind:value="value"
			v-on:input="$emit('input', $event.target.value)"
		></input>
	`
})
可以使用v-model
<custom-input v-model="serachText"></custom-input>
```





插槽：

向组件中传递内容使用插槽：

<slot></slot>

父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

插槽不能访问父模板中的属性。





# 7. 路由

**路由的导航**：

除了使用<router-link>(声明时导航)来定义导航，还可以借助router的实例方法，即编程式导航。

router.push(location, onComplate?, onAbort?)

push方法会向history栈中添加一个新的记录。



**路由组件传参:**

获取动态路由：$route.params.id

使用Props将组件个路由解耦：

routes: [{ path: "/home/:id", component: User, props: true }]

在组件中直接通过id调用

即布尔模式

布尔模式：将props设置为true，route.params将会被设置为组件的属性。

对象模式：如果props是一个对象，他将会按原样设置为组件属性，当props是静态的时候有用。

函数模式：可以创建一个函数返回一个props，函数的参数可以是route对象。





**路由有关的钩子：**



导航守卫：

全局前置守卫：

router.beforeEach(to, from, next => {})



全局解析守卫：

before.beforeResolve，和beforeEach类似，区别是在导航确认之前，同时是在所有组件内守卫和异步路由组件被解析之后，解析守卫就会被调用。



全局后置钩子：

router.beforeEach(to, from => {})



路由独享守卫：

在路由表中：

```js
{
    path: '/foo',
    component: Foo,
    beforeEnter: (to, from, next) => {
    // ...
}
```



组件内的守卫：

beforeRouteEnter  在渲染当前组件对应路由被confirm之前调用

beforeRouteUpdate  在当前路由改变，组件被复用时调用

beforeRouteLeave   导航离开当前组件对应路由时调用

在beforeRouteEnter中不能访问this，因为守卫在导航确认前被调用，此时的组件还没有被调用。通过给next传入一个回调来访问组件实例：next( vm => { //vm })。它也是唯一支持给next传递回调的守卫。

beforeRouteLeave可以通过next(false)来取消。



**完整的导航解析流程：**

1. 导航被触发
2. 在失活的组件里调用beforeRouteLeave守卫
3. 调用全局守卫beforeEach
4. 在重用的组件里调用beforeRouteUpdate（2.2+）
5. 在路由配置里调用beforeEnter
6. 解析异步路由组件
7. 在被激活的路由组件里调用beforeRouteEnter
8. 调用全局beforeResolve守卫 （2.5+）
9. 导航被确认
10. 调用全局afterEach钩子
11. 触发DOM更新
12. 调用beforeRouteEnter守卫中传给next的回调函数，创建好的组件实例会作为回调函数的参数传入。





**路由元信息：**

定义路由的时候可以配置meta字段：







# 8. Vuex

Vuex是一个专门为vue.js应用程序开发的**状态管理模式**。

它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

![image-20210609191744709](C:\Users\11091\AppData\Roaming\Typora\typora-user-images\image-20210609191744709.png)

**State：**

单一状态树，每个应用将包仅仅包含一个store实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

存储在Vuex中的数据和Vue实例中的data遵循相同的规则，例如状态对象必须是纯粹的。



在Vue组件中获得Vuex状态：

由于Vuex的状态存储是响应的，从store实例中读取状态最简单的方法就是在计算属性中返回某个状态：

```js
computed: {
    count() {
        return this.$store.state.count
    }
}
```

store.state.count变化，都会重新求取计算属性，并且触发更新相关联的DOM。

这种模式导致组件依赖全局状态单例。

mapState辅助函数：

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。使用mapState可以更方便。

```js
// 在单独构建的版本中辅助函数为Vue.mapState
import { mapState } from 'vuex'

export default {
    // ...
    computed: mapState({
        count: state => state.count,
        countAlias: 'count',
        countPlusLocalState(state) {
            return state.count + this.localCount
        }
    })
}
// 当映射的计算属性的名称与state的子节点名称相同时，可以给mapState传一个字符串数组
coputed: mapState([
    // 映射this.count 为 store.state.count
    'count'
])
```



对象展开运算符：

```js
computed: {
    localComputed() {},
    ...mapState({
        // ...
    })
}
```



**Getters**



**Mutations**



**Actions**



**Modules**







# vue3 新特性：

小、快、加强ts支持、加强api设计、提高自身可维护性、开放更多底层原理





## 1. 压缩包体积更小

## 2. `Object.defineProperty -> Proxy`



## 3. Virtual DOM重构



