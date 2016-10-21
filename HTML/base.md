HTML 基本内容  
===  
# 什么是HTML  
超级文本标记语言(HyperText Markup Language)是标准通用标记语言下的一个应用，也是一种规范，一种标准，超文本标记语言超文本标记语言(16张)
它通过标记符号来标记要显示的网页中的各个部分。网页文件本身是一种文本文件，通过在文本文件中添加标记符，可以告诉浏览器如何显示其中的内容（如：文字如何处理，画面如何安排，图片如何显示等）。  

* HTML 指的是超文本标记语言: HyperText Markup Language
* HTML 不是一种编程语言，而是一种标记语言
* 标记语言是一套标记标签 (markup tag)
* HTML 使用标记标签来描述网页
* HTML 文档包含了HTML 标签及文本内容
* HTML文档也叫做 web 页面

# HTML标签(元素)  
HTML 标记标签通常被称为 HTML 标签 (HTML tag)。  

* HTML 标签是由尖括号包围的关键词，比如 `<html>`
* HTML 标签通常是成对出现的，比如 `<b>` 和 `</b>`
* 标签对中的第一个标签是开始标签，第二个标签是结束标签
* 开始和结束标签也被称为开放标签和闭合标签    

**`<标签>内容</标签>`**  

# HTML基本网页结构  
![](/image/htmlbase.png)  

# 从头开始书写HTML
## `<!DOCTYPE>` 声明  
第一个要写的是`<!DOCTYPE`>声明，它有助于浏览器中正确显示网页。网络上有很多不同的文件，
如果能够正确声明HTML的版本，浏览器就能正确显示网页内容。doctype 声明是不区分大小写的。   
`<!DOCTYPE>`在设计的时候是向下兼容的，也就是受我们不用再写之前版本那些复杂的头部声明了，如果你忘记
在你的页面加入doctype了，通常情况下不会有问题。但是就版本IE可能因此会采用错误的渲染方式渲染页面，导致布局偏差。    
浏览器的渲染模式分为：  

* Quirks Mode 怪异模式
* Almost Standard Mode 准标准模式
* Standard 标准模式  

如何判定现在是标准模式还是怪异模式：   
方法一：执行以下代码
```javascript
alert(window.top.document.compatMode); //BackCompat  表示怪异模式；CSS1Compat  表示标准模式  
```
方法二：jquery为我们提供的方法，如下：  
```javascript  
alert($.boxModel);
alert($.support.boxModel);  
```  

