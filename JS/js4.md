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
