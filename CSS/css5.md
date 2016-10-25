CSS 动画指南  
===    
CSS3中引入了`transform`变换属性，过度属性`transition`，动画属性`aniamtion`。三者可以很好的
帮助我们构建一下网页上的动态效果。下面对这三个属性进行简单介绍。  
# transform   
> transform属性规定了一下元素的变换特效。包括：旋转rotate、扭曲skew、缩放scale和移动translate以及矩阵变形matrix。  

## rotate 旋转  
rotate(<角度>) ：通过指定的角度参数对原元素指定一个2D rotation（2D 旋转），需先有transform-origin属性的定义。transform-origin定义的是旋转的基点，其中angle是指旋转角度，如果设置的值为正数表示顺时针旋转，如果设置的值为负数，则表示逆时针旋转。  

## translate 移动    
移动translate我们分为三种情况：translate(x,y)水平方向和垂直方向同时移动（也就是X轴和Y轴同时移动）；
translateX(x)仅水平方向移动（X轴移动）；translateY(Y)仅垂直方向移动（Y轴移动）  

## scale 缩放  
缩放scale和移动translate是极其相似，他也具有三种情况：scale(x,y)使元素水平方向和垂直方向同时缩放（也就是X轴和Y轴同时缩放）；scaleX(x)元素仅水平方向缩放（X轴缩放）；scaleY(y)元素仅垂直方向缩放（Y轴缩放），但它们具有相同的缩放中心点和基数，其中心点就是元素的中心位置，缩放基数为1，如果其值大于1元素就放大，反之其值小于1，元素缩小。  

## skew 扭曲  
扭曲skew和translate、scale一样同样具有三种情况：skew(x,y)使元素在水平和垂直方向同时扭曲（X轴和Y轴同时按一定的角度值进行扭曲变形）；skewX(x)仅使元素在水平方向扭曲变形（X轴扭曲变形）；skewY(y)仅使元素在垂直方向扭曲变形（Y轴扭曲变形）  

## matrix 矩阵  
请参考 [理解CSS3 transform中矩阵变换](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)  

## transform-origin  
他的主要作用就是让我们在进行transform动作之前可以改变元素的基点位置，因为我们元素默认基点就是其中心位置，换句话说我们没有使用transform-origin改变元素基点位置的情况下，transform进行的rotate,translate,scale,skew,matrix等操作都是以元素自己中心位置进行变化的。   
transform-origin(X,Y):用来设置元素的运动的基点（参照点）。默认点是元素的中心点。其中X和Y的值可以是百分值,em,px，其中X也可以是字符参数值left,center,right；Y和X一样除了百分值外还可以设置字符值top,center,bottom。  

## transform 对元素渲染的影响  
引用transform之后，很多元素的渲染将发生改变。下面说说，transform对元素造成的影响  
### 一丶transform 提升元素的垂直位置  
```html  
<style>
    span {
        display: inline-block;
    }
    .pre {
        width: 100px;
        height: 100px;
        background-color: pink;
    }
    .next {
        width: 100px;
        height: 150px;
        background-color: orange;
        margin-left: -50px;
    }
</style>
<div class="contain">
    <span class="pre"></span>
    <span class="next"></span>
</div>  
```  
![](/image/css5-2.png)  
根据渲染规则，两个span发生重叠，后出现的span元素会覆盖之前出现的span元素。然而当我们在`.pre`中加入一个不产生效果的`transform`
例如：`transform: scale(1); transform: translate(0);`之类的，会发生下面的情况。  

```html  
<style>
    span {
        display: inline-block;
    }
    .pre {
        width: 100px;
        height: 100px;
        background-color: pink;
        transform: translate(0);
    }
    .next {
        width: 100px;
        height: 150px;
        background-color: orange;
        margin-left: -50px;
    }
</style>
<div class="contain">
    <span class="pre"></span>
    <span class="next"></span>
</div>  
```  
![](/image/css5-3.png)  
如图，第一个span因为应用了transform属性，导致垂直位置发生提升，盖住了后出现的span元素。只要是支持transform元素的浏览器，包括IE9(-ms-), 都会提高普通元素的垂直地位，使其覆盖其他元素而不是被覆盖。  

### 二丶transform 会取消position: fixed效果  
`position:fixed`可以让元素不跟随浏览器的滚动条滚动，但是如果一个元素的父元素上面使用了transform属性，那么这个元素将不在表现为
`position: fixed;`例如： 
```html
<div>
    <span src="mm1.jpg"style="position:fixed;">这里用fixed定位</span>
</div>  
```   
当页面发生滚动时，span元素由于用`position: fixed;`定位，而不会滚动。  
但是如果改成下面这种结构： 
```html  
<div style="transform: translate(0);">
    <span src="mm1.jpg"style="position:fixed;">这里用fixed定位</span>
</div>  
```  
那么span元素将表现为`position:absolute;`一样的效果，并随着滚动滚动。  

### 三丶transform 改变overflow对absolute元素的限制  
在以前，overflow与absolute之间的限制规范内容大致是这样的：  
> absolute绝对定位元素，如果含有overflow不为visible的父级元素，同时，该父级元素以及到该绝对定位元素之间任何嵌套元素都没有position为非static属性的声明，则overflow对该absolute元素不起作用。  

