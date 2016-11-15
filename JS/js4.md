this 与对象
===  
# 对象  
## 属性描述符  
ES5 引入了属性描述符，让我们能对属性有更加精确地控制，比如是否可以修改，枚举，删除等等。这里介绍的都是ES5以上的内容，很重要，也能更好地理解js对象
的内容。   
ECMAScript中有两种属性：数据属性和访问器属性。  
### 1. 数据属性    
该属性包含了一个数据值的位置，它包含了4个描述行为的特性：   

1. [[Configurable]]：表示是否能通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性。
2. [[Enumerable]]：表示能否用for-in循环返回。
3. [[writable]]：表示能否修改属性的值。
4. [[Value]]：包含这个属性的数据值。读取属性值的时候从这个位置读，写入属性值的时候更新到这个位置，默认值为undefined。  

当我们定义一个对象的属性，他的数据属性默认值是：  

```js  
var obj = {}
obj.name = "hyang";  
```  

1. [[Configurable]]：true
2. [[Enumerable]]：true
3. [[writable]]：true
4. [[Value]]："hyang" (初始时的赋值)    

这些特性不能直接被访问，要修改属性的特性只能通过`Object.defineProperty(obj, prop, descriptor)`方法  
该方法包含三个参数：属性所在的对象，属性的名字，描述符对象。例如创建一个name属性不可写的对象：  

```js  
var love = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "hy"
})  
console.log(love.name);  //"hy"
love.name = "other";
console.log(love.name);  //"hy"
```     
注意，一旦把属性configurable定义为false即不可配置，就不能再把它变回可配置了。也就是说，可以多次调用Object.defineProperty()方法修改同一个属性，
但是吧configurable设置为false就会有限制。

### 访问器属性  
包含getter和setter函数。读取访问器属性时，调用getter函数，返回有效的值；在写入访问器属性时，调用setter函数传入新值。它包含了2个特性：  

1. [[Get]]：读取属性时调用的函数，默认undefined。
2. [[Set]]：写入属性时调用的函数，默认undefined。

getter和setter不一定要成对出现，只有getter函数证明该属性只读不可写，尝试写入在非严格模式下会被忽略，严格模式会抛出错误。
相同，只有setter函数证明只写不能读，尝试读在非严格模式下返回undefined，严格模式则抛出错误。 

```js  
var per = {
    name: "tgy",
    _age: 21
} 
Object.defineProperty(per, "age", {
    get: function() {
        return this.name + "的年龄是：" + this._age;
    },
    set: function(num) {
        if(typeof num === "number" && num >= 0 && num <= 150) {
            this._age = num;
        }
    }
}) 
console.log(per.age);   //"tgy"的年龄是21;
```    
这里我们设置和获取age属性，都是对_age直接操作，因为如果直接对age属性操作，的话会递归自身的get，set方法，从而陷入无限循环。   

## 属性操作的方法  
下面扩展介绍几个，常用的关于对象的函数
### Object.defineProperties()  
Object.defineProperties() 方法在一个对象上添加或修改一个或者多个自有属性，并返回该对象。例如：  

```js  
var obj = {};
Object.defineProperties(obj, {
    "property1": {
        value: true,
        writable: true
    },
    "property2": {
        value: "Hello",
        writable: false
    }
    // 等等.
});
alert(obj.property2) //弹出"Hello"  
```  

### Object.create()  
Object.create() 方法创建一个拥有指定原型和若干个指定属性的对象。  
参数：
* proto 一个对象，作为新创建对象的原型。   
* propertiesObject 可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。
注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。  

这个函数常用来创建纯净的对象，和类继承使用。  

### Object.freeze()  
方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，
以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。例如：  

```js  
var obj = {
  prop: function (){},
  foo: "bar"
};

// 可以添加新的属性,已有的属性可以被修改或删除
obj.foo = "baz";
obj.lumpy = "woof";
delete obj.prop;

var o = Object.freeze(obj);

assert(Object.isFrozen(obj) === true);

// 现在任何修改操作都会失败
obj.foo = "quux"; // 静默失败
obj.quaxxor = "the friendly duck"; // 静默失败,并没有成功添加上新的属性

// ...在严格模式中会抛出TypeError异常
function fail(){
  "use strict";
  obj.foo = "sparky"; // 抛出TypeError异常
  delete obj.quaxxor; // 抛出TypeError异常
  obj.sparky = "arf"; // 抛出TypeError异常
}

fail();

// 使用Object.defineProperty方法同样会抛出TypeError异常
Object.defineProperty(obj, "ohai", { value: 17 }); // 抛出TypeError异常
Object.defineProperty(obj, "foo", { value: "eit" }); // 抛出TypeError异常  
```  

### Object.getPrototypeOf()  
返回指定对象的原型，也就是对象内部属性[Prototype]的值  

### Object.getOwnPropertyDescriptor()  
返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）  

```js  
var o, d;

o = { get foo() { return 17; } };
d = Object.getOwnPropertyDescriptor(o, "foo");
// d is { configurable: true, enumerable: true, get: /*访问器函数*/, set: undefined }

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(o, "bar");
// d is { configurable: true, enumerable: true, value: 42, writable: true }

o = {};
Object.defineProperty(o, "baz", { value: 8675309, writable: false, enumerable: false });
d = Object.getOwnPropertyDescriptor(o, "baz");
// d is { value: 8675309, writable: false, enumerable: false, configurable: false }  
```  

### Object.getOwnPropertyNames()  
方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组。  

