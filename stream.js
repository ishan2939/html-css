const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const read = fs.createReadStream('ishan1.txt');
    
    //solution 1(using res)
    // read.on('data', (block) => {
    //     res.json({ block: block });
    // });
    // read.on('end', () => {
    //     res.end();
    // })

    //solution2(using pipe)
    read.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Server started on port 8000...");
});