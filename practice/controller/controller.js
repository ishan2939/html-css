const Product = require('../models/product');

exports.addProduct = async (req, res) => {
    try{

        for( x of req.body){
            const newProduct = await Product.create(x);
        }

        return res.status(200).json({status: "Success", response: "Products added successfully."});

    }catch(err){
        return res.status(400).json({status: "Failure", error: err.message});
    }

};

exports.getAllProducts = async (req, res) => {

    try{
        const allProducts = await Product.find();

        return res.status(200).json({status: "Success", response: allProducts});
    }catch(err){
        return res.status(400).json({status: "Failure", error: err.message});
    }
};

exports.getProductById = async (req, res) => {
    try{
        const foundProduct = await Product.findById(req.params.id);

        if(foundProduct)
            return res.status(200).json({status: "Success", response: foundProduct});
        else
            return res.status(404).json({status: "Failure", response: "We could not find the product that you are looking for."});
    }
    catch(err){
        return res.status(400).json({status: "Failure", error: err.message});
    }
};