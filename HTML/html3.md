HTML 头部信息  
===  
# 简介  
HTML `<head>`标签中，有许多元数据标签，涉及到浏览器对网页的渲染，SEO 等等，
而各个浏览器内核以及各个国内浏览器厂商都有些自己的标签元素,这就造成了很多差异性。移动互联网时代，head 头部结构，移动端的 meta 元素，
显得更为重要。这里主要对一些功能性的标签/属性等进行讲解。    

## charset  
声明文档使用的字符编码: `<meta charset="utf-8">`  
html5 之前网页中会这样写：`<meta http-equiv="Content-Type"content="text/html; charset=utf-8">`  

## lang属性  
简体中文: `<html lang="zh-cmn-Hans">` 
繁体中文: `<html lang="zh-cmn-Hant">`  
为什么 lang="zh-cmn-Hans" 而不是我们通常写的 lang="zh-CN" 呢，参考: [页头部的声明应该是用 lang="zh" 还是 lang="zh-cn"](http://www.zhihu.com/question/20797118?utm_source=weibo&utm_medium=weibo_share&utm_content=share_question&utm_campaign=share_sidebar)。

## 优先使用 IE 最新版本和 Chrome  
`<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>`  

## 360 使用Google Chrome Frame  
`<meta name="renderer" content="webkit">`360 浏览器就会在读取到这个标签后，立即切换对应的极速核。 另外为了保险起见再加入
`<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">`这样写可以达到的效果是如果安装了 Google Chrome Frame，则使用 GCF 来渲染页面，如果没有安装 GCF，则使用最高版本的 IE 内核进行渲染。  

## DNS预解析  
为了降低DNS查询时间，引入DNS预解析策略如下：  
1. 用meta信息来告知浏览器, 当前页面要做DNS预解析:`<meta http-equiv="x-dns-prefetch-control" content="on" />`  
2. 在页面header中使用link标签来强制对DNS预解析: `<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />`  

## 百度禁止转码  
通过百度手机打开网页时，百度可能会对你的网页进行转码，脱下你的衣服，往你的身上贴狗皮膏药的广告，为此可在 head 内添加  
`<meta http-equiv="Cache-Control" content="no-siteapp"/>` 

## SEO 优化部分  
1. 页面标题`<title>`标签(head 头部必须): `<title>your title</title>`
2. 页面关键词 keywords: `<meta name="keywords" content="your keywords">`  
3. 页面描述内容 description: `<meta name="description" content="your description">`  
4. 定义网页作者 author: `<meta name="author" content="author,email address">`  
5. 定义网页搜索引擎索引方式，robotterms 是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow: `<meta name="robots" content="index,follow">` 
6. SEO部分可以参考：[浅谈前端与SEO](http://uxc.360.cn/archives/984.html) 

## viewport  
viewport 可以让布局在移动浏览器上显示的更好。 通常会写  
`<meta name="viewport" content="width=device-width, initial-scale=1.0">` 
content 参数：
* width viewport 宽度(数值/device-width)
* height viewport 高度(数值/device-height)
* initial-scale 初始缩放比例
* maximum-scale 最大缩放比例
* minimum-scale 最小缩放比例
* user-scalable 是否允许用户缩放(yes/no)
* inimal-ui iOS 7.1 beta 2 中新增属性，可以在页面加载时最小化上下状态栏。这是一个布尔值，可以直接这样写：
`<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">`
而如果你的网站不是响应式的，请不要使用 initial-scale 或者禁用缩放。  
`<meta name="viewport" content="width=device-width, user-scalable=yes">` 

## iOS与Andriod  
我们在移动端那段再聊

# 附录  
参考资料如下： 
* [知乎](http://www.zhihu.com/question/20797118?utm_source=weibo&utm_medium=weibo_share&utm_content=share_question&utm_campaign=share_sidebar) 
* [浏览器内核控制 Meta 标签说明文档](http://se.360.cn/v6/help/meta.html) 
* [百度转码声明](http://m.chinaz.com/web/2014/0113/335167.shtml)  
* [MDN SEO部分](https://developer.mozilla.org/en-US/docs/Glossary/SEO)
