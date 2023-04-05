const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    //read json file and send data
    fs.readFile('../product.json', 'utf-8', (err, data) => {
        res.status(200).json(JSON.parse(data));
    });    
    
    //pass json data
    //res.json({"name":"ishan"});
    
    //pass normal message
    //res.send("Hello from the other side.🤍");
});

app.post('/', (req, res) => {
    res.send("You can post here...");
});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
})