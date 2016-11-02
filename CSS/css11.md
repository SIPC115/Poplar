CSS3 动画指南 - 利用js来操控CSS动画  
===  
之前介绍了如何用css制作动画，还记得在一开始评价css动画优劣的时候，我们说过css动画有个很严重的问题就是动画的过程是不好控制的，
只能按照css定义好的规则进行。这里我们介绍一下如何用js来对css进行一些简单的控制。  

# 前置知识  
这里需要介绍几个操作css的js方法  
## getComputedStyle 
getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值。返回的是一个CSS样式声明对象([object CSSStyleDeclaration])，只读。语法如下：   
> getComputedStyle() gives the final used values of all the CSS properties of an element.   
   
```js  
/**
 * var style = window.getComputedStyle("元素", "伪类");   
 */ 
var dom = document.getElementById("test"),
    style = window.getComputedStyle(dom , ":after");
```     
![](/image/css10-1.png)
Gecko 2.0 (Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1) 之前，第二个参数“伪类”是必需的（如果不是伪类，设置为null）。  
## getPropertyValue   
getPropertyValue方法可以获取CSS样式申明对象上的属性值（直接属性名称），例如：  

```js  
window.getComputedStyle(element, null).getPropertyValue("float");    
```  
如果我们不使用getPropertyValue方法，直接使用键值访问，其实也是可以的。但是，比如这里的的float，如果使用键值访问，则不能直接使用getComputedStyle(element, null).float，而应该是cssFloat与styleFloat。
使用getPropertyValue方法不必可以驼峰书写形式（不支持驼峰写法），例如：`style.getPropertyValue("border-top-left-radius");`  
我们都用过jQuery的CSS()方法，其底层运作就应用了getComputedStyle以及getPropertyValue方法。  


# 控制css动画运行状态  
## 控制CSS Transition(过渡)  
对于transition的触发和暂停，我们可以通过js轻易解决。    

1. 触发元素的transition，通过js切换类名即可 
2. 暂停元素的transition，在你想要暂停过渡点用getComputedStyle和getPropertyValue获取该元素相应的CSS属性值，
然后设置该元素的对应的CSS属性等于你刚才获取到的CSS属性值。  

例如，我们想控制一个利用transition做平移运动的div如下：  

```html  
<div class='box'></div> 
<button class='toggleButton' value='play'>Play</button>
```  

```css  
.box {
  margin: 30px;
  height: 50px;
  width: 50px;
  background-color: blue;
}
.box.horizTranslate {
  -webkit-transition: 3s;
  -moz-transition: 3s;
  -ms-transition: 3s;
  -o-transition: 3s;
  transition: 3s;
  margin-left: 50% !important;
}  
```  
点击play按钮我们可以使div运动，play变成pause。点击pause我们可以使div停止运动，保持在原地。js代码如下：   

```js  
var box = document.getElementsByClassName('box')[0];  
document.getElementsByClassName('toggleButton')[0].onclick = function() {
    if(this.innerHTML === 'Play') { 
        //div添加类，使其可以运动
        this.innerHTML = 'Pause';
        box.classList.add('horizTranslate');
    }else {
        //暂停，先获取当前状态，然后移除类名，暂停运动
        this.innerHTML = 'Play';
        var computedStyle = window.getComputedStyle(box),
            marginLeft = computedStyle.getPropertyValue('margin-left');
        box.style.marginLeft = marginLeft;
        box.classList.remove('horizTranslate');    
    }  
}  
```   

同样我们也可以用js监听transition动画结束的事件，利用js监听元素的`transitonEnd`事件即可。 

## 控制CSS Animation(动画)  
### animation-play-state属性  
当你想在动画执行过程中暂停，并且接下来让动画接着执行。这时CSS的animation-play-state属性是非常有用的。你可以可以通过JavaScript像这样更改CSS(注意你的前缀)：  

```js   
element.style.animationPlayState = "paused";
element.style.animationPlayState = "running"; 
```  
然而当使用animation-play-state让CSS 动画暂停时，动画中的元素变形也会以相同的方式被阻止。
你不能使这种变形暂停在某个状态，使它变形，使它恢复，更不用期望它能从新的变形状态中恢复到流畅运行。  
为了解决这个问题，我们还要采取以下措施：  
#### 获取当前keyframes的百分比    
在这个阶段js并没有提供手段让我们能获得当前CSS动画关键帧的“完成百分比“。最好的获取近似值的方法是使用`setInterval` 函数在动画过程中迭代100次。
它的本质是：动画持续的时间(单位是毫秒)/100。例如，如果动画时长4秒，则得到的setInterval的执行时间是每40毫秒(4000 / 100)。
这种做法很不理想，因为函数实际运行频率要远少于每40毫秒。我发现将它设为39毫秒更准确。但这个也不是好实现，因为它依赖于浏览器，并非所有浏览器下都能得到很完美效果。  

#### 获取当前动画的CSS属性值    
> 下面我们就有一个演示，用来测试获取和改变CSS动画"中间流"的技术。该动画让一个元素沿一个圆形路径移动，起始位置在圆形的顶部中心(或称为“十二点”)位置。当按钮被单击时，元素的起始位置变成元素当前移动到的位置。元素会沿着之前相同的路径继续移动，只是现在“起始”的位置变成了你按下按钮时元素移动到的位置。通过在动画的第一关键帧把元素的颜色变成红色，来表示元素动画起始点位置发生了改变。  

在理想的情况下，我们选择一个使用CSS动画的元素，删除该元素当前动画再给它添加个新的动画，
让它可以从当前状态开始新的动画。但是现实情况却很复杂。我们需要用document.styleSheets来获取与页面关联的样式表的集合，然后通过for循环取得具体的样式表。代码如下：  

