const User = require('../../models/user');
const Product = require('../../models/product');
const Order = require('../../models/order');
const OrderItem = require('../../models/orderItems');
const statusCodes = require('../../constants/constant');

exports.addProductToOrder = async (req, res) => {

    try {

        const { userId, productQuantity, productId } = req.body;
        const statuses = ['confirmed', 'shipped', 'out for delivery', 'delivered', 'cancelled'];
        let expectedDate = null;

        const userExists = await User.findByPk(userId);

        if (!userExists)
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "No such user exists." });

        const foundProduct = await Product.findByPk(productId);

        if (!foundProduct)
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "No such product exists." });

        const newQuantity = foundProduct.productQuantity - productQuantity;

        if (productQuantity < 0 || newQuantity < 0)
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "Invalid product quantity." });
        
        let orderExists;

        if(req.query.orderId)
            orderExists = await Order.findOne({ where: { orderId: req.query.orderId } });    
        else
            orderExists = await Order.findOne({ where: { userId: userId } });

        if (!orderExists || orderExists.orderStatus=='delivered' || orderExists.orderStatus=='cancelled' || orderExists.userId!=userId) {
            const status = statuses[Math.trunc(Math.random() * 4)];
            console.log(status);

            if (status != 'cancelled') {
                const day = Math.trunc(Math.random() * 15);

                console.log(day);
                expectedDate = new Date();
                expectedDate.setDate(expectedDate.getDate() + day);
            }

            const obj1 = {
                orderStatus: status,
                expectedDeliveryDate: expectedDate,
                userId: userId
            };

            const newOrder = await Order.create(obj1);

            const obj2 = {
                productQuantity: productQuantity,
                orderId: newOrder.orderId,
                productId: productId
            }

            const newOrderItem = await OrderItem.create(obj2);
        }
        else {

            const productExists = await OrderItem.findOne({ where: { productId: productId } });

            if(!productExists){

                const obj = {
                    productQuantity: productQuantity,
                    orderId: orderExists.orderId,
                    productId: productId
                }
                
                const newOrderItem = await OrderItem.create(obj);

            }else{

                quantity = productExists.productQuantity + productQuantity;

                await OrderItem.update({productQuantity: quantity}, {where: {productId: productId}});
            }

        }

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Product added successfully." });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};

exports.getOrder = async (req, res) => {

    try {

        const orderId = req.params.id;
        const foundOrder = await Order.findByPk(orderId);

        if (foundOrder)
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Order found successfully.", data: foundOrder });

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "No such order exists in database." });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};

exports.getAllOrders = async (req, res) => {

    try {

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};