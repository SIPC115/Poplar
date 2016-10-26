CSS 层叠顺序与层叠上下文  
===   
# 前置知识
## 层叠上下文  
层叠上下文，英文称作”stacking context”。
是HTML中的一个三维的概念。每个盒模型的位置是三维的，分别是平面画布上的x轴，y轴以及表示层叠的z轴。
对于每个html元素，都可以通过设置z-index属性来设置该元素在视觉渲染模型中的层叠顺序。  
层叠上下文是仅仅是一个抽象概念，跟块状格式化上下文(BFC)类似。  
## 层叠顺序  
层叠顺序（stacking level），决定了同一个层叠上下文中元素在z轴上的显示顺序。   

# 层叠顺序  
上面两个概念都是为了要解决这么一个问题，当元素发生层叠时候有着到底在垂直方向上是怎样的显示顺序呢？层叠上下文和层叠水平是概念，而这里的层叠顺序是规则。。
在css2.1的时代，层叠顺序遵循以下规则：  
![](/image/css6-1.png)  
这张图大致说明了，层叠显示的顺序。我们来看w3c具体的描述, 将层叠顺序分为以下7层：   

1. 形成堆叠上下文环境的元素的背景与边框
2. 拥有负 z-index 的子堆叠上下文元素 （负的越高越堆叠层级越低）
3. 正常流式布局，非 inline-block，无 position 定位（static除外）的子元素
4. 无 position 定位（static除外）的 float 浮动元素
5. 正常流式布局， inline-block元素，无 position 定位（static除外）的子元素（包括 display:table 和 display:inline ）
6. 拥有 z-index:0 的子堆叠上下文元素
7. 拥有正 z-index: 的子堆叠上下文元素（正的越低越堆叠层级越低）  

看下面这个例子：  

```css  
.container > div{
    width:200px;
    height:200px;
}
.float{
    float:left;
    background-color:pink;
}
.inline-block{
    display:inline-block;
    background-color:orange;
    margin-left:-100px;
}  
```    

```html  
<div class="container">
    <div class="inline-block">#divA display:inline-block</div>
    <div class="float"> #divB float:left</div>
</div>
```  
根据层叠顺序，`inline-blcok` 的 stacking level 比之 `float` 要高，所以无论 DOM 的先后顺序，
始终是 display:inline-block 的 div 叠在上方。  
![](/image/css6-2.png)    
 
然而，层叠顺序的别叫是基于比较元素都没有形成 层叠上下文 这个为基础的。下面我们修改一下上面例子的css，给两个 div ，增加一个 `opacity:0.9`，如下：  

```css  
.container > div{
    width:200px;
    height:200px;
    opacity: 0.9;
}
.float{
    float:left;
    background-color:pink;
}
.inline-block{
    display:inline-block;
    background-color:orange;
    margin-left:-100px;
}  
```   
效果如下：     
![](/image/css6-3.png)  
会看到，inline-block 的 div 不再一定叠在 float 的 div 之上，而是和 HTML 代码中 DOM 的堆放顺序有关，后添加的 div 会 叠在先添加的 div 之上。
这里的关键点在于，添加的 opacity:0.9 这个让两个 div 都生成了 stacking context（层叠上下文） 的概念。
此时，要对两者进行层叠排列，就需要 z-index ，z-index 越高的层叠层级越高。    

# 层叠上下文触发  
层叠上写文触发主要有以下几种方式：   

## 根元素：  
指的是页面根元素，也就是滚动条的默认的`<html>`元素。这就是为什么，
绝对定位元素在left/top等值定位的时候，如果没有其他定位元素限制，会相对浏览器窗口定位的原因。  
## 定位元素与传统层叠上下文  
对于包含有position:relative/position:absolute的定位元素，以及FireFox/IE浏览器（不包括Chrome等webkit内核浏览器）下含有position:fixed声明的定位元素，当其z-index值不是auto的时候，会创建层叠上下文。    
看下面的例子：  

```css   
.pink {
  display: inline-block;
  width: 140px;
  height: 100px;
  background-color: pink;
}
.orange {
  display: inline-block;
  width: 100px;
  height: 140px;
  background-color: orange;
} 
```
```html  
<div style="position:relative; z-index:auto;">
    <span style="position:absolute; z-index:2;" class="pink"></span>  
</div>
<div style="position:relative; z-index: auto;">
    <span style="position:relative; z-index:1;" class="orange"></span>  
</div>  
```    
效果如下：  
![](/image/css6-4.png)    
下面我们对父级简单调整下，把z-index:auto改成层叠水平一致的z-index:0, 代码如下：  
```html   
<div style="position:relative; z-index: 0;">
    <span style="position:absolute; z-index:2;" class="pink"></span>  
</div>
<div style="position:relative; z-index: 0;">
    <span style="position:relative; z-index:1;" class="orange"></span>  
</div> 
```  
效果如下：  
![](/image/css6-5.png)  
1.我们发现，层叠顺序发生了改变。差别就在于，z-index:0所在的`<div`>元素是层叠上下文元素。
而z-index:auto所在的`<div>`元素是一个普通的元素，于是，里面的两个<span>元素的层叠比较就不受父级的影响。而是直接根据
`span`d的`z-index`值大小进行比较。
2.而z-index一旦变成数值，哪怕是0，都会创建一个层叠上下文。此时，层叠规则就发生了变化。此时，层叠规则就发生了变化。两个span元素的层叠顺序比较变成了优先比较其父级层叠上下文元素的层叠顺序。
这里，由于两者都是z-index:0，层叠顺序两者一样大，层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。  

