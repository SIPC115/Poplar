# 基本的Touch
稍微有一点Android基础的人都知道，Android的触摸操作都是绑定在对应的空间上的，我们可以利用`view.setOnClickListener`,`view.setOnTouchListener`等方法响应触摸事件。  
Web上和Android类似，也是通过在相应的组件上添加`onClick`方法,`addEventListener`方法响应事件。  
React Native略有不同，它提供了一个`Touchable`实现,用它作为触控的组件。这就意味着你要在需要响应的View中添加一个`Touch`的外套才能实现原生所需要的功能。下面看代码:

```
_onPressIn() {
    console.log("press in");
}

_onPressOut() {
    console.log("press out");
}

_onPress() {
    console.log("press");
}

_onLonePress() {
    console.log("long press");
}


render() {
    return (
      <View style = {styles.container} >
        <TouchableHighlight
        style = {styles.touchable}
        onPressIn = {this._onPressIn}
        onPressOut = {this._onPressOut}
        onPress = {this._onPress}
        onLongPress = {this._onLonePress} >
        <View style = {styles.button} >
        </View>
        </TouchableHighlight>
        </View>
    );
}
```

在这里我们可以很明显的看到我们在需要实现点击效果的view外面加了`TouchableHightLight`组件，并在这个组件里面实现了各种触摸事件。这里的`TouchalbeHightLight`是`Touch`的具体实现之一，除了`TouchableHightLight`，还有其他三个组件同样实现了`Touch`的功能，它们的主要功能如下:

### TouchableHightLight
本组件用于封装视图，使其可以正确响应触摸操作。  
当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。  
在底层实现上，实际会创建一个新的视图到视图层级中，如果使用的方法不正确，有时候会导致一些不希望出现的视觉效果。譬如没有给视图的backgroundColor显式声明一个不透明的颜色。
### TouchableNativeFeedback(仅限Android)
本组件用于封装视图，使其可以正确响应触摸操作（仅限Android平台）。在Android设备上，这个组件利用原生状态来渲染触摸的反馈。目前它只支持一个单独的View实例作为子节点。个人感觉这个是为了实现Material Design而出的组件，因为用这个组件可以实现Material Design点击控件时产生的涟漪效果，具体请参考`TouchableNativeFeedback`
### TouchableOpacity
本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。这个过程并不会真正改变视图层级，大部分情况下很容易添加到应用中而不会带来一些奇怪的副作用。（此组件与`TouchableHighlight`的区别在于并没有额外的颜色变化，更适于一般场景）
### TouchableWithoutFeedback
本组件用来封装视图。但除非你有一个很好的理由，否则不要用这个组件。所有能够响应触屏操作的元素在触屏后都应该有一个视觉上的反馈（然而本组件没有任何视觉反馈）。这也是为什么一个"web"应用总是显得不够"原生"的主要原因之一。
响应


### 如上所述 
一般的组件需要与`Touchable`组件配合才能完整的视线触摸的操作，但是触摸之后产生的响应事件还是定义在对应的View中的。正常的响应事件流程应该是这样的:

> 是否接受相应 -> 响应触摸事件 -> 释放触摸事件

与流程相对应的方法是:

* `View.props.onStartShouldSetResponder: (evt) => true`:   

	在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？


* `View.props.onMoveShouldSetResponder: (evt) => true`:  

	如果View不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？
	

**如果View返回true，并开始尝试成为响应者，那么会触发下列事件之一:**

* `View.props.onResponderGrant: (evt) => {}`  
	View现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里。
* `View.props.onResponderReject: (evt) => {}`  
	响应者现在“另有其人”而且暂时不会“放权”，请另作安排。

**如果View已经开始响应触摸事件了，那么下列这些处理函数会被一一调用：**

* `View.props.onResponderMove: (evt) => {}` :用户正在屏幕上移动手指时（没有停下也没有离开屏幕）。
* `View.props.onResponderRelease: (evt) => {}`:触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）。
* `View.props.onResponderTerminationRequest: (evt) => true`:有其他组件请求接替响应者，当前的View是否“放权”？返回true的话则释放响应者权力。
* `View.props.onResponderTerminate: (evt) => {}`:响应者权力已经交出。这可能是由于其他View通过onResponderTerminationRequest请求的，也可能是由操作系统强制夺权（比如iOS上的控制中心或是通知中心）。


**在这里首先要注意的是，响应者只能有一个**，
  
举例来说：一个子view和一个父view。如果你希望父view能够响应子view和父view共有区域的事件的话，那么你必须使子view放弃响应，这个时候你就需要设置子view的`View.props.onResponderTerminationRequest`为true,那么子view就会执行`View.props.onResponderTerminate`方法，并放弃响应的权利，这个时候父View就可以响应事件了。

第二个需要注意的点就是，当两个View重叠的话需要慎用这些属性，因为这有可能会造成意想不到的效果,  
下面是例子:

