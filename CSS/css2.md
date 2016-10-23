基础视觉格式化  
===  
# 基本概念  
1. 正常流：是指西方语言文本从左向右，从上向下显示。如果要让一个元素不在正常流中国，唯一的办法就是使之成为浮动或定位元素。
2. 非替换元素：如果元素的内容包含在文档中，则称之为非替换元素。
3. 替换元素：指用作为其他内容占位符的一个元素。例子：img中的图像
4. 块级元素：在正常流中，会在其框之前和之后生成“换行”，所以出于正常流中的块级元素会垂直摆放。
5. 行内元素：不会再之前或之后生成行分隔符，它们是块级元素的后台。
6. 根元素：位于文档树顶端的元素。在HTML中，就是元素HTML。  

# 基本框  
CSS假定每个元素都有一个或多个矩形框，称为元素框。各元素框中还有一个内容区，内容区周围有可选的内边距、边框和外边距。外边距可以为负值，但内边距和边框不能为负值。  
![](/image/css2-1.png)  
元素的width属性被定义为从左内边界到右内边界的距离，height则是从上内边界到下内边界的距离。  

# 水平视觉格式化  
通常我们指的元素的宽度，指的是其内容的宽度，不包括内补，外补，边。  
## 水平格式化的七大属性

* margin-left
* border-left
* padding-left
* width
* padding-right 
* border-right 
* margin-left    

**这七个水平属性的总和要等于父元素的width** 这里面只有width,margin-left,margin-right这三个可以设置为：auto
其他都必须设为特定的值或者默认宽度为0。  
下面就以这三个auto的组合来展现问题：auto会自动补齐宽度（屏幕总宽度500）。  

### 设置margin-left为auto  
```html   
<p style="margin-left:auto;width:100px;margin-right: 100px">水平格式化</p> 
```  
![](/image/css2-2.png)  

可以看见，margin-left的值为 `500px - 100px - 100px`。同理设置marign-right为auto的时候也同样计算。  

### 设置width为auto  
```html  
<p style="margin-left:100px;width:auto;margin-right: 100px">水平格式化</p>  
```  

![](/image/css2-3.png)  

### 设置margin-left和margin-right为auto  
```html
<p style="margin-left:auto;width:100px;margin-right: auto">水平格式化</p>  
```  

![](/image/css2-4.png)   
当左右外边距为auto时，平分剩余宽度值。这也是元素居中的方案。  

### 当设置margin-left，margin-right和width全为auto  
```html  
<p style="margin-left:auto;width:auto;margin-right: auto">水平格式化</p>  
```  

![](/image/css2-5.png)  
那么width尽可能的宽，margin值为0。  

**注意** 当width, marign-left, margin-right三者全为固定值，综合又不满足父元素width值时。margin-right将自动计算(相当于将margin-right: auto;)  
综上所述，无论设置什么样的水平值，都可以用如下公式计算：  
**父元素width = 子元素(margin-left + border-left + padding-left + width + padding-right + border-right + margin-right)**  


# 垂直视觉格式化  
一个元素的默认高度由其`内容`决定(这一点和width不同，width默认为父元素的100%)。高度还会受到内容宽度的影响。段落越窄，相应的就会越高，以便容纳其中所有的内联内容。    
对应于水平格式化，它也有7个属性：  

* margin-top  
* border-top 
* padding-top 
* height 
* padding-bottom 
* border-bottom 
* margin-bottom  

同样这七个值必须等于包含元素块的高。这七个值中只有三个值可以设为auto:height,margin-top,margin-bottom,其他四个必须设为特定的值或默认为0。   
当高度小于显示内容的高度：浏览器会处理为有个滚动条(overflow)，以容纳下内联元素。  

## height: 100%  
有时候我们想让元素height像width一样能够充满整个屏幕，设置`height: 100%;`并不起到任何作用。原因就在于，height的默认高度是由内容决定的。所以
`height: 100%`只能是相对于父元素的内容高度而定。那么我们想让元素充满屏幕怎么办呢?这里可以使用如下CSS：  
```css  
html {
    height: 100%;
}  
body {
    height: 100%;
}
```
这样body的高度就为整个浏览器的视口高度了(暂时可以理解为浏览器的高度)，之所以这样可以是因为根元素html的height继承自viewport属性。我们让
根元素html的高度强制等于viewport的高度。  

## auto高度  
在最简单的情况下，如果会计正常流元素设置为`height:auto`, 显示时其高度将恰好足以包含其内联内容(包括文本)的行盒。高度auto时，会在段落上设置
一个边框，并认为没有内边距，这样下边框刚好在文本最后一行的下面，上边框则刚好在文本第一行的上面。 
如果块级元素正常流元素的高度设置为auto，并且只有块级子元素，其默认高度将是从最高级子元素的外边框边界到最低级块级子元素外边框边界之间的距离。因此，
自匀速外边距会“超出”包含这些子元素的元素。不过，块级元素有内边距或者边框或者设置BFC了，那么其高度则从其最高子元素的上外边距边界到其最低子元素的下外边距
边界之间的距离。如下：  

