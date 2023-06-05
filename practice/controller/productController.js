const { default: mongoose } = require('mongoose');
const Product = require('../models/product');

exports.getHomePage = async (req, res) => {
    try{
        return res.render('home', {path: 'home'});
    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }

};

exports.addProduct = async (req, res) => {
    try {

        const { productName, icon, from, nutrients, quantity, price, organic, description } = req.body;

        if (!(productName && icon && nutrients && quantity && price))
            return res.status(400).json({ status: "Failure", error: "Not sufficient data provided." });


        const newProduct = await Product.create({
            productName: productName,
            icon: icon,
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
        Product.aggregate([{$match: {_id : new mongoose.Types.ObjectId(req.params.id)}} , 
        {$project: {
            _id: 0, 
            name: "$productName", 
            icon: 1, 
            price: {$concat: [{ $convert: { input: "$price", to: "string", onError: 0, onNull: 0}}, " $ for ", "$quantity"]}, 
            location: { $concat: ["From ", "$from"]}, 
            nutrients: {$split: ["$nutrients", ", "]},
            organic: 1,
            desc: "$description",
            type: 1,
            category: 1
        }}])
        .exec()
        .then((result) => {
            return res.render('product', { path: 'products', title: result[0].name, response: result });
        })
        .catch((err) => {
            throw err;
        })
        /*const foundProduct = await Product.findById(req.params.id, {_id: 0});

        if (foundProduct)
            return 
        else
            return res.status(404).json({ status: "Failure", response: "We could not find the product that you are looking for." });*/
    }
    catch (err) {
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {

        const { productName, icon, from, nutrients, quantity, price, organic, description } = req.body;

        if (!(productName && icon && nutrients && quantity && price))
            return res.status(400).json({ status: "Failure", error: "Not sufficient data provided." });

        const obj = {
            productName: productName,
            icon: icon,
            from: from,
            nutrients: nutrients,
            quantity: quantity,
            price: price,
            organic: organic,
            description: description
        };

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, obj, { new: true, runValidators: true });

        res.status(200).json({ status: "Success", response: "Product updated successfully." });

    } catch (err) {

        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ status: "Success", response: "Product deleted successfully." });

    } catch (err) {

        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getCatalog = async (req, res) => {
    try {

        Product.aggregate([
            {
                $project: {
                    p_id: "$_id",
                    productName: 1,
                    icon: 1,
                    price: 1,
                    category: 1
                }
            },
            {
                $group: {
                    _id: "$category",
                    products: {
                        $push: {
                            p_id: "$p_id",
                            icon: "$icon",
                            name: "$productName",
                            price: "$price"
                        }
                    }
                }
            },
            {
                $project: {
                    category: "$_id",
                    _id: 0,
                    products: 1
                }
            },
            {
                $sort: {
                    category: 1
                }
            }
        ])
            .exec().then((result) => {
                res.render('catalog', { path: 'catalog', response: result });
            }).catch((err) => { throw err });
    } catch (err) {

        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {

        Product.aggregate([
            { $project: { icon: 1, category: 1, _id: 0 } },
            { $group: { _id: "$category", icon: { $addToSet: "$icon" } } },
            { $project: { category: "$_id", _id: 0, icon: { $arrayElemAt: ["$icon", 0] } } },
            { $sort: { category: 1 } }])
            .exec()
            .then((result) => res.render('categories', {path: 'categories', response: result }))
            .catch((err) => { throw err });

    } catch (err) {

        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getProductFromCategory = async (req, res) => {
    try {

        Product.aggregate([
            { $match: { category: req.params.category } }, 
            { $project: { p_id: "$_id",_id: 0, icon: "$icon", name: "$productName", price: "$price" } }])
            .exec()
            .then((result) => {
                return res.render('getproductfromcategory', { path: 'categories', header: req.params.category, response: result })
            })
            .catch((err) => { throw err });
    } catch (err) {

        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getProductsPage = async (req , res) => {
    try{

        const total = await Product.countDocuments({});

        const pages = Math.ceil(total/10);
        
        /*Product.aggregate([{$project: {p_id: "$_id", _id: 0, name: "$productName", icon: 1, price: 1}}, {$limit: 10}])
        .exec()
        .then((result) => res.render('products', {products: result, pages, current: 1}))
        .catch((err) => {throw err});*/

        let firstPage = await Product.find({}, {p_id: "$_id", _id: 0, name: "$productName", icon: 1, price: 1}).limit(10);

        firstPage = JSON.stringify(firstPage);
        return res.render('products', {path: 'products', products: firstPage, pages, current: 1});

    }catch(err){
        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getProductsBasedOnPagination = async (req, res) => {
    try{

        const limit = 10;
        let skip = (req.params.page - 1) * limit; 
        const products  =  await Product.find({}, {p_id: "$_id", _id: 0, name: "$productName", icon:1, price: 1}).skip(skip).limit(limit);

        const total = await Product.countDocuments({});

        const pages = Math.ceil(total/10);
        return res.render('products', {path: 'products', products: JSON.stringify(products),  pages, current: req.params.page});
    }catch(err) {
        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getSearchedProduct = async (req, res) => {
    try{

        const regex = new RegExp(req.params.name, 'i');   
        Product.aggregate([
            { $match: { productName: { $regex: regex } } },
            { $project: { p_id: "$_id", _id: 0, name: "$productName", icon: 1, price: 1 } }
        ])
        .exec()
        .then((result) => {
            return res.render('products', {path: 'products', products: JSON.stringify(result),  pages: 0, current: 0});
        })
        .catch((err) => {throw err});

    }catch(err) {
        res.status(400).json({ status: "Failure", error: err.message });
    }
};