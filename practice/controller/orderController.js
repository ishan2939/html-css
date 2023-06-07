const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getMyOrders = async (req, res) => {
    try{
        
        Order.find({user_id : req.user.user_id}).populate('products.p_id', {'productName': 1, 'price': 1})
        .exec()
        .then((response) => {

            return res.render('orders', {path: "orders", response: response});
        });

    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.confirmOrder = async (req, res) => {
    try{

        const userCart = await Cart.findOne({user_id: req.user.user_id});

        if(!(userCart))
            return;
        
        const order = {
            user_id: userCart.user_id,
            products: userCart.products,
            total: userCart.total
        };

        const newOrder = await Order.create(order);

        await Cart.findByIdAndDelete(userCart._id);

        return res.redirect('/getmycart');
    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};