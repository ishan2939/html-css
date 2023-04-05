const fs = require('fs');

const express = require('express');

const app = express();

const products = JSON.parse(fs.readFileSync('../product.json'));

app.use(express.json());

app.patch('/:id', (req, res) => {

    if(req.params.id > products.length){
        res.status(404).json({
            "status" : "Failed",
            "error" : "Invalid ID"
        });
        return;
    }
    
    const index = products.findIndex((p) => p.id == req.params.id);
    for (b in req.body) {
        products[index][b] = req.body[b];
    }

    fs.writeFile('../product.json', JSON.stringify(products), (err) => {
        if (err) {
            console.log("Error while writing in file.");
            return;
        }
        res.json({ products: products });
    });
});

app.listen(3000, () => {
    console.log("Server started at 3000 port...");
});