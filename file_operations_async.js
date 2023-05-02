const fs = require('fs');

//asynchronus an non-blocking nodejs script
fs.readFile('ishan1.txt', 'utf-8' ,(err, data1) => {
    console.log(data1);

    fs.readFile('ishan2.txt', 'utf-8', (err, data2) => {
        console.log(data2);

        fs.writeFile('ishan3.txt', 'NodeJS is a javascript runtime built on google V8 js engine.' ,'utf-8', (err) => {
            if(err){
                console.log('Could not write to file');
                return;
            }
        });

        fs.readFile('ishan4.txt', 'utf-8', (err, data) => {
            if(err){
                console.log('There exists no such file as ishan4.txt😢');
                return;
            }
            console.log(data);
        });
    });
});

console.log("Hello");