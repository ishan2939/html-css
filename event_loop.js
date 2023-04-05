const fs = require('fs');

console.log("Hello1");
console.log("Hello2");

fs.readFile('ishan1.txt', 'utf-8', () => {
    console.log("Hello3");

    setTimeout(() => console.log("Hello4"), 2000);
    setTimeout(() => console.log("Hello5"), 0);
    setImmediate(() => console.log("Hello6"));
});

console.log("Hello6");
setImmediate(() => console.log("Hello8"));