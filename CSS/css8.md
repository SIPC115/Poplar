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
![](/image/cssEx-1.png)  
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

于是我们

















参考了一下[腾讯ISUX](http://isux.tencent.com/)的内容，稍微总结一下。  

# 动画制作技巧  
### 规划关键帧(动画过程)  
我们在制作补间动画的时候，关键帧是我们要书写的内容，这部分决定了动画的效果。为此有必要根据沟通和分析合理的规划出
动画的属性分解表和时间轴，例如下面这个属性分解的例子：  
![](/image/css8-3,png)  　　

### transform 动画不同步问题  
在制作一个复杂的动画的时候，你有可能对元素有多个transform的同时变化，然而transform 并不像你想的那样同步发生，
而是按照一定顺序。最右边的操作最先执行，然后往左依次执行。例如下面的代码中scale首先执行，然后是translate，最后是rotate：    

```css  
@keyframes foo {
 to {/*         3rd           2nd              1st      */
   transform: rotate(90deg) translateX(30px) scale(1.5);}}
```    

大多数情况下这不是我们想要的，通常我们希望这些操作同时发生。
此外，如果你把 transform 分割成多个 keyframe，事情会变得更加复杂，有些操作同步，
有些操作不同步。比如下面这个例子：  

```css  
@keyframes foo {
    30%{
        transform: rotateY(360deg);
    }
    65%{
        transform: translateY(-30px) rotateY(-360deg) scale(1.5);
    }
    90%{
        transform: translateY(10px) scale(0.75);
    }
}  
```  
这段代码的动画效果顺序，我们无法预测。为了解决这一问题，我们只能采取一个暴力的手段，即给要执行过个变换的动画
套上多个`<div>`标签，每个标签应用一种需要的变化，这样就不会发生干扰。查看下面的例子，就是通过加`<div>`手段解决的：  
[transform动画不同步研究](http://59.67.152.41:10080/codepencil/index.php/Code/index/cid/143)  
如果希望有一种优雅的方式解决的话，我们会采用 transform的Matrix(矩阵)做变换，这个之后讨论。  

[W3C css transform module level 2](https://drafts.csswg.org/css-transforms-2/)上，已经对这一问题
进行了修正，我们可以不用再关心动画的执行顺序，他们可以同时执行了。然而目前这一提案依然在修订中，并没有正式的浏览器能够支持。
你可以下载 google Chrome Canary(金丝雀)版本的浏览器体验一下。 

### 使用负的延迟值  
如果你需要同时执行多个动画并错开它们的开始时间，可以使用`animation-delay`。
但是这会导致用户打开网页时有些元素需要静止一段时间才会开始移动。
此时可以给animation-delay设置一个负数，这样会将播放头向前移动，
因此用户打开网页的时候所有动画都会播放。使用这种方式可以通过共享一套 keyframes 来实现不同的动画。  

### animation-play-state 控制每屏动画播放  








