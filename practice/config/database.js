const mongoose = require('mongoose');

exports.connect_to_DB = () => mongoose.connect('mongodb://localhost:27017/nodefarm')
.then(() => console.log("Connect to database successfully."))
.catch(err => console.log('An error occured while connecting, ', err.message));