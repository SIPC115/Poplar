/**
 * 数据类型检测
 * 函数 Hy.type
 * @param {any} 待检数据
 * @return {String} 数据类型名称
 */
var Hy = (function(){
        var _W3C = document.dispatchEvent;   //IE9+才支持该属性
        var _toString = Object.prototype.toString;
        var _factory = Array.prototype.slice;
        var _class2type = {
                "null" : "null",
                "NaN" : "NaN",
                "[object Number]" : "number",
                "[object Boolean]" : "boolean",
                "[object String]" : "string",
                "[object Function]" : "function",
                "[object Array]" : "array",
                "[object RegExp]" : "regexp",
                "[object Date]" : "date",
                "[object HTMLDocument]" : "Document",
                "[object HTMLCollection]" : "NodeList",
                "[object StaticNodeList]" : "NodeList",
                "[object DOMWindow]" : "Window",
                "[object global]" : "Window",
                "[object Arguments]" : "Arguments"
        }
        function init_type(obj, str){
                if(obj === void 0){
                        return "undefined";
                }
                var result = _class2type[ (obj === null || obj !== obj) ? obj : _toString.call(obj) ] || obj.nodeName;
                // 兼容IE8以下window检测
                if(obj == obj.window){
                        result = "Window";
                }else if(obj.nodeType === 9){
                        result = "Document";
                }else if(obj.callee){
                        result = "Arguments";
                }else if(isFinite(obj.length) && obj.item){
                        result = "NodeList";    //检测是否含有item属性，且length为数字
                }
                return result;
        }
        function makeArray(obj, start, end){
                //惰性载入函数
                if(_W3C){
                        makeArray = function(obj, start, end){
                                return _factory.call(obj, start, end);
                        }
                }else{
                        //主要是处理IE9以下，节点类数组
                        makeArray = function(obj, start, end){
                            if (!obj || !obj.length) {
                    return [];
                }
                                var array = [],
                                        length = obj.length,
                                        start = start || 0,
                                        end = end ? ((end < 0) ? length + end : end) : length;   //处理-1这样的情况
                                for(var i = start; i < end ;i++){
                                        array.push(obj[i]);
                                }
                                return array;
                        }
                }
                return makeArray(obj, start, end);   //立即调用
        }
        return {
                type : init_type,
                toArray : makeArray
        }
})()     //数据类型判断 数组转换 module方式    


/**
 * 测试数据
 */
Hy.type(undefined)
Hy.type([]);
Hy.type(new Date())
Hy.type(document.body)
Hy.type(document.links)
Hy.type(document.documentElement)