const express = require('express');
require('./config/connect').connect_to_DB();
const router = require('./routes/routes');

const app = express();

app.use(express.json());

app.use('/',router);

app.listen(3000, () => {
    console.log("Server started on port 3000...");
});
