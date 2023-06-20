const path = require('path');

const express = require('express');
const dotenv = require('dotenv');

const router = require('./routes/routes');
const statusCodes = require('./constants/constant');

dotenv.config({ path: path.join(__dirname, 'constants', '.env') });

require('./database/connection');
require('./models/index').syncTables();

const app = express();

app.use(express.json());

app.use('/', router);

app.use('*', (req, res) => {
    return res.status(statusCodes.ERROR_NOT_FOUND["code"]).json({ status: "Failure", message: "We can't find the page you are looking for." });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
}); 