```html  
<div style="border: 1px solid #ff0000;">
    <div style="background-color: #00ff00;">
      <div style="background-color: #0000ff;padding: 20px;margin-top: 10px;"></div>
    </div>
</div>  
```   
![](/image/css2-6.png)  
蓝色快，本来是想相对于绿色快上边距为10px。当时我们根本看不见绿色快，绿色快和蓝色快本计算成了一体。我们在绿色快上加上`overflow: hidden;`如下：  
```html  
<div style="border: 1px solid #ff0000;">
    <div style="background-color: #00ff00;overflow: hidden;">
      <div style="background-color: #0000ff;padding: 20px;margin-top: 10px;"></div>
    </div>
</div>  
```    

![](/image/css2-7.png)  
这次就变成了我们想要的结果。当然你也可以在绿色快上加入内边距或者边框，同样可以。  

## 垂直外边距合并  
外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。  
当一个元素出现在另一个元素上面时，第一个元素的下外边距与第二个元素的上外边距会发生合并,如下：  
![](/image/css2-8.png)  

# 行内元素格式化(简介)  
相对于块格式化上下文，在行内格式化上下文中，框( boxes )一个接一个地水平排列，起点是包含块的顶部。 水平方向上的 margin，border 和 padding 在框之间得到保留。 框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。 包含那些框的长方形区域，会形成一行，叫做行框。  

```html   
<p style="background-color:silver; font-size:30px;">
    TEXT1
    <span style="border:3px solid blue;">text in span</span>
    great1
    <em style="border:3px solid red;">thx a lot</em>
    bee
    <strong style="border:3px solid green;">give me 5!</strong>
    Aloha!
</p> 
```  
![](/image/css2-9.png)   
行框的宽度由它的包含块和其中的浮动元素决定。高度的确定由行高度计算规则决定。  
如果几个行内框在水平方向无法放入一个行框内，它们可以分配在两个或多个垂直堆叠的行框中。因此，一个段落就是行框在垂直方向上的堆叠。 行框在堆叠时没有垂直方向上的分割且永不重叠。
如果一个行内框超出包含它的行框的宽度，它会被分割成几个框，并且这些框会被分布到几个行框内。如果一个行框不能被分割（例如， 行内框只包含单个字符，或者语言特殊的断字规则不允许在行内框里换行，或者行内框受到带有 "nowrap" 或 "pre" 值的 'white-space' 特性的影响），这时，行内框会溢出行框。
如果一个行内框被分割，margin、padding 和 border 在所有分割处没有视觉效果。
行内框还可能由于双向文本处理（bidirectional text processing）而在同一个行框内被分割为好几个框。   

## 行内框的对齐 vertical-align属性 
### 行内框在行框中垂直方向上的对齐   
行框的高度总是足够容纳所包含的所有框。不过，它可能高于它包含的最高的框（例如，框对齐会引起基线对齐）。 
当一个框 B 的高度小于包含它的行框的高度时，B 在行框中垂直方向上的对齐决定于 'vertical-align' 特性。 
'vertical-align'默认值为基线( 'baseline' )对齐。  

### 行内框在行框中水平方向上的对齐  
当一行中行内框宽度的总和小于包含它们的行框的宽，它们在水平方向上的对齐，取决于 'text-align' 特性。 如果其值是 'justify'，用户端也可以拉伸行内框(除了 'inline-table' 和 'inline-block' 框)中的空间和文字 。  

### 空的行内框应该被忽略  
不包含文本，保留空白符，margin/padding/border 非0的行内元素，以及其他常规流中的内容(比如，图片，inline blocks 和 inline tables)， 并且不是以换行结束的行框，必须被当作零高度行框对待。就外边距折叠而言，这种行框必须被忽略。

**行内元素就简单介绍，详情请看《css权威指南》一书**   

# 浮动  
## 浮动的展现形式    
浮动的盒子会被移动到当前行的左边或者右边。浮动最有趣的特点就是其他内容会在浮动的元素的旁边依次放置（或者通过设置clear属性禁止），
或者说其他盒子会流动到浮动盒子的旁边。也就是说，其他盒子将沿着向左浮动的盒子的右边、向右浮动的盒子的左边依次放置。
一个浮动的盒子将会一直向左或向右移动，一直到触碰到包含块的边界或者其他浮动盒子的外边界。如果是行盒子的话，那么浮动盒子的外边界的顶部将与当前行盒子的顶部对其。
如果没有足够的水平空间，那么浮动的盒子将移至下一行直到有足够的空间或者行内已经没有其他浮动元素为止。
因为浮动盒子不在文档流中，所以在浮动盒子前后的未定位的块盒子将像浮动盒子不存在一样的竖直依次放置。但是，浮动盒子所在的当前行以及后面相邻的行盒子都会根据浮动盒子缩短宽度来给浮动盒子留下空间。  
如果有个竖直的位置满足如下四个条件:   

