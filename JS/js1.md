js 基本语法1  
===  
> JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型。它的解释器被称为JavaScript引擎，为浏览器的一部分，
广泛用于客户端的脚本语言，最早是在HTML（标准通用标记语言下的一个应用）网页上使用，用来给HTML网页增加动态功能。    

# 严格模式  
## 定义  
除了正常运行模式，ECMAscript 5添加了第二种运行模式："严格模式"（strict mode）。顾名思义，这种模式使得Javascript在更严格的条件下运行。   
设立"严格模式"的目的，主要有以下几个：  

* 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
* 消除代码运行的一些不安全之处，保证代码运行的安全；
* 提高编译器效率，增加运行速度；
* 为未来新版本的Javascript做好铺垫。  

在我们平时变成的时候，最好是使用严格模式，这样能大大的减少代码出错的概率。   
## 进入严格模式   
进入"严格模式"的标志，是下面这行语句：    

```javascript  
"use strict";
```   
老版本的浏览器会把它当作一行普通字符串，加以忽略。"严格模式"有两种调用方法，适用于不同的场合。  
### 针对整个脚本文件  
将"use strict"放在脚本文件的第一行，则整个脚本都将以"严格模式"运行。如果这行语句不在第一行，则无效，整个脚本以"正常模式"运行。如果不同模式的代码文件合并成一个文件，这一点需要特别注意
(严格地说，只要前面不是产生实际运行结果的语句，"use strict"可以不在第一行，比如直接跟在一个空的分号后面。)  
### 针对单个函数  
将"use strict"放在函数体的第一行，则整个函数以"严格模式"运行。例如：  

```javascript  
function strict() {
    "use strict";
    return "这是严格模式";
}
function notStrict() {
    return "这是正常模式";
}  
```   
### 变通写法  
因为第一种调用方法不利于文件合并，所以更好的做法是，借用第二种方法，将整个脚本文件放在一个立即执行的匿名函数之中。  

```javascript  
(function (){
    "use strict";
　　 // some code here
})();  
```  
## 语法和行为的改变  
严格模式对Javascript的语法和行为，都做了一些改变。  
### 全局变量显式声明  
在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，全局变量必须显式声明。因此，严格模式下，变量都必须先用var命令声明，然后再使用。  
### 静态绑定  
Javascript语言的一个特点，就是允许"动态绑定"，即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在运行时（runtime）确定的。
严格模式对动态绑定做了一些限制。某些情况下，只允许静态绑定。也就是说，属性和方法到底归属哪个对象，在编译阶段就确定。这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外。
具体来说，涉及以下几个方面。    

1. 禁止使用with语句：因为with语句无法在编译时就确定，属性到底归属哪个对象。  
2. 创设eval作用域：正常模式下，Javascript语言有两种变量作用域（scope）：全局作用域和函数作用域。严格模式创设了第三种作用域：eval作用域。
正常模式下，eval语句的作用域，取决于它处于全局作用域，还是处于函数作用域。严格模式下，eval语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于eval内部。    

### 增强的安全措施  
1. 禁止this关键字指向全局对象，因此，使用构造函数时，如果忘了加new，this不再指向全局对象，而是报错。  
2. 禁止在函数内部遍历调用栈  

### 禁止删除变量  
严格模式下无法删除变量。只有configurable设置为true的对象属性，才能被删除。  

### 重名错误  
1. 对象不能有重名的属性：正常模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值。严格模式下，这属于语法错误。    
2. 函数不能有重名的参数：正常模式下，如果函数有多个重名的参数，可以用arguments[i]读取。严格模式下，这属于语法错误。

### 禁止八进制表示法  
### arguments 对象的限制   
1. 不允许对arguments赋值  
2. arguments不再追踪参数的变化    

```javascript  
function f(a) {
    a = 2;
　　return [a, arguments[0]];
}
f(1); // 正常模式为[2,2]
function f(a) {
　　"use strict";
    a = 2;
　　return [a, arguments[0]];
}
f(1); // 严格模式为[2,1]  
``` 
3. 禁止使用arguments.callee：这意味着，你无法在匿名函数内部调用自身了。  

### 函数必须声明在顶层  
将来Javascript的新版本会引入"块级作用域"。为了与新版本接轨，严格模式只允许在全局作用域或函数作用域的顶层声明函数。也就是说，不允许在非函数的代码块内声明函数。  

