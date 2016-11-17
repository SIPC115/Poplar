DOM 操作之样式  
===  

# 获取样式  
之前我们提到过可以用`getComputedStyle`函数来获取一个元素的计算样式，在IE6~IE8下使用的是`currentStyle`
来获取样式。样式在js 中获取一般采用驼峰的风格，例如："background-color"在js中应该表示成为"backgroundColor"（当然
也可以用连字符等风格，转换驼峰是为了兼容IE8以下）。所以获取元素的计算样式，我们有如下函数：  

```js  
function getStyle(ele, name) {
    if(ele.style) {
        name = name.replace(/\-(\w)/g, function(all, letter) {
            return letter.toUpperCase();
        })
        if(window.getComputedStyle) {
            return ele.ownerDocument.getComputedStyle(ele, null)[name];
        }else {
            return ele.currentStyle[name];
        }
    }
}  
```    

如果我们需要获取内联样式，直接可以通过 `ele.style`来获取，但这也只能获取带有内联样式的元素。  
下面说说js需要特殊关照的一下样式。    

## 获取 css3 带有前缀的样式  
css3中引入了大量新的样式，但是这些样式因为浏览器内核的原因有各自的前缀：`-webkit-`,`-o-`,`-moz-`,`-ms-`。因此我们需要一个方法，能够判断出当前浏览器
究竟使用的是哪儿种前缀。代码如下：  

```js  
var prefix = (function() {
    var div = document.createElement('div');
    var cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
    div.style.cssText = cssText;
    var style = div.style;
    if (style.webkitTransition) {
        return '-webkit-';
    }
    if (style.MozTransition) {
        return '-moz-';
    }
    if (style.oTransition) {
        return '-o-';
    }
    if (style.msTransition) {
        return '-ms-';
    }
    return '';
})()  
```

## 元素尺寸  
在 js中获取一个元素的大小。我们用`window.getComputedStyle(ele, null)["width"]`来获取一个元素的宽度，
是不准确的。因为width属性只能表明，元素的内容区大小，实际元素的大小要和所处的盒模型有关。对于`box-sizing: content-box;`
这类的，width就不是元素的实际大小。对于`border-box`这类的盒模型，就是。同理如果元素设置了position等同样会
导致元素的大小计算失败。为此 js通过offsetWidth，clientWidth，scrollWidth等来获取一个元素实际的大小，他们的区别如下：  

|属性|说明|  
|:--:|:--:|  
|clientWidth|获取元素可视部分的宽度，即CSS的width和padding属性之和，元素边框和滚动条不包含在内，也不包含任何可能的滚动区域|  
|clientHeight|获取元素可视部分的高度，即CSS的height和padding属性之和，元素边框和滚动条不包含在内，也不包含任何可能的滚动区域|  
|offsetWidth|元素在页面中占据的宽度总和，包括width，padding，border以及滚动条的宽度|  
|offsetHeight|元素在页面中占据的高度综合，包括height，padding，border以及滚动条的高度|
|scrollWidth|当元素设置了overflow：visible样式属性时，元素的总宽度。也有人把它解释为元素的滚动宽度。如果该属性值大于clientWidht属性值，则元素会显示滚动条，以便能够翻阅呗隐藏的区域|  
|scrollHeight|当元素设置了overflow：visible样式属性时，元素的总高度。也有人把他解释为元素的滚动高度。在默认状态下，如果该属性值大于clientHeight属性值，则元素会显示滚动条，以便能够翻阅被隐藏的区域|  

其中offsetWidth我们最常用，`offsetWidth = borderWidth + paddingWidth + width`这一等式恒成立。有了上述的样式。我们就可以获取元素的尺寸了。  
js 提供了 `element.getBoundingClientReact()` 来获取元素的尺寸和位置(这里的尺寸和offsetWidth/offsetHeight相等，之后再讲)  

但是当元素`display: none;`的时候我们的办法就都GG了，元素大小这时候永远为0。幸好css中还有visibility:hidden，
不可见属性，他和display:none最大的区别就是visibility:hidden有物理尺寸。有物理尺寸就可以通过上面的方法获取尺寸，
但是将display:none改成visibility:hidden后页面就有一块空白在那里，
即使在你获取尺寸后在马上将visibility:hidden改成display:none页面那部分还是会抖动一下。那么最好的办法就是将这个隐藏的元素移出屏幕或者脱离文档流（ position: absolute）。这样似乎非常完美了，但是悲剧又发生了，如果你要再显示这个元素的时侯这个元素是不可见的，位置也不对，因为这是这个元素visibility:hidden;position: absolute。所以在获取尺寸后还要将样式还原回去。就是将position和visibility属性设回原来的样式。  

### 窗口尺寸和页面尺寸  
获取窗口尺寸在IE9及其以上，为window添加了`innerWidth`和`innerHeight`来获取。如果在IE9以下，我们要考虑怪异模式带来的影响。  
在怪异模式下，body元素是最顶层的可是元素，而HTML元素保持隐藏。现在浏览器认为body只是一个普通的块状元素，HTML则是包含整个浏览器窗口的可视元素。为此窗口尺寸
如下：  

