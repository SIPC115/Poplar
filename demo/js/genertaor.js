//模拟文件服务
var readFile = function(fileName) {
    return new Promise((resolve, reject) => {
        var data = fileName + " 书被读完了";
        setTimeout(() => {
            if(true) {
                resolve(data);
            }
        }, (Math.random() + 1) * 1000)
    })
}

function *readBook () {
    var data = yield readFile("book1");
    console.log(data);
    data = yield readFile("book2");
    console.log(data);
    return true;
}

var read = readBook();
var result = read.next();
result.value.then(function(data) {
    var result2 = read.next(data);
    result2.value.then(function(data) {
        read.next(data);
    })
})

//自动流程管理
function *readBook () {
    var data = yield readFile("book1");
    console.log(data);
    data = yield readFile("book2");
    console.log(data);
    return true;
}

function run(fn) {
    var read = fn();
    function next(data) {
        var result = read.next(data);
        if(result.done) {
            return;
        }
        result.value.then(next);
    }
    next();
}
run(readBook);

//async 实现自动流程管理  
async function readFileAll() {
    var f1 = await readFile("book1");
    console.log(f1);
    var f2 = await readFile("book2");
    console.log(f2);
    return "数据读取完毕";
}
readFileAll().then((v) => {
    console.log(v);
});
