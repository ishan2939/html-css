const express = require('express');

const authController = require('../controller/authController');
const productController = require('../controller/productController');
const cartController = require('../controller/cartController');
const orderController = require('../controller/orderController');

const checkJWT = require('../middleware/checkJWT');

const Router = express.Router();

Router.route('/signup').get(checkJWT.verifyToLeave, authController.getSignUpPage).post(checkJWT.verifyToLeave, authController.register);
Router.route('/login').get(checkJWT.verifyToLeave, authController.getLoginPage).post( checkJWT.verifyToLeave,authController.login);

Router.route('/').get(checkJWT.verifyToEnter,productController.getHomePage);                     

Router.route('/getallproduct').get(productController.getAllProducts);
Router.route('/addproduct').post(productController.addProduct);

Router.route('/catalog').get(checkJWT.verifyToEnter, productController.getCatalog);

Router.route('/categories').get(checkJWT.verifyToEnter, productController.getCategories);
Router.route('/categories/:category').get(checkJWT.verifyToEnter, productController.getProductFromCategory);

Router.route('/products').get(checkJWT.verifyToEnter, productController.getProductsPage);
// Router.route('/products').get(productController.getProductsBasedOnPagination);

Router.route('/searchproducts').get(checkJWT.verifyToEnter, productController.getSearchedProduct);

Router.route('/product/:id').get(checkJWT.verifyToEnter, productController.getProductById);

Router.route('/getmycart').get(checkJWT.verifyToEnter, cartController.getMyCart);
Router.route('/addtocart').get(checkJWT.verifyToEnter, cartController.addToCart);

Router.route('/confirmorder').get(checkJWT.verifyToEnter, orderController.confirmOrder);

Router.route('/getorders').get(checkJWT.verifyToEnter, orderController.getMyOrders);

Router.route('/logout').get(checkJWT.verifyToEnter, authController.logout);

module.exports = Router;