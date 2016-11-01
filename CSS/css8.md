CSS动画指南 - 补间动画&逐帧动画  
===  
# 补间动画  
> 补间动画是动画的基础形式之一，又叫做中间帧动画,渐变动画，指的是人为设定动画的关键状态，也就是关键帧，而关键帧之间的过渡过程只需要由计算机处理渲染的一种动画形式。  
说白了，就是我们在做动画的时候，只需要指定几个特殊时刻动画的状态，其余的状态由计算机自动计算补充。  

## 常见的实现手段  
实现补间动画常见的手段主要由以下几种：   
* CSS3 Animation：通过animation(除steps()以外的时间函数)属性在每个关键帧之间插入补间动画。  
* CSS3 Transition：区别于animation，transition只能设定`初始`和`结束`时刻的两个关键帧状态。  
* 利用JavaScript实现动画：例如JavaScript动画库或框架，著名的TweenJS，它是CreateJS的其中一个套件。另外，在Flash业界久负盛名的GreenSock推出的GSAP(GreenSock Animation Platform)也新引入了对Javascript动画的支持。  
* SVG & canvas动画：利用SVG或者是Canvas完成动画的制作    
* 其他手段：借助gif图片和video来实现动画  

这里我们只介绍用css完成补间动画，js留到后面说。    
## CSS 补间动画  
### transition 动画  
在之前我们已经说过了，css动画需要的关键属性。transition允许css的属性值在一定的时间区间内平滑地过渡，即指定元素的初始状态
和末尾状态，既可以完成一个动画，中间的变化完全有浏览器自己决定。动画的效果主要还是看transition相关属性即可。  
然而利用transition制作的动画也有着显著的缺点：    

1. transition需要事件触发，所以没法在网页加载时自动发生。
2. transition是一次性的，不能重复发生，除非一再触发。
3. transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。
4. 一条transition规则，只能定义一个属性的变化，不能涉及多个属性。 

### animation 动画  
利用animation可以完成一个完整的css补间动画，如上面所说，我们只需要定义几个特殊时刻的动画状态即可。
这个特殊时刻通常我们叫做关键帧。  
#### keyframes 关键帧  
Keyframes具有其自己的语法规则，他的命名是由"@keyframes"开头，后面紧接着是这个“动画的名称”加上一对花括号“{}”，括号中就是一些不同时间段样式规则，有点像我们css的样式写法一样。对于一个"@keyframes"中的样式规则是由多个百分比构成的，如“0%”到"100%"之间，我们可以在这个规则中创建多个百分比，我们分别给每一个百分比中给需要有动画效果的元素加上不同的属性，从而让元素达到一种在不断变化的效果，比如说移动，改变元素颜色，位置，大小，形状等，不过有一点需要注意的是，我们可以使用“fromt”“to”来代表一个动画是从哪开始，到哪结束，也就是说这个 "from"就相当于"0%"而"to"相当于"100%",值得一说的是，其中"0%"不能像别的属性取值一样把百分比符号省略，我们在这里必须加上百分符号（“%”）如果没有加上的话，我们这个keyframes是无效的，不起任何作用。因为keyframes的单位只接受百分比值。看一下具体的代码：  

```css  
@keyframes IDENT {
    from {
        Properties:Properties value;
    }
    Percentage {
        Properties:Properties value;
    }
    to {
        Properties:Properties value;
    }
}
/*或者全部写成百分比的形式：*/
@keyframes IDENT {
    0% {
        Properties:Properties value;
    }
    Percentage {
        Properties:Properties value;
    }
    100% {
        Properties:Properties value;
    }
}  
```  
其中IDENT是一个动画名称，你可以随便取，当然语义化一点更好，Percentage是百分比值，我们可以添加许多个这样的百分比，Properties为css的属性名，比如说left,background等，value就是相对应的属性的属性值。值得一提的是，我们from和to 分别对应的是0%和100%。    
看一个实例W3C官方示例：  

```css  
@keyframes wobble {
    0% {
        margin-left: 100px;
        background: green;
    }
    40% {
        margin-left: 150px;
        background: orange;
    }
    60% {
        margin-left: 75px;
        background: blue;
    }
    100% {
        margin-left: 100px;
        background: red;
    }
}
```  
这里我们定义了一个叫“wobble”的动画，他的动画是从0%开始到100%时结束，从中还经历了一个40%和60%两个过程，上面代码具体意思是：wobble动画在0%时元素定位到left为100px的位置背景色为green，然后40%时元素过渡到left为150px的位置并且背景色为orange，60%时元素过渡到left为75px的位置,背景色为blue，最后100%结束动画的位置元素又回到起点left为100px处,背景色变成red。假设置我们只给这个动画有10s的执行时间，那么他每一段执行的状态如下图所示：    
![](/image/css8-1.png)  
Keyframes定义好了以后, 我们就可以通过`animation`属性来调用它了。 

