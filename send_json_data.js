const fs = require('fs');
const http = require('http');

const data = fs.readFileSync('product.json', 'utf-8');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type' : 'application/json'
    });
    console.log(JSON.parse(data));
    res.end(data);
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Server started at 8000...");
});