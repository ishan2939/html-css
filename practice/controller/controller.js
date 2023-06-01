const Product = require('../models/product');

exports.addProduct = async (req, res) => {
    try {

        const {productName, image, from, nutrients, quantity, price, organic, description} = req.body;

        if(!(productName && image && nutrients && quantity && price))
            return res.status(400).json({ status: "Failure", error: "Not sufficient data provided." });

        
        const newProduct = await Product.create({
            productName: productName,
            image: image,
            from: from,
            nutrients: nutrients,
            quantity: quantity,
            price: price,
            organic: organic,
            description: description
        });

        return res.status(200).json({ status: "Success", response: "Product added successfully." });

    } catch (err) {
        return res.status(400).json({ status: "Failure", error: err.message });
    }

};

exports.getAllProducts = async (req, res) => {

    try {
        const allProducts = await Product.find();

        return res.status(200).json({ status: "Success", response: allProducts });

    } catch (err) {
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);

        if (foundProduct)
            return res.status(200).json({ status: "Success", response: foundProduct });
        else
            return res.status(404).json({ status: "Failure", response: "We could not find the product that you are looking for." });
    }
    catch (err) {
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try{

        const {productName, image, from, nutrients, quantity, price, organic, description} = req.body;

        if(!(productName && image && nutrients && quantity && price))
            return res.status(400).json({ status: "Failure", error: "Not sufficient data provided." });
        
        const obj = {
            productName: productName,
            image: image,
            from: from,
            nutrients: nutrients,
            quantity: quantity,
            price: price,
            organic: organic,
            description: description
        };

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, obj, {new: true, runValidators: true});

        res.status(200).json({ status: "Success", response: "Product updated successfully." });

    }catch(err){

        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try{

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ status: "Success", response: "Product deleted successfully." });

    }catch(err){

        res.status(400).json({ status: "Failure",  error: err.message});
    }
};