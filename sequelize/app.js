const path = require('path');

const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, 'constants', '.env')});

require('./database/connection').connect_to_DB();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
}); 