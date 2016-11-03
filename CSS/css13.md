CSS3 奇特的属性  
===  
这部分主要介绍一些有意思的css3特性，这里也有一份属性兼容性还存在着一定的问题。  

# mask 遮罩层    
兼容性：  
![](/image/css11-1.png)  
Css遮罩是2008年4月由苹果公司添加到webkit引擎中的。遮罩提供一种基于像素级别的，可以控制元素透明度的能力，类似于png24位或png32位中的alpha透明通道的效果。    
图像是由rgb三个通道以及在每个像素上定义的颜色组成的。但是在他们之上还有第四个通道，alpha通道，通过亮度定义每个像素上的透明度。白色意味着不透明，黑色意味着透明，介于黑白之间的灰色表示半透明。你可以看到下面的图片：  
![](/image/css11-2.png)  
给一个html元素使用css遮罩，就会这样处理。不用给图片应用一个alpha通道，只需要给一个图片运用一个-webkit-mask-image的css属性。  

## 图片蒙版  
```css  
.mask1 {
    background : url("images/logo.png") no-repeat;
    -webkit-mask : url("images/mask.png");
}  
```    
它的属性值与background的语法基本一样，相关的属性有webkit-mask-clip、 webkit-mask-position 和webkit-mask-repeat等。下面是效果图： 
![](/image/css11-3.png)  
这里需要注意的是第二张mask.png中黑色部分的透明度（alpha）值为1，将完全显示其下方的图片区域，而其余部分的透明度为0（alpha值），将完全覆盖其下方的图片区域。  

## 渐变蒙版  

```css    
.mask2 {
    background : url("images/logo.png") no-repeat;
    -webkit-mask : -webkit-gradient(linear, left top, right bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
}
```  
其属性值为CSS渐变 老式语法：   
-webkit-gradient( < type>, < point> [, < radius>]?, < point> [, < radius>]? [, < stop>]*)      
而新式语法： -webkit-linear-gradient( [<point> || <angle>,]? <stop>, <stop> [, <stop>]* )     

