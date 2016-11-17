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




