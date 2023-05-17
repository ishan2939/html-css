const express = require('express');
require('./config/connect').connect_to_DB();

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server started on port 3000...");
});
