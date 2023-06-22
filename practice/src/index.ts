let x = 10;
let y = 11;
let z = 12;

console.log(x + y + z);

let a: string = "9";
a = "10";

let b: string | number = 2;

let c: number[] = [10, 20];
let d: (string | boolean)[] = ["10", true];

let e:[number, string] = [2,'hello'];

let f = [2, 'hi'];

//e = f;


type myType1 = [string, number];

let g:myType1 = ['hello', 3];

type myType2 = (string | boolean | number)[];

let h:myType2 = ['hello', true, 33, 2, false];

type myType3 = {
    name: string,
    age: number
};

let i:myType3 = {
    name: 'ishan',
    age: 22
}

type myType4 = {
    icon?: string,
    quantity: number
};

let j:myType4 = {
    quantity: 3
}

console.log(j.icon?.toUpperCase())