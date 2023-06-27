"use strict";
//////////////////////////////////////////////////////////////simple
class Greet {
    constructor(message) {
        this.msg = message;
    }
}
const greetMe = new Greet('Hello');
///////////////////////////////////////////////////////////////inheritance
class Student extends Greet {
    constructor(greet, name, lang, age) {
        super(greet);
        this.name = name;
        this.lang = lang;
        this.age = age;
    }
    getData() {
        return `${this.msg}, My name is ${this.name}. I am ${this.age} years old. And i love coding in ${this.lang}.`;
    }
}
const ishan = new Student('Good Morning!', 'Ishan', 'JS', 22);
console.log(ishan.getData());
class book {
    constructor(name, author, price, hello) {
        this.price = 0;
        this.name = name;
        this.author = author;
        this.price = price;
        this.hello = hello;
    }
}
const alechemist = new book('alchiemist', 'paulo caolo', 300, true);
console.log(alechemist);
// const harry_potter = new book('Harry potter and philosopher stone', 'J. K. Rowling');
// console.log(harry_potter);
//////////////////////////////////////////////////////////////////////////////static property
class Employee {
    constructor(name) {
        this.name = name;
        this.e_id = ++Employee.id;
    }
}
Employee.id = 0;
const e1 = new Employee('Ishan');
const e2 = new Employee('Jeel');
const e3 = new Employee('Parth');
console.log(e1, e2, e3);
console.log(Employee.id);
/////////////////////////////////////////////////////////////////////////////////////getter and setter
class favAnime {
    constructor() {
        this.list = [];
    }
    get getAnime() {
        return this.list;
    }
    set setAnime(list) {
        if (Array.isArray(list) && list.every(l => typeof l === 'string')) {
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
