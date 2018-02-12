# 004 React JSX 
---
React 采用 JSX 来替代常规的 JS。然后通过工具（babel）将 JSX 编译成 React 采用的 JS 文件

### JSX 入门
JSX 是一个语法解决方案。可以在 Js 代码中直接引用 HTML 标签来编写 Js 对象，这种语法方案通过 JSXTransformer进行编译就会得到原生的 JS 代码。  
虚拟 DOM 是 React 的核心，使用 JSX 就可以很方便的创建 JSX  
优点：使用JSX 可以让代码可读性更高，语义清晰。利用 JSX 完成开发成为一种标准。

### JSX 语法
* JSX 使用`{}`来加入 Js 表达式。
* JSX 必须借助 ReactJS 环境才能运行。  

#### 1. 载入方式
* 内联载入
* 外联载入

```javascript 
	class Hello extends React.Component {
		render() {
			return (
				<div>Hello world</div>
			)
		}
	}
```

#### 2. 三目表达式：

```javascript
	var Person = <Person name={isLogged ? name : ''} />;
```

#### 3. 数组递归：
对数组进行循环，反回每个元素的 React 组件：

```javascript 
var lis = this.todoList.todos.map((todo)=>{
	return (
		<li>
			<input type="checkbox" checked={todo.done}>
			<span className={'done-' + todo.done}>{todo.text}</span>
		</li>
	)
})
```

#### 4. 事件绑定
JSX 可以给元素直接绑定事件，如点击事件。  
JSX 根据绑定的根节点，找到事件的唯一监听着，然后把事件绑定到元素上。

#### 5. 属性
在 JSX 中可以通过标签的属性来改变当前元素的样式。  

``` var h1 = <h1 width="10px"> Hello world </h1>```

在 JSX 中也支持自定义的属性，自定义的属性要以`data-`开头，这样才能渲染到页面中。

#### 6. 样式
在前端 web 开发中，通常把 css 写到单独的文件中，但是在 JSX 中可以少量的添加样式。相当于行内样式。

```<h1 style={{color: '#ff6699', fontSize: 14px,}}>Hello world</h1>```

#### 7. 自定义组件
在 JSX 中可以使用 React 自带的一些组件，也可以自定义组件

```javascript
	class HelloWorld extends React.Component {
		render() {
			return (
				<div > Hello world </div>
			)
		}
	}
	
	React.render(
		<HelloWorld> </HelloWorld>,
		document.getElementById("app")
	)
``` 
当需要的时候，先导入自定义的组件。

### 样式
在 ReactNative 中，RN 不实现CSS，而是依赖 JS 为应用程序设置样式。

#### 1. 申明与操作对象
为了让程序的结构更加清晰，通常需要将逻辑代码和样式表分离出来，样式通常使用 CSS，SASS，LESS 等。而在 RN 中采用不同的方式。将样式带入 JS 的中进行。使用 JS 对单个元素的样式进行操作即可。增加代码的规范和可读性。在 JS 中的样式不会污染全局，保证组件的模块化和独立化。

#### 2. 样式分类
样式分类有：行内样式，内嵌样式，外部样式。

##### 行内样式
从语法上来讲，行内样式是编写组件的时候最简单的方法。但是大量的行内样式，不利于代码的查看和维护。  
行内样式的写法就是将 CSS 直接写到标签中，直接设置元素的 style 属性。如果有多条 CSS 样式也可以写到一起。

``` reactnative
	<View style={
		{
			width: 300,
			height: 600,
			backgroundColor: 'red'
		}	
	}>
```

##### 内嵌样式
内嵌样式又称为对象样式，是对行内样式的一种升级写法，把 CSS 代码写在该文件，而不是将样式直接写到标签中。

```
	var bold = {
		fontWeight: 'bold'
	}
	...
	render() {
		return (
			<Text style={ bold }> 
				内嵌样式
			</Text>
		)
	}
```

##### 外部样式
外部样式又称外联样式，是指将 CSS 代码写到一个单独的外部文件中，然后在使用的地方导入样式文件。

```
	import React from 'react';
	import {
		StyleSheet
	} from 'react-native';
	var style = StyleSheet.create({
		fontSize: 20
	});
	module.exports = style;
	
	
	// 使用
	import style from ' ./styles';
	...
	<Text style={style.fontSize}>
		外联样式
	</Text>
	
```

#### 3. 样式的使用
* StyleSheet.create

在 RN 的官方实例中，很多地方都有用到过 StyleSheet.create 来实例化样式对象。  

* 使用实例化方法，引用一个内容的纯数字，保证值的不可变性和不透明性。
* 将 StyleSheet 放在样式文件的最后，也确保样式文件只被创建一次，而不是每个渲染周期都被创建。

``` 
	...
	<Text style={[styles.button,styles.xxx]}></Text>
	<Text style={[stylsx.xxx, {color: 'red'}]}}></Text>
	
``` 

*  对于数组样式，样式相同，后者覆盖前者，null，undefined 等都会被忽略
*  条件样式  && 

``` 
	<View style="this.state.touching && styles.highlight" /> 
```

#### 4. 样式的传递
* 可以用 XXX.protoTypes.style 来检验参数传递，确实是 Style 类型的。


