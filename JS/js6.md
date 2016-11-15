js 内存管理  
===  
# 基础  
## 简介  
诸如 C 语言这般的低级语言一般都有低级的内存管理原语，比如 malloc() 和 free()。而另外一些高级语言，比如 JavaScript， 其在变量（对象，字符串等等）创建时分配内存，然后在它们不再使用时“自动”释放。后者被称为垃圾回收。“自动”是容易让人混淆，迷惑的，并给 JavaScript（和其他高级语言）开发者一个印象：他们可以不用关心内存管理。然而这是错误的。  
## 内存生命周期  
不管什么程序语言，内存生命周期基本是一致的：     

1. 分配你所需要的内存
2. 使用分配到的内存（读、写）
3. 不需要时将其释放/归还  

在所有语言中第一和第二部分都很清晰。最后一步在低级语言中很清晰，但是在像JavaScript 等高级语言中，这一步是隐藏的、透明的。  

# JavaScript 内存   
**值的初始化**   
为了不让程序员费心分配内存，JavaScript 在定义变量时就完成了内存分配。  

```js  
// 给数值变量分配内存
var n = 123; 
// 给字符串分配内存
var s = "azerty"; 

// 给对象及其包含的值分配内存
var o = {
    a: 1,
    b: null
}; 

// 给数组及其包含的值分配内存（就像对象一样）
var a = [1, null, "abra"]; 

// 给函数（可调用的对象）分配内存
function f(a){
    return a + 2;
} 

// 函数表达式也能分配一个对象
someElement.addEventListener('click', function(){
    someElement.style.backgroundColor = 'blue';
}, false);  
```  
**通过函数调用的内存分配**     
有些函数调用结果是分配对象内存：  

```js  
var d = new Date(); // 分配一个 Date 对象
var e = document.createElement('div'); // 分配一个 DOM 元素  
```  
有些方法分配新变量或者新对象：  

```js  
var s = "azerty";
var s2 = s.substr(0, 3); // s2 是一个新的字符串
// 因为字符串是不变量
// JavaScript 可能没有分配内存
// 但只是存储了 [0-3] 的范围。

var a = ["ouais ouais", "nan nan"];
var a2 = ["generation", "nan nan"];
var a3 = a.concat(a2); 
// 新数组有四个元素，是 a 连接 a2 的结果  
```  

**值的使用**  
使用值的过程实际上是对分配内存进行读取与写入的操作。
读取与写入可能是写入一个变量或者一个对象的属性值，甚至传递函数的参数。     
**当内存不再需要使用时释放**   
大多数内存管理的问题都在这个阶段。在这里最艰难的任务是找到“所分配的内存确实已经不再需要了”。
它往往要求开发人员来确定在程序中哪一块内存不再需要并且释放它。   
高级语言解释器嵌入了“垃圾回收器”，它的主要工作是跟踪内存的分配和使用，以便当分配的内存不再使用时，
自动释放它。这只能是一个近似的过程，因为要知道是否仍然需要某块内存是无法判定的 (无法通过某种算法解决)。  

## 垃圾回收   
Javascript 是那些被称作垃圾回收语言当中的一员。垃圾回收语言通过周期性地检查那些之前被分配出去的内存是否可以从应用的其他部分访问来帮助开发者管理内存。换句话说，垃圾回收语言将内存管理的问题从“什么样的内存是仍然被使用的？”简化成为“什么样的内存仍然可以从应用程序的其他部分访问？”。两者的区别是细微的，但是很重要：开发者只需要知道一块已分配的内存是否会在将来被使用，而不可访问的内存可以通过算法确定并标记以便返还给操作系统。  

>  非垃圾回收语言通常使用其他的技术来管理内存，包括：显式内存管理，程序员显式地告诉编译器在何时不再需要某块内存；引用计数，一个计数器关联着每个内存块（当计数器的计数变为0的时候，这块内存就被操作系统回收）。
这些技术都有它们的折中考虑（也就是说都有潜在的内存泄漏风险）。  