```
import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  PanResponder
} from 'react-native';


export default class demoReact extends Component {
  //构造器
  constructor(props) {
      //加载父类方法,不可省略
      super(props);
      //设置初始的状态
      this.state = {
        bg:'white',
        bg2:'white',
        top:0,
        left:0,
      };
  }

  //componentDidMount是React组件的一个生命周期方法，他会在组件刚加载完成的时候调用一次，以后不会再调用
  componentDidMount() {}

  componentWillMount(){
    this._gestureHandlers = {
      onStartShouldSetResponder: () => true,  //对触摸进行响应
      onMoveShouldSetResponder: ()=> true,  //对滑动进行响应
      onResponderGrant: ()=>{
        console.log("parent onResponseGrant");
        this.setState({bg: 'red'});
      }, //激活时做的动作
      onResponderMove: ()=>{
        console.log("parent onResponderMove");
      },  //移动时作出的动作
      onResponderRelease: ()=>{
        console.log("parent onResponseRelease");
        this.setState({bg: 'white'})
      }, //动作释放后做的动作
    }

    this._gestureHandlers2 = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: ()=> true,
      onResponderTerminationRequest:() => true,
      onResponderGrant: ()=>{
        console.log("child onResponseGrant");
        this.setState({bg2: 'green'});
      },
      onResponderMove: ()=>{
        console.log("child onResponseMove");
      },
      onResponderRelease: ()=>{
        console.log("child onResponseRelease");
        this.setState({bg2: 'white'});
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          {...this._gestureHandlers}
          style={[styles.rect,{
            "backgroundColor": this.state.bg
          }]}>
            <View
              {...this._gestureHandlers2}
              style={[styles.rect2,{
                "backgroundColor": this.state.bg2
              }]}
            ></View>
        </View>

      </View>
    );
  }

};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
rect: {
  width: 200,
  height: 200,
  borderWidth: 1,
  borderColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
},
rect2: {
  width: 100,
  height: 100,
  borderWidth: 1,
  borderColor: 'black'
},
rect3:{
  width:100,
  height:100,
  borderWidth:1,
  borderColor:'black',
  backgroundColor:'#223344',
  alignSelf:'flex-end',
}
});

AppRegistry.registerComponent('demoReact', () => demoReact);

```

观察上面的代码，你认为Console会如何打出日志呢？比如说，父view会不会响应事件？真实的结果是这样的:

![](https://upload-images.jianshu.io/upload_images/220959-3c62ab9cea073be2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)


**响应结果**
  
因为父view虽然不是最初的响应者，但是由于父viewonMoveShouldSetResponder设置为true，并且子view的`onResponderTerminationRequest`设置为true，这样就会导致响应者由子view变成父view。那么如果我们`onResponderTerminationRequest`设置为false呢？是不是父view就不会响应时间呢？真实的答案会让你大吃一惊的，结果是这样的:

![](https://upload-images.jianshu.io/upload_images/220959-04c0d908b4742113.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)

看，父view的`onResponderGrant`的方法仍然被执行到了，这是因为你将父`viewonMoveShouldSetResponder`设置为true的关系，你可以再看一下此方法的定义，只有当这个值设置为false的时候，父view的`onResponderGrant`方法才不会执行。所以，当view重叠的时候一定要小心。

### 捕获事件
熟悉Android开发的人都知道，View的触摸事件是从`ViewGroup`往View传播的，即俗称的冒泡形式调用，当我们希望ViewGroup响应时间时，只需要将`ViewGroup的onInterceptTouchEvent`返回值设置为true就行了,React Native与之类似，只需要将下面的方法设置为true就行了。

* `View.props.onStartShouldSetResponderCapture: (evt) => true`
* `View.props.onMoveShouldSetResponderCapture: (evt) => true`

### PanResponder
除了上面的responder，React Native还提供了更高级的PanResponder来处理更为复杂的触摸操作，例如多点触摸手势。对于每一个处理函数，它在原生事件之外提供了一个新的`gestureState`对象。`gestureState`对象里面的字段可以帮助我们处理更加复杂的触摸情况:

* `stateID`:触摸状态的ID。在屏幕上有至少一个触摸点的情况下，这个ID会一直有效。
* `moveX`:最近一次移动时的屏幕横坐标
* `moveY`:最近一次移动时的屏幕纵坐标
* `x0`:当响应器产生时的屏幕坐标
* `y0`:当响应器产生时的屏幕坐标
* `dx`:从触摸操作开始时的累计横向路程
* `dy`:从触摸操作开始时的累计纵向路程
* `vx`:当前的横向移动速度
* `vy`:当前的纵向移动速度  
* `numberActiveTouches`:当前在屏幕上的有效触摸点的数量  

而它的事件处理方法与上面类似，比如上文中的`View.props.onStartShouldSetResponder: (evt) => true`它的对应方法就是`onStartShouldSetPanResponder: (evt, gestureState) => true`.

简单的例子如下:

``` 
    class demoReact extends Component {
        //构造器
        constructor(props) {
            //加载父类方法,不可省略
            super(props);
            //设置初始的状态
            this.state = {
              top:0,
              left:0,
            };
        }

        //componentDidMount是React组件的一个生命周期方法，他会在组件刚加载完成的时候调用一次，以后不会再调用
        componentDidMount() {}

        componentWillMount(){
          this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: ()=> true,
            onPanResponderGrant: ()=>{
              this._top = this.state.top
              this._left = this.state.left
              this.setState({bg: 'red'})
            },
            onPanResponderMove: (evt,gs)=>{
              console.log(gs.dx+' '+gs.dy)
              this.setState({
                top: this._top+gs.dy,
                left: this._left+gs.dx
              })
            },
            onPanResponderRelease: (evt,gs)=>{
              this.setState({
                bg: 'white',
                top: this._top+gs.dy,
                left: this._left+gs.dx
              })}
            })
        }

        render() {
          return (
            <View style={styles.container}>
                <View
                {...this._panResponder.panHandlers}
                style={[styles.rect,{
                  "top":this.state.top,
                  "left":this.state.left,
                }]}>

                </View>
            </View>
          );
        }

    };

    var styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      rect:{
        width:0,
        height:0,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#223344',
        alignSelf:'flex-end',
      }
    });
```
