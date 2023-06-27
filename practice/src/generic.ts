const printMessage = <T>(x: T): undefined => {
  console.log(x);
};

printMessage("hello");

const isObj = <T>(y: T): boolean => {
  if (y != null && !Array.isArray(y) && typeof y == "object") return true;
  return false;
};

// console.log(isObj(true));
// console.log(isObj('John'));
// console.log(isObj([1, 2, 3]));
// console.log(isObj({ name: 'John' }));
// console.log(isObj(null));

const isTrue = <T>(z: T): { arg: T; isTrue: boolean } => {
  if (isObj(z) && !Object.keys(z as keyof T).length)
    return { arg: z, isTrue: true };

  if (Array.isArray(z) && z.length != 0) return { arg: z, isTrue: true };

  return { arg: z, isTrue: !!z };
};

// console.log(isTrue(false));
// console.log(isTrue(0));
// console.log(isTrue(true));
// console.log(isTrue(1));
// console.log(isTrue("Dave"));
// console.log(isTrue(""));
// console.log(isTrue(null));
// console.log(isTrue(undefined));
// console.log(isTrue({})); // modified
// console.log(isTrue({ name: "Dave" }));
// console.log(isTrue([])); // modified
// console.log(isTrue([1, 2, 3]));
// console.log(isTrue(NaN));
// console.log(isTrue(-0));


interface greet{
    msg: string
}

const greetMessage = <T extends greet>(a: T):T => {
    return a;
};

// console.log(greetMessage({msg: 'hello'}));

class Class1<T>{
    private abc: T

    constructor(a: T){
        this.abc = a;
    }

    public get getABC(){
        return this.abc;
    }

    public set setABC(x: T){
        this.abc = x;
    }
}

const ABC = new Class1(2);
console.log(ABC.getABC);
ABC.setABC = 4;
console.log(ABC.getABC);