### 引用  
垃圾回收算法主要依赖于引用（reference）的概念。在内存管理的环境中，一个对象如果有访问另一个对象的权限（隐式或者显式），
叫做一个对象引用另一个对象。例如，一个Javascript对象具有对它原型的引用（隐式引用）和对它属性的引用（显式引用）。
在这里，“对象”的概念不仅特指 JavaScript 对象，还包括函数作用域（或者全局词法作用域）。  

### 引用计数垃圾收集  
这是最简单的垃圾收集算法。此算法把“对象是否不再需要”简化定义为“对象有没有其他对象引用到它”。
如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收。例如：  

```js  
var o = { 
    a: {
        b:2
    }
}; 
// 两个对象被创建，一个作为另一个的属性被引用，另一个被分配给变量o
// 很显然，没有一个可以被垃圾收集


var o2 = o; // o2变量是第二个对“这个对象”的引用

o = 1;      // 现在，“这个对象”的原始引用o被o2替换了

var oa = o2.a; // 引用“这个对象”的a属性
// 现在，“这个对象”有两个引用了，一个是o2，一个是oa

o2 = "yo"; // 最初的对象现在已经是零引用了
           // 他可以被垃圾回收了
           // 然而它的属性a的对象还在被oa引用，所以还不能回收

oa = null; // a属性的那个对象现在也是零引用了
           // 它可以被垃圾回收了  
```  
实际例子: IE 6, 7 使用引用计数方式对 DOM 对象进行垃圾回收。该方式常常造成对象被循环引用时内存发生泄露：  

```js  
var div;
window.onload = function(){
    div = document.getElementById("myDivElement");
    div.circularReference = div;
    div.lotsOfData = new Array(10000).join("*");
};  
```  
在上面的例子里，myDivElement 这个 DOM 元素里的 circularReference 属性引用了 myDivElement，
造成了循环引用。如果该属性没有显示移除或者设为 null，引用计数式垃圾收集器将总是且至少有一个引用，
并将一直保持在内存里的 DOM 元素，即使其从DOM 树中删去了。
如果这个 DOM 元素拥有大量的数据 (如上的 lotsOfData 属性)，而这个数据占用的内存将永远不会被释放。  

### 标记-清楚算法  
这个算法把“对象是否不再需要”简化定义为“对象是否可以获得”。

这个算法假定设置一个叫做根（root）的对象（在Javascript里，根是全局对象）。定期的，垃圾回收器将从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和所有不能获得的对象。

这个算法比前一个要好，因为“有零引用的对象”总是不可获得的，但是相反却不一定，参考“循环引用”。

从2012年起，所有现代浏览器都使用了标记-清除垃圾回收算法。所有对JavaScript
垃圾回收算法的改进都是基于标记-清除算法的改进，并没有改进标记-清除算法本身和它对“对象是否不再需要”的简化定义。  

## JavaScript 常见的内存泄露  
### 1. 意外的全局变量  
Javascript 语言的设计目标之一是开发一种类似于 Java 但是对初学者十分友好的语言。体现 JavaScript 宽容性的一点表现在它处理未声明变量的方式上：
一个未声明变量的引用会在全局对象中创建一个新的变量。在浏览器的环境下，全局对象就是 window，也就是说：  

```js  
function foo(arg) {
    bar = "this is mine";
}  
```  
实际上是：  

```js  
function foo(arg) {
    window.bar = "this is mine";
} 
```
如果 bar 是一个应该指向 foo 函数作用域内变量的引用，但是你忘记使用 var 来声明这个变量，
这时一个全局变量就会被创建出来。 

### 2. 被遗漏的定时器和回调函数    
在 JavaScript 中 setInterval 的使用十分常见。其他的库也经常会提供观察者和其他需要回调的功能。这些库中的绝大部分都会关注一点，
就是当它们本身的实例被销毁之前销毁所有指向回调的引用。在 setInterval 这种情况下，一般情况下的代码是这样的：  

