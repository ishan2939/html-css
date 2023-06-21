const path = require('path');

const express = require('express');
const dotenv = require('dotenv');

const router = require('./routes/routes');
const statusCodes = require('./constants/constant');

dotenv.config({ path: path.join(__dirname, 'constants', '.env') });

require('./database/connection');   //connect to database
require('./models/index').syncTables(); //sync tables

const app = express();

app.use(express.json());

app.use('/', router);   //router

app.use('*', (req, res) => {    //if user enters wrong route
    return res.status(statusCodes.ERROR_NOT_FOUND["code"]).json({ status: "Failure", message: "We can't find the page you are looking for." });
});

const port = process.env.PORT || 3000;  //get the port

app.listen(port, () => {    //start the server
    console.log(`Server started at port ${port}...`);
}); 