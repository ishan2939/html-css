const express = require('express');

const userController = require('../controllers/user/userController');
const productController = require('../controllers/product/productController');
const orderController = require('../controllers/order/orderController');
const practicalController = require('../controllers/practical/practicalController');

const router =  express.Router();

//user routes
router.route('/user/createUser').post(userController.addUser);
router.route('/user/getusers').get(userController.getAllUsers);
router.route('/user/getuser/:id').get(userController.getUser);

//product routes
router.route('/product/addproduct').post(productController.addProduct);
router.route('/product/getproducts').get(productController.getAllProduct);
router.route('/product/getproduct/:id').get(productController.getProduct);

//order routes
router.route('/order/addproduct').post(orderController.addProductToOrder);
router.route('/order/getorders').get(orderController.getAllOrders);
router.route('/order/getorder/:id').get(orderController.getOrder);

//practical routes
router.route('/practical/allorders').get(practicalController.allorders);
router.route('/practical/undeliveredorders').get(practicalController.undeliveredorders);
router.route('/practical/mostrecentorders').get(practicalController.mostrecentorders);
router.route('/practical/activeusers').get(practicalController.activeusers);
router.route('/practical/inactiveusers').get(practicalController.inactiveusers);
router.route('/practical/mostpurchasedproducts').get(practicalController.mostpurchasedproducts);
router.route('/practical/expensivecheapestorder').get(practicalController.expensivecheapestorder);

module.exports = router;