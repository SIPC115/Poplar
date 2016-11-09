js 基本语法2  
===    
之前介绍了js的基本数据类型，这里对基本的数据类型的所拥有的的方法进行扩展，介绍一些js中未原生支持，但是又很使用的方法    

# 字符串方法的扩展  
## 字符串长度与字节长度  
字符串的长度我们可以通过访问其`length`属性来获得。这里所说的长度，其实是字符串中的字符数目，而不是实际长度。例如  

```javascript  
var str = "计算机sipc115"；
console.log(str);   //10
```   
我们知道，一个汉字占用两个字节，所以我们还需要一种判断字符串字节长度的方法，如下：  

```javascript   
function byteLen(string, fix) {
    fix = fix ? fix : 2;
    var str = new Array(fix + 1).join("-");
    return string.replace(/[^\x00-\xff]/g,str).length;  //将汉字全部替换成 -- 之类的,然后查看长度
}
```  
## trim 去除首尾空白符  
在最新版的浏览器中，我们可以通过`trim`对象方法，来去除字符串的首位空白符。例如:  

```javascript  
var str = "   SIPC  ";
console.log(str.trim());  //SIPC  
```  
在旧版本浏览器中，不支持该方法，我们可以利用下面这个函数：  

```javascript  
function trim(string){
    return string.replace(/^s\s*/,'').replace(/\s\s*$/,'');
}  
```  

## contains(String string, String search)    
判断目标字符串 search 是否在string中，返回boolean：  

```javascript    
function contains(string, search) {
    if(search === void 0) {
        return false;
    }
    return string.indexOf(search) !== -1;
}
```  

## startWith(String string, String search, Boolean ignorecase)    
上述方法的扩展，判断目标字符串search是否在string的开头，ignorecase(可选)是否忽略大小写，默认不忽略，返回boolean：  

```javascript  
function startWith(string, search, ignorecase) {
    var result = string.substr(0, search.length);   //在开头截去目标字符串长度
    return ignorecase ? result.toUpperCase() === string.toUpperCase() : result === search;
}  
```  

## endWidth(String string, String search, Boolean ignorecase)   
这次判断是否在string结尾，参数同上：  

```javascript  
function endWidth(string, search, ignorecase) {
    var result = string.substr(string.length - search.length);
    return ignorecase ? result.toUpperCase() === string.toUpperCase() : result === search;
}  
```  

## repeat(String target, Int n, String sep)  
根据给定的格式字符串与指定的重复次数返回一个新的格式字符串，n：一共重复几次，sep(可选)：重复字符串连接方式，默认“”;返回string  

```javascript   
function repeat(target, n, sep) {
    n = n < 0 ? 0 : n;
    for(var buf=[]; n > 0; n--){
        buf.push(target);
    }
    return buf.join(sep || "");
} 
```  

## ellipsis(String string, Int len, String escripe)  
]对大于指定长度的字符串，进行裁剪，增加省略号('...')的显示; string指定字符串，len总长度，默认30，escripe(可选)指定增加的符号默认“...”：  

```javascript   
function ellipsis(string, len, escripe) {
       len = len || 30;  //默认30截去
       escripe = escripe === void 0 ? "..." : escripe;
        return string.length > len ? string.slice(0, len - escripe.length) + escripe : string;  
} 
```  

## capitalize(String string)  
返回一个字符串首字母大写  

```javascript  
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
}  
```  

## pad(String string, Int len, String fill, String direct)  
类似php中str_pad方法，把字符串填充为指定长度。   
string 指定字符串，len 填充后总长度（若小于给定字符串长度则不填充），fill(可选) 规定填充字符 默认"0"，
direct(可选)规定填充方向 默认右侧填充 值："PAD_LEFT" "PAD_RIGHT"    

```javascript  
function pad(string, len, fill, direct) {
    fill = fill || "0";
    while(string.length < len) {     //和给定填充后长度对； Ext.js采用质朴长存法，这样就可以避免了每次计算string.length的麻烦
        if(direct === "PAD_LEFT") {
            string = fill + string;
        }else{
            string = string + fill;
        }
    }
     return string;
}
//示例：
pad("AA","4");  //"AA00"
pad("AA","4","-","PAD_LEFT"); //"--AA"  
```   

