"use strict";
const printMessage = (x) => {
    console.log(x);
};
printMessage("hello");
const isObj = (y) => {
    if (y != null && !Array.isArray(y) && typeof y == "object")
        return true;
    return false;
};
// console.log(isObj(true));
// console.log(isObj('John'));
// console.log(isObj([1, 2, 3]));
// console.log(isObj({ name: 'John' }));
// console.log(isObj(null));
const isTrue = (z) => {
    if (isObj(z) && !Object.keys(z).length)
        return { arg: z, isTrue: true };
    if (Array.isArray(z) && z.length != 0)
        return { arg: z, isTrue: true };
    return { arg: z, isTrue: !!z };
};
const greetMessage = (a) => {
    return a;
};
// console.log(greetMessage({msg: 'hello'}));
class Class1 {
    constructor(a) {
        this.abc = a;
    }
    get getABC() {
        return this.abc;
    }
    set setABC(x) {
        this.abc = x;
    }
}
const ABC = new Class1(2);
console.log(ABC.getABC);
ABC.setABC = 4;
console.log(ABC.getABC);
