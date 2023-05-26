const express = require('express');
require('./config/databse').connect_to_DB();

const app = express();

const router = require('./routes/routes');

app.use(express.json());

app.use('/', router);

app.listen(3000, () => {
    console.log("Server started at port 3000...");
});