## camelize(String string)  
返回一个字符串的驼峰书写形式：  

```javascript  
function camelize(string) {
    if(string.indexOf("-") < 0 && string.indexOf("_") < 0) {
        return string;   //直接返回
    }
    return string.replace(/[-_][^-_]/g, function(match) {   //对 "_" 、"-" 及其紧跟的一个字符进行匹配
        return match.charAt(1).toUpperCase();
    })
}  
```  

## urlAppend(String url, String string)  
追加url的search部分,返回追加后的url：  

```javascript  
function urlAppend(url, string) {
    return string === void 0 ? string : url + (url.indexOf('?') === -1 ? '?' : '&') + string; 
}
```  

## removeScripts(String string)  
删除字符串中script标签及其包含内容，返回结果：  

```javascript   
function removeScripts(string) {
    return string === void 0 ? string : string.replace(/<script[^>]*>([\S\s]*?)<\/script>/img,"");
} 
```  

## format(String string, [String args  Object obj])  
该方法在ES6已经有了更好的替代，不用自己实现了。但是在不支持ES6的环境中，还是有用的。  
根据{}格式化输出字符串  
string给定字符串，支持两种传参方式：如果字符串的占位符为0,1,2这类的非零整数，要求传入两个或者两个以上的参数；否则就传入一个对象，键名为占位符：  

```javascript  
function format(string, args) {
    var array = Array.prototype.slice.call(arguments,1);
    return string.replace(/\{([^{}]+)\}/gm,function(match,name){ 
        var index = Number(name);   //尝试是不是数字;
        if(index >= 0) {
            return array[index];
        }
        if(args && args[name] !== void 0) {
            return args[name];
        }
        return '';   //都没有的情况下
    })
}
//示例
var aa = format("姓名：{0}；年龄：{1}","CaelumTian","21");
console.log(aa)  //姓名：CaelumTian；年龄：21
var bb = format("姓名：{name}；年龄：{age}",{
    "name" : "CaelumTian",
    "age" : "21"
})
console.log(bb);   //姓名：CaelumTian；年龄：21  
```  

# 数组的修复与扩展  
Javascript数组提供的方法大多数和栈操作，队列操作有关这些也是常用的方法。在对数组扩展之前，我们首先看一下数组在IE8以下存在的部分问题。  
## 数组修复  
### 迭代方法的修复  
ECMAScript5为数组提供了5个迭代方法，每个方法都接受两个参数一个是运行每一项的函数，另一个是运行该函数的作用域对象；为了不支持ECMAScript5标准的浏览器，添加这几个迭代方法：  
#### forEach  
对数组中每一项运行给定函数没有返回值  

```javascript    
if (! ('forEach' in arrayPrototype)) {
    arrayPrototype.forEach = function(fn, scope) { //scope为运行作用域
        for (var i = 0,
        j = this.length; i < j; i++) {
            fn.call(scope, this[i], i, this); //为回调传入三个参数：this，当前内容，索引，迭代的对象
        }
    }
}
```  

#### filter  
对数组中每一项运行给定函数，返回该函数返回true的函数  

```javascript   
if (! ('filter' in arrayPrototype)) {
    arrayPrototype.filter = function(fn, scope) {
        var result = [];
        for (var i = 0,
        j = this.length; i < j; i++) {
            if (fn.call(scope, this[i], i, this)) { //若fn返回true，则添加
                result.push(this[i]);
            }
        }
        return result; //返回结果
    }
} 
```  

#### map  
对数组中每一项运行给定函数，返回每一次调用产生的结果集合  

```javascript  
if (! ('map' in arrayPrototype)) {
    arrayPrototype.map = function(fn, scope) { 
        var result = [];
        for (var i = 0,
        j = this.length; i < j; i++) {
            result[i] = fn.call(scope, scope, this[i], i, this);
        }
        return result;
    }
}  
```  

#### every  
对数组中每一项运行给定函数，如果每一项都返回true，则返回true  

