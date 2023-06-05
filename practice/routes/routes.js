const express = require('express');
const authController = require('../controller/authController');
const productController = require('../controller/productController');

const Router = express.Router();

Router.route('/signup').get(authController.getSignUpPage);
Router.route('/login').get(authController.getLoginPage);

Router.route('/registeruser').post(authController.register);                     

Router.route('/home').get(productController.getHomePage);                     

Router.route('/getallproduct').get(productController.getAllProducts);
Router.route('/addproduct').post(productController.addProduct);

Router.route('/catalog').get(productController.getCatalog);

Router.route('/categories').get(productController.getCategories);
Router.route('/categories/:category').get(productController.getProductFromCategory);

Router.route('/products').get(productController.getProductsPage);
Router.route('/products/:page').get(productController.getProductsBasedOnPagination);

Router.route('/searchproducts/:name').get(productController.getSearchedProduct);

Router.route('/product/:id').get(productController.getProductById);

module.exports = Router;