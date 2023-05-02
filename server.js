const http = require('http');
const url = require('url');

//create http server
const server = http.createServer((req, res) => {

    //extract path of the page
    const {pathname} = url.parse(req.url, true);

    //put if condition to handle different requests

    //show the home page
    if (pathname === '/' || pathname === '/home')
        res.end("This is the home page.");

    //show the product page
    else if (pathname === '/product')
        res.end("This is the product page.");

    //show the error page
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end("<h1>Page not found!</h1>");
    }
});

//start the server on port
server.listen(8000, '127.0.0.1', () => {
    console.log('server started at port 8000...');
});