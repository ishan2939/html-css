const Cart = require('../models/cart');
const Product = require('../models/product');

function getTotal(products){
    let total = 0;
    for(let i=0; i<products.length; i++){
                    
        total += products[i].p_id.price;
    }
    return total;
}

exports.getMyCart = async (req, res) => {
    try{
        
        Cart.findOne({user_id : req.user.user_id}).populate('products.p_id', {'icon': 1, 'productName': 1, 'price': 1})
        .exec()
        .then((response) => {
            let answer = '';
            let total = 0;

            if(response!=null){
                total = response.total;
                answer = JSON.stringify(response.products);
            }
            
            return res.render('cart', {path: 'cart', response: answer, total: total, message: ''});
        });

    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try{
        const user_id = req.user.user_id;

        const userCartExists = await Cart.find({user_id: user_id});
        const product = await Product.findById(req.query.id);

        if(userCartExists.length!=0){


            let total = userCartExists[0].total + product.price;

            const products = userCartExists[0].products;
            const ifProductExists = await Cart.findOne({'products.p_id': req.query.id});
            
            if(!(ifProductExists)){
                products.push({ p_id: req.query.id});
                const newCart = await Cart.findByIdAndUpdate(userCartExists[0]._id, {products: products, total: total}, {new: true, runValidators: true});
            }

        }
        else{
            let products = [];
            let total = product.price;
            products.push({ p_id: req.query.id});

            const userCart = await Cart.create({
                user_id : user_id,
                products : products,
                total: total
            });

        }
        return res.redirect('/' + req.query.route);

    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
}