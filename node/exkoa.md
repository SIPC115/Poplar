Node.js框架之express与koa对比分析    
===  
# 背景介绍  
## Express   
> 2009年6月26日，TJ Holowaychuk提交了Express的第一次commit，接下来在2010年1月2日，
有660次commits的Express 0.0.1版本正式发布。TJ和Ciaron Jessup是当时最主要的两个代码贡献者。   

## Koa  
> 大概在差不多一年前的2013年8月17日，TJ Holowaychuk（又是他！）只身一人提交了Koa的第一次commit。他描述Koa为“表现力强劲的Node.js中间件，通过co使用generators使得编写web应用程序和REST API更加丝般顺滑”。
Koa被标榜为只占用约400行源码空间的框架。  



# Hello World  
这里首先输出一个hello world来大致了解下express和koa的区别。    
Express 代码如下：   

```js
var express = require('express') 
var app = express()  //创建一个APP实例 
 
//建一个项目根目录的get请求路由，回调方法中直接输出字符串Hello World! 
app.get('/', function (req, res) { 
    res.send('Hello World!') 
}); 
 
//监听端口，启动服务 
app.listen(3000);  
```  

Koa 代码如下： 

```js   
var koa = require('koa'); 
var route = require('koa-route');  //koa默认没有集成route功能，引入中间件 
 
var app = koa();  //创建一个APP实例 
 
//建一个项目根目录的get请求路由，回调方法中直接输出字符串Hello World!，就是挂载一个中间件 
app.use(route.get('/', function *(){ 
    this.body = 'Hello World'; 
})); 
 
//监听端口，启动服务 
app.listen(3000); 
```   

两种的使用还是很简单的，只不过koa没有继承路由中间件，需要自己引入。  

# 功能对比    
## 应用生命周期和上下文    
在项目过程中，经常需要用到在整个应用生命周期中共享的配置和数据对象，比如服务URL、是否启用某个功能特性、接口配置、当前登录用户数据等等。
属于比较基础的功能，两者都非常方便，koa的application context感觉使用起来更方便一点。   

Express 代码如下  

```js   
//共享配置
app.set('enableCache', true); 
app.get('enableCache');
 
app.disable('cache'); 
app.disabled('cache'); 
 
app.enable('cache') 
app.enabled('cache'); 
 
//应用共享数据：app.locals 
app.locals.user = {name:"Samoay", id:1234}; 
```  

Koa 代码如下  

```js   
//配置，直接使用koa context即可 
app.enableCache = true; 
 
app.use(function *(next){ 
    console.log(this.app.enableCache); 
    //true 
    this.app.enableCache = false; 
 
//just use this 
    this.staticPath = 'static'; 
 
yield *next; 
}); 
 
//应用共享数据：ctx.state 
this.state.user = {name:"Samoay", id:1234};
```  

## 请求 HTTP Request  
服务器端需要进行什么处理，怎么处理以及处理的参数都依赖客户端发送的请求，
两个框架都封装了HTTP Request对象，便于对这一部分进行处理。以下主要举例说明下对请求参数的处理，
其它例如头信息、Cookie等请参考官方文档。两者除了写法上稍有区别，没太大区别。
GET参数都可以直接通过Request对象获取，POST参数都需要引入中间件先parse，再取值  

Express 代码如下：  

```js  
// Express 
// 获取QueryString参数 
// GET /shoes?order=desc&shoe[color]=blue 
req.query.order 
// => "desc" 
 
req.query.shoe.color 
// => "blue" 
 
// 通过路由获取Restful风格的URL参数 
app.get('/user/:id?', function userIdHandler(req, res) { 
    console.log(req.params.id); 
    res.send('GET'); 
}) 
 
//获取POST数据:需要body-parser中间件 
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/', function (req, res) { 
    console.log(req.body); 
    res.json(req.body); 
}) 
```  

Koa 代码如下：  

```js    
// 获取QueryString参数 
// GET /?action=delete&id=1234 
this.request.query 
// => { action: 'delete', id: '1234' } 
 
// 通过路由获取Restful风格的URL参数 
var route = require('koa-route'); 
app.use(route.get('/post/:id', function *(id){ 
    console.log(id); 
    // => 1234 
})); 
 
// 获取POST数据:需要co-body中间件 
// Content-Type: application/x-www-form-urlencoded 
// title=Test&content=This+is+a+test+post 
var parse = require('co-body'); 
app.use(route.post('/post/new', function *(){ 
    var post = yield parse(this.request);//this 
    console.log(post); 
    // => { title: 'Test', content: 'This is a test post' } 
})); 
```    

## 路由 Route  
收到客户端的请求，服务需要通过识别请求的方法（HTTP Method: GET, POST, PUT...）和请求的具体路径(path)来进行不同的处理。这部分功能就是路由（Route）需要做的事情，
说白了就是请求的分发，分发到不同的回调方法去处理。 

Express 代码如下：   

```js  
// Express 
// app.all表示对所有的路径和请求方式都要经过这些回调方法的处理，可以逗号方式传入多个 
app.all('*', authentication, loadUser); 
// 也可以多次调用 
app.all('*', requireAuthentication) 
app.all('*', loadUser); 
// 也可以针对某具体路径下面的所有请求 
app.all('/api/*', requireAuthentication); 
 
// app.get GET方式的请求 
app.get('/user/:id', function(req, res) { 
    res.send('user ' + req.params.id); 
}); 
 
// app.post  POST方式的请求 
app.post('/user/create', function(req, res) { 
    res.send('create new user'); 
}); 
```    
在应用生命周期中也有一个app.get方法，用于获取项目配置。
Express内部就是公用的一个方法，如果传入的只有1个参数就获取配置，2个参数就作为路由处理。
其次是app.use('*', cb)与 app.all('*', cb) 的区别，前者是中间件方式，
调用是有顺序的，不一定会执行到；后者是路由方式，肯定会执行到。   

