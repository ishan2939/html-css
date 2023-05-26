const mongoose = require('mongoose');

const product = mongoose.Schema({
    productName: {type: String, required: true},
    image: {type: String, required: true},
    from: {type: String, default: 'Origin not specified'},
    nutrients: {type: String, required: true},
    quantity: {type: String, required: true},
    price: {type: Number, required: true},
    organic: {type: Boolean, default: true},
    description: {type: String, default: 'No description found'}
});

module.exports = mongoose.model('product', product);