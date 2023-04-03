const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const path = req.url;

    if(path==='/' || path==='/home')
        res.end("This is the home page.");
    else if(path==='/product')
        res.end("This is the product page.");
    else{
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end("<h1>Page not found!</h1>");
    }
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('server started at port 8000');
})