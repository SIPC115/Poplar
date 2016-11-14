对象，this与原型  
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
