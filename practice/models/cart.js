const mongoose = require("mongoose");

const cart = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user"},
    products: [{
        p_id: {type: mongoose.Schema.Types.ObjectId, ref: "product"}
    }],
    total: {type: Number, default: 0}
});

module.exports = mongoose.model("cart", cart);