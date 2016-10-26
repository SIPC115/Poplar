Flex 布局及示例 
=== 
# Flex布局是什么  
网页布局（layout）是CSS的一个重点应用。布局的传统解决方案，基于盒状模型，
依赖 display属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。  
Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。  

## 基本术语  
* 伸缩容器：一个设有“display:flex”或“display:inline-flex”的元素
* 伸缩项目：伸缩容器的子元素
* 主轴、主轴方向：用户代理沿着一个伸缩容器的主轴配置伸缩项目，主轴是主轴方向的延伸。
* 主轴起点、主轴终点：伸缩项目的配置从容器的主轴起点边开始，往主轴终点边结束。
* 主轴长度、主轴长度属性：伸缩项目的在主轴方向的宽度或高度就是项目的主轴长度，伸缩项目的主轴长度属性是width或height属性，由哪一个对着主轴方向决定。
* 侧轴、侧轴方向：与主轴垂直的轴称作侧轴，是侧轴方向的延伸。
* 侧轴起点、侧轴终点：填满项目的伸缩行的配置从容器的侧轴起点边开始，往侧轴终点边结束。
* 侧轴长度、侧轴长度属性：伸缩项目的在侧轴方向的宽度或高度就是项目的侧轴长度，伸缩项目的侧轴长度属性是「width」或「height」属性，由哪一个对着侧轴方向决定。   
![](/image/css4-1.png)   
兼容老式的flex写法，请参见css手册，图解css3等其他内容。    

## 容器属性  
以下6个属性设置在容器上：  
* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content  

### flex-direction属性  
flex-direction属性决定主轴的方向（即项目的排列方向）  
它可能有4个值:  
* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。  

### flex-wrap属性  
默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。  
它可能取三个值。下面的例子都在该html基础上修改。  
```html 
<style>  
    .contain {
        border: 1px solid pink;
        padding: 10px 10px 0px 10px;
        display: flex;
    }
    .contain div {
        margin-right: 10px;
        margin-bottom: 10px;
        width: 50px;
        height: 50px;
        background-color: orange;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
</style> 
<div class="contain">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
</div>
```
（1）nowrap（默认）：不换行, 子元素会被等比例压缩以满足宽度相加等于父元素。   
![](/image/css4-2.png)  
图中每个div本来设置为50px宽，但是因为不换行，所以宽度变小。  

（2）wrap：换行，第一行在上方。  
![](/image/css4-3.png)  

（3）wrap-reverse：换行，第一行在下方。  
![](/image/css4-4.png)  

### flex-flow  
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。  

### justify-content属性  
justify-content属性定义了项目在主轴上的对齐方式。  
它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右：　　　　
* flex-start（默认值）：左对齐
* flex-end：右对齐
* center： 居中
* space-between：两端对齐，项目之间的间隔都相等。
* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。  
参考下图：  
![](/image/css4-5.png)  

### align-content属性  
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。  
该属性可能取6个值：  
* flex-start：与交叉轴的起点对齐。
* flex-end：与交叉轴的终点对齐。
* center：与交叉轴的中点对齐。
* space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
* space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
* stretch（默认值）：轴线占满整个交叉轴。  
参考下图：  
![](/image/css4-6.png)    

### align-items属性  
align-items属性定义项目在交叉轴上如何对齐。  
它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下：  
* flex-start：交叉轴的起点对齐。
* flex-end：交叉轴的终点对齐。
* center：交叉轴的中点对齐。
* baseline: 项目的第一行文字的基线对齐。
* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。  
参考下图：   
![](/image/css4-7.png)   

## 项目的属性  
以下6个属性设置在项目上:  
* order
* flex-grow
* flex-shrink
* flex-basis
* flex
* align-self   

### order属性  
order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。  

### flex-grow属性  
flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。  
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。  

### flex-shrink属性   
flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。  
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
负值对该属性无效。  

### flex-basis属性  
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。   
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。  

### flex属性  
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。  
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。 

### align-self属性  
align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

