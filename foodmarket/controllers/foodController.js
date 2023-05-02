const fs = require('fs');

const data = JSON.parse(fs.readFileSync('../foodmarket/fooddata.json'));

exports.checkId = (req, res, next , id) => { 
    if(id >= data.length){
        res.status(404).json({
            "status" : "Not Found",
            "Error" : "Invalid ID"
        });
        return;
    }
    next();
}

exports.getAllFoodItems = (req, res) => {
    res.status(200).json({
        "status" : "success",
        "data" : {data}
    });
};

exports.getFoodItem = (req, res) => {
    
    const result = data.find((d) => d.id == req.params.id);

    if(result){
        res.status(200).json({
            "status" : "success",
            "data" : {result}
        });
        return;
    }
    res.status(404).json({
        "status" : "Not Found",
        "Error" : "No such Food Item Found"
    });
    return;
}

exports.addFoodItem = (req, res) => {
    const id = data[data.length - 1].id + 1;

    delete req.body.id;
    const newFoodItem = Object.assign({id: id}, req.body);

    data.push(newFoodItem);

    fs.writeFile('../fooddata.json', JSON.stringify(data), (err) => {
        if(err){
            console.log("An error occured while writing in file.");
            return;
        }
        res.send("Food Item added suceessfully.");
    });
}

exports.updateFoodItem = (req, res) => {

    const index = data.findIndex((d) => d.id == req.params.id);

    delete req.body.id;
    for(b in req.body){
        data[index][b] = req.body[b];
    }

    fs.writeFile('../foodmarket/fooddata.json', JSON.stringify(data), (err) => {
        if(err){
            console.log("An error occured while writing in file.");
            return;
        }
        res.send("Food Item updated suceessfully.");
    });
}

exports.deleteFoodItem = (req, res) => {

    const newData = data.filter((d) => d.id != req.params.id);

    fs.writeFile('../foodmarket/fooddata.json', JSON.stringify(newData), (err) => {
        if(err){
            console.log("An error occured while writing in file.");
            return;
        }
        res.send("Food Item deleted suceessfully.");
    });
}