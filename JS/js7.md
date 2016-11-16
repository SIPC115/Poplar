DOM 操作之节点  
===  
> DOM= Document Object Model，文档对象模型，DOM可以以一种独立于平台和语言的方式访问和修改一个文档的内容和结构。换句话说，这是表示和处理一个HTML或XML文档的常用方法。有一点
很重要，DOM的设计是以对象管理组织（OMG）的规约为基础的，因此可以用于任何编程语言。最初人们把它认为是一种让JavaScript在浏览器间可移植的方法，
不过DOM的应用已经远远超出这个范围。Dom技术使得用户页面可以动态地变化，如可以动态地显示或隐藏一个元素，改变它们的属性，增加一个元素等，Dom技术使得页面的交互性大大地增强。  

# 节点   
DOM将任何HTML或XML文档描绘成一个由多层节点构成的结构，节点分为几种不同的类型，每种类型分别表示文档中不同的信息及标记。每个节点都拥有各自的特点，数据和方法。
及诶单之剑的关系构成了层次，而所有牙面标记则表现为一个以特定节点为根节点的树形结构。    
![](/image/js7-1.png)  

## 节点类型  
每个节点都有一个`nodeType`属性，用于表明节点的类型。节点类型由在Node类型中定义的下列12个常亮来
表示：  

* Node.ELEMENT_NODE(1) 元素节点
* Node.ATTRIBUTE_NODE(2) 属性节点
* Node.TEXT_NODE(3) 文本节点
* Node.CDATA_SECTION_NODE(4) CDATA区段  
* Node.ENTITY_REFERENCE_NODE(5) 实体引用
* Node.ENTITY_NODE(6) 实体  
* Node.PROCESSING_INSTRUCTION_NODE(7) 处理命令
* Node.COMMENT_NODE(8) 注释节点  
* Node.DOCUMENT_NODE(9) 文档节点  
* Node.DOCUMENT_TYPE_NODE(10) 向为文档定义的实体提供接口
* Node.DOCUMENT_FRAGMENT_NODE(11) 代表轻量级的 Document 对象，能够容纳文档的某个部分
* Node.NOTation_NODE(12) 代表 DTD 中声明的符号。  

## 节点属性    
nodeName 属性规定节点的名称：  

* nodeName 是只读的
* 元素节点的 nodeName 与标签名（大写）相同
* 属性节点的 nodeName 与属性名相同
* 文本节点的 nodeName 始终是 #text
* 文档节点的 nodeName 始终是 #document    

nodeValue 属性：    

* 元素节点的 nodeValue 是 undefined 或 null
* 文本节点的 nodeValue 是文本本身
* 属性节点的 nodeValue 是属性值  

## 节点关系  
![](/image/js7-2.png)  
**注：关系中间加上Element表示只查找元素节点。例如：nextElementSibling 表示下一个同胞元素节点**  

## 节点创建与插入  
节点创建一般我们使用`document.createElement`,`innerHTML`,`insertAdjacentHTML`(也具有创建节点作用，多用于插入节点)。
节点的插入，原生提供了`appendChild`,  `insertBefore`，`replaceChild`等。

### innerHTML   
对于节点的创建innerHTML是一个很高效的接口，innerHTML这个属性也存一些列的问题：  

* IE会对用户字符串进行trimLeft操作，用户可能的本意就是需要空白
* IE8有些元素innerHTML是只读
* IE会忽略开头的无作用域元素
* 大多情况下不执行script脚本,当然如果支持defer的IE9之前的浏览器除外
* 一些标签不能作为div的子元素，如tr,tb, col(HTML那章说的胚胎元素)等     

所以我们在利用innerHTML插入节点的时候一定注意这些问题，如果插入tr之类的元素，要补全插入内容。如果插入的有脚本，我们可以读出script的内容，
然后eval一下；或者加入defer属性。如果仅仅插入字符串，建议使用`textContent`方法。    

### insertAdjacentHTML  
你可能使用过jQuery的节点操作方法，觉得很丰富很完整。而js的基本节点操作却少的可怜，只提供了`appendChild`，`insertBeofre`方法。  
其实在dom操作中早就有了一个可以媲美jQuery节点操作的方法`insertAdjacentHTML`，兼容性也好的没话说：   
![](/image/js7-3.png)  
insertAdjacentHTML() 将指定的文本解析为 HTML 或 XML，然后将结果节点插入到 DOM 树中的指定位置处。该方法不会重新解析调用该方法的元素，
因此不会影响到元素内已存在的元素节点。从而可以避免额外的解析操作，比直接使用 innerHTML 方法要快。  

