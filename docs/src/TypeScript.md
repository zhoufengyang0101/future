If we're gonna do this, we've got to do it now.







# TypeScript



TypeScript是JavaScript类型的超集，它可以编译成纯JavaScript。TypeScript可以在任何浏览器、任何计算机和任何操作系统上运行，并且是开源的。





### 1. 类型注解

**基础类型**

``` typescript
let isDone: boolean = false; // 布尔值
let num: number = 66; // 数字，和js一样所有数字都是浮点数，类型是number，TS支持十进制、十六进制、和ECMAScript2015中引入的二进制和八进制。
let name: string = 'future'; // TS也支持模板字符穿

// 数组，两种定义方式
let arr: number[] = [1,2,23];  // 元素类型加上[]
let arr: Array<number> = [11,2,3];  // Array<元素类型>

// 元组 Tuple
let x: [string, number];

// 枚举 enum 是对JS标准数据类型的一个补充
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
// 也可以使用编号，指定第一个元素的编号后边的可以自动生成，或全部赋予编号
enum Color {Red = 1, Green, Blue}
let c:Color = Color[2]; // ==> Green

// Any 不确定时，不希望被类型检查器进行检查时使用，尽量不适用
let notSure: any = 4;

// void 与any类型相反，表示没有任何类型。常用于没有任何返回值的函数
function fn(): void {
    console.log("...");
}
let unusable: void = undefined; // void类型的变量只能赋予undefined和null

// undefined 和 null
let u: undefined = undefined;
let n: null = null;
let str: string | null = "ss"; // 表示可以是string类型或null

// Never 类型表示那些永不存在的值的类型。
// never类型是任何类型的子类型，也可以赋值给任何类型，
// 没有任何类型是never的子类型或可以赋值给never类型(除never本身之外)，即使any也不可以赋值给never。
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
	throw new Error(message);
}
function infinteLoop(): never {
	while(1) {}
}

// Object  
// object 表示非原始类型，也就是除number、string、boolean、symbol、null或undefined之外的类型。

// 类型断言 两种方式
// 类型断言没有运行时的影响，只会在编译时起作用
let someValue: any = "this is a string";
// 使用尖括号
let strLength: number = (<string>someValue).length;
// 使用as
let strLength: number = (someValue as string).length;
```







### 2. 接口

接口就是为类型命名和代码定义契约。

接口中可以使用可选属性，如：
``` typescript
interface IIcon {
name: string;
color?: string;
[key: string]: number | string | boolean;
}
// 使用可选参数1可以对可能存在的属性进行预定义，2是可以捕获引用了不存在的属性时的错误。
```

使用readonly来指定只读属性：

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
```



作为变量使用时使用const作为属性使用时使用readonly。



实现接口和java中基本一样：

```typescript
interface ClockInterface {
    currentTime: Date;
}
class Clock implements ClockInterface {
    cuurentTime:Date;
    constructor(h: number, m: number) {  }
}
```



类是具有两个类型的：静态部分的类型和实力的类型。

当一个类实现接口时，只对其实例部分进行类型检查。而constructor存在于类的静态部分，所以不在检查的范围内。



**继承接口：**

和类一样，接口也可以相互继承，这让我们能够从一个接口里赋值成员到另一个接口里。

一个接口可以继承多个接口，创建出多个接口的合成接口。



**接口继承类：**

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。

接口同样会继承到类的private和protected成员。所以创建一个接口继承了拥有私有或受保护的成员时，这个接口类型只能被这个类或其子类实现。



### 3. 类

在类中，访问类的成员使用this。



使用new关键字构造一个类的实例，它会调用类中的构造函数，创建一个类的新的对象，并执行构造函数初始化它。



类中的成员有三种访问权限：

1. 私有的 private   私有成员只能在声明该成员的类中访问
2. 受保护的 protected  受保护的可以在声明的类和子类中访问
3. 公共的 public  公共的可以在类中访问也可以在实例中访问

默认是public

readonly修饰符，将属性设置为只读的。  只读属性必须在声明时或构造函数里被初始化。



**继承**

基类  也称超类

派生类  也称子类

存取器：getter、setter

截取对对象成员的访问，有效控制对对象成员的访问。

只带有get不带有set的存取器自动被推断为readonly



**静态属性**

通过static定义静态属性

访问静态属性都要使用类名来访问。



**抽象类**

抽象类可以包含成员的实现细节，abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。

抽象类**不能实例化**，只能被继承。

抽象类是具备接口和类的特征，抽象属性和方法在继承后可以灵活定义，非抽象属性和方法可以处理共有的逻辑内容。（继承抽象类的类必须有抽象类中的抽象属性和抽象方法）



### 4. 函数

函数的默认参数同js

可选参数使用？表示可以是undefined

剩余参数使用`...lsit: number[]`,在函数内部使用list接收剩余参数列表。例如：

```typescript
function num(a:number, ...list: number[]):void {
    console.log(a, list);
    console.log(a, ...list);
}
num(10, 20, 30, 40); // ==> 10, [20, 30, 40]
num(10, 20, 30, 40); // ==> 10, 20, 30, 40
```





### 5. 模块

在TS1.5后，内部模块称作**命名空间**，外部模块简称**模块**，为了和和ES2015术语保持一致。



**导入导出：**

任何声明（比如变量，函数，类，接口等）都能通过添加export关键字来导出。

```typescript
// 直接导出
export class Future {};
export const numRegexp = /^[0-9]+$/;
// 导出多个
export { Future }; 
export { Future as test }; // 别名导出
// 导入
import { Future } from "./Future"

