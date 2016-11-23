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
* commonAncestorContainer：startContainer 和 endContainer 共同的祖先节点在文档书中位置最深的那个 **只读**  

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
这里创建的两个部分，range1包含 p 元素及其所有子元素，而range2包含 b 元素，文本节点"hello"和文本节点"world!"。  
在调用 selectNode() 时，startContainer、endContainer 和 commonAncestorCOntainer 都等于传入节点的父节点，也就是例子中的 document.body。
而 startOffset 属性等于给定节点在其父节点的childNodes 集合中的索引，endOffset 等于 startOffset 加1。  
在调用selectNodeContents() 时，startContainer、endContainer 和 commonAncestorContainer等于传入的节点，即这个例子中的 p 元素。而 startOffset属性始终
等于0，endOffset 等于字节点数的数量。  
此外为了更精确控制将哪儿些节点包含在范围中，可以使用一下方法：  

* setStartBefore(refNode)：以其它节点 （ Node）为基准，设置 Range 的起点。  
* setEndBefore(refNode): 以其它节点为基准，设置 Range 的终点。
* setStartAfter(refNode): 以其它节点为基准，设置 Range 的始点。  
* setEndAfter(refNode): 以其它节点为基准，设置 Range 的终点。  

举个例子：  

```html  
<table id="myTable" border = "1" cellspacing="0" cellpadding="0">
    <tr>
        <td>第一行第一列</td>
        <td>第一行第二列</td>
    </tr>
    <tr>
        <td>第二行第一列</td>
        <td>第二行第二列</td>
    </tr>
</table>
<button onclick="deleteFirstRow()">删除第一行</button>
```  
```js  
function deleteFirstRow() {
    var myTable = document.getElementById("myTable");
    if(myTable.rows.length > 0) {
        var row = myTable.rows[0];
        var rangeObj = document.createRange();
        rangeObj.setStartBefore(row);
        rangeObj.setEndAfter(row);
        rangeObj.deleteContents();
    }
}
```  
用户单击 删除第一行按钮时候，表格的第一行将会被删除掉；  

### 复杂的范围选择  
要创建复杂的范围就得使用 setStart() 和 setEnd() 方法。  
这两个方法都接受两个参数：一个参照节点和一个偏移量值。对 setStart() 来说，参照节点会变成 startContainer，而偏移量值会变成 startOffset。
对于 setEnd() 来说，参照节点会变成 endContainer，而偏移量值会变成 endOffset。举个例子：  

```html  
<div id="myDiv">这段文字中第三个文字到第十个文字将被删除掉</div>
<button onclick="DeleteChar()">删除文字</butto  
```  

```js    
function DeleteChar() {
    var myDiv = document.getElementById("myDiv");
    var textNode = myDiv.firstChild;
    var rangeObj = document.createRange();
    rangeObj.setStart(textNode,2);
    rangeObj.setEnd(textNode,10);
    rangeObj.deleteContents();
}
```  
当我们点击删除文字按钮的时候，第3个到第10个文字被删除掉。  

### 操作 DOM 范围中的内容    
**deleteContents方法**：用于将Range对象中所包含的内容从页面中删除   
**extractContents方法**：用于将Range对象所代表区域中的html代码克隆到一个DocumentFragment对象中，然后从页面中删除这段HTML代码；该方法返回一个包含了Range对象所代表区域中的HTML代码的DocumentFragment对象。
如下代码所示：  

```html  
<div id="srcDiv" style="width:300px;height:50px;background-color:red;">demo</div>
<div id="destDiv" style="width:300px;height:50px;background:blue;">demo2</div>
<button onclick = "moveContent()">移动元素内容</button>  
```    

```js  
function moveContent() {
    var srcDiv = document.getElementById("srcDiv");
    var destDiv = document.getElementById("destDiv");
    var rangeObj = document.createRange();
    rangeObj.selectNodeContents(srcDiv);
    var documentFragment = rangeObj.extractContents();
    destDiv.appendChild(documentFragment);
}  
```  
原始页面如下：  
![](/image/js9-2.png)  
点击删除按钮后：  
![](/image/js9-3.png)  

