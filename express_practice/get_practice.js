const fs = require('fs');
const express = require('express');

const app = express();

const data = JSON.parse(fs.readFileSync('../product.json'));

app.get('/', (req, res) => {
    res.json({
        "status" : "success",
        "data" : {
            products : data
        }
    });
    
    
    // res.json({
    //     "status" : "success",
    //     "data" : data
    // });
    
    //res.json(data);
});

app.get('/:id', (req, res) => {
    const product = data.find((d) => {
        return d.id == req.params.id
    });

    if(!product){
        res.status(404).json({
            "status" : "Failed",
            "error" : "Invalid ID"
        });
    }
    res.json(product);
});

app.listen(3000, () => {
    console.log("Server started on port 3000...");
})