```js  
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]

// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj[val]);
});
// 输出
// 0 -> a
// 1 -> b
// 2 -> c

//不可枚举属性
var my_obj = Object.create({}, {
    getFoo: {
        value: function() { return this.foo; },
        enumerable: false
    }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]  
```  

之后在《类与继承》中会讲通过类来创建一个对象    

# this    
this是Javascript语言的一个关键字。它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。  
随着函数使用场合的不同，this的值会发生变化。但是有一个总的原则，那就是**this指的是，调用函数的那个对象**(也就是函数的调用位置)。   
## this 的绑定规则  
### 1. 默认绑定   
首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用
其他规则时的默认规则。例如：  

```js   
function foo() {
    console.log( this.a );
} 
var a = 2;
foo(); // 2
```   
这里foo中的this指向的是window对象，我们可以把这个看做是this的默认规则，默认情况下this指向全局对象。  
那么我们怎么知道这里应用了默认绑定呢？可以通过分析调用位置来看看foo() 是如何调
用的。在代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用
默认绑定，无法应用其他规则。其实呢，foo的调用也可以看作是`window.foo()`这样我们可以根据**this指的是，调用函数的那个对象**原则，知道foo中
的this一定指向window。   
注意：在严格模式下，this是无法执行默认绑定的，上述代码会出异常：`TypeError: this is undefined`。  

### 2. 隐式绑定  
另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含。看下面的代码：  

```js  
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2  
```  
这里foo函数被obj调用，因此foo中的this被认为是obj对象，所以输出了2。 
注意：对象属性引用链中只有最顶层或者说最后一层会影响调用位置。例如：    

```js    
function foo() {
    console.log( this.a );
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 42  
```  
这里调用foo的是obj2（也就是最接近调用foo函数的对象）  

### 3. 隐式丢失  
一个最常见的this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从
而把this 绑定到全局对象或者undefined 上，取决于是否是严格模式。例如：    

```js   
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global" 
```  
虽然bar 是obj.foo 的一个引用，但是实际上，它引用的是foo 函数本身，因此此时的
bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。
一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：  

```js   
function foo() {
    console.log( this.a );
}
function doFoo(fn) {
    // fn 其实引用的是foo
    fn(); // <-- 调用位置！
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global" 
```  
参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样。  

### 显式绑定  
在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，
换句话说，就是为了改变函数体内部 this 的指向。例如：  

```js  
function sayName(other) {
    console.log(this.name, other);
}  
var per = {
    name: "hyang"
}
sayName.call(per, "tgy");    //"hyang" "tgy"  
```  
这里本来直接调用sayName函数，this会指向window。但是我们利用call函数，改变了sayName执行的时候this的
指向为per对象。
对于 apply、call 二者而言作用完全一样，二者接受的第一个参数都是要具体制定的this内容，只是第二个参数的存在差别。  
apply接受的第二个参数为数组。  

```js  
sayName.apply(per, ["tgy"]);  
```  
利用call和apply来改变this的指向，在js中十分有用，他可以简化我们的编程。例如：  
求数组中最大的数：  

```js  
var arr = [1, -1, 2, 51, 0]
Math.max.apply(Math, arr);  
```  
再比如直接修改原生方法：给console.log信息加上 "(Hyang)"前缀：  

```js  
var _log = console.log;
console.log = function() {
    //利用call将类数组，转变成数组
    var args = [].slice.call(arguments);
    args.unshift("(Hyang)");
    _log.apply(console, args);
}  
console.log("tgy");    //"(Hyang) tgy";
```  
bind() 方法与 apply 和 call 很相似，也是可以改变函数体内 this 的指向。  
MDN的解释是：bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，
绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上
绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。看看bind的用法：  

#### 创建绑定函数  
bind() 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 this 是原来的对象。（比如在回调中传入这个方法。）
如果不做特殊处理的话，一般会丢失原来的对象。从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题：  

```js  
this.x = 9; 
var module = {
    x: 81,
    getX: function() { return this.x; }
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81  
```  
#### 分离函数 
bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。这些参数（如果有的话）作为bind()的第二个参数跟在this（或其他对象）后面，
之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。  

```js  
function list() {
    return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]  
```  

#### 配合 setTimeout  
在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或全局）对象。当使用类的方法时，需要 this 引用类的实例，
你可能需要显式地把 this 绑定到回调函数以便继续使用实例。  

```js  
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

LateBloomer.prototype.bloom = function() {
    window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
    console.log('I am a beautiful flower with ' +
        this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法  
```  

#### 作为构造函数使用的绑定函数  
自然而然地，绑定函数适用于用new操作符 new 去构造一个由目标函数创建的新的实例。当一个绑定函数是用来构建一个值的，
原来提供的 this 就会被忽略。然而, 原先提供的那些参数仍然会被前置到构造函数调用的前面。  

```js  
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function() { 
    return this.x + ',' + this.y; 
};

var p = new Point(1, 2);
p.toString(); // '1,2'

var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0/*x*/);
// 以下这行代码在 polyfill 不支持,
// 在原生的bind方法运行没问题:
//(译注：polyfill的bind方法如果加上把bind的第一个参数，即新绑定的this执行Object()来包装为对象，Object(null)则是{}，那么也可以支持)
var YAxisPoint = Point.bind(null, 0/*x*/);

var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'

axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new Point(17, 42) instanceof YAxisPoint; // true  
```    

### new 绑定  
调用new也会绑定一个this，这个情况在《类和继承》那节会有描述。   

# 附录  
参考资料如下：  

* [javascript高级程序设计第三版](http://item.jd.com/10951037.html)   
* [你不知道的javascript](http://item.jd.com/11676671.html)  
* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)










