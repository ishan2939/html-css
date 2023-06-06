const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: { 
        type: String, 
        required: true,
        min: 3,
        trim: true
    },
    lname: { 
        type: String, 
        default: '' 
    },
    username: { 
        type: String, 
        required: true,
        trim: true,
        min: 5
    },
    email: { 
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true,
        trim: true,
        min: 5
    },
    token: { type: String }
});

module.exports = mongoose.model("user", userSchema);