```javascript  
if (! ('every' in arrayPrototype)) {
    arrayPrototype.every = function(fn, scope) { //scope为运行作用域
        for (var i = 0,
        j = this.length; i < j; i++) {
            if (!fn.call(scope, this[i], i, this)) {
                return false; //有错误的就返回false
            }
        }
        return true;
    }
}  
```  

#### some  
对数组中每一项运行给定函数，如果任意一项返回true，则返回true  

```javascript    
if(!('some' in arrayPrototype)) {
    arrayPrototype.some = function(fn, scope) {   //scope为运行作用域
        for(var i = 0, j = this.length; i < j; i++){
            if (fn.call(scope, this[i], i, this)) {
                return true;   //有错误的就返回false
            }
        }
        return false;
    }
}
```   
以上就是这5个迭代方法实现原理，通过代码我们可以发现，可以发现迭代方法都是通过一个循环遍历数组每项，作为参数传入指定函数；唯一的区别就是是否有返回值和判断条件，因此我们可以创建一个iterator函数模板，之后通过传入区别部分，来构造这些迭代方法。下面的示例是avalon.js中的迭代方法：  

```javascript   
function iterator(vars, body, ret) {
    var fun = 'for(var ' + vars + 'i=0,n = this.length; i < n; i++){' + 
                       body.replace('_', '((i in this) && fn.call(scope,this[i],i,this))') + '    //差别部分用三个变量代替
                  }' + 
                  ret
    return Function("fn,scope", fun)
}  //迭代器 
```  

根据迭代器，生成迭代方法：  

```javascript   
forEach: iterator("", '_', ""),
filter: iterator('r=[],j=0,', 'if(_)r[j++]=this[i]', 'return r'),
map: iterator('r=[],', 'r[i]=_', 'return r'),
some: iterator("", 'if(_)return true', 'return false'),
every: iterator("", 'if(!_)return false', 'return true') 
```     

### 差异方法修复  
1）IE6,7下unshift不返回数组长度  

```javascript    
var _unshift = Array.prototype.unshift;
if ([].unshift(1) !== 1) {
    Array.prototype.unshift = function() {
        _unshift.apply(this, arguments);
        return this.length; //修复不返回长度的
    }
}
```  

2）IE6,7,8中splice默认第二个参数为0，二不是数组长度  

```javascript    
var _splice = Array.prototype.splice;
if ([1, 2].splice(1).length == 0) {
    Array.prototype.splice() = function(num) {
        if (arguments.length == 1) {
            return _splice(this, num, this.length);
        } else {
            return _splice(this, arguments);
        }
    }
}
```  

## 数组扩展  
### contains(Array array, Object item)  
检查数组中是否包含给定元素, array要检查的数组，item要查找的元素，返回boolean包含为true  

```javascript    
function contains(array, item) {
    return array.indexOf(item) > -1; 
}
```  

### removeAt(Array array, Number index)  
移除数组中指定位置的元素，array为指定数组，index为索引，返回boolean表示是否成功  

```javascript    
function removeAt(array, index) {
    return array.splice(index, 1).length > 0;
}
```  

### remove(Array array, Object item)  
移除数组中第一个匹配的元素，array要检查的数组，item要查找的元素，返回boolean表示是否成功  

```javascript  
function remove(array, item) {
    var index = array.indexOf(item);
    return index > -1 ? removeAt(array, index) : false;
}  
```  

### clean(Array array)  
过滤掉数组里的空值,返回过滤后的数组  

```javascript   
function clean(array) {
    return array.filter(function(item) {
        return item != null;
    })
} 
```   

### shuffle(Array array)  
对指定数组随机重排序，返回新的排序后的数组  

```javascript    
function shuffle(array) {
    var len = array.length - 1,
    temp, j;
    for (; len > 0; len--) {
        j = parseInt(Math.random() * len); //生成区间
        temp = array[len];
        array[len] = array[j];
        array[j] = temp;
    }
    return array;
}
```  
重排序算法：例如数组长度为len，那么Math.random() * len 就是一个区间为[0, len)中的一个值，parseInt后就是[0, len - 1]区间中的一个值， 将这个选择的值j所在位置元素与数组最后一项交换，第二次同理随机选择一个元素，与数组倒数第二项交换。这样循环便完成数组的重新排序。  

