# 003 ES6--ReactNative 开发基础
--
* 浏览器支持：主流浏览器支持。
* 服务器支持：

### 组件的导出和导入
* 使用 ` export default class XXX extends React.Component {} `  进行组件的导出
* 使用 `import xxx from '' ` 进行组件导入

### 类
使用类的概念，引入 class 关键字，使用类的概念之后，对象的创建和继承更加的直观，对父类的调用、实例化、静态方法和构建函数等概念更加的形象化。  

* 使用`class XXX extends React.Component {}` 创建类  
* 组件类方法：  

```javascript
var Demo  = React.createClass({
	render() {
	
	}  // 在方法结束之后也不需要逗号进行分割
})
```

* 组件的属性与属性类型  
使用 static 成员来修饰属性类型和默认属性

```javascript 
	class Video extends React.Component {
		static defaultProps = {
			autoPlay: false,
			maxLoops: 10,
		};
		static propTypes = {
			sutoPlay: React.PropTypes.bool.isRequired,
			maxLoops: React.PropTypes.number.isRequired,
			videoSrc: React.PropsTypes.string.isRequired,
		};
		...
	}
```

### 状态变量

在 React 框架中，所有的页面都被视为一个状态机，任意一个 UI 场景都是状体机中的一种状态。状态机一旦发生变化 UI 也就发生变化。

React 声明状态机应该在构造函数中进行

```javascript
	export default class Demo extends React.Component ({
		constructor( ) {
			super(props);
			this.state={
				key1: value1,
				key2: value2,
				...
			}
		}
	})

```

### 回调函数
使用 ES6进行 React 项目的开发的时候要手动的在构造函数中对自定义的函数方法进行绑定操作。

```javascript
	constructor(props) {
		super(props);
		this.update  = this.update.bind(this);
	}
	updta() {}
	...
```

### 参数

* 参数默认值：  
	`function(name="za") {}`
	
* 不定参数：  
	`function(...x){}` 
	
* 扩展参数：  
	
```javascript
	cosnt people = ['a','b','c'];
	function kill (...people){}		
```

### 箭头操作符
箭头函数  
(a,b) => {
	console.log(a,b)
}

### Symbol  

### 解构

```javascript
	let node = {
		type: "student",
		name: "tom"
	}
	let {type, name } = node;
	
	let array = ["red","blue"];
	let [one,two] = array;
	
```



