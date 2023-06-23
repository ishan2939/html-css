let x = 10;
let y = 11;
let z = 12;

console.log(x + y + z);

let a: string = "9";
a = "10";

let b: string | number = 2;

let c: number[] = [10, 20];
let d: (string | boolean)[] = ["10", true];

let e: [number, string] = [2, "hello"];

let f = [2, "hi"];

//e = f;

type myType1 = [string, number];

let g: myType1 = ["hello", 3];

type myType2 = (string | boolean | number)[];

let h: myType2 = ["hello", true, 33, 2, false];

type myType3 = {
  name: string;
  age: number;
};

let i: myType3 = {
  name: "ishan",
  age: 22,
};

type myType4 = {
  icon?: string;
  quantity: number;
};

let j: myType4 = {
  quantity: 3,
};

console.log(j.icon?.toUpperCase());

let k: "ishan";

let l: "ishan" | "jeel" | "parth";

l = "jeel";

const m = (x: number, y: number) => {
  console.log(x + y);
};

const n = (x: number, y: number): number => {
  return x + y;
};

const o = (a: number, ...b: number[]): number => {
    return a + b.reduce((prev, next) => prev+next);
};

o(2, 3);
o(2,3,6,7,8);

const p = function(a:number, b:number, c?:number):number {
    if(typeof c != 'undefined')
        return a+b+c;
    return a+b;
}

const q = (a:number, b:number = 2, c:number = 3)=> {
    return a+b+c;
};

q(1);
q(1,3);
q(1,3,4);
q(1, undefined, 5);