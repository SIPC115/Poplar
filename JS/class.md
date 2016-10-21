javascript 类与继承  
===  
# 类的创建  
在面向对象语言中，类是面向对象的基础，并且具有棉线的层次概念和继承关系。Javascript中并没有类的概念，Javascript是基于对象的弱类型语言，以对象为基础，以函数为模型，以原形为继承机制的一种模式。创建一个简单的对象，就是创建一个Object类的实例。虽然Object构造函数或对象字面量可以用来创建单个对象，但是这些对象都是基于Object这一个类。为此我们需要创建自己的类，Javascript中创建类的方式有很多种：工厂模式，构造函数模式，原形模式，动态原形模式，寄生构造模式，稳妥构造模式。  
## 工厂模式  
通过函数把一个类型实例包装起来，这样可以通过函数来实现类型的实例化；但是这只是一种伪装的构造函数，而且instanceof判断会发现创建的对象并不属于自己定义的类而是Object不推荐使用     
```javascript   
function Person(name,age) {
    var o = new Object();    //Object创建对象
    o.name = name;
    o.age = age;
    return o;
}
var per1 = Person("tian",11);
per1 instanceof Person;   //false
per1 instanceof Object;   //true
```  
## 原形模式  
声明一个构造函数，利用构造函数的prototype属性为该构造函数定义原形属性（原形prototype是Javascript核心特性之一，设计的目的就是用来实现继承的，从予以角度分析，prototype就是构造类拥有的原始成员。注意对象是没有原形的，只有构造函数拥有原形)；  
```javascript   
function Person() {

}
Person.prototype = {
        name : "tian",
        age : 21,
        run : function() {
            console.log(this.name + "在跑步");
        }                                                                                                                
}
var per1 = new Person("tian", 12); 
```  
一般的我们把定义在原形上的方法叫做原形方法，他们被所有对象共享，也就是只有一份。这样就解决了构造模式的缺点，但是又没有特权方法||属性。于是，我们参考以上这几种方法，就可以得到目前最常用的类的创建方法。  
## 组合模式（构造原形模式）  
可以看出这是原型模式和构造模式的组合，构造函数中我们放入特权属性和特权方法，他们每一个实例就是一个副本，互不影响。在内部还可以放入var 声明的变量作为私有属性。把公共的方法给原形，这样就可以通用。  
```javascript   
function Person(name, age) {
        this.name = name;        //特权方法
        this.age = age;
        var _idNum = 0;     //该属性无法被访问到
}
Person.prototype = {
        run : function() {
                conosole.log(this.name + "在跑步");  //公共方法
        }
}
var per1 = new Person("tian", 12);
```  
原形方法和特权方法都属于实例方法，还有一种类方法或者类属性，我们直接在函数上定义就可以：Person.method = function(){}。遵循对象设计原则，类的所有成员都应该封装在类的结构体内，因此优化该模式，产生动态原形模式。
## 动态原形模式 
把所有信息放在构造函数中，并且动态的判断是否具有某方法并创建  
```javascript  
function Person(name, age) {
        this.name = name;
        this.age = age;
        if(typeof this.run === 'undefined') {
                Person.prototype.run = function() {
                        console.log(this.name + "在跑步");
                }
        }
}
```  
## 其他模式  
寄生构造函数：类似工厂模式，将工厂中的对象实例o，换成指定构造器生成，常用来扩展一些JS本身构造函数，又不希望直接修改构造函数时候使用。比如扩展Array构造函数。    
稳妥构造函数模式：一般用于安全的环境中。最后这两种方法直接十分类似，也不太常用，具体代码就不贴了都和工厂模式长得很像，有兴趣的自行查找。  

