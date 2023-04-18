const fs = require('fs');

// console.log("Hello1");
// console.log("Hello2");

// fs.readFile('ishan1.txt', 'utf-8', () => {
//     console.log("Hello3");

//     setTimeout(() => console.log("Hello4"), 2000);
//     setTimeout(() => console.log("Hello5"), 0);
//     for (let index = 0; index < 1500; index++) {
//     }
//     setImmediate(() => console.log("Hello6"));
// });

// console.log("Hello7");
// setImmediate(() => console.log("Hello8"));


setTimeout(() => {
    console.log('setTimeout')
}, 0);

for(let i=0;i<1000000000;i++){

}
console.log('hello')

setImmediate(()=>console.log('setImmediate'))

