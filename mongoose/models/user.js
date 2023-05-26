const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true
    }
});

userSchema.methods.getFullName = function(){
    return this.firstName + " " + this.lastName;
}

module.exports = mongoose.model('user', userSchema)