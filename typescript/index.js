var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var num = 1;
var str = "hyang";
var flag = false;
var arr = [1, 2, 3];
var list = [1, 2, 3, num];
/**
 * 指定类型数组
 * 如果赋值不能满足指定的类型，那么将报错
 */
var tuple = ["10", 20];
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
var per = "未知";
var perArr = [1, "2", "ab", true];
/**
 * 空值声明void 只能赋值undefined，null
 */
var no = undefined;
var noObj = null;
/**
 * 类型断言，我觉得并没有什么用
 */
var len = perArr.length;
/**
 * 测试效果
 */
console.log("\u5C31\u662F\u6D4B\u8BD5\u4E00\u4E0B: " + list);
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
var tgy = {
    "name": "caelumtian",
    "like": {},
    "sex": Sex.Man
};
var dic1 = ["123", "abc"];
/**
 * 类
 */
var Person = (function () {
    function Person(name, sex, address) {
        this.name = name;
        this.sex = sex;
        this._address = address;
    }
    ;
    Object.defineProperty(Person.prototype, "address", {
        get: function () {
            return "\u8FD9\u4E2A\u662F\u4FEE\u6539\u8FC7\u540E\u7684\u5730\u5740" + this._address;
        },
        enumerable: true,
        configurable: true
    });
    Person.prototype.printInfo = function () {
        console.log("哈哈哈");
        return true;
    };
    return Person;
}());
;
var Teacher = (function (_super) {
    __extends(Teacher, _super);
    function Teacher(name, sex, address) {
        _super.call(this, name, sex, address);
    }
    Teacher.info = {
        "idNum": "20139901"
    };
    return Teacher;
}(Person));
var hy = new Person("hyang", Sex.Woman, "江苏省徐州市");
var hyy = new Teacher("hyy", Sex.Woman, "南京");
console.log(hy.printInfo());
