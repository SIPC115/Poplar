BFC 块级格式化上下文  
===  
# 前置知识  
## Box  
Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。
元素的类型和 display 属性，决定了这个 Box 的类型。 
不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），
因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：  

* block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
* inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
* run-in box: 用的不多，请参考[run-in box](http://www.topcss.org/demo/run-in-box.html)   
 
## Formatting context    
　Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

# 什么是BFC    
> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with ‘overflow’ other than ‘visible’ (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.   
> In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the ‘margin’ properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.  
> In a block formatting context, each box’s left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box’s line boxes may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself may become narrower due to the floats)  

上面出自w3c组织对BFC的定义，看不太明白。总结下来就是：    
**BFC(Block formatting context)直译为"块级格式化上下文"** 它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。  

# BFC布局规则  
BFC有着自己的布局规则：    
* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算  

会产生BFC的元素：  
* 根元素
* float属性不为none
* position为absolute或fixed
* display为inline-block, table-cell, table-caption, flex, inline-flex
* overflow不为visible  

下面通过例子对BFC的规则做进一步的理解。  

# BFC作用及原理   
## 防止垂直外边距合并  
之前我们说，垂直外边距会发生合并现象。这主要是因为上下两个div同属于一个BFC(根元素)下。这正好印证了
BFC布局规则的第二条：`Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠`。那么我们如果将div放置在
两个不同的BFC中是不是就不会重叠了呢，如下：    
```html 
<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>   
<p>SIPC</p>
<p>115</p>
```  
![](/image/css3-1.png)  
这个例子中，p元素发生了外边距合并。我们给第一个p元素包上一层div，并通过设置`overflow: hidden;`
来使得该div产生BFC。效果如下：  

```html   
<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<div style="overflow: hidden;">
    <p>SIPC</p>
</div>   
<p>115</p> 
```  
![](/image/css3-2.png)    
两个p元素便不属于同一个BFC，就不会发生margin重叠了。  

## 清除内部浮动  
在之前说过，清除浮动的方案有很多，其中的一种是设置父元素`overflow: hidden;`。现在看就很好理解了，
根据规则：`计算BFC的高度时，浮动元素也参与计算`。当父元素触发BFC时，其高度计算要包括浮动元素，所以浮动得以清除。  
这里说一下html这个根元素，通过平时编写css我们可以知道，无论页面中存在float元素或者position脱离文档流的元素。html都能
正确的计算自身的高度，这也是因为html(根元素)本身就是一个BFC的原因。  

## BFC与布局  
BFC其他的特性主要作用就是和自适应布局有关。我们先看一下，这样一个布局： 
```html 
<style>
    body {
        width: 500px;
        position: relative;
    }
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: red;
    }
    .main {
        height: 200px;
        background: pink;
    }
</style> 
<div class="aside"></div>
<div class="main">
    SIPC115
</div>
```   
![](/image/css3-3.png)  
根据规则：`每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。`  
因此main元素一部分在aside下边(注意：文字并不会被float遮挡) 。我们需要一个aside宽度固定，main能够自适应即随着浏览器窗口的变化
而变化的布局。显然这样是不可以的，为此我们可以是main生成BFC来解决这一问题。如下：  
```html  
<style>
    body {
        width: 500px;
        position: relative;
    }
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: red;
    }
    .main {
        overflow: hidden;
        height: 200px;
        background: pink;
    }
</style> 
<div class="aside"></div>
<div class="main">
    SIPC115
</div>  
```  
![](/image/css3-4.png)  
这样一来根据规则：`BFC的区域不会与float box重叠`, main为BFC容器自然与aside这个float box脱离。此时又引入一个新问题，如果我想让
aside和main之间有20px的间距呢。给main加上`margin-left: 20px;`会发现，布局并没有发生任何变化。  
这一问题产生的主要原因依然是规则：`每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此`
导致。现在main依然要和包含块body的最左边计算位置，而不是和aside计算相对位置，因此只有设置`aside宽度 + 20px`的值给main一个margin-left才可以达到效果。   
那么有没有更简单的方法呢，其实我们只需要给`aside`元素一个`margin-right: 20px;`就好了或者`padding-right`。    

## BFC总结
其实以上的几个例子都体现了BFC布局规则第五条：`BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。`   
因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。
同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。 

## BFC自适应布局优势 　　

* 自适应内容由于封闭，更健壮，容错性强。比方说，内部clear:both不会与兄弟float产生矛盾。而纯流体布局，clear:both会让后面内容无法和float元素在一个水平上，产生布局问题。　
* 自适应内容自动填满浮动以为区域，无需关心浮动元素宽度，可以整站大规模应用。而纯流体布局，需要大小不确定的margin/padding等值撑开合适间距，无法CSS组件化  

关于BFC与自适应布局采用css的优劣性，可以参考这篇文章： [CSS深入理解流体特性和BFC特性下多栏自适应布局](http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)   
其他关于多栏自适应布局，推荐看一下：   

* [圣杯布局的来历](http://alistapart.com/article/holygrail)   
* [双飞翼布局介绍-始于淘宝UED](http://www.imooc.com/wenda/detail/254035)  
* [双飞翼与圣杯的比较](http://www.cnblogs.com/imwtr/p/4441741.html)  
* [双飞翼布局实战](http://www.jikexueyuan.com/course/981.html)  

# 附录  
参考资料如下：  

* [W3C Box model](https://www.w3.org/TR/CSS2/box.html)  
* [W3C Visual formatting model](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)
* [什么是BFC 大搜车博客](http://web.jobbole.com/84808/)  