// 联合导出
export * from "module";

// 将整个模块导入赋给一个变量，并通过它来访问模块的导出部分
import * as future from "./Future";

// 使用default导出时（默认导出）
export default Future;
// 类和函数声明可以直接被标记为默认导出，标记为默认导出的类和函数是可以省略的
export default function() {};
// default导出也可以是一个值
export default "123";

// 即使模块中还有其他的导出在导入时也可以这样写：
import Future from "Future"; // 可以不写{}
import future from "Future"; // 也可以直接起别名
```



**export = 和 import = require()**

CommonJS和AMD的环境里都有一个exports变量，这个变量包含了一个模块的所有导出内容。

CommonJS和AMD的exports都可以赋值为一个对象，这种情况下起作用就类似于es6语法里的默认导出，即export default 语法了。虽然作用相似，但是export default语法并不能兼容Commonjs和AMD的exports。

为了支持CommonJS和AMD的exports，TypeScript提供了export =语法。

export = 语法定义一个模块的导出对象。这里的对象一词指的是类，接口，命名空间，函数或枚举。

若使用export = 导出一个模块，则必须使用TypeScript的特定语法`import module = require("module")`来导入此模块。

```typescript
// 使用export = 导出
export = Future;
// 导入语法
import future = require("./Future");

```



生成模块代码：

根据编译时指定的模块目标参数，编译器会生成响应的供Node.js（CommonJS），Require（AMD），UMD，SystemJS或ECMAScript 2015 native modules（ES6）模块加载系统使用的代码。



在TypeScript中，编译器会检测是否每个模块都会在生成的JavaScript中用到。如果一个模块标识符只在类型注解部分使用，并且完全没有在表达式中使用时，就不会生成require这个模块的代码。省略掉没有用到的引用对性能提升是很有益的，并同时提供了选择性加载模块的能力。

这种模式的核心就是`import id = require("...")`语句可以让我们访问模块导出的类型。





**外部模块：**

可以使用顶级的export声明来为每个模块都定义一个`.d.ts`文件，但是最好还是写在一个大的`.d.ts`文件里。

使用与构造一个外部命名空间相似的方法，但是这里使用module关键字并且把名字用引号括起来，方便之后import。eg:

```typescript
// node.d.ts
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }
    
    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
    export function normalize(p: string):string;
    export function join(...paths: any[]): string;
    export let sep: string;
}
```

使用一下方式加载模块：

```typescript
/// <reference path="node.d.ts" />
import * as URL from "url";
let myUrl = URL.parse("http://www.typpescriptlang.org");
```



简写形式：

```typescript
declare module "hot-new-module";
// 简写模块中所有的导出类型都是any
import x, {y} from "hot-new-module";
x(y);
```



ES6 的module语法参考：https://es6.ruanyifeng.com/#docs/module

