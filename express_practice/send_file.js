const express = require('express');
const path = require("path");

const app = express();

app.listen(3000, () => {
    console.log("server started on port 3000...");
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "demo.html"));
});