### 保留字  
为了向将来Javascript的新版本过渡，严格模式新增了一些保留字：implements, interface, let, package, private, protected, public, static, yield。
使用这些词作为变量名将会报错。  

### 开启ES6模式  
在新版本的浏览器中，如果想要使用ES6的语法，就一定要开启严格模式才可以。  


# 数据类型  
## Number 类型  
在JavaScript中，数字类型本身就是包括整形，浮点型，八进制，十六进制等(八进制在严格模式下不能使用)。字面量声明方法如下：    

```javascript    
var num1 = 1;
var num2 = 1.2;
var num3 = 070;
var num4 = 0xA
```     
在js中浮点数值的最高精度是17位小数，但在进行算术运算时，其精度远远不如证书。例如：0.1 + 0.2 并不等于 0.3，如下：  
![](/image/js1-1.png)  
因此永远不要测试某个特定的浮点数值。    
数值范围：由于内存限制，js并不能保存所有的数值，js能够表示的最小和最大值分别保存在：`Number.MIN_VALUE`和`Number.MAX_VALUE`中：  
![](/image/js1-2.png)  
如果末次运算超过了这一数值，则会自动转换为特殊的`Infinity(-Infinity)`值，Infinity值是无法参与计算的。利用`isFinite()`函数，可以判断变量是不是无穷的。  
### NaN  
NaN，是一个特殊值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况。例如：1 / 0 操作，就会返回 NaN 这个特殊值。  
NaN 本身有两个特点：首先任何涉及NaN的操作都会返回NaN。其次NaN与任何值都不想等，包括NaN本身。   

```javascript  
console.log(NaN == NaN);  //输出false  
```   
判断一个变量是不是NaN我们可以用`isNaN()`函数。  
### 数值转换  
有三个函数可以把非数值类型转换为数值：`Number()`，`parseInt()`和`parseFloat()`。第一个函数可以用于任何数据类型，而另外两个只能转换字符串。  
Number转换规则如下：  
* 如果是布尔类型，则true和false分别转换为1和0  
* 如果是数字，不作任何处理直接返回  
* 如果是undefined，则返回NaN
* 如果是字符串，则如果字符串是符合数字的模式就返回转换后对应数字，否则一律返回NaN    

parseInt是把字符串转换成整形，他会从第一个数字字符找到第一个不是数字字符的位置，进行转换。如果字符串的第一个非空字符不是数字字符则返回NaN。如果是小数，则
仅保留整数部分。  
parseInt还提供了第二个参数，用来表明要转换的数字字符串的进制格式。parseFloat用法同理。   

### Number 对象  
Number 对象是原始数值的包装对象。当 Number() 和运算符 new 一起作为构造函数使用时，它返回一个新创建的 Number 对象:  

```javascript   
var num1 = new Number(1);  //Number {[[PrimitiveValue]]: 1} 
typeof num1;   //"object"  
```  
而不加new关键字，则把Number看成函数，它将把自己的参数转换成一个原始的数值，并且返回这个值（如果转换失败，则返回 NaN）。  
Number对象上，包含了许多对象方法,常用的有：  
* `toString`：把数字转换为字符串，使用指定的基数  
* `toFixed`：吧数字转换为字符串，结果的小数点后有指定位数的数字  

```javascript
var num = 1.2;
num.toString(); // "1.2"
num.toFixed(2); // 1.20  
```    
这里你会问，这不是Number对象的方法么，你这num也不是对象啊。这是因为当用户通过字面量方式声明一个变量，
并在该变量上调用如toString等方法，JS脚本引擎会偷偷地创建该变量对应的包装对象，
并在该对象上调用对应的方法；当调用结束，则销毁该对象；这个过程对于用户来说是不可见的。这也是字面量和new Number声明数字类型的区别。  


## string 类型  
用于表示由零或多个16位Unicode字符组成的字符序列，即字符串。字符串可以由双引号或单引号表示。  
在js中字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变，要想改变只能用新的变量保存：  

```javascript  
var str = "sipc115";
str[0] = 'A';  //str 依然是 sipc115  
```    
转换为字符串用toString对象方法或者String()函数。  
null和undefined是没有toString方法的，而String()函数可以应用在所有类型上面。   

## Array 类型    
Array即数组类型，js中的数组里面的数据类型不受限制，可以任意选择。声明一个数组主要有以下两种方法：  