### flatten(Array array)  
对指定数组，进行平坦化，返回一个一维数组：  

```javascript   
function flatten(array) {
    var newArray = [];     //储存元素
    function RFlatten(a) {
        var len = a.length,
        item;
        for (var i = 0; i < len; i++) {
            item = a[i];
            if (Caelum.isArray(item)) {
                RFlatten(item);   //若元素为数组，递归调用
            } else {
                newArray.push(item);
            }
        }
        return newArray;
    }
    return RFlatten(array); //递归实现数组平坦化
} 
```  

### random(Array array)  
随机返回数组中的一项：  

```javascript   
function random(array) {
    return array[Math.floor(Math.random() * array.length)];
} 
```  

### include(Array array, Object item)  
把一个元素插入到数组，如果它不存在于这个数组  

```javascript    
function(array, item) {
    if (!contains(array, item)) {
        array.push(item);
    }
}  
```  

### unique(Array array)  
去掉指定数组中的重复项，返回去重后的数组，这个前端面试经常考。  

```javascript    
function unique(array) {
    var result = [],
    len = array.length;
    loop: for (var i = 0; i < len; i++) {
        for (var x = i + 1; x < len; x++) {
            if (result[i] === result[x]) {
                continue loop;
            }
        }
        result.push(array[i]);
    }
    return result;
}
```    
本题在看jquery源码时，会发现更加巧妙的方法。利用Object进行hash去重，然后Object.keys 取出所有结果。

### merge( Array array1, Array array2, Array etc )   
合并多个数组中的不重复元素到一个数组, 返回合并后的数组  

```javascript    
function merge(array) {
    var args = [].slice.call(arguments),
    len = args.length,
    result = [];
    for (var i = 0; i < len; i++) {
        result = result.concat(args[i]);  //连接所有数组
    }
    return unique(result);  //去重
}
```  

### intersect(Array target, Array array)  
取两个数组的交集，返回运算后的结果  

```javascript    
function intersect(target, array) {
    return target.filter(function(item) {
        return~array.indexOf(item); //取反 || 取交集
    })
}
```  

### diff(Array target, Array array)  
取两个数组的补集，返回结果  

```javascript    
function diff(target, array) {
    for (var i = 0; i < target.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (target[i] === array[j]) {
                target.splice(i, 1); //删除
                i--;
                break;
            }
        }
    }
    return target; 
}
```  

### min|max|sun(Array array)  
取出指定数组中最小|最大|和，返回结果  

```javascript    
function min(array) {
    return Math.min.apply(null, array); //array作为Math.min参数调用
}
function max(array) {
    return Math.max.apply(null, array);
}
function sum(array) {
    var len = array.length,
    result = 0;
    for (var i = 0; i < len; i++) {
        result += array[i];
    }
    return result;
}
```  

# 函数的扩展  
## 函数柯里化    
> 在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
并且返回接受余下的参数而且返回结果的新函数的技术。  

实现如下：  

```javascript  
function currying(fn) {
    function inner(len, arg) {
        if(len <= 0) {
            return fn.apply(null, arg);
        }
        return function() {
            return inner(len - arguments.length, arg.concat(Array.apply([], arguments)));
        }
    }
    return inner(fn.length, []);
}  
```
下面举个例子，来展示函数柯里化，我们这里定义一个sum计算参数和的函数，一共接受四个参数，每次调用都传入不同的参数。知道四个参数
全有了，就计算结果。  

```javascript  
function sum(x, y, z, w) {
    return x + y + z + w;
}    
currying(sum)("a")("b", "c")("d");    //返回 "abcd"  
```  
函数柯里化的具体好处，在函数式编程的时候再说。更多的函数扩展也放到函数式编程再说吧。   

# 其他的扩展  
## Date 扩展  
js没有提供日期格式化的方法，为此在Date原型上进行补全  

```javascript  
/** 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * 例子： 
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) { 
        if(new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}  
```  

# 附录  
参考内容如下：   
* [jQuery 框架设计](https://item.jd.com/11436424.html)  
* [jQuery2.2 源码](https://github.com/jquery/jquery/tree/2.2-stable)  
* [undersorce.js](http://www.bootcss.com/p/underscore/#) 











