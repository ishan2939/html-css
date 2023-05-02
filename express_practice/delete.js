const fs = require('fs');

const express = require('express');

const app = express();

app.use(express.json());

let products = JSON.parse(fs.readFileSync('../product.json'));

app.delete('/:id', (req, res) => {
    const newArr = products.filter((p) => p.id != req.params.id);

    if(newArr.length == products.length){
        res.status(404).json({
            "status" : "Failed",
            "Error" : "Invalid Id"
        });
        return;
    }
    products = newArr;
    fs.writeFile('../product.json', JSON.stringify(products), (err) => {
        if(err){
            console.log("Error occured while writing in file.");
            return;
        }
        res.json({"data" : products});
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000...");
});