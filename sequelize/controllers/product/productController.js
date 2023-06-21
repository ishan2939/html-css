const Product = require('../../models/product');
const statusCodes = require('../../constants/constant');

exports.addProduct = async (req, res) => {  //add product to database

    try{

        const { productId, ...data} = req.body; //extract productId(just in case if someone tries to add it manually)
        const newProduct = await Product.create(data);  //create product

        return res.status(statusCodes.SUCCESS_CREATED["code"]).json({ status: "Success", message: "Product created successfully.", data: newProduct }); //send the message

    }catch(err){    //if error occurs
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message }); //send error
    }

};

exports.getProduct = async (req, res) => {  //get product by id

    try{

        const productId = req.params.id;
        const foundProduct = await Product.findByPk(productId, {attributes: { exclude: ['createdAt', 'updatedAt']}});

        if(foundProduct) //if product is found then send it
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Product found successfully.", data: foundProduct});
        else    //else send message
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "No such product exists in database."});

    }catch(err){
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};

exports.getAllProduct = async (req, res) => {

    try{

        const products = await Product.findAll({attributes: { exclude: ['createdAt', 'updatedAt']}});

        if(products.length!=0)  //if there are products in database then send them
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Products found successfully.", data: products});
        else    //if not then send message
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "There are no products in database."});

    }catch(err){
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};