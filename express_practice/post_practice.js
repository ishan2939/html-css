const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

const products = JSON.parse(fs.readFileSync('../product.json'));

app.post('/', (req, res) => {
    const id = products[products.length - 1].id + 1;
    const obj = Object.assign({id: id}, req.body);

    products.push(obj);

    fs.writeFile('../product.json', JSON.stringify(products), (err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log("Product added successfully.");
        res.send("Done");
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000...");
});