# Flex布局示例  
flex简化了我们传统的布局方案，下面介绍几个用flex做的布局实例  
## flex栅格系统    
[PhantomUI组件库](https://github/T-phantom/PhantomUI)使用的响应式栅格系统  
```less  
@flex-num: 12;
.flex, .flex-column, .flex-row {
  display: flex;
  flex-wrap: wrap;
}
.flex-column {
  flex-direction: column;
}
.flex-row {
  flex-direction: row;
}
.flex-around {
  justify-content: space-around;
}
.flex-between {
  justify-content: space-between;
}
.flex-baseline {
  align-items: baseline;
}
.flex-stretch {
  align-items: stretch;
}
.flex-item {
  flex-grow: 1;
}
// 递归生成栅格
.build-item(@i) when (@i > 0) {
  .build-item((@i - 1));

  // 栅格
  .flex-item-@{i} {
    width: percentage(@i / @flex-num);
  }

  // 向左偏移
  .flex-offset-@{i} {
    margin-left: percentage(@i / @flex-num);
  }

  // 排序
  .flex-order-@{i} {
    order: @i;
  }
}

.build-item(@flex-num);

@media (max-width: 768px) {
  .flex-sm {
    flex-direction: column;
    [class*=flex-item] {
      width: 100%;
    }
  }
  .flex-sm-hide {
    display: none !important;
  }
}
@media (max-width: 922px) {
  .flex-md {
    flex-direction: column;
    [class*=flex-item] {
      width: 100%;
    }
  }
  .flex-md-hide {
    display: none !important;
  }
}
@media (max-width: 1200px) {
  .flex-lg {
    flex-direction: column;
    [class*=flex-item] {
      width: 100%;
    }
  }
  .flex-lg-hide {
    display: none !important;
  }
}  
```  
![](/image/css4-8.png)  
栅格系统有采用flex布局，提供更直观、丰富的布局方式，可以轻松解决垂直居中，多栏同高等问题。默认12栅，使用 的时候指定父容器类名flex, 每一列被划分为12等分，每份可采用向子元素添加flex-item-n来表示。不指定份数n，单纯的flex-item 类为自动适应剩余空间。如果一“行（row）”中包含了的“列（column）”大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。  

## 圣杯布局 双飞翼布局  
左右栏固定宽度，中栏自适应布局。用传统的盒模型需要借助float来实现该布局，css2的时候说过。如果利用flex来实现，就是分分钟的事情，代码如下：    
```html   
<style>
    * {
      margin:0;
      padding:0;
    }
    header, footer {
        text-align:center;
        padding: 10px;
        background-color:#00ff00;
        color: #fff;
        font-weight:bold;
    }
    section {
      height: 200px;
			display:flex;
    }
    .main {
      height: 200px;
      background-color: #3eceee;
      text-align: center;
      color: #fff;
      font-weight:bold;
      line-height: 11;
			flex:1;
			order: 2;
    }
    .left {
      line-height: 11;
      text-align: center;
      color: #fff;
      font-weight: bold;
      height:200px;
      width: 100px;
      background-color: #DF006C;
			order: 1;
    }
    .right {
      line-height: 11;
      text-align: center;
      color: #fff;
      font-weight: bold;
      height:200px;
      width: 200px;
      background-color: #ff0000;
	    order: 3;
    }
</style> 
<header>
      header
</header>
<section>
    <div class="main">
        main
    </div>
    <div class="left">
        left
    </div>
    <div class="right">
        right
    </div>
</section>
<footer>
    footer
</footer>  
```  
![](/image/css4-9.png)  

## 悬挂式布局  
有时，主栏的左侧或右侧，需要添加一个图片栏。  
![](/image/css4-10.png)  
```html  
<style>  
    .Media {
        display: flex;
        align-items: flex-start;
    }
    .Media-figure {
        margin-right: 1em;
    }
    .Media-body {
        flex: 1;
    }
</style>
<div class="Media">
  <img class="Media-figure" src="" alt="">
  <p class="Media-body">...</p>
</div>  
```  

## 粘粘底栏  
有时，页面内容太少，无法占满一屏的高度，底栏就会抬高到页面的中间。这时可以采用Flex布局，让底栏总是出现在页面的底部。  
你甚至可以添加一个 header 到 .content 前面或者其他更多内容到后面。使用 flexbox 的诀窍是：
* 设置 flex: 1 在你希望自动填充窗口空间的子元素上（在我们的例子里是 .content 元素）。
* 或者，可以设置 margin-top:auto 来让子元素尽可能远离它前面的元素（或者根据需要选择任意一个方向的 margin）。  

```html 
<style>
    html {
        height: 100%;
    }
    body {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
    .content {
        flex: 1;
    }
</style> 
<body>
  <div class="content">
    content
  </div>
  <footer class="footer"></footer>
</body>  
```  
[查看demo效果](http://codepen.io/chriscoyier/pen/RRbKrL/)  
关于固定底栏的其他实现方式，请阅读[Sticky Footer, Five Ways](https://css-tricks.com/couple-takes-sticky-footer/)  

更多案例请移步：  
* [浅谈flexbox弹性盒子布局](http://www.alloyteam.com/2015/05/xi-shuo-flexbox-dan-xing-he-zi-bu-ju/)  
* [我就是要用css实现](http://www.alloyteam.com/2016/01/let-see-css-world/)  
* [css3 flex流动自适应响应式布局实例](http://qianduanblog.com/post/css-learning-18-css3-flex-responsive-design-example.html)   
* [阮一峰 Flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)   
    
兼容性问题请移步： 
* [Flex布局新旧混合写法详解（兼容微信）](https://segmentfault.com/a/1190000003978624) 

# 附录  
参考资料如下：  
* [W3C Css3-flexbox](https://www.w3.org/html/ig/zh/wiki/Css3-flexbox/zh-hans)  
* [w3c菜鸟教程](http://www.runoob.com/w3cnote/flex-grammar.html)  
* [Sticky Footer, Five Ways](https://css-tricks.com/couple-takes-sticky-footer/)  
* [阮一峰 Flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)  
* [图解CSS3](https://item.jd.com/11494721.html)   

