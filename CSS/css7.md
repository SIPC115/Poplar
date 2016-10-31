CSS动画指南 - 3DD动画  
===   
# 3D变换   
CSS3 3DTransform。3D变换相较2D变换，坐标系中多了Z轴，也就意味着物体除了上下左右，还可以前后移动。而rotate在2D中的旋转方式，在3D中与rotateZ相当。
那么，单纯地将transform中的参数扩展出Z维度。CSS3D变换主要包括以下几种功能CSS：  

* 3D位移：CSS3中的3D位移主要包括translateZ()和translate3d()两个功能函数；
* 3D旋转：CSS3中的3D旋转主要包括rotateX()、rotateY()、rotateZ()和rotate3d()四个功能函数；
* 3D缩放：CSS3中的3D缩放主要包括scaleZ()和scale3d()两个功能函数；
* 3D矩阵：CSS3中3D变形中和2D变形一样也有一个3D矩阵功能函数matrix3d()。  

我们可以看出，就是在原有的2d变换上加入了Z轴的处理，但是这样写并不能实现3D的效果。  
![](/image/css7-1.png)    

# 3D变换所需属性
## 一丶perspective     
perspective是实现3D效果的必要条件，意思是`透视`，`视角`。
perspective属性的存在与否决定了你所看到的是2次元的还是3次元的，也就是是2D transform还是3D transform。 
没有透视这一属性，是没有办法生成3D的效果的。   
![](/image/css7-2.png)  
CSS3中的perspetive在这样一个体系里就代表着元素与观者之间的距离，形象点说，就是元素3D效果的强度。CSS3中的3D效果消失点固定，变化的是观者与元素之间的距离。不过perspective数值与3D效果强度是成反比的，数值越大，
元素的3D效果越不明显——2000px的视点意味着你看的是远方的物体，而100px则意味着这个物体就在你眼前。例如下面这张图：  
![](/image/css7-3.png)  
显示器中3D效果元素的透视点在显示器的上方（不是后面），近似就是我们眼睛所在方位！  
### 消失点  
![](/image/css7-4.png)  
左图与右图的元素均绕Y轴旋转了45度，但差别很明显，右图更容易让人想到一个画面中集体开启的窗户。左图的问题就在于，每个元素的消失点各自为政，都在元素的中心点位置，
而右图的消失点则统一在实线方框的中心位置。实现方法就是将元素的perspetive设置转移至元素父容器上。  
### perspective 取值  
perspective属性有两种书写形式，一种用在舞台元素上（动画元素们的共同父辈元素）；第二种就是用在当前动画元素上，与transform的其他属性写在一起。如下代码示例：  

```css   
.stage {
    perspective: 600px;
} 
```  

```css   
#stage .box {
    transform: perspective(600px) rotateY(45deg);
} 
```  

这两种写法针对一个元素3d变换的时候并没有什么区别，但是如果容器下有多个这样的元素做3D变换，就有区别了，效果如下：  
第一种写法：    
![](/image/css7-5.png)  
第二种写法：  
![](/image/css7-6.png)  

第一个效果下舞台整个作为透视元素，因此，显然，我们看到的每个子元素的形体都是不一样的；
而第二个写法，每个元素都有一个自己的视点，因此，显然，因为rotateY的角度是一样的，因此，看上去的效果也就一模一样了！    

### perspective-origin 属性 
perspective-origin 属性定义 3D 元素所基于的 X 轴和 Y 轴。该属性允许您改变 3D 元素的底部位置。
当为元素定义 perspective-origin 属性时，其子元素会获得透视效果，而不是元素本身。如下图：  

```css  
#div1 {
  position: relative;
  height: 150px;
  width: 150px;
  margin: 50px;
  padding:10px;
  border: 1px solid black;
  perspective:150;
  -webkit-perspective:150; /* Safari and Chrome */
}

#div2 {
  padding:50px;
  position: absolute;
  border: 1px solid black;
  background-color: yellow;
  transform: rotateX(45deg);
  -webkit-transform: rotateX(45deg); /* Safari and Chrome */
}  
```  

```html  
<div id="div1">
  <div id="div2">HELLO</div>
</div>  
```  
渲染出来的效果是：  
![](/image/css7-7.png)  
当我们在给`#div1`加上`-webkit-perspective-origin: 10% 10%;`时效果如下：  
![](/image/css7-8.png)   

## 二丶transform-style: preserve-3d  
transform-style属性也是3D效果中经常使用的，其两个参数，flat|preserve-3d. 前者flat为默认值，表示平面的；后者preserve-3d表示3D透视。  
基本上，我们想要根据现实经验实现一些3D效果的时候，transform-style: preserve-3d是少不了的。一般而言，该声明应用在3D变换的兄弟元素们的父元素上，也就是舞台元素。  