关于mask详细介绍请看 [CSS遮罩——如何在CSS中使用遮罩](http://www.w3cplus.com/css3/css-masking.html)  

# css3 filter 滤镜  
兼容性： 
![](/image/css11-4.png)  
Filters主要是运用在图片上，以实现一些特效。语法如下：  

```css  
elm {
    filter: none | <filter-function > [ <filter-function> ]* 
}        
```   
其默认值是none，他不具备继承性，其中filter-function一个具有以下值可选：   

* grayscale 灰度
* sepia 褐色
* saturate 饱和度
* hue-rotate色相旋转
* invert 反色
* opacity 透明度
* brightness 亮度
* contrast 对比度
* blur 模糊
* drop-shadow 阴影  

具体效果就是下面这样的：  
![](/image/css11-5.png)  
具体效果，这里有个demo可供查看 [css3 filter滤镜研究](http://59.67.152.41:10080/codepencil/index.php/Code/index/cid/146#)  

# text-fill-color  
兼容性：  
![](/image/css11-5.png)  
text-fill-color是CSS3中的属性，表示文字颜色填充，实现的效果基本上与color一样。从某种程度上讲text-fill-color与color基本上的作用是一样的，如果同时设置color与text-fill-color属性，显然是颜色填充覆盖本身的颜色，也就是文字显示text-fill-color设置的颜色  
ext-fill-color还支持一个transparent属性，也就是透明填充。而这一属性可以实现一些精湛的UI表现，例如：  
## 文字渐变效果   

```html  
<span>SIPC</span>  
```    

```css  
span {
  font-size: 50px;
  background: -webkit-linear-gradient(top,#fc0,#f30 50%,#c00 51%,#600);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} 
```    
效果如下： 
![](/image/css11-7.png)  

## 文字镂空效果  
```css  
span {
  font-size: 50px;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px #fff;
  background:#000;width:300px
}  
```  
效果如下:  
![](/image/css11-8.png)  

## mix-blend-mode/background-blend-mode 混合模式  
兼容性：  
![](/image/css11-9.png)  
大多数图像编辑软件如photoshop或Illustrator都有它们自己的图像合成模式。Blend modes（合成模式）允许你指定元素如何混合合成在一起，并改变图像相交区域的颜色。每一种模式都使用特定的颜色方案来混合源和目标的颜色。  
### 什么是合成（Compositing）  
合成是使用背景（backdrop）组合成为一个图像。  
合成定义了你要如何与已经存在的元素进行混合的方式。源（source）是你想要画的图像，目标（destination）是已经存在的图像（背景）。
假设你有两个元素，它们互相重叠，你可以想象在上面的是源，而源上与背景相互重叠的部分就是目标。
使用不同的合成操作（有16种合成操作），你可以指定两个元素重叠的部分那一部分被绘制，那一部分不绘制。具体如下：  
![](/image/css11-10.png)  
这些合成操作被称为Porter-Duff混合操作。这些操作指定源和目标的那些部分被绘制。现在，我们可以使用两个属性来通过16种指定的混合模式来合成元素和背景图像。这两个属性是：background-blend-mode和mix-blend-mode。让我们分别来学习它们。  

### 合成背景图层：background-blend-mode属性  
background-blend-mode属性从名字可以看出，它的作用是为元素的背景图层指定合成模式。一个背景图层可以是背景图像或是背景色。  
换句话来说，background-blend-mode允许你将一幅图像和背景图像或背景颜色进行混合。  
如果元素有多个背景图像，你可以指定多重混合模式-每一个混合模式都使用列表中指定的背景图像和指定的图像进行混合。如果你有两个背景图像和一个背景颜色，代码如下：  

``` 
background-image: url(first-image.png), url(second-image.png);
background-color: orange;
background-blend-mode: screen, multiply;                               
```     
背景图片second-image.png将使用multiply模式和背景颜色进行混合。
然后first-image.png将使用screen模式和第二幅图像及背景色进行混合。（记住：第一幅背景图像是在上边的图像，第二幅图像位于它的下面。    

### 混合模式（Blend Modes）  
在CSS中有16种可用的混合模式。normal (默认的混合模式), multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color 和 luminosity。
使用不同的混合模式会得到不同的结果。  
* normal：默认的混合模式，混合色的像素会透过所用的颜色显示出来。
* multiply：正片叠底模式。查看么诶个通道的颜色信息，选择基色或混合色复合。结果的颜色通常都比源或目标的颜色要暗。任何颜色和黑色相乘都得到黑色，任何颜色和白色相乘都会保留原来的颜色。
* screen：滤色模式。查看每个通道的颜色信息，并将混合色的互补色和技术复合。结果总是较亮的颜色。任何颜色和白色进行滤色都得到白色，任何颜色和黑色进行滤色都会保留原来的颜色。
* overlay：叠加模式。复合或过滤颜色，取决于基色（backdrop）的值。图像或颜色在现有的像素上叠加，同时保留基色的明暗度。
* darken：变暗模式。查看每个通道的颜色信息，并选择基色或混合色中较暗的颜色作为结果色。比混合色亮的像素被替换，比混合色暗的像素保存不变。
* lighten：变亮模式。选择基色或混合色中较亮的颜色作为结果色。比混合色暗的像素被替换，比混合色亮的像素保存不变。
* color-dodge：颜色减淡模式。查看每个通道中的颜色信息，并通过减小对比度使基色变亮以反映混合色。与黑色混合不发生任何变化。
* color-burn：颜色加深模式。查看每个通道中的颜色信息，并通过增加对比度使基色变暗以及反映混合色。与白色混合不会发生变化。
* hard-light强光模式。符合或过滤颜色，具体取决于混合色。此效果与耀眼的聚光灯照在图像上相似。如果混合色比50%的灰度色亮，则图像变亮。如果混合色比50%的灰度色暗，则图像变暗。
* soft-light：柔光模式。使颜色变亮或变暗，具体取决于混合色。此效果与发散的聚光灯照在图像上的效果类似。如果混合色比50%的灰度色亮，则图像变亮，就像被减淡一样。如果混合色比50%的灰度色暗，则图像变暗，就像被加深了一样。
* difference：差值模式。查看每个通道的颜色信息，并从基色中减去混合色，或从混合色中减去基色。具体取决于哪一个颜色的亮度值更大。与白色混合将反转基色值，与黑色混合则不产生变化。
* exclusion：排除模式。插件一种与“差值”模式相似但对比度更低的效果。与白色混合将反转基色值，与黑色混合不发生变化。
* hue：色相模式。“色相”模式只用“混合色”颜色的色相值进行着色，而使饱和度和亮度值保持不变。
* saturation：饱和度模式。“饱和度”模式的作用方式与“色相”模式相似，它只用“混合色”颜色的饱和度值进行着色，而使色相值和亮度值保持不变。
* color：颜色模式。“颜色”模式能够使用“混合色”颜色的饱和度值和色相值同时进行着色，而使“基色”颜色的亮度值保持不变。“颜色”模式模式可以看成是“饱合度”模式和“色相”模式的综合效果。
* luminosity：亮度模式。“亮度”模式能够使用“混合色”颜色的亮度值进行着色，而保持“基色”颜色的饱和度和色相数值不变。其实就是用“基色”中的“色相”和“饱和度”以及“混合色”的亮度创建“结果色”。  

下面的图片展示了在同一张图片上使用不同的混合模式所得到的不同结果。顺序是从左上角第一幅图片开始。  
![](/image/css11-11.jpg)  

### 元素与背景元素混合：mix-blend-mode属性  
正如前面所提及的，一个背景（backdrop）是元素下面与背景图像相交的一部分内容。这个内容可以是任何东西，包括其他元素。这可以让我们制作出很多非常有趣的效果。想象一下一个固定的页面header在页面向下滚动时与某些元素进行混合，或者文本域背景图像进行混合，甚至是文本域其它文本进行混合等等。  
将各种元素混合在一起我们需要使用mix-blend-mode属性。  
mix-blend-mode属性与background-blend-mode属性相似，它们拥有相同的blend mode值。因此，你可以指定不同的blend mode值来获取不同的合成效果。   

# 附录  
参考资料如下：  
* [详解CSS中的合成和混合模式-Blend modes](http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201503171537.html)  
* [css filter](http://www.runoob.com/cssref/css3-pr-filter.html)  






