const mongoose = require('mongoose');

exports.connect_to_DB = () => {
    mongoose.connect('mongodb://localhost:27017')
    .then(()=>console.log('Connected to Database successfully.'))
    .catch((err)=> console.log('Cannot connect to database because of error.' + err.message));
}