**insertNode方法**: 该方法用于将指定的节点插入到某个Range对象所代表的区域中，插入位置为Range对象所代表区域的起点位置，如果该节点已经存在于页面中，该节点将被移动到Range对象代表的区域的起点处。  
示例如下：  

```html  
<div onmouseup="MoveButton()" style="width:400px;height:100px;background-color:red">SIPC115</div>
<button id="button">按钮</button>  
```  

```js  
function MoveButton() {
    var button = document.getElementById("button");
    var selection = document.getSelection();
    if(selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.insertNode(button);
    }
}  
```    

页面初始状态如下：  
![](/image/js9-4.png)  
点击后：  
![](/image/js9-5.png)  


**cloneRange方法**:  Range对象的cloneRange方法用于对当前的Range对象进行复制，该方法返回复制的Range对象。  
示例如下：  

```html  
<div id="test">SIPC115</div>
<button onclick="cloneARange()">克隆Range对象</button> 
```  

```js  
function cloneARange() {
    var testObj = document.getElementById("test");
    var rangeObj = document.createRange();
    rangeObj.selectNodeContents(testObj);
    var rangeClone = rangeObj.cloneRange();
    alert(rangeClone);
}  
```
最终页面弹出SIPC115 

**cloneContents方法**：该方法用于在页面上追加一段HTML代码，并且将Range对象所代表区域中的HTML代码克隆到被追加的html代码中；  

最后还有一些我就不详细说了，提一下：  

* Range.collapse()： 向指定端点折叠该 Range 
* Range.compareBoundaryPoints()：比较两个 Range 的端点
* Range.detach()：从使用状态释放 Range，此方法用于改善性能  
* Range.toString()：把Range内容作为字符串返回

# NodeIterator    
可以用document对象的createNodeIterator()方法来创建NodeIterator对象:    

```js   
var iterator = document.createNodeIterator(root, whatToShow, filter, entityReferenceExpansion) 
```  

用到的四个参数意义如下：  

1. root:从树中的哪个节点开始搜索；
2. whatToShow:一个数值代码，代表哪些节点需要搜索；
3. filter:NodeFilter对象，用来决定需要忽略哪些节点；
4. entityReferenceExpansion:布尔值，表示是否需要扩展实体引用；  

whatToShow参数可以有下列这些常量或其组合的取值：  

1. NodeFilter.SHOW_ALL：搜索所有节点；
2. NodeFilter.SHOW_ELEMENT：搜索元素节点；
3. NodeFilter.SHOW_ATRRIBUTE：搜索特性节点；
4. NodeFilter.SHOW_TEXT：搜索文本节点；
5. NodeFilter.SHOW_ENTITY_REFERENCE：搜索实体引用节点；
6. NodeFilter.SHOW_ENTITY：搜索实体节点；
7. NodeFilter.SHOW_PROCESSING_INSTRUCTION：搜索PI节；
8. NodeFilter.SHOW_COMMENT：搜索注释节点；
9. NodeFilter.SHOW_DOCUMENT：搜索文档节点；
10. NodeFilter.SHOW_DOCUMENT_TYPE：搜索文档类型节点；
11. NodeFilter.SHOW_DOCUMENT_FRAGMENT：搜索文档碎片节节；
12. NodeFilter.SHOW_NOTATION：搜索记号节点；  


# 附录  
参考资料如下：  

* [JS Range HTML文档/文字内容选中、库及应用介绍](http://www.zhangxinxu.com/wordpress/2011/04/js-range-html%E6%96%87%E6%A1%A3%E6%96%87%E5%AD%97%E5%86%85%E5%AE%B9%E9%80%89%E4%B8%AD%E3%80%81%E5%BA%93%E5%8F%8A%E5%BA%94%E7%94%A8%E4%BB%8B%E7%BB%8D/)
* [MDN Range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)  