```js  
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('Node');
    if(node) {
        // Do stuff with node and someResource.
        node.innerHTML = JSON.stringify(someResource));
    }
}, 1000);  
```  
这个例子说明了摇晃的定时器会发生什么：引用节点或者数据的定时器已经没用了。
那些表示节点的对象在将来可能会被移除掉，所以将整个代码块放在周期处理函数中并不是必要的。
然而，由于周期函数一直在运行，处理函数并不会被回收（只有周期函数停止运行之后才开始回收内存）。
如果周期处理函数不能被回收，它的依赖程序也同样无法被回收。这意味着一些资源，也许是一些相当大的数据都也无法被回收。  

### 3. DOM 之外的引用  
有些情况下将 DOM 结点存储到数据结构中会十分有用。假设你想要快速地更新一个表格中的几行，
如果你把每一行的引用都存储在一个字典或者数组里面会起到很大作用。如果你这么做了，程序中将
会保留同一个结点的两个引用：一个引用存在于 DOM 树中，另一个被保留在字典中。
如果在未来的某个时刻你决定要将这些行移除，则需要将所有的引用清除。  

```js  
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image'),
    text: document.getElementById('text')
};
 
function doStuff() {
    image.src = 'http://some.url/image';
    button.click();
    console.log(text.innerHTML);
    // Much more logic
}
 
function removeButton() {
    // The button is a direct child of body.
    document.body.removeChild(document.getElementById('button'));
 
    // At this point, we still have a reference to #button in the global
    // elements dictionary. In other words, the button element is still in
    // memory and cannot be collected by the GC.
} 
```  
还需要考虑另一种情况，就是对 DOM 树子节点的引用。假设你在 JavaScript 代码中保留了一个表格中特定单元格(一个 `<td>` 标签)
的引用。在将来你决定将这个表格从 DOM 中移除，但是仍旧保留这个单元格的引用。凭直觉，
你可能会认为 GC 会回收除了这个单元格之外所有的东西，但是实际上这并不会发生：单元格
是表格的一个子节点且所有子节点都保留着它们父节点的引用。换句话说，JavaScript 代码中对单元格的引用导致整
个表格被保留在内存中。所以当你想要保留 DOM 元素的引用时，要仔细的考虑清除这一点。  

### 4. 闭包  
JavaScript 开发中一个重要的内容就是闭包，它是可以获取父级作用域的匿名函数。Meteor 
的开发者发现在一种特殊情况下有可能会以一种很微妙的方式产生内存泄漏，这取决于 JavaScript 运行时的实现细节。  

```js  
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing)
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage);
    }
  };
};
setInterval(replaceThing, 1000); 
```    
这段代码做了一件事：每次调用 replaceThing 时，theThing 都会得到新的包含一个大数组和新的闭包（someMethod）的对象。同时，没有用到的那个变量持有一个引用了 originalThing（replaceThing 调用之前的 theThing）闭包。哈，是不是已经有点晕了？关键的问题是每当在同一个父作用域下创建闭包作用域的时候，这个作用域是被共享的。在这种情况下，someMethod 的闭包作用域和 unused 的作用域是共享的。unused 持有一个 originalThing 的引用。尽管 unused 从来没有被使用过，someMethod 可以在 theThing 之外被访问。而且 someMethod 和 unused 共享了闭包作用域，即便 unused 从来都没有被使用过，它对 originalThing 的引用还是强制它保持活跃状态（阻止它被回收）。当这段代码重复运行时，将可以观察到内存消耗稳定地上涨，并且不会因为 GC 的存在而下降。本质上来讲，创建了一个闭包链表（根节点是 theThing 形式的变量），而且每个闭包作用域都持有一个对大数组的间接引用，这导致了一个巨大的内存泄露。  