```js  
var ww = document.documentElement.clientWidth || document.body.clientWidth;
var wh = document.documentElement.clientHeight || document.body.clientHeight;   
```  
不支持IE9以下，写`innerWidth`就好。  

页面尺寸即文档的宽，一旦出现横向滚动条，我们就要考虑隐藏的部分。同时在这个问题上，浏览器之间又存在兼容性问题：  

* offsetWidth  
IE,Opera认为 offsetWidth = clientWidth + 滚动条 + 边框  
NS,FF认为offsetWudth是网页内容的实际宽度，可能小与clientWidth  
* scrollWidth  
IE，Opera认为scrollWidth是网页内容实际宽度，可以小于clientWidth。  
NS，FF认为scrollWidth是网页内容宽度，不过最小值是clientWidth  

为此，我们通过取所有值的最大值，来获取页面尺寸就好：  

```js  
var pageWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth,
document.body.scrollWidth, document.body.offsetWidth);  
```  
放一个元素尺寸参考图：  
![](/image/js8-1.png)  

## 控制元素显隐  
这里我们应用display的方式进行显隐，隐藏一个元素很好办。直接`display: none;`即可，但是想把这个元素再显示，就有问题了。我们不能直接设置`display: block;`
因为元素的display并不都是一样的，比如表格，内联元素等。所以我们在显示之前一定要获取该元素正常显示的时候display的值究竟是什么。  

### getDefaultComputedStyle  
getDefaultComputedStyle是获取元素默认的属性值，用法和getComputedStyle一样。利用这个函数我们就可以活的，元素默认的display值了。  

```js
var style = window.getDefaultComputedStyle(element[, pseudoElt]);  
```
* element: 取计算样式的元素
* pseudoElt 可选: 指定匹配的伪类. 通常情况下可以为空。返回的样式是一个 CSSStyleDeclaration 对象。  

### 利用iframe获取  
对于不支持`getDefaultComputedStyle`的浏览器我么那只能创建一个纯净的iframe环境(shadowdom也可以哦)，来检测。代码如下：  

```js  
/**
 * 检测节点原生display属性
 * @param {String} 节点名称
 * @return {String} display属性值
 */
function parseDisplay(nodeName) {
    var result;
    nodeName = nodeName.toLowerCase();
    applyIframe(function(win, doc, body) {
        var node = doc.createElement(nodeName);
        body.appendChild(node);
        if(win.getComputedStyle) {
            result = win.getComputedStyle(node, null)["display"];
        }else {
            result = node.currentStyle.display;
        }
    })
    function applyIframe(callback) {
        //这里可以考虑加入shadowDom代替iframe
        var root = document.createElement("iframe");
        root.style.cssText = "width: 0px;height: 0px;border: 0 none;";
        document.documentElement.appendChild(root);
        rootWin = root.contentWindow;
        rootDoc = rootWin.document;
        rootDoc.write("<!doctype html><html><body>");
        rootDoc.close();
        callback(rootWin, rootDoc, rootDoc.body);
        //删除iframe
        setTimeout(function() {
            document.documentElement.removeChild(root);
        })
    }
    return result;
}  
```  

## 元素的位置  
### 绝对坐标 getBoundingClientRect  
有的时候我们需要知道在文档所处的位置(比如：图片惰性加载，元素拖拽等等)即绝对坐标，这就需要我们计算元素的坐标位置。js 提供了一个`getBoundingClientReact`
方案来获取元素绝对坐标的位置:  
Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。  

```js  
rectObject = object.getBoundingClientRect();  
```  
返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合 。   
DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。   

空边框盒（译者注：没有内容的边框）会被忽略。如果所有的元素边框都是空边框，
那么这个矩形给该元素返回的 width、height 值为0，left、top值为第一个css盒子（按内容顺序）的top-left值。  
当计算边界矩形时，会考虑视口区域（或其他可滚动元素）内的滚动操作，也就是说，当滚动位置发生了改变，top和left属性值就会随之立即发生变化（因此，它们的值是相对于视口的，而不是绝对的）。如果不希望属性值随视口变化，那么只要给top、left属性值加上当前的滚动位置（通过window.scrollX和window.scrollY），这样就可以获取与当前的滚动位置无关的常量值。    
为了跨浏览器兼容，请使用 window.pageXOffset 和 window.pageYOffset 代替 window.scrollX 和 window.scrollY。  
但是，我们还要考虑其他情况。首先要判断节点是否在DOM树上，不在直接返回(0, 0)。 还有的时候html的其实位置坐标是(2, 2)这就很操蛋了，我们得减去这部分。下面给出
通解：  

```js  
function getOffset(ele) {
    var doc = ele.ownerDocument,
        pos = {
            left: 0,
            right: 0
        };
    if(!doc) {
        return pos;
    }
    var box = ele.getBoundingClientRect(),
        win = getWindow(doc),
        root = doc.documentElement,
        //检测是否有2个px的偏移
        clientTop = root.clientTop || 0,
        clientLeft = root.clientLeft || 0,
        scrollTop = win.pageYOffset || root.scrollTop,
        scrollLeft = win.pageXOffset || root.scrollLeft;
    pos.top = box.top + scrollTop - clientTop,
    pos.left = box.left + scrollLeft - clientLeft;
    return pos;
}  
function getWindow(node) {
    return node.window || node.defaultView || false
}
```     