* 在行盒子的顶部或者顶部之下  
* 在行盒子的底部或底部之上  
* 在浮动盒子的外边界的顶部或者顶部之下  
* 在浮动盒子的外边界的底部或者底部之上，那么行盒子将会换行。也就是说，如果浮动的盒子的外边界高度为0或者为负，那么行盒子不会缩短。  

如果缩短的行盒子太短而不能包含任何内容，那么这个行盒子将会换行（并且高度会重新计算）直到有足够的空间或者没有浮动盒子为止。当前行内的任何在浮动盒子之前的盒子都将重新流动到浮动盒子的另一边。换句话说，如果一个行内盒子放在了一个向左浮动盒子的前面，那么，向左浮动的盒子将会放在这一行的开始，与行盒子的顶部对其，之前的行内盒子将会移动到浮动盒子的右边。对于rtl和向右浮动的盒子同理。  
table、块级可替换元素或者正常文档流中建立新的块格式化上下文的元素的border盒不能与任何在同一个格式化上下文中的浮动盒子的margin盒重叠。  

## 浮动的行为确定    
float属性的取值范围是： left | right | none | inherit，初始值为none。如下9条规定了浮动元素的确切行为：  

1. 向左浮动的盒子的外左边界不能超过包含块的左边界。同理应用于向右浮动的盒子。
2. 对于一个向左浮动的盒子，如果在这个盒子之前还有其他向左浮动的盒子，那么，这个盒子的左外边界不能超过其他任何向左浮动的盒子的右外边界，或者这个盒子的上边界必须比其他盒子的下边界低。同理应用于向右浮动的盒子。
3. 任何向左浮动的盒子的右外边界不能超过任何与之相邻的向右浮动的盒子的左外边界。同理应用于向右浮动的盒子。
4. 浮动盒子的上外边界不能比包含块的上边界高。当浮动发生在两个合并的margin中时，浮动的盒子根据一个假设的父的空匿名块盒子定位。
5. 浮动盒子的上外边界不能比任何其他之前的块盒子或浮动盒子的上外边界高。
6. 浮动盒子的上外边界不能比任何之前的行盒子的上边界高。
7. 一个向左浮动的盒子，如果在他之前还有向左浮动的盒子，那么这个盒子的右外边界不能超过包含块的有边界，除非这个盒子已经尽可能的向左了。同理应用于向右浮动的盒子。
8. 浮动元素要尽可能的往高放置。
9. 向左浮动的盒子要尽可能向左，向右浮动的盒子要尽可能向右。但是相对于尽可能向左或向右，更高的位置有更高的优先级。  

## 清除浮动  
clear属性的取值范围是： none | left | right | both | inherit, 初始值为none。只应用于块级元素。该属性决定元素盒子的哪一边不与浮动盒子相邻。clear属性不考虑被应用元素内部的浮动以及其他块格式化上下文中的浮动。  
属性取值含义如下:  
* left 应用该属性值的元素盒子的上边界要低于该元素之前的左浮动元素盒子的底外边界。
* right 应用该属性值的元素盒子的上边界要低于该元素之前的右浮动元素盒子的底外边界。
* both 应用该属性值的元素盒子的上边界要低于该元素之前的左浮动或右浮动元素盒子的底外边界。
* none 不浮动。   

清除浮动主要是通过clear属性，作用是解决浮动产生的父元素无法撑开的问题。  
清除浮动的方案有很多，构造空的`<div style="width: 100%;clear: both;"></div>`来清除，给父元素设置BFC清除等等。这里我们只给出
bootstrap清除浮动的方案，引入下列css：  

```css 
.clearfix:before,
.clearfix:after {
    content: "";
    display: talbe;
    clear: both;
} 
```     
# 常见布局  
这里先引入一段对 'display', 'position', and 'float'三者对布局的影响的描述  
>  The three properties that affect box generation and layout — 'display', 'position', and 'float' — interact as follows: If 'display' has the value 'none', then 'position' and 'float' do not apply. In this case, the element generates no box. Otherwise, if 'position' has the value 'absolute' or 'fixed', the box is absolutely positioned, the computed value of 'float' is 'none', and display is set according to the table below. The position of the box will be determined by the 'top', 'right', 'bottom' and 'left' properties and the box's containing block. Otherwise, if 'float' has a value other than 'none', the box is floated and 'display' is set according to the table below. Otherwise, if the element is the root element, 'display' is set according to the table below, except that it is undefined in CSS 2.1 whether a specified value of 'list-item' becomes a computed value of 'block' or 'list-item'. Otherwise, the remaining 'display' property values apply as specified.    

推荐连两个网站：  
* [学习css布局](http://zh.learnlayout.com/)   
* [CSS 布局:40个教程、技巧、例子和最佳实践](http://coolshell.cn/articles/6840.html)



# 附录  
* [CSS权威指南](https://item.jd.com/10100250.html)   
* [Clearing float](http://www.quirksmode.org/css/clearing.html)   
* [前端工程师手册](https://www.gitbook.com/book/leohxj/front-end-database)  










