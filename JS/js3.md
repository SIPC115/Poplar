作用域，提升与闭包  
===  
# 前置知识  
## 变量赋值  
当我们从一个变量向另一个变量赋值基本类型值和引用类型值时，赋值方式是不同的。  
如果从一个变量向另一个变量复制基本类型的值，会在变量对象上，创建一个新值，然后把该值复制到
为新变量分配的位置上。例如：  

```js  
var num1 = 5;
var num2 = num1;  
```   
num2和num1是完全独立的，如下：   
![](/image/js3-1.png)    
当从一个变量向另一个变量复制引用类型的值时，同样也会将存储在变量对象中的值复制一根到为新变量
分配的空间中。不同的是，这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。
复制操作结束后，连个变量实际上引用同一个对象。  

```js  
var obj1 = {};
var obj2 = obj1;
obj1.name = "hy";
console.log(obj2.name);   //输出 "hy"  
```  
关系如下：  
![](/image/js3-2.png)  

## 传递参数    
在JS中，所有函数的参数都是**按值传递**。也就是说，把函数外部的值复制给函数内部的参数，
就和把值从一个变量复制到另一个变量一样。对于下面这个函数：  

```js  
function setNum(num) {
    num+=10;
    return num;
}  
var count = 10;
var result = setNum(10);
console.log(count, result);  //10, 20
```   
参数num 的变化并不会影响count的变化，可以看出基本类型参数是按照复制的方式传递的而非引用。但是我们如果使用对象
结果就不太一样了。  

```js
function setName(obj) {
    obj.name = "hyang";
}  
var per = {};
setName(per);
console.log(per.name);    //"hyang"
```  

可以看出，obj和per引用的是同一个对象，函数内对obj的修改，影响到了per。这似乎说明了obj是按照引用传递的，再看下面  

```js  
function setName(obj) {
    obj.name = "hyang";
    obj = {};
    obj.name = "tgy"
}  
var per = {};
setName(per);
console.log(per.name);    //"hyang"  
```  
这里结果依然是"hyang"，如果per是按照引用传递的。那么在调用`obj = {}`这句话的时候，per应该同样会受到影响
导致最终结果为"tgy"。**当在函数内部重写obj时，这个变量引用的就是一个局部对象。而这个局部对象会在函数执行完毕后立即被销毁**

# 作用域  
> 通常来说，一段程序代码中所用到的名字并不总是有效/可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。作用域的使用提高了程序逻辑的局部性，增强程序的可靠性，减少名字冲突。  

## 词法作用域  
作用域共有两种主要的工作模型，第一种最常见，被大多数编程语言所采用的词法作用域，另一种为动态作用域。这里讨论的是js的
词法作用域。所谓的词法作用域是由你写代码时将变量和块作用域写在哪儿里来决定的，因此当词法分析器处理代码时会保持作用域不变(大部分是这样)。例如：  

```js  
var per1 = "hyang";
function other() {
    console.log(per1);
    var per2 = "tgy";
    function swapPer() {
        var temp = per2;
        per2 = per1;
        per1 = temp;
    }
    swapPer();
}
other();  
```  
这段代码共有三个执行环境：全局环境，other()的局部环境，swapPer()的局部环境。在全局环境中，我们只能访问到per1，other。而other中，可以访问per2，swapPer
还有per1。同样swapPer可以访问tmp，per2，per1，other这些所有的变量。  
![](/image/js3-3.png)   
可以看出，js 中作用域之间是从下往上查找。内部的环境可以通过作用域链访问外部的环境，但是**反过来不可以**，这是所谓的**作用域向上查找**。作用域查找始终从运行时
所处的最内部作用域开始，逐级向上进行直到遇见第一个匹配的标识符为止。因此多层嵌套作用域中可以定义同名的标识符。例如：  

```js  
var per = "hyang";
function say() {
    var per = "tgy";
    var per2 = "lwq";
    function doSay() {
        console.log(per);
    }
    doSay();
}
say();              //输出 "tgy"
console.log(per);   //"hyang"
console.log(lwq);   //Uncaught ReferenceError: lwq is not defined
```     

**注意：如果定义变量不加 var 关键字，那么变量将自动提升为全局变量**    

> 在php中，作用域是不能向上查找的哦，函数内部是无法访问函数外部的内容的(global 除外)

## eval 和 with
如果词法作用域完全由写代码期间函数所表明的为止来定义(作用域链)，我们能否修改词法作用域呢？js 中可以通过eval函数和with函数修改。这两个
手段并不推荐使用（会降低程序性能），尤其是with在严格模式下, 是不能使用的，因此，这里只提供示例参考。  

eval 欺骗：  