Koa 代码如下：  

```js   
// Koa 
// 和Express不同，koa需要先引入route中间件 
var route = require('koa-route'); 
 
//引入中间件之后支持的写法差不多，只是路径传入route，然后把route作为中间件挂载到app 
app.use(route.get('/', list)); 
app.use(route.get('/post/new', add)); 
app.use(route.get('/post/:id', show)); 
app.use(route.post('/post', create)); 
 
//链式写法 
var router = require('koa-router')(); 
 
router.get('/', list) 
      .get('/post/new', add) 
      .get('/post/:id', show) 
      .post('/post', create); 
 
app.use(router.routes()) 
   .use(router.allowedMethods()) 
```  

## 视图 Views 
Express框架自身集成了视图功能，提供了consolidate.js功能，可以是有几乎所有Javascript模板引擎，并提供了视图设置的便利方法。
Koa需要引入co-views中间件，co-views也是基于consolidate.js，支持能力一样强大。  


Express 代码如下：  

```js   
// Express 
// 这只模板路径和默认的模板后缀 
app.set('views', __dirname + '/tpls'); 
app.set('view engine', 'html'); 
 
//默认，express根据template的后缀自动选择模板 
//引擎渲染，支持jade和ejs。如果不使用默认扩展名 
app.engine(ext, callback) 
 
app.engine('html', require('ejs').renderFile); 
 
//如果模板引擎不支持(path, options, callback) 
var engines = require('consolidate'); 
app.engine('html', engines.handlebars); 
app.engine('tpl', engines.underscore); 
 
app.get('list', function(res, req){ 
    res.render('list', {data}); 
});  
```  

Koa 代码如下：  

```js   
//Koa 
//需要引入co-views中间件 
var views = require('co-views'); 
 
var render = views('tpls', { 
    map: { html: 'swig' },//html后缀使用引擎 
    default: "jade"//render不提供后缀名时 
}) 
 
var userInfo = { 
    name: 'tobi', 
    species: 'ferret' 
}; 
 
var html; 
html = render('user', { user: userInfo }); 
html = render('user.jade', { user: userInfo }); 
html = render('user.ejs', { user: userInfo }); 
```  

## HTTP Response  
获取完请求参数、处理好了具体的请求、视图也准备就绪，下面就该返回给客户端了，
那就是HTTP Response对象了。这部分也属于框架的基础部分，各种都做了封装实现，
显著的区别是koa直接将输出绑定到了ctx.body属性上，另外输出JSON或JSONP需要引入中间件。

Express 代码如下：  

```js  
// Express 
//输出普通的html 
res.render('tplName', {data}); 
 
//输出JSON 
res.jsonp({ user: 'Samoay' }); 
// => { "user": "Samoay" } 
 
//输出JSONP   ?callback=foo 
res.jsonp({ user: 'Samoay' }); 
// => foo({ "user": "Samoay" }); 
 
//res.send([body]); 
res.send(new Buffer('whoop')); 
res.send({ some: 'json' }); 
res.send('<p>some html</p>'); 
 
//设定HTTP Status状态码 
res.status(200); 
```   

Koa 代码如下：  

```js  
//koa直接set ctx的status和body 
app.use(route.get('/post/update/:id', function *(id){ 
    this.status = 404; 
    this.body = 'Page Not Found'; 
})); 
 
var views = require('co-views'); 
var render = views('tpls', { 
    default: "jade"//render不提供后缀名时 
}); 
app.use(route.get('/post/:id', function *(id){ 
    var post = getPost(id); 
    this.status = 200;//by default, optional 
    this.body = yield render('user', post); 
})); 
 
//JSON 
var json = require('koa-json'); 
app.use(route.get('/post/:id', function *(id){ 
    this.body = {id:1234, title:"Test post", content:"..."}; 
})); 
```  

## 中间件 Middleware   
Express由于是在ES6特性之前的，中间件的基础原理还是callback方式的；
而koa得益于generator特性和co框架（co会把所有generator的返回封装成为Promise对象），
使得中间件的编写更加优雅。（注意：Koa2 采用async await）   

Express 代码如下：  

```js  
// req 用于获取请求信息， ServerRequest 的实例 
// res 用于响应处理结果， ServerResponse 的实例 
// next() 函数用于将当前控制权转交给下一步处理， 
//        如果给 next() 传递一个参数时，表示出错信息 
var x = function (req, res, next) { 
 
// 对req和res进行必要的处理 
 
// 进入下一个中间件 
    return next(); 
 
// 传递错误信息到下一个中间件 
    return next(err); 
 
// 直接输出，不再进入后面的中间件 
    return res.send('show page'); 
};   
```  

Koa 代码如下：  

```js  
// koa 一切都在ctx对象上+generator 
app.use(function *(){ 
    this; // is the Context 
 
this.request; // is a koa Request 
    this.response; // is a koa Response 
 
this.req;// is node js request 
    this.res;// is node js response 
 
//不再进入后面的中间件, 回溯upstream 
    return; 
}); 
```  
 






