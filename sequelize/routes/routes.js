const express = require('express');

const userController = require('../controllers/user/userController');
const productController = require('../controllers/product/productController');
const orderController = require('../controllers/order/orderController');

const router =  express.Router();

router.route('/user/createUser').post(userController.addUser);
router.route('/user/getusers').get(userController.getAllUsers);
router.route('/user/getuser/:id').get(userController.getUser);

router.route('/product/addproduct').post(productController.addProduct);
router.route('/product/getproducts').get(productController.getAllProduct);
router.route('/product/getproduct/:id').get(productController.getProduct);

router.route('/order/addproduct').post(orderController.addProductToOrder);
router.route('/order/getorders').get(orderController.getAllOrders);
router.route('/order/getorder/:id').get(orderController.getOrder);

module.exports = router;