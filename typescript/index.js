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
