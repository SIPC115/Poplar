let num = 1;
let str = "hyang";
let flag = false;
let arr = [1, 2, 3];
let list = [1, 2, 3, num];
/**
 * 指定类型数组
 * 如果赋值不能满足指定的类型，那么将报错
 */
let tuple = ["10", 20];
/**
 * 枚举类型，就是 Object {"Red": 0, 0: "Red"}这种结构
 * 当然你可以指定枚举值 enum Color {Red = 1, Green, Blud}
 */
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
/**
 * 任意值，并不确定具体类型的时候
 */
let per = "未知";
let perArr = [1, "2", "ab", true];
/**
 * 空值声明void 只能赋值undefined，null
 */
let no = undefined;
let noObj = null;
/**
 * 类型断言，我觉得并没有什么用
 */
let len = perArr.length;
/**
 * 测试效果
 */
console.log(`就是测试一下: ${list}`);
console.log(list[5]);
console.log(Color.Red);
/**
 * 接口测试
 */
var Sex;
(function (Sex) {
    Sex[Sex["Man"] = 0] = "Man";
    Sex[Sex["Woman"] = 1] = "Woman";
})(Sex || (Sex = {}));
;
let tgy = {
    "name": "caelumtian",
    "like": {},
    "sex": Sex.Man
};
let dic1 = ["123", "abc"];
/**
 * 函数测试
 */
function buildName(firstName, ...restOfName) {
    return firstName + " " + restOfName.join(" ");
}
let myAdd = function (x, y) {
    return x + y;
};
function addValue(a, b) {
    return a + b;
}
let lwq = {
    name: ("lwq"),
    age: 12
};
function find(arg) {
    return arg.name; //泛型约束
}
find({
    name: "tgy"
});
/* 这个有问题 T 没有+操作符，搞毛
class Add<T> {
    add(x: T, y: T): T {
        return x + y;
    };
}
var t = new Add<number>();
t.add(1, 2);
*/
/**
 * 类
 */
class Life {
    constructor(name, sex, address) {
    }
    ;
}
;
class Person extends Life {
    constructor(name, sex, address) {
        super(name, sex, address);
        this.name = name;
        this.sex = sex;
        this._address = address;
    }
    ;
    get address() {
        return `这个是修改过后的地址${this._address}`;
    }
    printInfo() {
        console.log("哈哈哈");
        return true;
    }
}
Person.origin = {
    x: "0",
    y: "0"
};
;
class Teacher extends Person {
    constructor(name, sex, address) {
        super(name, sex, address);
    }
}
Teacher.info = {
    "idNum": "20139901"
};
let hy = new Person("hyang", Sex.Woman, "江苏省徐州市");
let hyy = new Teacher("hyy", Sex.Woman, "南京");
console.log(hy.printInfo());