## 垃圾收集器(GC)的行为  
尽管垃圾收集器是便利的，但是使用它们也需要有一些利弊权衡。其中之一就是不确定性。也就是说，GC 的行为是不可预测的。通常情况下都不能确定什么时候会发生垃圾回收。这意味着在一些情形下，程序会使用比实际需要更多的内存。有些的情况下，在很敏感的应用中可以观察到明显的卡顿。尽管不确定性意味着你无法确定什么时候垃圾回收会发生，不过绝大多数的 GC 实现都会在内存分配时遵从通用的垃圾回收过程模式。如果没有内存分配发生，大部分的 GC 都会保持静默。考虑以下的情形：

1. 大量内存分配发生时。
2. 大部分（或者全部）的元素都被标记为不可达（假设我们讲一个指向无用缓存的引用置 null 的时候）。
3. 没有进一步的内存分配发生。  

这个情形下，GC 将不会运行任何进一步的回收过程。也就是说，尽管有不可达的引用可以触发回收，
但是收集器并不要求回收它们。严格的说这些不是内存泄露，但仍然导致高于正常情况的内存空间使用。  

# 利用 Chrome Dev 发现内存泄露  
Chrome 提供了一套很好的工具用来分析 JavaScript 的内存适用。这里有两个与内存相关的重要视图：
timeline 视图和 profiles 视图。 
## Timeline view  
![](/image/js5-1.jpg)  
timeline 视图是我们用于发现不正常内存模式的必要工具。当我们寻找严重的内存泄漏时，内存回收发生后产生的周期性的不会消减的内存跳跃式增长会被一面红旗标记。在这个截图里面我们可以看到，这很像是一个稳定的对象内存泄露。即便最后经历了一个很大的内存回收，它占用的内存依旧比开始时多得多。节点数也比开始要高。这些都是代码中某处 DOM 节点内存泄露的标志。  

## Profiles 视图  
![](/image/js5-2.jpg)  
你将会花费大部分的时间在观察这个视图上。profiles 视图让你可以对 JavaScript 代码运行时的内存进行快照，并且可以比较这些内存快照。它还让你可以记录一段时间内的内存分配情况。在每一个结果视图中都可以展示不同类型的列表，但是对我们的任务最有用的是 summary 列表和 comparison 列表。

summary 视图提供了不同类型的分配对象以及它们的合计大小：shallow size （一个特定类型的所有对象的总和）和 retained size （shallow size 加上保留此对象的其它对象的大小）。distance 显示了对象到达 GC 根（校者注：最初引用的那块内存，具体内容可自行搜索该术语）的最短距离。

comparison 视图提供了同样的信息但是允许对比不同的快照。这对于找到泄露很有帮助。  

## 案例  
有两个重要类型的内存泄露：引起内存周期性增长的泄露和只发生一次且不引起更进一步内存增长的泄露。
显而易见的是，寻找周期性的内存泄漏是更简单的。这些也是最麻烦的事情：如果内存会按时增长，
泄露最终将导致浏览器变慢或者停止执行脚本。很明显的非周期性大量内存泄露可以很容易的在其他内存分配中被发现。
但是实际情况并不如此，往往这些泄露都是不足以引起注意的。这种情况下，小的非周期性内存泄露可以被当做一个优化点。
然而那些周期性的内存泄露应该被视为 bug 并且必须被修复。如下代码：  

```js  
var x = [];
 
function createSomeNodes() {
    var div,
        i = 100,
        frag = document.createDocumentFragment();
    for (;i > 0; i--) {
        div = document.createElement("div");
        div.appendChild(document.createTextNode(i + " - "+ new Date().toTimeString()));
        frag.appendChild(div);
    }
    document.getElementById("nodes").appendChild(frag);
}
function grow() {
    x.push(new Array(1000000).join('x'));
    createSomeNodes();
    setTimeout(grow,1000);
} 
```    
当调用 grow 的时候，它会开始创建 div 节点并且把他们追加到 DOM 上。
它将会分配一个大数组并将它追加到一个全局数组中。这将会导致内存的稳定增长，
使用上面提到的工具可以观察到这一点。  

