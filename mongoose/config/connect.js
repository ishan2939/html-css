const mongoose = require('mongoose');

exports.connect_to_DB = () => {
    mongoose.connect('mongodb://localhost:27017/CRUD')
    .then(() => console.log("Connected to Database successfully."))
    .catch((err) => console.log("Some error occured", err.message));
}