## 三丶backface-visibility  
backface-visibility 属性定义当元素不面向屏幕时是否可见。如果在旋转元素不希望看到其背面时，该属性很有用。   
取值如下：`backface-visibility: visible|hidden;`  

# 实战：翻书特效  
现在我们来实现下面这个立方体：  
![](/image/css7-9.png)    
基本html代码如下：  

```html    
<divclass="container">
    <div id="cube">
        <div class="front">1</div>
        <div class="back">2</div>
        <div class="right">3</div>
        <div class="left">4</div>
        <div class="top">5</div>
        <div class="bottom">6</div>
    </div>
</div>
```  
1.首先为每个cube下的上下左右前后四个正方体面定义样子：   

```css  
#cube figure {
    font-size: 120px;
    line-height: 196px;
    font-weight: bold;
    color: white;
    text-align: center;
}
.front { background: hsla(   0, 100%, 50%, 0.5 ); }
.back  { background: hsla(  60, 100%, 50%, 0.5 ); }
.right { background: hsla( 120, 100%, 50%, 0.5 ); }
.left { background: hsla( 180, 100%, 50%, 0.5 ); }
.top { background: hsla( 240, 100%, 50%, 0.5 ); }
.bottom { background: hsla( 300, 100%, 50%, 0.5 ); }  
```  
2.接着定位正方体6个面，将6个面定位到一起，并加上2px边框：  

```css   
.container {
    width: 200px;
    height: 200px;
    position: relative;
}
#cube {
    width: 100%;
    height: 100%;
    position: absolute;
}
#cube div {
    width: 196px;
    height: 196px;
    border:2px solid black;
    position: absolute;
} 
```  
效果如下：  
![](/image/css7-10.png)  

3.创造3D舞台：  
我们要创造3D空间，让子元素使用父元素创造的3D空间，代码如下：   

```css   
.container {
    perspective: 1000px;
}
#cube {
    transform-style: preserve-3d;
}
```  

4.定位6个立方体面的位置：
在有了3D空间以后，我们要定位面的位置，这里距离右面。对于右面，首先绕Y轴旋转90度，这时右面应该是垂直居中于正面.front的。接下来，我们应该让.right右移.front一半的距离，即100px。  
**请注意：**    
如果这时候你写的是translateX(100px)的话，你会发现右面是向里面移动的。
这是因为：旋转后坐标系会跟着旋转，也就是说，.right绕Y轴旋转90度后，
坐标轴也随着转了90度，此时.right的Z轴已经跟着转到了我们的“右边”去了（不知道这样描述会不会懂...）。
因此，我们应该使用translateZ(100px)实现.right向“右”移动100px.
由于坐标轴会跟着元素旋转，所以我们在书写时一定要注意transform function的书写顺序。
你可以先translateZ(100px)再rotateY(90deg)看看效果一样不。  

css代码如下：  

```css   
.front{transform:rotateY(0deg) translateZ(100px);}
.back{transform:rotateX(180deg) translateZ(100px);}
.right{ transform:rotateY(90deg) translateZ(100px);}
.left{transform:rotateY(-90deg) translateZ(100px);}
.top{transform:rotateX(90deg) translateZ(100px);}
.bottom{transform:rotateX(-90deg) translateZ(100px);} 
```  

最终展示效果如下：  
![](/image/css7-11.png)    

# 3D与硬件加速  
坊间流传这这样一个传说：一旦使用3D属性，就能触发设备的硬件加速，从而使得浏览器的表现更佳。但这句话也得看情境——  
> 想象使用GPU加速的动画就像是Vin Diesel（速度与激情的主角）开着Dominic标志性的汽车 —— Dodge Charger。它的定制900 hp引擎可以让它在一瞬间从0加速到60码。但是如果你开着它在拥挤的高速公路上又有什么用呢？这种情况下你选择的车辆Charger是正确的。
但是问题是你还在一个拥堵的高速公路上。——[《CSS硬件加速的好与坏》](http://efe.baidu.com/blog/hardware-accelerated-css-the-nice-vs-the-naughty/)  

这部分会在性能处单独解释。  

# 附录  
参考资料如下：  
* [CSS3 3D Transform](http://www.w3cplus.com/css3/css3-3d-transform.html)  
* [Perspective(graphical)](https://en.wikipedia.org/wiki/Perspective_%28graphical%29)  
* [CSS硬件加速的好与坏](http://efe.baidu.com/blog/hardware-accelerated-css-the-nice-vs-the-naughty/)  





