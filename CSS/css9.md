CSS动画指南 - CSS动画技巧
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