### 相对坐标 offsetParent 
相对坐标是相对于其offsetParent的位置。根据w3c，元素是这样寻找offsetParent的。如果元素被移出 DOM 树，或 display 为none，或作为HTML或BODY元素，或其
position的精确值为fixed时，返回null。否则分为两种情况，position为absolute，relative的元素的offsetParent总是为其最近的以定位的祖先，没有找
最近的td，th元素，在没有返回body；position为static的元素的offsetParent则是找最近的td,th,table元素，在没有返回body。但是现实中，Firefox在position为fixed
但会body。遵循这样的规则，会导致大多数情况下offsetParent为null。为此jQuery认为offsetParent的position必须为relative或absolute，否则继续向上查找另一个被定为的
祖先，没有返回html。position: fixed;的严肃也有offsetParent就是可视区。大致思路代码如下：  

```js  
function getPosition(node) {
    var offset,
        offsetParent,
        parentOffset = {
            top: 0,
            left: 0
        };
    if(!node || node.nodeType !== 1) {
        return;
    }
    if(getStyle(node, "position") === "fixed") {
        offset = node.getBoundingClientRect();
    }else {
        offset = getOffset(node);  //获得元素相对于视窗的距离
        //这里在jQuery中用的是 this.offsetParent()  条件更加苛刻
        offsetParent = node.offsetParent;
        if(offsetParent.nodeName !== "HTML") {
            parentOffset = getOffset(offsetParent);
        }
        parentOffset.top += parseFloat(getStyle(offsetParent, "borderTopWidth")) || 0;
        parentOffset.left += parseFloat(getStyle(offsetParent, "borderLeftWidth")) || 0;
    }
    return {
        top: offset.top - parentOffset.top - (parseFloat(getStyle(node, "marginTop")) || 0),
        left: offset.left - parentOffset.left - (parseFloat(getStyle(node, "marginLeft")) || 0)
    }
} 
```   

### 设置元素offset
获取还是相对比较简单的，但是设置 offset 就更困难了。思路如下：  
用户传入新的相对于页面的坐标，然后判断当前元素的position。因为想让top，left有效，必须是定位元素。如果不是，我们就设置元素的相对定位，接着求取当前相对页面的坐标
与用户传入的坐标见得偏移量，最后加到当天的top，left上。jQuery中代码如下(这里我就不重写了，直接用jQuery，仅供参考)：  

```js  
function setOffset(elem, options, i) {
    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
    //获取该元素的position属性  
    position = jQuery.css(elem, "position"),
    //把当前元素包装为jQuery元素!  
    curElem = jQuery(elem),
    props = {};
    //如果当前元素是static类型，那么把这个DOM元素的position设置为relative!  
    //以防把top,left属性设置到static元素上面？static没有left?top?  
    // set position first, in-case top/left are set even on static elem  
    if (position === "static") {
        elem.style.position = "relative";
    }
    //调用当前jQuery对象的offset方法获取到offset属性!也就是设置和文档的偏移之前首先获取到文档的偏移!  
    curOffset = curElem.offset();

    //获取DOM的top，left属性,但是这个top,left不是options中left和top属性!  
    curCSSTop = jQuery.css(elem, "top");
    curCSSLeft = jQuery.css(elem, "left");

    //如果元素的postion是absolute或者fixed，同时top或者left是auto！  
    calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
    // need to be able to calculate position if either top or left is auto and position is either absolute or fixed  
    if (calculatePosition) {
        //获取当前元素的position属性!也就是相对于被定位的祖辈元素的位置!也就是如果postion是absolute或者fixed，同时left，right是auto  
        //那么就是相对于被定位的父元素来说的!(因为如果本身的position是static那么已经被转为relative了，relative是相对于absolute定位的!)  
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
    } else {
        //否则直接把DOM元素已经具有的left和top属性解析为浮点类型，如果没有就是0!  
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
    }
    //如果是函数，直接调用函数，函数中context是DOM元素，第一个参数是DOM下标，第二个参数是当前DOM元素的offset的值!  
    if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
    }
    //如果传入的参数有top属性，那么把props的top属性设置为  
    if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
    }
    //如果传入的参数有left属性，那么把props的left属性设置为  
    if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
    }
    //如果  
    if ("using" in options) {
        options.using.call(elem, props);
    } else {
        curElem.css(props);
    }
}  
```   
最后来章总结图片：  
![](/image/js8-2.png)     



# 附录  
参考资料如下：  

* [jQuery源码分析之offset,position,offsetParent方法以及源码中常见的cssHooks,swap代码](http://blog.csdn.net/liangklfang/article/details/49229231)  
* [javascript高级程序设计第三版](http://product.dangdang.com/1900470931.html)  
* [jQuery框架设计](https://item.jd.com/11436424.html)   
* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)   
* [javascript获取隐藏元素(display:none)的高度和宽度的方法](http://blog.csdn.net/dragoo1/article/details/50260255)  












