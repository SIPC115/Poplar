DOM2 和 DOM3  
===  
这里主要介绍一些关于节点操作的比较新颖的方法，这部分内容确实用的比较少。我也处于研究状态，所以这里
仅仅列举一些。日后会持续更新的。  

# Range  
为了更好的控制页面，DOM2 级便利范围模块定义了 Range 接口。通过范围可以选择文档中的一个区域，而不必考虑节点的限制。在常规的 DOM 操作不能更有效的修改文档时，
使用方位往往可以达到目的。    
Range表示包含节点和部分文本节点的文档片段。
Range可以用 Document 对象的 createRange方法创建，也可以用Selection对象的getRangeAt方法取得。
另外，可以通过构造函数 Range() 来获得一个 Range 。  

兼容性如下：  
![](/image/js9-1.png)     
我们可以用下面的方法来检测浏览器是否支持范围：  

```js  
var supportRange = document.implementation.hasFeature("Range", "2.0");
var alsoSupportRange = typeof document.createRange == "function";  
```  

## Range 对象 
我们可以通过`document.createRange`来获得一个Range对象。  

```js  
var range = document.createRange();  
```  

该对象只能在当前文档中使用。创建了范围之后，接下来就可以使用它在后台选择文档中的特定部份。而创建范围并设置了其位置之后，还可以
针对范围的内容执行很多种操作，从而实现对底层 DOM 树的更精确地控制。  
每个范围由一个 Range 类型的实例表示，这个实例属性如下：  

* startContainer：包含范围起点的节点(即选区中第一个节点的父节点) **只读**  
* startOffset：范围在 startContainer 中起点的偏移量。如果 startContainer 是文本节点、注释节点或CDATA节点，那么startOffset就是
范围七点之前跳过的字符数量。否则，startOffset 就是范围终点的节点(即选取中最后一个节点的父节点)   **只读**  
* endContainer：包含范围终点的节点(即选区中最后一个及诶单的父节点)  **只读**
* endOffset：范围在 endContainer 中终点的偏移量 **只读**
* commonAncestorCOntainer：startContainer 和 endContainer 共同的祖先节点在文档书中位置最深的那个 **只读**  

当把范围放到文档中特定的位置是，这些属性就会被复制。  

## Range 方法  
### 范围选择  
selectNode()和selectNodeContents()方法用来选择文档中的某一部分。    

* range.selectNode(node)   参数为node节点，把整个node节点的信息，包括子节点中的内容填充到范围range内。
* range.selectNodeContents(node)   参数为node节点，把node节点的子节点信息填充到范围range内。  

例如下面代码：  

```html  
<body>
    <p id="hy"><b>Hello</b>world</p>
</body>
```

```js  
var range1 = document.createRange(),
    range2 = document.createRange(),
    ele = document.getElementById("hy");
range1.selectNode(ele);
range2.selectNodeContents(ele);
```  
这里创建的两个部分，range1包含 p 元素及其所有子元素，而range2包含 b 元素，文本节点"hello"和文本节点"world!"  

## Range 实例  



