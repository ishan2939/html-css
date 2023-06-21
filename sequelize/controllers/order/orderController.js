const User = require('../../models/user');
const Product = require('../../models/product');
const Order = require('../../models/order');
const OrderItem = require('../../models/orderItems');
const statusCodes = require('../../constants/constant');
const sequelize = require('../../database/connection');

exports.addProductToOrder = async (req, res) => {   //add product to order

    try {

        const { userId, productQuantity, productId } = req.body;    //extract details from req.body

        const statuses = ['confirmed', 'shipped', 'out for delivery', 'delivered', 'cancelled'];
        let expectedDate = null;

        const userExists = await User.findByPk(userId); //find if user that is trying to add product exists

        if (!userExists)    //if it does not then send error
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "No such user exists." });

        const foundProduct = await Product.findByPk(productId); //check if product that user is trying to add to order exists

        if (!foundProduct)  //if not then send error
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "No such product exists." });

        const newQuantity = foundProduct.productQuantity - productQuantity; //get new quantity

        if (productQuantity < 0 || newQuantity < 0) //if product quantity is 0 or new quantity is not valid then send error
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "Invalid product quantity." });

        let orderExists;

        if (req.query.orderId)  //if user is trying to add product to a specific order
            orderExists = await Order.findAll({ where: { orderId: req.query.orderId } });   //thn find order with that order id
        else    //else
            orderExists = await Order.findAll({ where: { userId: userId } });   //find order based on userId

        //out of all orders that exists for a perticular user choose the latest one
        orderExists = orderExists[orderExists.length-1];


        /*if order that user is trying to add to
            does not exists,
            is already delivered or cancelled,
            does not belong to that user
            then create a new order
        */
        if (!orderExists || orderExists.orderStatus == 'delivered' || orderExists.orderStatus == 'cancelled' || orderExists.userId != userId) {

            //choose a random status
            const status = statuses[Math.trunc(Math.random() * 4)];

            //if that randomly choosen status is not cancelled or delivered
            if (status != 'cancelled' || status != 'delivered') {    
                //then pick a random expected date(because ofc if order is cancelled/delivered then it can't have expected date)
                const day = Math.trunc(Math.random() * 15);

                expectedDate = new Date();
                expectedDate.setDate(expectedDate.getDate() + day);
            }

            const obj1 = {
                orderStatus: status,
                expectedDeliveryDate: expectedDate,
                userId: userId
            };

            const newOrder = await Order.create(obj1);  //create new order

            const obj2 = {
                productQuantity: productQuantity,
                orderId: newOrder.orderId,
                productId: productId
            };

            const newOrderItem = await OrderItem.create(obj2);  //create orderItem
        }
        else {  //else

            //find if product already exists in that order
            const productExists = await OrderItem.findOne({ where: { productId: productId, orderId: orderExists.orderId } });

            //if it does not exists in order already
            if (!productExists) {

                const obj = {
                    productQuantity: productQuantity,
                    orderId: orderExists.orderId,
                    productId: productId
                }

                const newOrderItem = await OrderItem.create(obj);   //create a new order item

            } else {    //else add the new quantity to the quantity of product in that order 

                quantity = productExists.productQuantity + productQuantity;

                await OrderItem.update({ productQuantity: quantity }, { where: { productId: productId } });
            }

        }

        //send respose
        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Product added successfully." });

    } catch (err) { //if error
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message }); //send error
    }

};

exports.getOrder = async (req, res) => {    //get order by id

    try {

        const orderId = req.params.id;
        const foundOrder = await Order.findByPk(orderId,
            {
                attributes: {
                    exclude: ['createdAt','updatedAt'],
                    include: [[sequelize.literal('CONCAT(user.fname, " " , user.lname)'), "userName"], ["createdAt", "orderDate"]]
                },
                include: [
                    { model: User, attributes: [] },
                    {
                        model: OrderItem, attributes: {
                            exclude: ['productId', "orderId", "orderItemId"]
                        },
                        include: { model: Product, attributes: ['productId', 'productName', 'productIcon', "productPrice"] }
                    }
                ]
            }
        );

        if (foundOrder) //if order found
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Order found successfully.", data: foundOrder });    //then send it

        //else send message
        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "No such order exists in database." });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};

exports.getAllOrders = async (req, res) => {    //get all orders in database

    try {

        const orders = await Order.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt'],
                include: [[sequelize.literal('CONCAT(user.fname, " ", user.lname)'), "userName"], ["createdAt", "orderDate"]]
            },
            include: [
                { model: User, attributes: [] },
                { 
                    model: OrderItem, attributes: ["productQuantity"],
                    include: {model: Product, attributes: ["productId", "productName", "productIcon", "productPrice"]}
                }
            ]
        });

        if (orders.length != 0) //if no orders exists in database
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Orders found successfully.", data: orders });   //then send it

        //else send message
        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "There are no orders in database." });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};