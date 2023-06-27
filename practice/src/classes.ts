//////////////////////////////////////////////////////////////simple
class Greet{
    msg: string

    constructor(message: string){
        this.msg = message;
    }
}

const greetMe = new Greet('Hello');

///////////////////////////////////////////////////////////////inheritance
class Student extends Greet{ 
    public name: string
    private lang: string
    protected age: number

    constructor(greet: string, name: string, lang: string, age: number){
        super(greet);
        this.name = name;
        this.lang = lang;
        this.age = age;
    }

    getData(){
        return `${this.msg}, My name is ${this.name}. I am ${this.age} years old. And i love coding in ${this.lang}.`;
    }
}

const ishan = new Student('Good Morning!', 'Ishan', 'JS', 22);

console.log(ishan.getData());

////////////////////////////////////////////////////////////////////class implemeting interface

interface Book{
    name: string,
    author: string,
    price: number
}

class book implements Book{
    name: string
    author: string
    price: number = 0
    hello: boolean

    constructor(name: string, author: string, price: number, hello: boolean){
        this.name = name;
        this.author = author;
        this.price = price;
        this.hello = hello
    }
}

const alechemist = new book('alchiemist', 'paulo caolo', 300, true);
console.log(alechemist);

// const harry_potter = new book('Harry potter and philosopher stone', 'J. K. Rowling');
// console.log(harry_potter);

//////////////////////////////////////////////////////////////////////////////static property

class Employee{
    static id: number = 0
    name: string
    e_id: number

    constructor(name: string){
        this.name = name;
        this.e_id = ++Employee.id;
    }
}

const e1 = new Employee('Ishan');
const e2 = new Employee('Jeel');
const e3 = new Employee('Parth');

console.log(e1, e2, e3);
console.log(Employee.id)

/////////////////////////////////////////////////////////////////////////////////////getter and setter

class favAnime {
    private list: string[]

    constructor(){
       this.list = []
    }

    public get getAnime(){
        return this.list;
    }

    public set setAnime(list: string[]){
        if(Array.isArray(list) && list.every(l=> typeof l === 'string')){
            this.list = list;
        }
        else
            throw new Error('List is not valid.');
    }
}

const ishanFavAnime = new favAnime();
console.log(ishanFavAnime.getAnime);

ishanFavAnime.setAnime = ['Attack on tittan', 'Demon slayer'];
console.log(ishanFavAnime.getAnime);

ishanFavAnime.setAnime = [...ishanFavAnime.getAnime, 'i wanna eat your pancreas.'];
console.log(ishanFavAnime.getAnime);

// ishanFavAnime.setAnime = [...ishanFavAnime.getAnime, 2020];
// console.log(ishanFavAnime.getAnime);