如下html结构：  
```html 
<style>  
    .contain {
        width: 200px;
        height: 200px;
        border: 5px solid pink;
        overflow: hidden;
    }
    span {
        position: absolute;
        width: 300px;
        height: 200px;
        display: inline-block;
        background-color: orange;
    }
</style> 
<div class="contain">
    <div>
        <span></span>
    </div>
</div>  
```   
![](/image/css5-4.png)   
如图，`.contain`元素设置了`overflow: hidden`;。span设置了`position: absolute;`根据规则，此时
`overflow: hidden`将不再起作用，所以span溢出部分没有被遮挡。  
一旦我们给overflow容器与其有嵌套关系的子元素使用transform声明时（修改上面的结构）：  
```html  
<div class="contain">
    <div style="transform: translate(0);">
        <span></span>
    </div>
</div>  
```   
![](/image/css5-5.png)    
上述规则将不再适用。  

**注意：Chrome/Opera浏览器下，只有嵌套元素含有transform属性的时候，absolute元素才会被overflow隐藏；但是在IE9+/FireFox浏览器下，无论是overflow容器还是嵌套子元素，只要有transform属性，就会hidden溢出的absolute元素。**  

### 四丶transform 限制absolute的100%宽度大小   
以前，我们设置absolute元素宽度100%, 则都会参照第一个非static值的position祖先元素计算，没有就window. 现在，诸位，需要把transform也考虑在内了。 

### 五丶transform: tranlate3d(0, 0, 0)带来的问题  
使用`transform: tranlate3d(0, 0, 0)`，我们知道这样可以是一个元素成为合成层(优化渲染)。现在
我们可以暂时理解为开启了GPU渲染，提高了动画的流畅度。但是，其同样会带来一个层爆炸的问题。之后在性能
部分会着重说明。  

### 六丶总结  
个人觉得，之所以会产生上面几个问题的主要原因如下：  
* [CSS中的层叠上下文和层叠顺序](http://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
* [GPU Accelerated Compositing in Chrome](http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome)  
请移步阅读这两篇文章

# transition 属性   
## 基本概念
> css的transition允许css的属性值在一定的时间区间内平滑地过渡。这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，
并圆滑地以动画效果改变CSS的属性值。  

transition主要包含四个属性值：执行变换的属性：transition-property,变换延续的时间：transition-duration,在延续时间段，变换的速率变化transition-timing-function,变换延迟时间transition-delay。  
## transition-property    
transition-property是用来指定当元素其中一个属性改变时执行transition效果,主要取值有:  
* none(没有属性改变)  
* all（所有属性改变）这个也是其默认值  
* ident（元素属性名）  
当其值为none时，transition马上停止执行，当指定为all时，则元素产生任何属性值变化时都将执行transition效果，ident是可以指定元素的某一个属性值。  

## transition-duration  
transition-duration是用来指定元素 转换过程的持续时间，单位为s（秒）或者ms(毫秒),可以作用于所有元素， 
包括:before和:after伪元素。其默认值是0，也就是变换时是即时的。  

## transition-timing-function  
transition-timing-function的值允许你根据时间的推进去改变属性值的变换速率，transition-timing-function有6个可能值：  

1. ease：（逐渐变慢）默认值，ease函数等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0)
2. linear：（匀速），linear 函数等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0)
3. ease-in：(加速)，ease-in 函数等同于贝塞尔曲线(0.42, 0, 1.0, 1.0)
4. ease-out：（减速），ease-out 函数等同于贝塞尔曲线(0, 0, 0.58, 1.0)
5. ease-in-out：（加速然后减速），ease-in-out 函数等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)
6. cubic-bezier：（该值允许你去自定义一个时间曲线）， 特定的cubic-bezier曲线。 (x1, y1, x2, y2)四个值特定于曲线上点P1和点P2。所有值需在[0, 1]区域内，否则无效  

## transition-delay  
transition-delay是用来指定一个动画开始执行的时间，
也就是说当改变元素属性值后多长时间开始执行transition效果，单位为s（秒）或者ms(毫秒)， 
其使用和transition-duration极其相似，也可以作用于所有元素，包括:before和:after伪元素。 
默认大小是"0"，也就是变换立即执行，没有延迟。

