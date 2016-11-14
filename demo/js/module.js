var require = (function (name) {
    var modules = {};
    function define(name, deps, impl) {
        for (var i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }
    function get(name) {
        return modules[name];
    }
    console.log(name)
    return {
        define: define,
        get: get
    }
} ())
require.define('foo', [], function () {
    return {
        hello: function () { 
            console.log('hello world');
        },
        name: 'foo'
    }
})
require.define('bar', ['foo'], function (foo) {
    return {
        hello: function () { 
            console.log('bar:' + foo.name); 
        },
        name: 'bar'
    }
})
require.define('user', ['foo', 'bar'], function (foo, bar) {
    return {
        hello: function () { 
            console.log('user:' + foo.name + ', ' + bar.name);
        }
    }
})
var foo = require.get('foo')
var bar = require.get('bar')
var user = require.get('user')
foo.hello()
bar.hello()
user.hello() 