# 逐帧动画  
百度百科对逐帧动画定义如下：  
> 逐帧动画是一种常见的动画形式（Frame By Frame），其原理是在“连续的关键帧”中分解动画动作，也就是在时间轴的每帧上逐帧绘制不同的内容，使其连续播放而成动画。  

逐帧动画是一种常见的动画形式（Frame By Frame），其原理是在“连续的关键帧”中分解动画动作，也就是在时间轴的每帧上逐帧绘制不同的内容，使其连续播放而成动画。    

## 常见的实现手段  
前端实现帧动画同样也有许多手段，比如git，js，css等。CSS3 实际上是使用 animation-timing-function 的阶梯函数 steps(number_of_steps, direction) 来实现逐帧动画的连续播放的。    

## 帧动画制作过程
### 1. 制作动画帧为雪碧图  
这里在网上找了一个动画效果如图：  
![](/image/cssEx-1.gif)  
这个动画是用gif实现的，我们用PS打开，发现这个gif其实是由许多静态图片组成(帧)  
![](/image/cssEx-2.png)  
这些静态的图片循环播放，形成了一个动态的动画效果。这就是帧动画。
为此我们取出其中的几个关键帧的图片做成一张雪碧图，然后通过调整
`background-position`的值，实现位置的切换(显示不同的图片)。
我们将帧动画，需要的关键帧做成一张雪碧图。因此，逐帧动画也被称为“精灵动画（sprite animation）”这个在游戏开发的时候经常使用。  
![](/image/charector.png)  
定义如下css：  

```css  
.charector {
    position: absolute;
    width: 180px;
    height: 300px;
    background: url(charector.png) 0 0 no-repeat;   
} 
```   
### 2. 使用steps实现逐帧动画 
steps 指定了一个阶梯函数，包含两个参数：
* 第一个参数指定了函数中的间隔数量（必须是正整数）；
* 第二个参数可选，指定在每个间隔的起点或是终点发生阶跃变化，接受 start 和 end 两个值，默认为 end。   

参考[W3C timing-function](https://www.w3.org/TR/2012/WD-css3-transitions-20120403/#transition-timing-function-property),
看下W3C提供的参考图：  
![](/image/css8-4.png)   
steps函数，它可以传入两个参数，第一个是一个大于0的整数，他是将间隔动画等分成指定数目的小间隔动画，然后根据第二个参数来决定显示效果。
第二个参数设置后其实和step-start，step-end同义，在分成的小间隔动画中判断显示效果。
可以看出：steps(1, start) 等于step-start，steps(1,end)等于step-end
最核心的一点就是：timing-function 作用于每两个关键帧之间，而不是整个动画。  

于是我们定义如下动画：  

```css  
@keyframes charector-1 {
    0% {background-position: 0 0;}
    14.3% {background-position: -180px 0;}
    28.6% {background-position: -360px 0;}
    42.9% {background-position: -540px 0;}
    57.2% {background-position: -720px 0;}
    71.5% {background-position: -900px 0;}
    85.8% {background-position: -1080px 0;}
    100% {background-position: 0 0;}
}  
```  
同时修改`.charector`, 加入下面的css：  

```css   
.charector {
    animation-name: charector-1;
	animation-iteration-count: infinite;   /* 动画无限播放 */
	animation-timing-function: step-start; /* 马上跳到动画每一结束桢的状态 */
	animation-duration: 950ms;             /* 动画运行的时间 */
}
```  
任务完成，[点击这里查看DEMO](http://59.67.152.41:10080/codepencil/index.php/Code/index/cid/144)  

### 3. 逐帧动画技巧  
#### （1）step-start 与 step-end  
除了 steps 函数，animation-timing-function 还有两个与逐帧动画相关的属性值 step-start 与 step-end：
* step-start 等同于 steps(1,start)：动画执行时以开始端点为开始；
* step-end 等同于 steps(1,end)：动画执行时以结尾端点为开始。  

#### （2）动画帧的计算    

```less   
$spriteWidth: 140px; // 精灵宽度 
@keyframes ani {
  100% {
    background-position: -($spriteWidth * 12) 0; // 12帧
  }
} 
```  
#### (3) 简单的适配屏幕  
利用rem我们可以完成对移动端的适配，但是rem 的计算会存在误差，因此使用雪碧图时我们并不推荐用 rem。如果是逐帧动画的话，由于计算的误差，会出现抖动的情况。
为此可以采用下面的方案适配：  

* 非逐帧动画部分，使用 rem 做单位；
* 逐帧动画部分，使用 px 做单位，再结合 js 对动画部分使用 scale 进行缩放。  

移动端部分会对适配详解。  

# 附录  
参考资料如下：  
* [京东凹凸实验室](https://aotu.io/)  
* [W3C CSS Transitions](https://www.w3.org/TR/2012/WD-css3-transitions-20120403/#transition-timing-function-property)  
* [图解CSS3](https://item.jd.com/11494721.html) 








