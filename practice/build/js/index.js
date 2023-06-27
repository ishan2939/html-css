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
    if (typeof c != "undefined")
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
let r = "hello";
let s = a; // assignment to less specific
let t = a; //assignment to more specific
let u = "Hello";
let v = 10;
function addOrConcat(a, b, c) {
    if (c == "add")
        return a + b;
    return "" + a + b;
}
const ans = addOrConcat(2, 3, "concat");
const ans2 = addOrConcat(2, 3, 'add');
//force casting or double casting
//10 as string
10;
const img1 = document.getElementById('#img');
const img2 = document.querySelector('.img');
const img3 = document.querySelector('img');
img3.src;
const w = img2;
const img4 = document.querySelector('img');
const img5 = img1;
let z1;
z1 = 2;
const z2 = z1;
console.log(z2);
const z3 = new Date().getFullYear();
console.log('s' + z3);
console.log();