```javascript  
var arr = new Array(3);   //创建一个包含3项的数组  
var arr2 = new Array("a", "b");  //创建包含"a", "b"两项的内容  
var arr3 = [1, 2, "a", "b"];     //字面量方式创建数组  
``` 
数组的长度包含在`length`属性中例如`arr.length`，我们可以通过下标的方式访问数组中的每一项如`arr[0]`;访问一个数组中不存在的项，会返回 undefined。   

##  Undefined 类型  
Undefined 类型只有一个值，特殊的`undefined`。在使用var声明变量但未对其加以初始化时，这个变量就是undefined。例如：  

```javascript  
var a;
console.log(a == undefined);    //true  
```    

## Null 类型  
Null 类型是第二个只有一个值的数据类型，即null。他用来表示一个空对象指针，通常我们向声明一个变量是对象类型，但是暂时又不知道什么值的时候可以用null赋值。  

```javascript
var obj = null;
typeof obj; //object  
```  

实际上，undefined值派生自null值的，`null == undefined` 返回真。    

## Boolean 类型 
该类型只有 `true`和`false`两个字面值，各数据转换为布尔值的测试结果如下：  

|数据类型|转换为true的值|转换为false的值|  
|:---:|:---:|:---:|  
|Boolean|true|false|  
|String|任何非空字符串|""（空字符串）|  
|Number|任何非零数字值(包括无穷大)|0和NaN|  
|Object|任何对象|null|  
|undefined|不适用|undefined|  

## Math，Date，Regex  
这三种类型，参考手册看吧  

# 数据类型判定  
Javascript自带两套类型：基本数据类型（undefined，string，null，boolean，function，object）和对象类型，但是Javascript对于这两套类型的检测机制非常的不靠谱，举个例子来说：  

```javascript  
typeof null  // "object"
typeof []    // "object"
typeof document.childNodes  //"object"
typeof /d/  //"object"
typeof new Number() //"object"
```    
上面都尝试用typeof 来检测数据类型，但是都一律返回"object"并不能加以区分，甚至连通过构造函数Number()产生的对象都不能正确识别，说明typeof不能检查复杂的数据类型，以及特殊用途的对象（正则表达式，日期等）
这时尝试用 constructor 属性来检测类型的构造函数，从而区分这些对象：  

```javascript    
[].constructor === Array    //true
document.childNodes === NodeList    //true
/d/.constructor === RegExp     //true

function isRegExp(obj) {
    return obj && typeof obj === "object" && obj.constructor === RegExp;
}  //检测正则表达式对象

function isNull(obj){
    return obj === null;
} 
```  
貌似很美好了，但是依然出现了以外，不能检测iframe中的Array：  

```javascript 
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
var iArray = window.frames[0].Array;
var arr = new iArray(1,2,3);    //arr [1,2,3]arr.constructor === Array   //false
arr instanceof Array    //false
```  

可以看到，用construct检测可以完成大多数的类型检测，null特殊直接比较。然而iframe中的数组类型确无法检测出正确类型，这是用construct检测的一个缺陷；同时在旧版本IE下DOM和BOM的construct是无法访问的，这导致该方法失效。


## 利用 Object.prototype.toString 来判断  
利用Object.prototype.toString 可以轻松的实现数据类型的判断，例如：  

```javascript   
Object.prototype.toString.call([])  //"[object Array]"
Object.prototype.toString.call(/d/)  // "[object RegExp]"
Object.prototype.toString.call(1)//"[object Number]" 
```  
这里采用Object的toString方法是因为不同对象都会重新定义自己的toString方法。使用该方法检测数据类型也是目前主流js框架的通用方法。查看jQuery源代码中：  

```javascript   
/*
 *  jQuery JavaScript Library v1.11.2
 */
var class2type = {};    //用来保存js数据类型

jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

type: function( obj ) {
                if ( obj == null ) {
                        return obj + "";
                }
                return typeof obj === "object" || typeof obj === "function" ?
                        class2type[ toString.call(obj) ] || "object" :
                        typeof obj;
        },
/****************************/        
jQuery.type(/d/)   //"regexp"
jQuery.type(new Number())   //"number"
```  

代码首先构造class2type存储常用类型的映射关系，遍历基本类型并赋值，键值为 [object 类型]，之后type函数为判断类型，首先如果是null则返回null字符串，接着判断给定参数类型是否为object或者function是的话在映射表中寻找 toString后的键值名称并返回，不是的话利用typeof就可以得到正确类型。
在其他的框架中，同样采用该方式判定类型，只不过有的是isXXX类的函数为没有像jQuery.type的方法了。  