# Prototype原形与new操作符  
在讨论继承之前，我们先探索一下原形链和new操作符在创建对象的时候的步骤。  
首先：我们知道在当我们访问对象的一个属性或方法的时候，那么他会先找特权成员，如果有同名的就返回，没有就查找原形，在没有查找父类原形。我们通过组合模式创建的对象都有父类：Object。这种原形链的查找方式我们看看在修改prototype的时候会发生什么：  
```javascript  
function Person() {}
Person.prototype = {
        name : "tian"
}
var per1 = new Person();
console.log(per1.name) //tian
Person.prototype = {
        name : "hyang"     //原形链断开，重写
}
console.log(per1.name) //tian 不受影响
function Teacher(){}
Teacher.prototype = {
       name : "qiqi"
}
per1.constructor = Teacher;
console.log(per1.name)  //tian 依然不受影响
```  
通过上述代码我们发现，当重写类的原形链的时候，已经生成的实例并不受任何影响，修改construct属性（该属性表示对象的构造函数），也没有任何效果。那么究竟什么才是对象回溯的依据呢？其实每个对象都有一个 `__proto__`属性。该属性保存着对象指向的原形。  
```javascript  
console.log(per1.__proto__)   //Object {name: "tian"}
per1.__proto__ = Person.prototype;   //修改__proto__属性
console.log(per1.name)   //hyang
per1.__proto__ = Teacher.prototype 
console.log(per1.name)   //qiqi
```  
在IE11以后和标准浏览器中该属性可以修改访问，之前的该属性不暴露。于是我们得出new操作符在执行的时候过程（参考Person类）：
> 1）创建一个空对象obj  
> 2）obj.__proto__ = Person.prototype (引用)  
> 3）将构造器中this = obj  
> 4）执行构造器里面的代码  
> 5）判断有没有返回值，没有返回值默认undefined，有返回值且为复合类型则返回该类型，否则返回this如果通过new生成对象的时候，忘记加上new了，那么属性会保存在哪儿里呢？  
```javascript  
function Person(name) {
        this.name = name;
}
var per = Person("tian");
per   //'undefined'
console.log(window.name) //'tian'
```  
可以看到没有加new操作符，Person中的this会被解释称window对象，全局变量就很容易受到污染，谨慎使用new操作符。  