## transition的使用注意  
（1）目前，各大浏览器（包括IE 10）都已经支持无前缀的transition，所以transition已经可以很安全地不加浏览器前缀。    
（2）不是所有的CSS属性都支持transition，完整的列表[查看这里](http://oli.jp/2010/css-animatable-properties/)。    
（3）transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。
比如，height从0px变化到100px，transition可以算出中间状态。
但是，transition没法算出0px到auto的中间状态，也就是说，如果开始或结束的设置是height: auto，
那么就不会产生动画效果。类似的情况还有，display: none到block，background: url(foo.jpg)到url(bar.jpg)等等。  

## transition的局限  
transition的优点在于简单易用，但是它有几个很大的局限。  
（1）transition需要事件触发，所以没法在网页加载时自动发生。  
（2）transition是一次性的，不能重复发生，除非一再触发。  
（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。  
（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。  
为了解决这些局限，css3引入了animation  

# animation    
> CSS3的animation类似于transition属性，他们都是随着时间改变元素的属性值。他们主要区别是transition需要触发一个事件(hover事件或click事件等)才会随时间改变其css属性；而animation在不需要触发任何事件的情况下也可以显式的随着时间变化来改变元素css的属性值，从而达到一种动画的效果。这样我们就可以直接在一个元素中调用animation的动画属性,基于这一点，css3的animation就需要明确的动画属性值。  

## Keyframes  
要使用animation首先我们要定义`keyframes`关键帧,  
Keyframes具有其自己的语法规则，他的命名是由"@keyframes"开头，后面紧接着是这个“动画的名称”加上一对花括号“{}”，
括号中就是一些不同时间段样式规则，有点像我们css的样式写法一样。
对于一个"@keyframes"中的样式规则是由多个百分比构成的，如“0%”到"100%"之间，我们可以在这个规则中创建多个百分比，
我们分别给每一个百分比中给需要有动画效果的元素加上不同的属性，从而让元素达到一种在不断变化的效果，
比如说移动，改变元素颜色，位置，大小，形状等，不过有一点需要注意的是，我们可以使用“fromt”“to”来代表一个动画是从哪开始，
到哪结束，也就是说这个 "from"就相当于"0%"而"to"相当于"100%",值得一说的是，
其中"0%"不能像别的属性取值一样把百分比符号省略，我们在这里必须加上百分符号（“%”）如果没有加上的话，
我们这个keyframes是无效的，不起任何作用。因为keyframes的单位只接受百分比值。   

更多的介绍请自行参考官网。  

引入w3c官网有关于css3的animation对属性变化的过程示意图：    
![](/image/css5-1.png)  
有了关键帧，我们还需要了解animation涉及的属性值：  

## animation-name   
animation-name:是用来定义一个动画的名称，其主要有两个值：IDENT是由Keyframes创建的动画名，
换句话说此处的IDENT要和Keyframes中的IDENT一致，
如果不一致,将不能实现任何动画效果；none为默认值，
当值为none时，将没有任何动画效果。另外我们这个属性跟前面所讲的transition一样，
我们可以同时附几个animation给一个元素，我们只需要用逗号“，”隔开。  

## animation-duration  
animation-duration是用来指定元素播放动画所持续的时间长，单位为s （秒.）其默认值为“0”。这个属性跟transition中的transition-duration使用方法是一样的。   

## animation-timing-function  
animation-timing-function:是指元素根据时间的推进来改变属性值的变换速率，说得简单点就是动画的播放方式。他和transition中的transition-timing-function一样，具有以下六种变换方式：ease;ease-in;ease-in-out;linear;cubic-bezier。  
和`transition-timing-function`类似，都是通过贝塞尔曲线来控制的，这点之后再说。  

## animation-delay  
animation-delay:是用来指定元素动画开始时间。取值为<time>为数值，单位为s(秒)，其默认值也是0。这个属性和transition-delayy使用方法是一样的。  

## animation-iteration-count  
animation-iteration-count是用来指定元素播放动画的循环次数，其可以取值为数字，其默认值为“1”；infinite为无限次数循环。  

## animation-direction  
animation-direction是用来指定元素动画播放的方向，其只有两个值，默认值为normal，如果设置为normal时，动画的每次循环都是向前播放；另一个值是alternate，他的作用是，动画播放在第偶数次向前播放，第奇数次向反方向播放。  

## animation-play-state  
animation-play-state主要是用来控制元素动画的播放状态。其主要有两个值，running和paused其中running为默认值。他们的作用就类似于我们的音乐播放器一样，可以通过paused将正在播放的动画停下了，也可以通过running将暂停的动画重新播放，我们这里的重新播放不一定是从元素动画的开始播放，而是从你暂停的那个位置开始播放。另外如果暂时了动画的播放，元素的样式将回到最原始设置状态。  

# css动画问题  
css动画虽然很方便简单，但是本身也存在着很多问题：   

1. css很难对运行运行加以时的控制和响应一些事件
2. css能够实现的效果很有限，并不是所有的动画都能实现  
3. 并不是所有的浏览器都对css动画进行过优化  

这三个问题并不能很好的解决，所以还是推荐学习js动画。  
另外推荐一些css动画的网站吧：  
* 一个很好很强大css动画库：[Animate.css](https://daneden.github.io/animate.css/)   
* CSS动画设计工具：[CSS3动画设计工具](http://isux.tencent.com/css3/tools.html)   
* CSS动画效果学习：[CSS3.0 Maker](http://www.css3maker.com/css3-transform.html)  
* CSS贝塞尔曲线对比：[cubic bezier](http://cubic-bezier.com/#.17,.67,.83,.67)



# 附录  
参考资料如下：  
* [W3C CSS Transition](https://www.w3.org/TR/css3-transitions/#properties-from-css-)   
* [CSS权威指南](https://item.jd.com/10100250.html)   



