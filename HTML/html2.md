HTML5 新特性  
===   
万维网的核心语言、标准通用标记语言下的一个应用超文本标记语言（HTML）的第五次重大修改。这次修改增加了前端的很多功能，当然大部分还是和js有关例如：localStorage, canvas, webSocket等等，这一章我们只介绍对于HTML部分HTML5做了哪些修改。  

# 新标签  
HTML5提供了新的元素来创建更好的页面结构，这些标签更具有语义化，更加的适合搜索引擎的解析。下面将逐一介绍这些语义化标签。  
在之前通常我们会用`<div>`来对页面进行分块，比如网页的头部我们可以这么写`<div class="header">`，通过class来对一个标签添加语义。HTML5专门开发了一些这类的标签，效果如下：
![](/image/html5.png)  
这样我们就用新标签，代替了一些特殊含义的标签。  

## header元素  
header 元素代表“网页”或“section”的页眉。通常包含h1-h6元素或hgroup，作为整个页面或者一个内容块的标题。也可以包裹一节的目录部分，一个搜索框，一个nav，或者任何相关logo。整个页面没有限制header元素的个数，可以拥有多个，也可以为每个内容块增加一个header元素。  

## footer元素  
footer元素代表“网页”或“section”的页脚，通常含有该节的一些基本信息，譬如：作者，相关文档链接，版权资料。如果footer元素包含了整个节，那么它们就代表附录，索引，提拔，许可协议，标签，类别等一些其他类似信息。  

## hgroup元素  
hgroup元素代表“网页”或“section”的标题，当元素有多个层级时，该元素可以将h1到h6元素放在其内，譬如文章的主标题和副标题的组合。  
**注意**    
* 如果只需要一个h1-h6标签就不用hgroup
* 如果有连续多个h1-h6标签就用hgroup  

## nav元素  
nav元素代表页面的导航链接区域。用于定义页面的主要导航部分。  

## aside元素    
aside元素被包含在article元素中作为主要内容的附属信息部分，其中的内容可以是与当前文章有关的相关资料、标签、名次解释等。可以理解为特殊的section。  
**注意**     
* aside在article内表示主要内容的附属信息
* 在article之外则可做侧边栏，没有article与之对应，最好不用
* 如果是广告，其他日志链接或者其他分类导航也可以用  

## section元素  
section元素代表文档中的“节”或“段”，“段”可以是指一篇文章里按照主题的分段；“节”可以是指一个页面里的分组。一张页面可以用section划分为简介、文章条目和联系信息。不过在文章内页，最好用article。section不是一般意义上的容器元素，如果想作为样式展示和脚本的便利，可以用div。  
**注意**  
* section表示文档中的节或者段
* article、nav、aside可以理解为特殊的section，所以如果可以用article、nav、aside就不要用section，没实际意义的就用div

## article元素
article元素最容易跟section和div容易混淆，其实article代表一个在文档，页面或者网站中自成一体的内容，其目的是为了让开发者独立开发或重用。除了它的内容，article会有一个标题（通常会在header里），会有一个footer页脚。我们举几个例子介绍一下article，好更好区分article、section、div。
```html 
<article>
    <h1>一篇文章</h1>
    <p>文章内容..</p>
    <footer>
        <p><strong>版权: 学生创新实践中心</strong></p>
    </footer>
</article>
```   
**注意**  
* 自身独立的情况下：用article
* 是相关内容：用section
* 没有语义的：用div 

## figure/figcaption元素  
figure标签：用作文档中的插图图像；figcaption标签：为figure标签添加标题。  
```html   
<figure>
    <p><img src=""...... /></p>
    <figcaption>图片说明</figcaption>
</figure> 
```  
规定独立的流内容（图像，图表等...）应该与主内容相关,但如果被删除不影响文档流。  

## time元素   
time标签：语义化方式标记时间，其中的datetime属性包含了一个清晰的且机器可读的ISO标准的时间。  
```html  
<time datetime="1994-05-24">1994年5月24日</time>
``` 

## mark元素  
mark标签：高亮那些无需重点强调其意义的词语（背景色会变成黄色）。 

## 对于HTML5语义话的理解  
这里引入一段从知乎上看到的内容：  
> 其实 HTML 在刚开始设计出来的时候就是带有一定的「语义」的，包括段落、表格、图片、标题等等，但这些更多地只是方便浏览器等 UA 对它们作合适的处理。但逐渐地，机器也要借助 HTML 提供的语义以及自然语言处理的手段来「读懂」它们从网上获取的 HTML 文档，但它们无法读懂例如「红色的文字」或者是深度嵌套的表格布局中内容的含义，因为太多已有的内容都是专门为了可视化的浏览器设计的。面对这种情况，出现了两种观点：      

> 1. 我们可以让机器的理解能力越来越接近人类，人能看懂、听懂的东西，机器也能理解；  
> 2. 我们应该在发布内容的时候，就用机器可读的、被广泛认可的语义信息来描述内容，来降低机器处理 Web 内容的难度（HTML 本身就已经是朝这个方向迈出的一小步了）。    

> 内容的语义表达能力和 AI 的智能程度决定了机器分析处理 Web 内容能力的高低。上面观点 1 的方向是朝着人类水平的人工智能努力，而观点 2 的方向正是万维网创始人 Tim Berners-Lee 爵士提出的美好愿景：语义网。语义网我就不多说了，简单来说就是让一切内容和包括对关系的描述都成为 Web 上的资源，都可以由唯一的 URI 定义，语义明确、机器可读。显然，两条路都的终极目标都很遥远，第一条路技术上难以实现，而第二条路实施起来障碍太多。   

# 表单新特性  
## datalist 元素  
`<datalist>` 元素规定输入域的选项列表。  
`<datalist>` 属性规定 form 或 input 域应该拥有自动完成功能。当用户在自动完成域中开始输入时，浏览器应该在该域中显示填写的选项：使用 `<input>` 元素的列表属性与 `<datalist>` 元素绑定。  
![](/image/datalist.png)  

## input 新类型  
这里有些类型比如number在PC端上看着和text没什么区别，但是在移动平台上，number类型的input会唤起数字键盘，而不是标准键盘，移动端选择input类型需要格外注意。并不是所有的主流浏览器都支持新的input类型，不过已经可以在所有主流的浏览器中使用它们了。即使不被支持，仍然可以显示为常规的文本域。
* color
* date
* datetime
* datetime-local
* email
* month
* number
* range
* search
* tel
* time
* url
* week

# 兼容性  
目前绝大部分浏览器都是支持HTML5新标签的，如下：  
![](/image/html5caniuse.png)  
当然有可能你使用的是不支持html5的浏览器(太low了，换了吧)，那么你可以用下面这个css来模拟这些标签。  

```css  
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  /* 1 */
  vertical-align: baseline;
  /* 2 */
}
```   

# 附录  
参考资料如下：  
* [知乎-对于HTML5语义化的理解](https://www.zhihu.com/question/20455165)  
* [w3c菜鸟教程](http://www.runoob.com/html/html-tutorial.html) 
* [normalize.css](http://necolas.github.io/normalize.css/)
