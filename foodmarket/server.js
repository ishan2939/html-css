const express = require('express');
const foods = require('./routes/foodRoutes');
const app = express();

app.use(express.json());

app.use('/foodItems', foods);

app.listen(3000, () => {
    console.log("Server started at port 3000...");
});