# 继承  
Javascript实现继承，通过上面我们知道只要prototype有什么，那么实例就有什么；如果我们将类prototype置换为另一类的prototype，那么该类就可以轻易得到类的原型成员。但是由于对象是引用类型，所以不能直接替换  
```javascript  
function Person(){}  //父类
Person.prototype = {
        "name" : "tian"
}
function Teacher(){}    //子类
Teacher.prototype = Person.prototype;
```  
这样Teacher的原形保存的是对Person的引用，修改Teacher会同时修改Person。解决的方法有两个，一个是通过for in把父类原型逐一赋给子类的原形（拷贝继承）；第二种现将父类的原形赋给一个函数，然后将该函数的实例作为子类的原形。  
方法1：  
```javascript
function extend(child, super) {
        for(var property in super) {
                child[property] = super[property];
        }
        return child;
}
```  
该方法有一个缺陷，就是无法通过instanceof验证。    
方法2 原型继承：  
```javascript  
function Person(name){
        this.name = name;
}
Person.prototype = {
        "run" : function(){
                console.log(this.name + "跑步")
        }
}

function birdge(){}
birdge.prototype = Person.prototype;

function Teacher(name, wage){
        this.name = name;
        this.wage = wage;
}
Teacher.prototype = new birdge();
var per = new Person("tian");
var tea = new Teacher("hyang",10);
Person.prototype === Teacher.prototype;  // false 说明原型已经分离
Person.prototype.say = function(){
    console.log(this.name)
} //为父类添加一个方法
tea.say()    //hyang  说明子类得到了父类新添加的方法
Teacher.prototype.getWage = function(){
    console.log(this.wage);
}
per.getWage;  //'undefined' 说明子类添加的方法并没有影响到父类
```  
这样我们就完成了类的原型继承，我们给子类原形添加的新方法，其实是保存在了生成的new bridge()那个对象中（Teacher的原型保存的是对new bridge这个对象的引用）  
```javascript  
per.__proto__                  //Object {run: function, say: function}
tea.__proto__                  //birdge {getWage: function, run: function, say: function}
tea.__proto__.__proto__  //Object {run: function, say: function}
```   
这里我们可以清除的看到对象各自的原型是什么，中介函数bridge的使用在ES5中有更加简单的方法 Object.create(原型)这样就可以创建出一个具有指定原形的对象。对于不支持Object.create我们可以自己定义该函数   
```javascript  
if(!Object.create){
        Object.create= (function(){
                function F(){}   //创建中介函数（bridge）
                return function(obj) {
                        if(arguments.length !== 1) {
                                throw new Error("仅支持一个参数");
                        }
                        F.prototype = obj;   //原形绑定
                        return new F();      //返回实例
                }
        })()
}
```   
这样上述继承就可以改写成，Teacher.prototype = Object.create(Person.prototype)。对于特权属性和函并没有在原型链中，我们可以采用借用构造函数来继承，于是上面Teacher子类修改为    
```javascript  
function Teacher(name, wage) {
        Person.call(this, name);   //调用父类的构造方法，实现特权函数继承;
        this.wage = wage;
}
```  
综上两种当时组合在一起，就是我们常用的类的类的继承方法（组合继承）。  还有其他的继承方式比如寄生式继承，寄生组合式继承，这些方法个人用的比较少，有兴趣的可以自己参考。  
# 类工厂  
js作为一个基于对象的语言，本身并没有提供class这一概念，通过上一篇文章Javascript 类工厂Ⅰ - 类与继承我们明白了类的继承原理，为此我们可以实现一个属于的简单的OO原型继承。  
```javascript  
/**
 * 提供简单的OO原型继承
 */
(function(global) {
    "use strict"
    global.Class = {
        /**
         * @param superclass  父类
         * @param definition  类的属性设置
         * @returns {_Object}  返回生成好的类
         */
        create : function(superclass, definition) {
            if(arguments.length === 1) {
                definition = superclass;
                superclass = Object;
            }
            if(typeof superclass !== "function") {
                throw new Error("superclass must be fun");
            }
            var _super = superclass.prototype;

            //删去静态方法（静态方法不能被继承）
            var statics = definition.statics;
            delete definition.statics;

            // 用于返回的中间类,调去deinition对象中的内容
            function _Object() {
                this.init.apply(this, arguments);
            }
            _Object.prototype = Object.create(_super);

            //_super 属性保存父类原型
            _Object.prototype._super = _super;
            _Object.prototype.constructor = _Object;
           //确保一定存在init方法
            if(typeof _Object.prototype.init !== 'function') {
                _Object.prototype.init = function() {
                    superclass.apply(this, arguments);
                }
            }
            //copy对象内容到原型中
            for(var name in definition) {
                _Object.prototype[name] = definition[name];
            }

           //绑定静态内容
            _Object.statics = {};
            for(var name in statics) {
                _Object.statics[name] = statics[name];
            }

            return _Object;
        }
    }

})(this);
```  
## 使用说明   
通过Class.create([properties])创建类，properties为属性对象;
init 初始化方法，会在创建实例是被调用 
statics 类的静态方法，ClassName.fn()   
```javascript  
var Person = Class.create({
    init : function(name, age) {
        this.name = name;
        this.age = age;
    },
    statics : {
       "name" : "Person",
       "type" : "Class"
    }
})
var per = new Person("phantom", 1);
```  
使用Class.create(superClass, properties) 继承父类superClass

this._super 保存有父类属性，可以用于子类中调用父类方法。  
```javascript  
var Teacher = Class.create(Person, {
    init : function(name, age, school) {
        this._super.init.call(this, name, age);  //调用父类init
        this.school = school;
    },
    teach : function() {
        console.log(this.name + "上课呢");
    }
})
var te = new Teacher("cjk", 30, 't_hot');
```   
# ES6的类扩展  
ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。  
```javascript  
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```  
上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。

继承类:
Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。  
`class ColorPoint extends Point {}`  
上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。下面，我们在ColorPoint内部加上代码。  
```javascript  
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```  

# 附录  
参考资料如下：  
* [javascript高级程序设计第三版](http://product.dangdang.com/1900470931.html)
* Prototype.js源码
* [jQuery框架设计](https://item.jd.com/11436424.html)
* [PhantomUI组件库](https://github.com/T-phantom)





