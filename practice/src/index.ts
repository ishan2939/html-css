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
  return a + b.reduce((prev, next) => prev + next);
};

o(2, 3);
o(2, 3, 6, 7, 8);

const p = function (a: number, b: number, c?: number): number {
  if (typeof c != "undefined") return a + b + c;
  return a + b;
};

const q = (a: number, b: number = 2, c: number = 3) => {
  return a + b + c;
};

q(1);
q(1, 3);
q(1, 3, 4);
q(1, undefined, 5);

type a = string;
type b = string | number;
type c = "ishan";

let r: a = "hello";
let s = a as b; // assignment to less specific
let t = a as c; //assignment to more specific

let u = <a>"Hello";
let v = <number>10;

function addOrConcat(
  a: number,
  b: number,
  c: "add" | "concat"
): string | number {
  if (c == "add") return a + b;
  return "" + a + b;
}

const ans: string = addOrConcat(2, 3, "concat") as string;
const ans2:string = addOrConcat(2,3,'add') as string;

//force casting or double casting
//10 as string
(10 as unknown) as string;

const img1 = document.getElementById('#img');
const img2 = document.querySelector('.img')!;
const img3 = document.querySelector('img') as HTMLImageElement;

img3.src;
const w:Element = img2;

const img4 = <HTMLImageElement>document.querySelector('img');
const img5 = <HTMLElement> img1;

let z1:(string | number);
z1=2;

const z2:string = ((z1 as unknown) as string);

console.log(z2);
const z3 = new Date().getFullYear();
console.log('s' + z3);
console.log();