```js  
function printStr(str1, str2) {
    eval(str);
    console.log(str1, str2)
}  
var str1 = "tgy";
printStr('var str1 = "hyang"', "lwq");    //"hyang", "lwq"
```  
这里eval使得str1被声明，屏蔽了全局str1的访问。printStr内部将永远无法访问到"tgy"。   

with 欺骗  

```js 
var a = 1, 
    b = 2;
var obj = {
    a: 3,
    b: 4
} 
console.log(a, b);      //1， 2
with(obj) {
    console.log(a, b);  //3, 4
}
```  
## js 常见作用域   
### 函数作用域  
js 是基于函数作用域的，没声明一个函数，就会创建一个新的作用域。通过上面我们知道，
该函数内部可以访问外部的变量，但是外部却不能访问函数内部的变量。   
基于这种方式，我们可以利用匿名函数的方式，来保护一些内部变量不泄露的全局，对全局造成污染。例如：  

```js 
var a = 2; 
(function() {
    var a = 3;
    console.log(a);   //3
})()
console.log(a);       //2
```  
这种表达式，又叫做IIFE(立即调用函数表达式)。    
IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。例如：  

```js  
var a = 2;
(function IIFE( global ) {
    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2
})( window );
console.log( a ); // 2  
```  
我们将window 对象的引用传递进去，但将参数命名为global，因此在代码风格上对全局
对象的引用变得比引用一个没有“全局”字样的变量更加清晰。当然可以从外部作用域传
递任何你需要的东西，并将变量命名为任何你觉得合适的名字。这对于改进代码风格是非
常有帮助的。  

IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在IIFE
执行之后当作参数传递进去。这种模式在UMD（Universal Module Definition）项目中被广
泛使用。尽例如：  

```js  
var a = 2;
(function IIFE( def ) {
    def( window );
})(function def( global ) {
    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2
});
```   

### 没有块级作用域  
js 是没有块级作用域的(其他语言都有，ES6中用let可以有)，例如：  

```js  
for(var i = 0; i < 10; i++) {
    console.log(i);
}  
```    
我们在for 循环的头部直接定义了变量i，通常是因为只想在for 循环内部的上下文中使
用i，而忽略了i 会被绑定在外部作用域（函数或全局）中的事实，这个变量i会污染全局(在其他语言中，由于块级
作用域的存在我们是访问不到i的)。  

### with 作用域  
用with 从对象中创建出的作用域仅在with 声明中而非外
部作用域中有效。  

### try/catch  
ES3 规范中规定try/catch 的catch 分句会创建一个块作
用域，其中声明的变量仅在catch 内部有效。例如：  

```js  
try {
    undefined(); // 执行一个非法操作来强制制造一个异常
}catch (err) {
    console.log( err ); // 能够正常执行！
}
console.log( err ); // ReferenceError: err not found 
```  
正如你所看到的，err 仅存在catch 分句内部，当试图从别处引用它时会抛出错误。  

### let 和 const 
留到es6再说  


# 变量提升与函数提升  
我们知道js作为脚本语言，代码时从上到下一行一行执行的，但是并非所有情况都是如此。例如：  

```js  
a = 2;
var a;
console.log(a);   //2而不是undefined
```  
这里如果按照，一行一行执行，那么最终结果将是undefined。而事实上，结果是2。  
这种情况产生的原因主要是： 引擎会在解释JavaScript 代码之前首先对其进行编译。编译阶段中的一部分工作就是找到所有的
声明，并用合适的作用域将它们关联起来(这个机制也产生了作用域)。 所以，编译阶段中会把包括变量和函数在内的所有声明都会在任何代码被执行前首先
被处理。  
当你看到var a = 2; 时，可能会认为这是一个声明。但JavaScript 实际上会将其看成两个
声明：var a; 和a = 2;。第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在
原地等待执行阶段。  
所以上述代码，在编译过程中已经声明了`a`，而`a = 2`是在运行过程中才有的。 这种现象我们称之为变量提升，就好像代码变成了这样:  

```js  
var a;
a = 2;
console.log(a);  
```  
同样，函数声明也会被提升，例如：  

```js  
foo();
function foo() {
    console.log( a ); // undefined
    var a = 2;
} 
```  
foo 函数的声明被提升了，因此第一行中的调用可
以正常执行。另外值得注意的是，每个作用域都会进行提升操作。尽管前面大部分的代码片段已经简化
了（因为它们只包含全局作用域），而我们正在讨论的foo(..) 函数自身也会在内部对var
a 进行提升（显然并不是提升到了整个程序的最上方）。因此这段代码实际上会被理解为下
面的形式： 

