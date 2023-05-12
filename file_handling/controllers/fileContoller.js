const fs = require('fs');

exports.createFile = (req, res) => {
    if (!req.body.fileName) {   //get filename
        res.status(400).send({
            "status": "Bad request",
            "Error": "Not sufficient data provided."
        }); //if filename doesn't exists then throw error
    }
    const exists = fs.existsSync(req.body.fileName);    //check if file already exists

    if (!exists) {  //if it doesn't
        fs.writeFile(req.body.fileName, req.body.data || "", (err) => { //then write into file
            if (err)
                res.status(400).send("Not able to create File for some reason");
            else
                res.status(200).send("File Created successfully.")
        });
    }
    else    //if file does exists
        res.status(400).send({
            "status": "Bad request",
            "Error": "File already exist. Please enter unique filename."
        }); //then show error
};

exports.readFromFile = (req, res) => {
    if (!req.query.fileName) {  //get filename
        res.status(400).send({
            "status": "Bad request",
            "Error": "Not sufficient data provided."
        }); //if it doesn't exists then throw error
    }
    fs.readFile(req.query.fileName, 'utf-8', (err, data) => {   //if filename does exists read from it
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
    if (!req.body.fileName) {   //get filename
        res.status(400).send({
            "status": "Bad request",
            "Error": "Not sufficient data provided."
        }); //if it doesn't exists then throw error
    }
    fs.writeFile(req.body.fileName, req.body.data || "", (err) => { //if filename does exists write to it
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
    if (!req.body.fileName) {   //get filename
        res.status(400).send({
            "status": "Bad request",
            "Error": "Not sufficient data provided."
        }); //if it doesn't exists then throw error
    }
    fs.appendFile(req.body.fileName, req.body.data || "", (err) => {    //if filename does exists append to it
        if (err)
            res.status(400).send({
                "status": "Failed",
                "Error": "Not able to update into file."
            });
        else
            res.status(200).send("Data added successfully in the file.");
    });
};

exports.streamRead = (req, res) => {
    if (!req.body.fileName) {   //get filename
        res.status(400).send({
            "status": "Bad request",
            "Error": "Not sufficient data provided."
        }); //if it doesn't exists then throw error
    }

    const read = fs.createReadStream(req.body.fileName);    //create read stream
    //solution 1(using event based approach)
    /*var data = '';
    
    read.on('data', (block) => {    //on data event
        data += block;  //add block to data variable
    });

    read.on('end', () => {  //on end of streaming send data
        res.send(data);
    });

    read.on('error', (err) => { //on error event send error
        res.status(400).send('An error ocurred while reading from file using stream.' + err.message);
    });*/


    //solution2(using pipe)
    read.pipe(res);
};

exports.streamWrite = (req, res) => {
    if (!req.body.fileName) {   //get filename
        res.status(400).send({
            "status": "Bad request",
            "Error": "Not sufficient data provided."
        }); //if it doesn't exists then throw error
    }
    const write = fs.createWriteStream(req.body.fileName);  //create write stream

    write.write(req.body.data || '', 'UTF-8');  //write

    write.end();    //end

    write.on('finish', () => {  //on finish event send message
        res.send("Writed into file successfully.");
    });

    write.on('error', (err) => {    //on error event
        res.status(400).send('An error ocurred while reading from file using stream.' + err.message);   //send error
    });

};