> 垃圾收集语言通常表现出内存用量的抖动。如果代码在一个发生分配的循环中运行时，
这是很常见的。我们将要寻找那些在内存分配之后周期性且不会回落的内存增长。  

### 查看内存周期性增长  
在 Chrome 中运行这个例子，打开开发者工具，定位到 timeline，选择内存并且点击记录按钮。
然后去到那个页面点击按钮开始内存泄露。一段时间后停止记录，然后观察结果：   

![](/image/js6-1.png)  
在图中有两个明显的标志表明我们正在泄漏内存。节点的图表（绿色的线）和 JS 堆内存（蓝色的线）。节点数稳定地增长并且从不减少。这是一个明显的警告标志。

JS 堆内存表现出稳定的内存用量增长。由于垃圾回收器的作用，这很难被发现。你能看到一个初始内存的增长的图线，紧接着有一个很大的回落，接着又有一段增长然后出现了一个峰值，接着又是一个回落。这个情况的关键是在于一个事实，即每次内存用量回落时候，堆内存总是比上一次回落后的内存占用量更多。也就是说，尽管垃圾收集器成功地回收了很多的内存，还是有一部分内存周期性的泄露了。  

### 拍两张快照  
为了找到这个内存泄漏，我们将使用 Chrome 开发者工具红的 profiles 选项卡。为了保证内存的使用在一个可控制的范围内，在做这一步之前刷新一下页面。我们将使用 Take Heap Snapshot 功能。

刷新页面，在页面加载结束后为堆内存捕获一个快照。我们将要使用这个快照作为我们的基准。然后再次点击按钮，等几秒，然后再拍一个快照。拍完照后，推荐的做法是在脚本中设置一个断点来停止它的运行，防止更多的内存泄露。  
![](/image/js6-2.png)    
可以看见内存在不断的增加。  
有两个方法来查看快照之间的内存分配情况，其中一种方法需要选择 Summary 然后在右面选取在快照1和快照2之间分配的对象，
另一种方法，选择 Comparison 而不是 Summary。两种方法下，我们都将会看到一个列表，列表中展示了在两个快照之间分配的对象。    
![](/image/js6-3.png) 
造成内存泄露的是（string），我们打开（string）构造函数分配列表，  
我们会注意到在很多小内存分配中掺杂着的几个大量的内存分配。这些情况立即引起了我们的注意。
如果我们选择它们当中的任意一个，我们将会在下面的 retainer 选项卡中得到一些有趣的结果。     
![](/image/js6-4.png)
我们发现我们选中的内存分配信息是一个数组的一部分。相应地，数组被变量 x 在全局 window 对象内部引用。
这给我们指引了一条从我们的大对象到不会被回收的根节点（window）的完整的路径。我们也就找到了潜在的泄漏点以及它在哪里被引用。  
使用上面的内存快照可以很容易地找到这些节点，但是在更大的站点中，事情变得复杂起来。最近，新的 Chrome 的版本中提供了一个附加的工具，这个工具十分适合我们的工作，这就是堆内存分配记录（Record Heap Allocations）功能  

### 通过记录堆内存分配来发现内存泄露   
取消掉你之前设置的断点让脚本继续运行，然后回到开发者工具的 Profiles 选项卡。现在点击 Record Heap Allocations。当工具运行时候你将注意到图表顶部的蓝色细线。这些代表着内存分配。我们的代码导致每秒钟都有一个大的内存分配发生。
让它运行几秒然后让程序停止（不要忘记在此设置断点来防止 Chrome 吃掉过多的内存）。
![](/image/js6-5.png)    
在这张图中你能看到这个工具的杀手锏：选择时间线中的一片来观察在这段时间片中内存分配发生在什么地方。我们将时间片设置的尽量与蓝色线接近。只有三个构造函数在这个列表中显示出来：一个是与我们的大泄露有关的（string），一个是和 DOM 节点的内存分配相关的，另一个是 Text 构造函数（DOM 节点中的文本构造函数）。

