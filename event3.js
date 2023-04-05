/*------------------create a server and listen to events using events module--------------------*/
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.end("We recieved a request.👍");
});

/* you can only send res.end once in a event listener(below res.end would not work) */
server.on('request', (req,res) => {
    // res.end("We recieved another request.😅");
    
    /*
    * this will not be printed because we already sent the response in above event listener
    * there could only be one response for one request
    */

    console.log("We recieved another request.😅");
});

server.on('close', (req,res) => {
    console.log("Server closed😢");
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Server started at port 8000...");
});