产生多重模式的原因是因为浏览器之初，浏览器厂商并未统一html和css的解析规范导致。低版本IE中残留该问题，为了避免，请坚持写上doctype。  
关于模式的区别详情请见：[Quirks Mode and Standards Mode](https://developer.mozilla.org/zh-CN/docs/%E6%80%AA%E5%BC%82%E6%A8%A1%E5%BC%8F%E5%92%8C%E6%A0%87%E5%87%86%E6%A8%A1%E5%BC%8F)  

## `<html>`元素  
网页的根元素，可以说是之后一切元素的父元素，所以的元素都要写在`<html></html>`中。根元素对应的js为`document.documentElement`，当然如果你没有正确声明doctype的话，那么根元素在
旧版本IE中会被解释为`document.body`哦。另外根元素和`viewport`也有一定的关联，这个问题留到移动端适配讲。  

## `<head>`元素  
用来包含**元数据元素**的容器，`<head>` 元素必须包含文档的标题（title），可以包含脚本、样式、meta 信息 以及其他更多的信息。
### 元数据元素  
* `<base>`：指定基准URL及链接打开方式
* `<title>`：页面的标题
* `<script>`：引入脚本
* `<style>`：嵌入页面样式表
* `<link>`：引入外部资源
* `<noscript>`：浏览器不支持脚本时才展示的被容
* `<meta>`：页面元数据

这部分内容后面会单独列出。  

## `<body>`元素
`<body>` 标签定义文档的主体。`<body>` 元素包含文档的所有内容（比如文本、超链接、图像、表格和列表等等）。我们见到的网页主题都是放到`<body>`中的，可以说，可见部分的html都是存放
到了这里面。  

## `<h1>~<h6>`元素
标题（Heading）是通过 `<h1> - <h6>`标签进行定义的。`<h1>` 定义最大的标题。 `<h6>` 定义最小的标题。`<h4>`默认是网页字体大小。  
请确保将 HTML 标题 标签只用于标题。不要仅仅是为了生成粗体或大号的文本而使用标题。搜索引擎使用标题为您的网页的结构和内容编制索引。因为用户可以通过标题来快速浏览您的网页，所以用标题来呈现文档结构是很重要的。
应该将 h1 用作主标题（最重要的），其后是 h2（次重要的），再其次是 h3，以此类推。

## `<p>`和`<blockquote>`元素  
`<p>`元素代表段落，有时候感觉HTML根word很像，可以用word的思路来理解所有的标签。  
`<p>`元素中如果包含了**块级元素**那么浏览器在真正渲染的时候，会把块级元素提出，重新放置。并不会像你写的html那样布局(虽然p是个块级元素)，这个需要注意。例如：  

```html
<p>
    <div>123</div>
</p>
```  
实际上，浏览器渲染出的是：  
```html
<p>
</p>
<div>123</div>
``` 
这里要说名的就是html的语义化，一定要遵守html语义，不要任意嵌套和使用语义不符的元素。  

`<blockquote>`用来表示引用内容(语义化作用)，其中`cite`属性用来表示，引用的来源。 

## `<strong>`和`<em>`标签
`<em>`用来表示强调的内容，`<strong>`用来表示比`<em>`还要强调的内容。这也是唯一的语义区别(不要考虑样式效果)  

## `<a>`元素  
`<a>`元素的作用很广，可以作为连接跳转页面。可以作为使用锚点实现本页之间的跳转，也可以唤起外部协议(例如：email,telphone)。常用属性如下：   

target属性：   

* _blank       (新的页面打开)
* _self           (自身页面打开)
* _top           (跳出框架)
* _parent  

href:  

* mailto: (mailto: xx@qq.com)
* tel: (tel:156XXXXXXX)
* 锚:   `<a  href="#tip">` 

## 列表标签  
`<ul>` 定义一个无序列表，`<ol>`定义一个有序列表，`<li>`定义一个列表项  
`<dl>` 定义一个自定义列表，`<dt>`定义一个描述列表的项目/名字，`<dd>`自定义列表项  

## 表格   
表格是一类更加特殊的元素，我们称之为**胚胎**元素，这类元素(tr, td)是不能直接作为节点存在的，必须依赖另一个元素(table)成为**胎盘**元素。如果直接在html中写
`<td>123</td>`这样的内容，那么浏览器会默认为`123`字符串，忽略元素。这一点很重要(动态插入节点时更要注意)。常见的这类元素如下：  

|胚胎|胚盘|
|:---:|:---:|
|area|map|  
|param|object|  
|col|tbody, table, colgroup|  
|Legend|fieldset|  
|option, optgroup|select| 
|thead, tbody, tfoot, colgroup, caption| table|  
|tr|table, tbody|  
|td, th|table, tbody, tr|   

下面是一个表格的例子：
```html
<table>
    <caption>这是一个表格描述</caption>
    <thead>
        <tr>
            <td>姓名</td>
            <td>学号</td>
            <td>学院</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>田光宇</td>
            <td>20135734</td>
            <td>SCCE</td>
        </tr>
        <tr>
            <td>胡杨</td>
            <td>20132313</td>
            <td>SCCE</td>
        </tr>
    </tbody>
</table>
```  

## `form`表单元素  
HTML 表单用于搜集不同类型的用户输入。常见标签有：  

form: 定义供用户输入的表单 

* action：表单提交地址
* method：GET / POST 表单提交方式  

input：定义输入域名
* type：定义输入类型
* name：输入的内容名称
* value：输入的值
* placeholder：默认值  

textarea：文本域  
label：为 `<fieldset>`元素定义标题  
fieldset：对表中相关元素进行分组  
select：下拉选项表  
option：下拉选项表中的项  

## `<div>`和`<span>`元素  
HTML 区块元素，大多数 HTML 元素被定义为块级元素或内联元素。  
块级元素在浏览器显示时，通常会以新行来开始（和结束）。实例: `<h1>`, `<p>`, `<ul>`, `<table>`  
内联元素在显示时通常不会以新行开始。实例: `<b>`, `<td>`, `<a>`, `<img>`  

### `<div>`元素
HTML `<div>` 元素是块级元素，它可用于组合其他 HTML 元素的容器。
`<div>` 元素没有特定的含义。除此之外，由于它属于块级元素，浏览器会在其前后显示折行。
如果与 CSS 一同使用，`<div>` 元素可用于对大的内容块设置样式属性。
`<div>` 元素的另一个常见的用途是文档布局。它取代了使用表格定义布局的老式方法。使用 `<table>` 元素进行文档布局不是表格的正确用法。`<table>` 元素的作用是显示表格化的数据。  

### `<span>`元素  
HTML `<span>` 元素是内联元素，可用作文本的容器。`<span>` 元素也没有特定的含义。当与 CSS 一同使用时，<span> 元素可用于为部分文本设置样式属性。 

# 附录  
参考资料如下：  

* [w3c菜鸟教程](http://www.runoob.com/html/html-tutorial.html)
* [jQuery框架设计](https://item.jd.com/11436424.html)
* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)  




