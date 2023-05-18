const mongoose = require('mongoose');

exports.connect_to_DB = () => {
    mongoose.connect('mongodb://localhost:27017/todo')
    .then(() => console.log("Connected to Database successfully."))
    .catch((err) => console.log("Some error occured", err.message));
}