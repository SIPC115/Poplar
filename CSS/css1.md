CSS选择器，结构与层叠  
===  
# CSS选择器  
要使用css对HTML页面中的元素实现一对一，一对多或者多对一的控制，这就需要用到CSS选择器。HTML页面中的元素就是通过CSS选择器进行控制的。  
## 规则结构  
每隔css选择器规则都有两个基本部分：选择器(selector)和声明块(declaration block)。申明块由一个或多个声明(declaration)组成，每个
声明则是一个属性-值对(property-value)。每个样式表由一系列规则组成。  
![](/image/css1.png)  
上面只是最简单情况，实际比这个复杂的多。总的来说，规则分为四大类十七种，这里还不包括伪类。  
## 四大类选择器  
主要是指并联选择器，简单选择器，关系选择器，伪类。  
1.并联选择器是 ","分割，一种不是选择器的选择器，用于合并多个分组的结果。  
2.简单选择器包括五种：ID选择器，标签选择器，类选择器，属性选择器，通配符选择器。   
3.关系选择器分为四种：亲子选择器，后代选择器，相邻选择器，兄长选择器。  
4.伪类分为六种：动作伪类，目标伪类，语言伪类，状态伪类，结构伪类，取反伪类。  
这里对于简单的选择器，我们不再介绍，直接开始一些高级选择器。  
## 属性选择器  
CSS2.1中，属性选择器有一下四种形态  
  
|选择器|含义|示例|  
|:--:|:--:|:--:|    
|E[attr]|匹配所有具有att属性的E元素，不考虑它的值。（注意：E在此处可以省略，比如“[cheacked]”。以下同。）|p[title] { color:#f00; }|  
|E[att=val]|匹配所有att属性等于“val”的E元素|div[class=”error”] { color:#f00; }|  
|E[att~=val]|匹配所有att属性具有多个空格分隔的值、其中一个值等于“val”的E元素|td[class~=”name”] { color:#f00; }|  
|E[att\|=val]|匹配所有att属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以“val”开头的E元素，主要用于lang属性，比如“en”、“en-us”、“en-gb”等等|p[lang|=en] { color:#f00; }|   

**注：CSS 2.1 属性选择器还有一个特点就是使用多个选择器，同事满足这多个选择器：blockquote[class=quote][cite] { color:#f00; }**  
CSS3中有新增了三种属性选择器，如下：  

|选择器|含义|示例|
|:--:|:--:|:--:|  
|E[att^=”val”]|属性att的值以”val”开头的元素|div[id^="nav"] { background:#ff0; }|  
|E[att$=”val”]|属性att的值以”val”结尾的元素||  
|E[att*=”val”]|属性att的值包含”val”字符串的元素|  

## 关系选择器  
关系选择器是不能单独存在的，他必须在替他两类选择器组合使用，在css里，他必须加载他们中间。最初只有后代选择器(E F)，后来在CSS2.1中加入亲子
选择器(E > F)和相邻选择器(E + F)。CSSS3有添加了，兄长选择器(E ~ F)。如下：   

|选择器|含义|示例|
|:--:|:--:|:--:|   
|E F|后代元素选择器，匹配所有属于E元素后代的F元素，E和F之间用空格分隔|#nav li { display:inline; }  li a { font-weight:bold; }|   
|E > F|子元素选择器，匹配所有E元素的子元素F|div > strong { color:#f00; }|  
|E + F|毗邻元素选择器，匹配所有紧随E元素之后的同级元素F|p + p { color:#f00; }|  
|E ~ F|匹配任何在E元素之后的同级F元素|p ~ ul { background:#ff0; }|  
## 伪类  
### 动作伪类  
动作伪类又分为链接伪类和用户行为伪类，其中链接伪类为`:visited`和`:link`组成，用户行为伪类为`:hover`,`:active`,`:focus`组成。
css3中又新增了如下的用户行为伪类：`:enabled`,`:disabled`,`:checked`,`:selection`。  
### 目标伪类  
目标伪类`:target`伪类，指其id或者name属性与URL中的hash部分匹配上的元素。    
### 语言伪类  
语言伪类`:lang`伪类，用来设置使用特殊语言的内容样式,如`:lang(en)`的内部应该为英语。  
**注意：lang和一般的伪类选择器不同，这个有继承性** 例如： 
```html  
<body lang="en">
    <p>SIPC15</p>
</body>
```  
如果使用`[lang=en]`则只能选到body元素，因为p元素没有lang属性。但是使用`:lang(en)`则能同时选择到body和p元素。  
### 结构伪类  
结构伪类，在css3中增加了很多种类，对于复杂的html结构经常会用到结构伪类来选择。他分为三种：根伪类，子元素过滤伪类与空伪类。
根伪类由他在文档的位置判定，子元素过滤伪类是根据他在其父元素的所有孩子的位置或标签类型判定，空伪类是根据他孩子的个数判定。    
`:root`伪类用于选择根元素，在HTML中通常是html元素  
**:nth-child**是所有子元素过滤伪类的基础。它带有参数，可以是纯数字，代数式，或者单词。如果是纯数字，数字从1计数；如果是代数式，n则从零递增。用图来展示     
1.`nth-child(8)`选择第8个li元素：    
![](/image/cssnth1.png)  
2.`nth-child(n+6)`选择大于或等于4的元素  
![](/image/cssnth2.png)   
3.`:nth-child(-n+9)`选取小于或者等于9的元素     
![](/image/cssnth3.png)   
4.`nth-child(n+4):nth-child(-n+8)`选择大于等于4并且小于等于8的元素  
![](/image/cssnth4.png)  
5.`nth-child(2n)`为选择偶数位的元素，`nth-child(2n-1)`为选择奇数位上的元素，`nth-child(3n+1)`位3个为一组，取第一个元素。  
6.`nth-of-type`和`nth-child`类似,规则是将当前元素的父节点的所有元素按照其tagNamef分组，只要其参数符合它在哪一组的位子就被匹配到。如下规则：  
`span:nth-of-type(n+3) div:nth-of-type(2n+2)`   
```css  
/* 这部分是蓝色圆*/
span:nth-of-type(n+3) {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
/* 这部分是黄色的方块*/
div:nth-of-type(2n+2) {
    background-color: #E17149:
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black; 
} 
```   
![](/image/cssnth5.png)   
**其他的例子请参见[nthmaster.com](http://nthmaster.com/)**    
7.`first-child`用于选择第一个子元素，效果等同于`nth-child(1)`。对应有`first-of-type`  
8.`last-child`用于选择最后一个子元素，效果等同与`nth-last-child(1)`。对应有`last-of-type`    
9.`only-child`用于选择唯一的子元素，党子元素个数超过1个时，无效。对应有`only-of-type`  
10.`empty`用于选择那些不包含任何元素节点，文本节点，CDATA节点的元素，但是里面可以有注释节点.     

## 取反伪类  
取反伪类`:not`伪类，其参数为一个或多个简单选择器，里面用逗号隔开。


 