```js  
element.insertAdjacentHTML(position, text);  
```    
position 是相对于 element 元素的位置，并且只能是以下的字符串之一：  

* beforebegin：在 element 元素的前面。
* afterbegin：在 element 元素的第一个子节点前面。
* beforeend：在 element 元素的最后一个子节点后面。
* afterend：在 element 元素的后面。
* text 是字符串，会被解析成 HTML 或 XML，并插入到 DOM 树中。  

位置示意图如下：  

```html    
<!-- beforebegin -->
<p>
<!-- afterbegin -->
foo
<!-- beforeend -->
</p>
<!-- afterend -->
```    

### 批量创建和插入节点   
对节点的创建和插入操作是很费时间的事情，没有一个节点插入，浏览器就要重新渲染布局。因此如果有很多节点需要插入，一个个插入他们将会
大大降低js的性能。因此我们需要更合理的手段来做这些事情。  

#### DocumentFragment 文档碎片  
DocumentFragments 是一些DOM节点。它们不是DOM树的一部分。通常的使用场景是创建一个文档片段，然后将创建的DOM元素插入到文档片段中，
最后把文档片段插入到DOM树中。在DOM树中，文档片段会被替换为它所有的子元素。  
因为文档片段存在与内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流(reflow)(对元素位置和几何上的计算)。
因此，使用文档片段document fragments 通常会起到优化性能的作用(better performance)。示例如下：    

```js  
var ul = document.getElementsByTagName("ul")[0]; // assuming it exists
var docfrag = document.createDocumentFragment();
var browserList = ["Internet Explorer", "Mozilla Firefox", "Safari", "Chrome", "Opera"];

browserList.forEach(function(e) {
  var li = document.createElement("li");
  li.textContent = e;
  docfrag.appendChild(li);
});

ul.appendChild(docfrag);
// a list with well-known web browsers
```     

在遇到有大量节点的时候，我们可以创建文档碎片，然后利用innerHTML插入节点，之后再把文档碎片插入真实的DOM中，这样会大大提高性能。
jQuery中也是采用了这样的手段。当然DOM2和DOM3中提供了更好的方法，我们将在后面说说。  

### jQuery 中的节点的操作  
我们这里简单看下，jQuery中对节点的操作。jQuery源码中，主要是buildFragment这部分是节点的核心内容，已经添加好了注释。    

```js  
function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),  //文档碎片
		nodes = [],   //
		i = 0,
		l = elems.length;
	//循环处理节点，在创建节点的时候只有一次循环。
	for ( ; i < l; i++ ) {
		elem = elems[ i ];
		if ( elem || elem === 0 ) {
			// elem为对象的时候，根据节点类型，混入(用于几点操作)
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// 处理字符串不能表示成节点的内容
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// 重点内容：创建节点
			} else {
			    //创建一个tmp临时节点，用于调用innerHTML时存储节点内容
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// 取出节点标签，这里注意只去一次标签。后面分析问题
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// 重新定位 节点元素(因为节点被)
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// 混入tmp子元素（即我们想要的元素）
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment fragment初始化了
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}
		//jQuery.contains 一个DOM借点是否包含另一个DOM节点
		contains = jQuery.contains( elem.ownerDocument, elem );

		// jQuery.getAll 获取节点中所有<script>节点 同时再次补全fragment为我们想要的节点
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// 调用jquery缓存系统，缓存脚本
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables scripts是数组
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}

return buildFragment;
} );  
```    

参数：elems：要创建的节点字符串数组； context ：document； scripts 空的数组 用于保存script节点 。  
函数开始定义了tmp 用于存放临时的节点， fragment就是文档碎片。 循环 elems 数组 由于是创建节点，所以这里只有一次循环。
在两个if判断后，开始对tmp赋值  
tmp = tmp || fragment.appendChild( context.createElement( "div" ) ); 文档碎片创建了一个临时的tmp元素（div）  
tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();； 这里 rtagName = /<([\w:-]+)/ 用于匹配标签名 ，需要注意这里仅匹配第一个标签名，之后的不会考虑。
匹配到的 tag 这里就要判断是否是特殊的标签，因为要解决这些特殊标签不能直接作为子元素的胚胎元素。    







  




