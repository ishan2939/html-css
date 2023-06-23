"use strict";
var _a;
let x = 10;
let y = 11;
let z = 12;
console.log(x + y + z);
let a = "9";
a = "10";
let b = 2;
let c = [10, 20];
let d = ["10", true];
let e = [2, "hello"];
let f = [2, "hi"];
let g = ["hello", 3];
let h = ["hello", true, 33, 2, false];
let i = {
    name: "ishan",
    age: 22,
};
let j = {
    quantity: 3,
};
console.log((_a = j.icon) === null || _a === void 0 ? void 0 : _a.toUpperCase());
let k;
let l;
l = "jeel";
const m = (x, y) => {
    console.log(x + y);
};
const n = (x, y) => {
    return x + y;
};
const o = (a, ...b) => {
    return a + b.reduce((prev, next) => prev + next);
};
o(2, 3);
o(2, 3, 6, 7, 8);
const p = function (a, b, c) {
    if (typeof c != 'undefined')
        return a + b + c;
    return a + b;
};
const q = (a, b = 2, c = 3) => {
    return a + b + c;
};
q(1);
q(1, 3);
q(1, 3, 4);
q(1, undefined, 5);
