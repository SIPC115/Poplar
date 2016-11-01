let num: number = 1;
let str: string = "hyang";
let flag: boolean = false;
let arr: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3, num];  


/**
 * 指定类型数组
 * 如果赋值不能满足指定的类型，那么将报错
 */
let tuple: [string, number] = ["10", 20];   


/**
 * 枚举类型，就是 Object {"Red": 0, 0: "Red"}这种结构
 * 当然你可以指定枚举值 enum Color {Red = 1, Green, Blud}
 */
enum Color {Red, Green, Blue};   


/**
 * 任意值，并不确定具体类型的时候  
 */     
let per: any = "未知";
let perArr: any[] = [1, "2", "ab", true];  


/**
 * 空值声明void 只能赋值undefined，null
 */
let no: void = undefined;
let noObj: void = null;  

/**
 * 类型断言，我觉得并没有什么用
 */
let len: number = (<any>perArr).length;
/**
 * 测试效果
 */
console.log(`就是测试一下: ${list}`);
console.log(list[5]);
console.log(Color.Red);  

/**
 * 接口测试
 */
enum Sex{Man, Woman};

interface PersonConfig {
    name: string;
    like?: any;
    readonly sex: Sex;
}
let tgy: PersonConfig = {
    "name": "caelumtian",
    "like": {},
    "sex": Sex.Man 
}

/**
 * 不可变，字符串数组
 */
interface numberDictionary {
    readonly [index: number]: string;
}
let dic1: numberDictionary = ["123", "abc"];

/**
 * 函数测试
 */
function buildName(firstName: string, ...restOfName: string[]): string {
    return firstName + " " + restOfName.join(" ");
}
let myAdd: (baseValue:number, increment:number) => number =
    function(x: number, y: number): number { 
        return x + y; 
    };
function addValue(a: string & number, b: string & number) {
    return a + b;
}
type Name = string;
let lwq: any = {
    name: <Name>("lwq"),
    age: 12
}
/**
 * 泛型测试
 */
interface Obj {
    name: string
}
function find<T extends Obj>(arg: T): string {
    return arg.name;  //泛型约束
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
abstract class Life {
    constructor(name: string, sex:Sex, address: string){};
    abstract printInfo(): boolean;
};
class Person extends Life {
    public name: string;
    public sex: Sex;
    private _address: string;
    static origin = {
        x: "0",
        y: "0"
    };
    constructor(name: string, sex:Sex, address?: string) {
        super(name, sex, address);
        this.name = name;
        this.sex = sex;
        this._address = address;
    };
    get address(): string {
        return `这个是修改过后的地址${this._address}`;
    }
    printInfo(): boolean {
        console.log("哈哈哈");
        return true;
    }
};

class Teacher extends Person {
    static info = {
        "idNum": "20139901"
    }
    constructor(name: string, sex:Sex, address: string){
        super(name, sex, address);
    }
}

let hy = new Person("hyang", Sex.Woman, "江苏省徐州市");
let hyy = new Teacher("hyy", Sex.Woman, "南京");
console.log(hy.printInfo());