```js  
function foo() {
    var a;
    console.log( a ); // undefined
    a = 2;
}
foo(); 
```  
可以看到，函数声明会被提升，但是函数表达式却不会被提升。  

```js  
foo(); // 不是ReferenceError, 而是TypeError!
var foo = function bar() {
    // ...
}; 
```
这段程序中的变量标识符foo() 被提升并分配给所在作用域（在这里是全局作用域），因此
foo() 不会导致ReferenceError。但是foo 此时并没有赋值（如果它是一个函数声明而不
是函数表达式，那么就会赋值）。foo() 由于对undefined 值进行函数调用而导致非法操作，
因此抛出TypeError 异常。    

**函数优先**  
函数声明和变量声明都会被提升。但是一个值得注意的细节（这个细节可以出现在有多个
“重复”声明的代码中）是函数会首先被提升，然后才是变量。例如：  

```js  
foo(); // 1
var foo;
function foo() {
    console.log( 1 );
}
foo = function() {
    console.log( 2 );
}; 
```  
其实会被改写成这样：  

```js  
function foo() {
    console.log( 1 );
}
foo(); // 1
foo = function() {
    console.log( 2 );
};
```    

# 闭包  
当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用
域之外执行。例如：    

```js  
function foo() {
    var a = 2;
    function bar() {
        console.log( a );
    }
    return bar;
}
var baz = foo();
baz(); // 2  
```
函数bar() 的词法作用域能够访问foo() 的内部作用域。然后我们将bar() 函数本身当作
一个值类型进行传递。在foo() 执行后，其返回值（也就是内部的bar() 函数）赋值给变量baz 并调用baz()，实
际上只是通过不同的标识符引用调用了内部的函数bar()。在foo() 执行后，通常会期待foo() 的整个内部作用域都被销毁，因为我们知道引擎有垃
圾回收器用来释放不再使用的内存空间。然而闭包却阻止了这一过程，事实上内部作用域依然存在，因此
没有被回收。bar() 它拥有涵盖foo() 内部作用域的闭包，使得该作用域能够一
直存活，以供bar() 在之后任何时间进行引用。bar() 依然持有对该作用域的引用，而这个引用就叫作闭包。  
**这个函数在定义时的词法作用域以外的地方被调用。闭包使得函数可以继续访问定义时的
词法作用域。无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用
域的引用，无论在何处执行这个函数都会使用闭包。**  

## 循环和闭包  
看下面这段代码：  

```js  
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log( i );
    }, i * 1000 );
}  
```
正常情况下，我们对这段代码行为的预期是分别输出数字1~5，每秒一次，每次一个。但实际上，这段代码在运行时会以每秒一次的频率输出五次6。  
这里的问题在于，我们期望传入的i是一个i的副本，但是根据作用域的工作原理，实际上5次循环都被封闭在一个全局作用域中，setTimout回调函数使用
的i都是对i的引用。为此我们需要更多的作用域，同事拷贝i出来作为副本，而不是用引用才可以达到预期效果。这里使用IIFE  

```js  
for (var i=1; i<=5; i++) {
    (function() {
        var j = i;
        setTimeout( function timer() {
            console.log( j );
        }, j*1000 );
    })();
} 
```  
这里完全可以吧i当成实参，j当做形参简化写法。     
在迭代内使用IIFE 会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的
作用域封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问。   


仔细思考我们对前面的解决方案的分析。我们使用IIFE 在每次迭代时都创建一个新的作用
域。换句话说，每次迭代我们都需要一个块作用域就能玩的解决这个问题。那么ES6的let就可以了。  

```js    
for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}
```
(for 循环头部的let 声明还会有一个特殊的行为。这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量。)


## 模块   
这里上段代码，自己体会下吧。模块机制，后面会说的。  

```js  
var require = (function (name) {
    var modules = {};
    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }
    function get(name) {
        return modules[name];
    }
    console.log(name)
    return {
        define: define,
        get: get
    }
}())
require.define('foo', [], function () {
    return {
        hello: function () { 
            console.log('hello world');
        },
        name: 'foo'
    }
})
require.define('bar', ['foo'], function (foo) {
    return {
        hello: function () { 
            console.log('bar:' + foo.name); 
        },
        name: 'bar'
    }
})
require.define('user', ['foo', 'bar'], function (foo, bar) {
    return {
        hello: function () { 
            console.log('user:' + foo.name + ', ' + bar.name);
        }
    }
})
var foo = require.get('foo')
var bar = require.get('bar')
var user = require.get('user')
foo.hello()
bar.hello()
user.hello()  
```   

# 附录  
* [javascript高级程序设计第三版](http://item.jd.com/10951037.html)   
* [你不知道的javascript](http://item.jd.com/11676671.html)










