"use strict";
///////////////////////////////partial
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const updateStudent = (student, propsToUpdate) => {
    return (Object.assign(Object.assign({}, student), propsToUpdate));
};
const jeel = { name: "jeel", grade: "C" };
console.log(updateStudent(jeel, { grade: 'A', hobbies: ['run', 'games'] }));
//////////////////////////////////////////////required
const changeStudent = (student, propsToUpdate) => {
    return (Object.assign(Object.assign({}, student), propsToUpdate));
};
console.log(changeStudent(jeel, { name: 'jeel', grade: 'C', hobbies: ['run2'] }));
/////////////////////////////////////////////readonly
const ishan2 = Object.assign({}, jeel);
//ishan2.name = 'parth';
//////////////////////////////////////////////////record
const abcd = {
    first_letter: 'a',
    second_letter: 'b',
    third_letter: 'c',
    fourth_letter: 'd'
};
const xyz = {
    first_letter: "a",
    second_letter: "b",
    third_letter: "c",
    fourth_letter: "d"
};
;
const hjk = {
    hello: { name: 'ishn' },
    //juyu: 'hrll'
};
/////////////////////////////////////////////////return type
const returnType = (a, b) => {
    return { sum: a + b };
};
const vgh = returnType(12, 13);
const ghjk = [12, 13];
const hello = returnType(...ghjk);
//////////////////////////////////////////////////awaited
const helloIshan = () => __awaiter(void 0, void 0, void 0, function* () {
    return ["hello", "ishan"];
});
