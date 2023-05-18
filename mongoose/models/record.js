const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        required: true
    },
    tasks: [{
        task_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task'
        }
    }]
});

module.exports = mongoose.model('record', recordSchema);