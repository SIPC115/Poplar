作用域与闭包  
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


