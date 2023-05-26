const express = require('express');
const productController = require('../controller/controller');

const Router = express.Router();

Router.route('/product').get(productController.getAllProducts);
Router.route('/addproduct').post(productController.addProduct);
Router.route('/product/:id').get(productController.getProductById);

module.exports = Router;