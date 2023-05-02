const express = require('express');
require('./config/database').connect_to_DB();

const router = require('./routes/route');

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(3000, () => {
    console.log("Server started on port 3000...");
});