##  一些特殊类型的检测  
通常情况下Object.prototype.toString都能很好的完成任务，但是万恶的旧版本IE缺有bug存在：如图IE8调试台下（这里我没有IE浏览器了，所以截图是从我之前w3cfun上面的
博客截取的，有水印没办法）：  
![](/image/js1-3.png)  
这主要是因为undefined 在javascript中并不是关键字，在IE8以下（之后的版本不可以赋值）是可以赋值的，查看jQuery.type源码可知，对于undefined检测由是 typeof undefined完成的。jQuery.type并不能在旧的IE中检测出undefined的正确性。想要获得纯净的undefined可以使用void 0   
![](/image/js1-4.png)   
对于DOM，BOM对象在旧的IE中使用Objec.prototype.toString检测出来的值均为 “[object Object]”  
![](/image/js1-5.png)  
chrome下：  
![](/image/js1-6.png)  
jQuery.type检测均为 “object”，jQuery中仅处理了window对象 isWindow，和一个isPlainObject用来检测对象是否是js纯净的对象（{}，new Object()声明的）:  

```javascript  
isWindow: function( obj ) {
                return obj != null && obj == obj.window;
        },
        
        isPlainObject: function( obj ) {
                var key;
                if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
                        return false;
                }

                try {
                        if ( obj.constructor &&
                                !hasOwn.call(obj, "constructor") &&
                                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                                return false;
                        }
                } catch ( e ) {
                        return false;
                }
                if ( support.ownLast ) {
                        for ( key in obj ) {
                                return hasOwn.call( obj, key );
                        }
                }
                for ( key in obj ) {}

                return key === undefined || hasOwn.call( obj, key );
        },  
```  
检测window对象：ECMA规定window为全局对象global，且global.window === global
判断纯净的对象：判断它最近的原形对象是否含有isPrototypeOf属性
mass Framework中，将可能出现的类型都映射在了class2type对象中，从而减少isXXX函数，对DOM，BOM对象采用nodeType（单一）和item（节点集合）进行判断:  

```javascript   
var class2type = {
        "[object HTMLDocument]": "Document",
        "[object HTMLCollection]": "NodeList",
        "[object StaticNodeList]": "NodeList",
        "[object DOMWindow]": "Window",
        "[object global]": "Window",
        "null": "Null",
        "NaN": "NaN",
        "undefined": "Undefined"
    };

 type: function(obj, str) {
            var result = class2type[(obj == null || obj !== obj) ? obj : serialize.call(obj)] || obj.nodeName || "#"; //serialize == class2type.toString
            if (result.charAt(0) === "#") { //兼容旧式浏览器与处理个别情况,如window.opera
                //利用IE678 window == document为true,document == window竟然为false的神奇特性
                if (obj == obj.document && obj.document != obj) {
                    result = "Window"; //返回构造器名字
                } else if (obj.nodeType === 9) {
                    result = "Document"; //返回构造器名字
                } else if (obj.callee) {
                    result = "Arguments"; //返回构造器名字
                } else if (isFinite(obj.length) && obj.item) {
                    result = "NodeList"; //处理节点集合
                } else {
                    result = serialize.call(obj).slice(8, -1);
                }
            }
            if (str) {
                return str === result;
            }
            return result;
        } 
```  

mass.js中的type已经十分全面了，非常有用。  

## 类数组 
类数组是一类特殊的数据类型存在，他们本身类似Array但是又不能使用Array的方法，他们有一个明显的特点就是含有length属性，而且键值是以整数有序的排列的。这样的数组可以通过 Array.slice() 这样的方法转换成真正的数组，从而使用Array提供的方法。
常见类数组：arguments，document.forms，document.getElementsByClassName(等一些列节点集合NodeList，HTMLCollection)，或者是一些特殊对象：  
![](/image/js1-7.png)  
通常情况下通过Array.slice.call既可以转换类数组，但是旧IE的HTMLCollection，NodeList不是Object的子类，不能使用该方法，这时候需要构建一个空数组，然后将遍历节点push就如空数组中，返回新生成的数组即可，同时要区别出window 和 string对象，因为这类的对象同样含有length>=0（length不可被修改），但是不是类数组。看一下各插件的源码：  

