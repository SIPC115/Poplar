# 002  ReactNative 开发基础 -- FlexBox 布局

1. - [x] Flexbox 布局
2. - [ ] ES6
3. - [ ] JSX
4. - [ ] 样式
5. - [ ] 手势和触摸事件

## 2.1 Flexbox 布局

> 弹性盒模型，RN 主要采用的布局方式

* 浏览器支持：ALL 
* FlexBox 布局模型  
  * 主轴和交叉轴
  * 在容器开始布局的时候，在每一行中会把其中的条目从主轴起始的位置开始依次排列到主轴结束的位置。
  * Flexbox 布局条目有两个尺寸：主轴尺寸和交叉轴尺寸，分别对应主轴和交叉轴大小，如果主轴是水平方向则对应的是长和宽

## 一、FlexBox 布局属性  
  * display-flex
  * flex-direction
  * flex-warp
  * flex-flow
  * justify-content
  * align-items
  * align-content

### display-flex
  本属性指定元素是否使用 flexbox 布局。如果使用 flexbox 进行布局需要先给父元素一个`display:flex` 或者`display:inline-flex`。一个是块级一个是行内级
### flex-direction
  本属性用来控制 flex 布局的主轴方向。  
  * flex-direction: row; 主轴方向和正常方向一致，左到右
  * flex-direction: row-reverse;  和 row 的方向相反 ，右到左
  * flex-direction: column; 从上到下
  * flex-direction: column-reverse; 从下到上排列

  !["属性"](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)

### flex-wrap 属性
  本属性用来控制伸缩容器是但行还是多行显示，也决定侧轴方向,默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
  ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071006.png)
  * nowrap（默认）：不换行。
  * wrap：换行，第一行在上方。
  * wrap-reverse：换行，第一行在下方。

### flex-flow 属性
  flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。  
  ` flex-flow: [flex-direction][flex-wrap] ` 

### justify-content属性  
  justify-content属性定义了项目在主轴上的对齐方式。对主轴上多余的空间进行分配  
  `justify-content: flex-start | flex-end | center | space-between | space-around;`
  * flex-start（默认值）：左对齐
  * flex-end：右对齐
  * center： 居中
  * space-between：两端对齐，项目之间的间隔都相等。
  * space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

  ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)
### align-items 属性
  align-items属性定义项目在交叉轴上如何对齐。  
  `align-items: flex-start | flex-end | center | baseline | stretch;`
  * flex-start：交叉轴的起点对齐。
  * flex -end：交叉轴的终点对齐。
  * center：交叉轴的中点对齐。
  * baseline: 项目的第一行文字的基线对齐。
  * stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

  ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)

### align-content属性  
  align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。  
  `align-content: flex-start | flex-end | center | space-between | space-around | stretch;`
  ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)
  * flex-start：与交叉轴的起点对齐。
  * flex-end：与交叉轴的终点对齐。
  * center：与交叉轴的中点对齐。
  * space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
  * space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  * stretch（默认值）：轴线占满整个交叉轴。

## 二、项目的属性
  * 伸缩项目的属性主要有3个
    * order
    * flex(flex-grow|flex-shrink|flex-basis)
    * align-self

### order 属性
  本属性用来定义项目的顺序，order 越小越靠前，默认值是0

### flex-grow 属性
  flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。  
  如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。  
  如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### flex-shrink属性
  flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。  
  如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。  
  如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。  
  负值对该属性无效。

### flex-basis属性
  flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。  
  浏览器根据这个属性，计算主轴是否有多余空间。  
  它的默认值为auto，即项目的本来大小。  
  它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。  

### flex属性 
  flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。  后两个属性可选。
  ``` javascript
    .item {
      flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    }
  ```
  该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

  建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### align-self 属性
  align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。  
  默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
  ```javascript
    .item {
      align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
  ```
  ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071016.png)  
  该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

## 三、 FlexBox 在 RN 中的应用

  * 我们在React Native中使用flexbox规则来指定某个组件的子元素的布局。  
  * Flexbox可以在不同屏幕尺寸上提供一致的布局结构。
  * 一般来说，使用`flexDirection`、`alignItems`和 `justifyContent` 三个样式属性就已经能满足大多数布局需求。
  * 在RN 中，Flexbox 支持的属性有6个：
    * flex
    * flexDirection
    * alignSelf
    * alignItems
    * justifyContent
    * flexWrap
  * React Native中的Flexbox的工作原理和web上的CSS基本一致，当然也存在少许差异。
    * 首先是默认值不同：flexDirection的默认值是column而不是row.
    * flex也只能指定一个数字值。

## Flex Direction
在组件的style中指定flexDirection可以决定布局的主轴。子元素是应该沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向排列呢？默认值是竖直轴(column)方向。
```javascript
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

class FlexDirectionBasics extends Component {
  render() {
    return (
      // 尝试把`flexDirection`改为`column`看看
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};

AppRegistry.registerComponent('AwesomeProject', () => FlexDirectionBasics);
```

## Justify Content  主轴对齐方式
在组件的style中指定justifyContent可以决定其子元素沿着主轴的排列方式。  
子元素是应该靠近主轴的起始端还是末尾段分布呢？亦或应该均匀分布？对应的这些可选项有：flex-start、center、flex-end、space-around以及space-between。
```javascript
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

class JustifyContentBasics extends Component {
  render() {
    return (
      // 尝试把`justifyContent`改为`center`看看
      // 尝试把`flexDirection`改为`row`看看
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};

AppRegistry.registerComponent('AwesomeProject', () => JustifyContentBasics);
```

## Align Items  交叉轴排列方式
在组件的style中指定alignItems可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式。  
子元素是应该靠近次轴的起始端还是末尾段分布呢？亦或应该均匀分布？对应的这些可选项有：flex-start、center、flex-end以及stretch。

注意：要使stretch选项生效的话，子元素在次轴方向上不能有固定的尺寸。以下面的代码为例：只有将子元素样式中的width: 50去掉之后，alignItems: 'stretch'才能生效。
```javascript
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

class AlignItemsBasics extends Component {
  render() {
    return (
      // 尝试把`alignItems`改为`flex-start`看看
      // 尝试把`justifyContent`改为`flex-end`看看
      // 尝试把`flexDirection`改为`row`看看
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};

AppRegistry.registerComponent('AwesomeProject', () => AlignItemsBasics);
```