## CSS3 带来的影响  
CSS3的出现除了带来了新属性，同时还对过去的很多规则发出了挑战。例如，CSS3 transform对overflow隐藏对position:fixed定位的影响等。而这里，层叠上下文这一块的影响要更加广泛与显著。如下规则：  

* z-index 值不为 "auto"的 绝对/相对定位，
* 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
* opacity 属性值小于 1 的元素（参考 the specification for opacity），
* transform 属性值不为 "none"的元素，
* mix-blend-mode 属性值不为 "normal"的元素，
* filter值不为“none”的元素，
* perspective值不为“none”的元素，
* isolation 属性被设置为 "isolate"的元素，
* position: fixed
* 在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 这篇文章）
* -webkit-overflow-scrolling 属性被设置 "touch"的元素   

上面内容总结下来就是：    

* 给一个 HTML 元素定位和 z-index 赋值创建一个层叠上下文，（opacity 值不为 1 的也是相同）。
* 层叠上下文可以包含在其他层叠上下文中，并且一起创建一个有层级的层叠上下文。
* 每个层叠上下文完全独立于它的兄弟元素：当处理层叠时只考虑子元素。
* 每个层叠上下文是自包含的：当元素的内容发生层叠后，整个该元素将会 在父层叠上下文中 按顺序进行层叠。  

## 效果示例：  
下面对上面的部分效果进行分析：  
### display:flex|inline-flex与层叠上下文    
要满足两个条件才能形成层叠上下文：条件1是父级需要是display:flex或者display:inline-flex水平，条件2是子元素的z-index不是auto，必须是数值。  

```css  
.box > div {
  width: 100%;  
  height: 100px;
  background-color: blue; z-index: 1;
}    
/* 此时该div是普通元素，z-index无效 */
.orange {
  display: inline-block;
  width: 100px;
  height: 120px;
  background-color: orange;
  position: relative; z-index: -1;
}    
``` 
```html   
<div class="box">
    <div>
        <span class="orange"></span>
    </div>
</div> 
```  
![](/image/css6-6.png)    
上面的效果为橙色在蓝色下，原因是层叠顺序：负值z-index的层叠顺序在block水平元素的下面。    
加入下面这个css：    

```css  
.box { 
    display: flex; 
}  
```  
层叠顺序发生改变：    
![](/image/css6-7.png)    
此时，由于`.box`为`display:flex;`，蓝色的div`z-index`又不为auto，所以小蓝编程层叠上下文元素。
又因为层叠顺序`负z-index > 层叠上下文background/border`   
![](/image/css6-8.png)  
所以小橘span就覆盖了小蓝  

### opacity 与层叠上下文  
这个在上面层叠顺序的那个示例已经展示过了，设置opacity < 1的时候，同样会使元素变成 层叠上下文元素。  

### transform 与层叠上下文    
对于应用了transform的元素同样会变成层叠上下文元素。  
我们直接上上个示例上修改：    

```css  
.box > div {
  width: 100%;  
  height: 100px;
  background-color: blue; 
  z-index: 1;
  transform: skew(20deg);
}    
/* 此时该div是普通元素，z-index无效 */
.orange {
  display: inline-block;
  width: 100px;
  height: 120px;
  background-color: orange;
  position: relative; z-index: -1;
}    
```   
![](/image/css6-9.png)  

其他的例子我就不列举了，有兴趣的可以按照生成层叠上下文的规则，挨个用这个例子实验一下就好。  


## 总结 - 层叠上下文与层叠顺序 
一旦普通元素具有了层叠上下文，其层叠顺序就会变高。那它的层叠顺序究竟在哪个位置呢？  
这里需要分两种情况讨论：  

1. 如果层叠上下文元素不依赖z-index数值，则其层叠顺序是z-index:auto可看成z:index:0级别；
2. 如果层叠上下文元素依赖z-index数值，则其层叠顺序由z-index值决定。  

所以，现在回过头看一下，为什么定位元素会层叠在普通元素上面？  
其根本原因就在于，元素一旦成为定位元素，其z-index就会自动生效，此时其z-index就是默认的auto，也就是0级别，根据上面的层叠顺序表，就会覆盖inline或block或float元素。  

最后在总结一个规则，层叠的方式一定不会脱离这两点：  
* 当具有明显的层叠水平标示的时候，如识别的z-indx值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。
* 后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。   

# 附录  
参考资料如下：  
* [MDN The stacking context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)  
* [W3C z-index](https://www.w3.org/TR/CSS2/visuren.html#propdef-z-index)   
* [z-index 效果案例](http://note.youdao.com/share/?id=1575ea26888f893c090628a79339e047&type=note)  
* [css 层叠上下文和层叠顺序](http://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)  
* [谈谈css面试题(3)](http://www.cnblogs.com/coco1s/p/5899089.html)  