```javascript  
//jQuery 
makeArray: function( arr, results ) {
                var ret = results || [];

                if ( arr != null ) {
                        if ( isArraylike( Object(arr) ) ) {
                                jQuery.merge( ret,
                                        typeof arr === "string" ?
                                        [ arr ] : arr
                                );   //jQuery.merge 合并数组 ，若是字符串则封装成数组河滨，不是则世界合并
                        } else {
                                push.call( ret, arr );
                        }
                }

                return ret;
        }

//Ext.js
  toArray: function(iterable, start, end) {
                if (!iterable || !iterable.length) {
                    return [];   //非类数组类型直接返回[]
                }
                if (typeof iterable === 'string') {
                    iterable = iterable.split('');   //分解字符串
                }
                if (supportsSliceOnNodeList) {
                    return slice.call(iterable, start || 0, end || iterable.length); //对于NodeList支持
                }
                var array = [],
                    i;
                start = start || 0;
                end = end ? ((end < 0) ? iterable.length + end : end) : iterable.length;
                for (i = start; i < end; i++) {
                    array.push(iterable[i]);
                }
                return array;
            }
//mass.js
slice: W3C ? function(nodes, start, end) {    //var W3C = DOC.dispatchEvent; IE9开始支持W3C的事件模型
            return factorys.slice.call(nodes, start, end);
        } : function(nodes, start, end) {
            var ret = [],
                    n = nodes.length;
            if (end === void 0 || typeof end === "number" && isFinite(end)) {
                start = parseInt(start, 10) || 0;
                end = end == void 0 ? n : parseInt(end, 10);
                if (start < 0) {
                    start += n;
                }
                if (end > n) {
                    end = n;
                }
                if (end < 0) {
                    end += n;
                }
                for (var i = start; i < end; ++i) {
                    ret[i - start] = nodes[i];
                }
            }
            return ret;
        }
```  
其中mass.js直接复写Array.slice的方法实现类数组转换。
附上参考上述内容，自己写的一个方法：  

```javascript  
var caelum = (function(){
        var _W3C = document.dispatchEvent;   //IE9+才支持该属性
        var _toString = Object.prototype.toString;
        var _factory = Array.prototype.slice;
        var _class2type = {
                "null" : "null",
                "NaN" : "NaN",
                "[object Number]" : "number",
                "[object Boolean]" : "boolean",
                "[object String]" : "string",
                "[object Function]" : "function",
                "[object Array]" : "array",
                "[object RegExp]" : "regexp",
                "[object Date]" : "date",
                "[object HTMLDocument]" : "Document",
                "[object HTMLCollection]" : "NodeList",
                "[object StaticNodeList]" : "NodeList",
                "[object DOMWindow]" : "Window",
                "[object global]" : "Window",
                "[object Arguments]" : "Arguments"
        }
        function init_type(obj, str){
                if(obj === void 0){
                        return "undefined";
                }
                var result = _class2type[ (obj === null || obj !== obj) ? obj : _toString.call(obj) ] || obj.nodeName;
                // 兼容IE8以下window检测
                if(obj == obj.window){
                        result = "Window";
                }else if(obj.nodeType === 9){
                        result = "Document";
                }else if(obj.callee){
                        result = "Arguments";
                }else if(isFinite(obj.length) && obj.item){
                        result = "NodeList";    //检测是否含有item属性，且length为数字
                }
                return result;
        }
        function makeArray(obj, start, end){
                //惰性载入函数
                if(_W3C){
                        makeArray = function(obj, start, end){
                                return _factory.call(obj, start, end);
                        }
                }else{
                        //主要是处理IE9以下，节点类数组
                        makeArray = function(obj, start, end){
                            if (!obj || !obj.length) {
                    return [];
                }
                                var array = [],
                                        length = obj.length,
                                        start = start || 0,
                                        end = end ? ((end < 0) ? length + end : end) : length;   //处理-1这样的情况
                                for(var i = start; i < end ;i++){
                                        array.push(obj[i]);
                                }
                                return array;
                        }
                }
                return makeArray(obj, start, end);   //立即调用
        }
        return {
                type : init_type,
                toArray : makeArray
        }
})()     //数据类型判断 数组转换 module方式  
```  

# 附录  
参考资料如下：  
* [javascript高级程序设计第三版](http://item.jd.com/10951037.html)  
* [jQuery框架设计](https://item.jd.com/11436424.html)  
* [jQuery2.2 源码](https://github.com/jquery/jquery/tree/2.2-stable)






