```js 
function findKeyframesRule(rule) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
            if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) { return ss[i].cssRules[j]; }
        }
    }
    return null;
}  
```  
然后通过`keyframes.cssRules.length`获得该对象的动画长度(这个动画中关键帧的总数量)。
使用JavaScript的.map方法把获得到的每个关键帧值上的“%”过滤掉，这样JavaScript就可以把这些值作为数字使用。这仅仅是完成了关键帧的获取。代码如下：  

```js  
var keyframeString = [];
for(var i = 0; i < length; i ++) {
    keyframeString.push(keyframes[i].keyText);
}
var keys = keyframeString.map(function(str) {
    return str.replace('%', '');
});
```  
在循环动画演示过程中，我们需要两个变量：一个用来跟踪从最近的起始位置开始移动了多少度，另一个用来跟踪从原来的起始位置开始移动了多少度。
我们可以使用setInterval函数(在环形移动度数时消耗的时间)改变第一个变量。然后我们可以使用下面的代码，当单击该按钮时更新第二个变量。  
然后我们可以使用以下函数，在之前我们获得的关键帧数组里，找出与当前总百分比值最接近的关键帧值。  

```js   
function getClosest(keyframe) {
    var curr = keyframe[0];
    var diff = Math.abs (totalCurrentPercent - curr);
    for (var val = 0, j = keyframe.length; val < j; val++) {
        var newdiff = Math.abs(totalCurrentPercent - keyframe[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = keyframe[val];
        }
    }
    return curr;
} 
```  
要获得新动画第一关键帧的位置值，我们可以使用JavaScript的.IndexOf方法。然后我们根据这个值，删除原来的关键帧定义，重新定义该关键帧。  

```js  
for (var i = 0, j = keyframeString.length; i < j; i ++) {
    keyframes.deleteRule(keyframeString[i]);
}  
```  
接下来，我们需要把圆的度数值转换成相应的百分比值。我们可以通过第一关键帧的位置值与3.6简单的相乘得到(因为10 0 * 3.6 = 360)。
最后，我们基于上面获得变量创建新的规则。每个规则之间有45度的差值，是因为我们在绕圈过程中拥有八个不同的关键帧，360(一个圆的度数)除以8是45。  

```js  
keyframes.appendRule("0% {
    translate(-100px,-100px) rotate(" + (multiplier + 0) + "deg);
    background-color: red;
}");
keyframes.append("13% {
    -webkit-transform: translate(100px,100px) rotate(" + (multiplier + 45) + "deg) translate(-100px,-100px) rotate(" + (multiplier + 45) + "deg);
}");  
```   

然后我们通过setInterval重置当前百分比值来使它可以再次运行。   
是不是操作animation异常的麻烦，而且最后我们做出来的操作效果，并不是十分友好，因为操作过程都是跟关键帧做的近似对比，所以你会在示例中看见
动画“跳跃”的状况。[点击浏览具体的demo示例](http://59.67.152.41:10080/codepencil/index.php/Code/index/cid/145)  

### 其他方案  
可以看出，用js控制aniamtion并没有得到良好的效果，这再次说明了css动画的弊端。  
其他的控制手段，比如：重置animtion，利用martix等都不是太好反而让问题变得复杂了  


## js动态添加css  
前面已经看到了，js操作css动画还是有限的。但是js在css操作方面，依然有他的用武之地。  
我们在用js添加css动画的时候，css动画已经被定义好了，但是有些场景我么并不能在编写css阶段就就定义好动画运行状态，例如：  
我们想让一个元素从右侧飞出屏幕，如果用keyframe动画实现，我们必须知道屏幕的宽度，这个信息只有在运行才知道。  
所以用js动态的创建css动画并添加，使我们常用的手段。动态创建css规则这个很简单，就是做字符串拼接么，下面说如何将创建好的规则  
### 插入css规则   
我们可以在页面的document对象的styleSheets中查找第一个可用的style节点，如果当前页面没有style节点我们就需要新建一个 
```js  
function insertRule(rule) {
    if (document.styleSheets && document.styleSheets.length) {
        try {
            document.styleSheets[0].insertRule(rule, 0);
        }catch (ex) {
            console.warn(ex.message, rule);
        }
    }else {
        var style = document.createElement("style");
        style.innerHTML = rule;
        document.head.appendChild(style);
     }
     return;
}  
```    
参数rule就是要添加css文本。  

### 删除CSS规则  
如果动画是临时播放的，那么我们还需要在动画结束后将添加的keyframe的css和class的css删除，避免在页面中制造垃圾。
删除CSS还是需要访问document的styleSheets。由于之前我们一直将CSS添加到styleSheet[0]中，所以在删除的时候我们只访问styleSheets中的第一个CSSStyleSheet实例就可以了。  

```js  
function deleteCSS(ruleName) {
    var cssrules = (document.all) ? "rules": "cssRules",
    i;
    for (i = 0; i < document.styleSheets[0][cssrules].length; i += 1) {
        var rule = document.styleSheets[0][cssrules][i];
        if (rule.name === ruleName || rule.selectorText === '.' + ruleName) {
            document.styleSheets[0].deleteRule(i);
            if (this.debug) {
                console.log("Deleted keyframe: " + ruleName);
            }
            break;
        }
    }
    return;
}
```  
详细的使用js动态创建css动画，在后面js动画的时候我们再说。  

# 附录  
参考资料如下：  
* [Controlling CSS Animations and Transitions with JavaScript](https://css-tricks.com/controlling-css-animations-transitions-javascript/)


