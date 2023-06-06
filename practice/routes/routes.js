const express = require('express');

const authController = require('../controller/authController');
const productController = require('../controller/productController');
const cartController = require('../controller/cartController');
const orderController = require('../controller/orderController');

const checkJWT = require('../middleware/checkJWT');

const Router = express.Router();

Router.route('/signup').get(authController.getSignUpPage).post(authController.register);
Router.route('/login').get(authController.getLoginPage).post(authController.login);

Router.route('/').get(checkJWT,productController.getHomePage);                     

Router.route('/getallproduct').get(productController.getAllProducts);
Router.route('/addproduct').post(productController.addProduct);

Router.route('/catalog').get(checkJWT, productController.getCatalog);

Router.route('/categories').get(checkJWT, productController.getCategories);
Router.route('/categories/:category').get(checkJWT, productController.getProductFromCategory);

Router.route('/products').get(checkJWT, productController.getProductsPage);
// Router.route('/products').get(productController.getProductsBasedOnPagination);

Router.route('/searchproducts').get(checkJWT, productController.getSearchedProduct);

Router.route('/product/:id').get(checkJWT, productController.getProductById);

Router.route('/getmycart').get(checkJWT, cartController.getMyCart);
Router.route('/addtocart').get(checkJWT, cartController.addToCart);

Router.route('/confirmorder').get(checkJWT, orderController.confirmOrder);

Router.route('/getorders').get(checkJWT, orderController.getMyOrders);

module.exports = Router;