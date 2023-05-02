const fs = require('fs');

//reading from file(if file doesn't exists then it will show error)
// console.log(fs.readFileSync('ishan1.txt', 'utf-8'));

// //writing in file(if file is not there than it will automatically create the file)
// fs.writeFileSync('ishan2.txt', 'Hello Ishan, Congratulations on starting the nodeJS course.🥳');
// console.log("Data written successfully.");
console.log('hello')
async function read(){
    console.log('hello')
    fs.readFile('ishan1.txt', 'utf-8',(err,data)=>{

        console.log(data)
    })
}
read()