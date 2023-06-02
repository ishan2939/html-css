const express = require('express');
const productController = require('../controller/controller');

const Router = express.Router();

Router.route('/product').get(productController.getAllProducts);
Router.route('/addproduct').post(productController.addProduct);

Router.route('/product/:name').get(productController.getProductByName);
Router.route('/catalog').get(productController.getCatalog);
Router.route('/categories').get(productController.getCategories);
Router.route('/categories/:category').get(productController.getProductFromCategory);

module.exports = Router;