从列表中选择一个 HTMLDivElement 构造函数然后选择一个内存分配堆栈。  
![](/image/js6-6.png)  
我们现在知道那些元素在什么地方被分配了（grow -> createSomeNodes）。如果我们集中精神观察图像中的每个蓝色线，还会注意到 HTMLDivElement 的构造函数被调用了很多次。如果我们回到快照 comparison 视图就不难发现这个构造函数分配了很多次内存但是没有从未释放它们。也就是说，它不断地分配内存空间，但却没有允许 GC 回收它们。种种迹象表明这是一个泄露，加上我们确切地知道这些对象被分配到了什么地方（createSomeNodes 函数）。现在应该去研究代码，并修复这个泄漏。  

### 其他有用的特性  
在堆内存分配结果视图中我们可以使用比 Summary 更好的 Allocation 视图。  
![](/image/js5-5.jpg)  
这个视图为我们呈现了一个函数的列表，同时也显示了与它们相关的内存分配情况。我们能立即看到 grow 和 createSomeNodes 凸显了出来。当选择 grow 我们看到了与它相关的对象构造函数被调用的情况。我们注意到了（string），HTMLDivElement 和 Text 而现在我们已经知道是对象的构造函数被泄露了。

这些工具的组合对找到泄漏有很大帮助。和它们一起工作。为你的生产环境站点做不同的分析（最好用没有最小化或混淆的代码）。看看你能不能找到那些比正常情况消耗更多内存的对象吧（提示：这些很难被找到）。  

> 如果要使用 Allocation 视图，需要进入 Dev Tools -> Settings，选中“record heap allocation stack traces”。获取记录之前必须要这么做。  

### 其他demo  
下面是一组DOM节点内存泄漏的例子。你可能希望在测试你的更复杂的页面或应用前先用这些例子做试验。

* [Example 1: Growing memory](https://developer.chrome.com/devtools/docs/demos/memory/example1.html)
* [Example 2: Garbage collection in action](https://developer.chrome.com/devtools/docs/demos/memory/example2.html)
* [Example 3: Scattered objects](https://developer.chrome.com/devtools/docs/demos/memory/example3.html)
* [Example 4: Detached nodes](https://developer.chrome.com/devtools/docs/demos/memory/example4.html)
* [Example 5: Memory and hidden classes](https://developer.chrome.com/devtools/docs/demos/memory/example5.html)
* [Example 6: Leaking DOM nodes](https://developer.chrome.com/devtools/docs/demos/memory/example6.html)
* [Example 7: Eval is evil (almost always)](https://developer.chrome.com/devtools/docs/demos/memory/example7.html)
* [Example 8: Recording heap allocations](https://developer.chrome.com/devtools/docs/demos/memory/example8.html)
* [Example 9: DOM leaks bigger than expected](https://developer.chrome.com/devtools/docs/demos/memory/example9.html)
* [Example 10: Retaining path](https://developer.chrome.com/devtools/docs/demos/memory/example10.html)
* [Example 11: Last exercise](https://developer.chrome.com/devtools/docs/demos/memory/example11.html)    

### 社区资源

社区贡献了很多如何用Chrome DevTools来定位和解决web apps内存问题的资源。下面的一组资源可能对你有帮助：

* [Finding and debugging memory leaks with the Chrome DevTools](http://slid.es/gruizdevilla/memory)

* [JavaScript profiling with the DevTools](http://coding.smashingmagazine.com/2012/06/12/javascript-profiling-chrome-developer-tools/)

* [Effective memory management at GMail scale](http://www.html5rocks.com/en/tutorials/memory/effectivemanagement/)

* [Chrome DevTools Revolutions 2013](http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/)

* [Rendering and memory profiling with the DevTools](http://www.slideshare.net/matenadasdi1/google-chrome-devtools-rendering-memory-profiling-on-open-academy-2013)

* [Performance optimization with DevTools timeline and profile](http://addyosmani.com/blog/performance-optimisation-with-timeline-profiles/)  











