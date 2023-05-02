const fs = require('fs');

exports.createFile = (req, res) => {
    const exists = fs.existsSync(req.body.fileName);
    if (!exists) {
        fs.writeFile(req.body.fileName, req.body.data || "", (err) => {
            if (err)
                res.status(400).send("Not able to create File for some reason");
            else
                res.status(200).send("File Created successfully.")
        });
    }
    else
        res.status(400).send({
            "status": "Bad request",
            "Error": "File already exist. Please enter unique filename."
        });
};

exports.readFromFile = (req, res) => {
    fs.readFile(req.query.fileName, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).send({
                "status": "Failed",
                "Error": "No such file exists."
            });
        }
        else {
            res.status(200).send({
                "status": "success",
                "filedata": data
            });
        }
    });
};

exports.writeIntoFile = (req, res) => {
    fs.writeFile(req.body.fileName, req.body.data || "", (err) => {
        if (err)
            res.status(400).send({
                "status": "Failed",
                "Error": "Not able to write into file."
            });
        else
            res.status(200).send("File written successfully.");
    });
};

exports.appendIntoFile = (req, res) => {
    fs.appendFile(req.body.fileName, req.body.data || "", (err) => {
        if (err)
            res.status(400).send({
                "status": "Failed",
                "Error": "Not able to update into file."
            });
        else
            res.status(200).send("Data added successfully in the file.");
    });
};