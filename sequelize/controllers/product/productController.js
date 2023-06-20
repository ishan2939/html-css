const Product = require('../../models/product');
const statusCodes = require('../../constants/constant');

exports.addProduct = async (req, res) => {

    try{

        const { productId, ...data} = req.body;
        const newProduct = await Product.create(data);

        return res.status(statusCodes.SUCCESS_CREATED["code"]).json({ status: "Success", message: "Product created successfully.", data: newProduct });

    }catch(err){
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};

exports.getProduct = async (req, res) => {

    try{

        const productId = req.params.id;
        const foundProduct = await Product.findByPk(productId, {attributes: { exclude: ['createdAt', 'updatedAt']}});

        if(foundProduct)
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Product found successfully.", data: foundProduct});
        else
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "No such product exists in database."});

    }catch(err){
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};

exports.getAllProduct = async (req, res) => {

    try{

        const products = await Product.findAll({attributes: { exclude: ['createdAt', 'updatedAt']}});

        if(products.length!=0)
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Products found successfully.", data: products});
        else
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "There are no products in database."});

    }catch(err){
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};