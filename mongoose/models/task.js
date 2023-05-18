const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    t_title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    t_desc: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        require: true,
    }
});

module.exports = mongoose.model('task', taskSchema);