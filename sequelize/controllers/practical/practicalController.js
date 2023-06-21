const User = require('../../models/user');
const Product = require('../../models/product');
const statusCodes = require('../../constants/constant');
const Order = require('../../models/order');
const OrderItem = require('../../models/orderItems');
const sequelize = require('../../database/connection');
const { Op, QueryTypes, NOW, Sequelize } = require('sequelize');

exports.allorders = async (req, res) => {   //get all orders with Customer name, Product names, Order Date, Expected delivery days 

    try {

        const orders = await Order.findAll({
            attributes: [
                ["createdAt", "orderDate"],
                [
                    sequelize.fn("GREATEST", sequelize.fn("DATEDIFF", sequelize.col("expectedDeliveryDate"), sequelize.fn("NOW")), 0), 
                    "expectedDeliveryDays"
                ],
                [sequelize.literal('CONCAT(user.fname, " ", user.lname)'), "customerName"]
            ],
            include: [
                { model: User, attributes: [] },
                {
                    model: OrderItem, attributes: ['orderId'],
                    include: { model: Product, attributes: ['productName', 'productIcon'] }
                }
            ]
        });

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "All orders found.", data: orders });
    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};

exports.undeliveredorders = async (req, res) => {   //get undelivered orders

    try {

        const undeliveredOrders = await Order.findAll(
            {
                where: { orderStatus: { [Op.not]: 'delivered' } },
                attributes: ['orderId', 'orderStatus']
            }
        );

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "All undelivered orders.", data: undeliveredOrders });
    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};

exports.mostrecentorders = async (req, res) => {    //get 5 most recent orders

    try {

        const mostRecentOrders = await Order.findAll(
            {
                attributes: ['orderId', ['createdAt', 'orderDate']],
                order: [['createdAt', 'DESC']],
                limit: 5
            }
        );

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "5 most recent orders.", data: mostRecentOrders });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};

exports.activeusers = async (req, res) => { //get most active users(users with most number of orders)

    try {

        const activeUsers = await Order.findAll(
            {
                attributes: [
                    'userId',
                    [sequelize.literal('CONCAT(user.fname, " ", user.lname)'), "userName"],
                    [sequelize.fn("COUNT", sequelize.col('order.userId')), 'numberOfOrders']
                ],
                group: ['userId'], order: [['numberOfOrders', 'DESC']],
                include: { model: User, attributes: [] }
            }
        );

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "5 most active users.", data: activeUsers });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};

exports.inactiveusers = async (req, res) => {   //inactive users (users with 0 orders)

    try {

        const inactiveUsers = await User.findAll(
            {
                attributes: ['userId', [sequelize.literal('CONCAT(fname, " ", lname)'), "userName"]],
                where: { userId: { [Op.notIn]: [sequelize.literal('SELECT userId FROM orders')] } }
            }
        );

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "All inactive users.", data: inactiveUsers });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};

exports.mostpurchasedproducts = async (req, res) => {   //most purchase product (quantity wise)

    try {

        const mostpurchasedproducts = await OrderItem.findAll(
            {
                attributes: ['productId', [sequelize.fn("SUM", sequelize.col('productQuantity')), "totalQuantityOrdered"]],
                group: ['productId'],
                order: [['totalQuantityOrdered', 'DESC']],
                limit: 5
            }
        );

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Most purchased products.", data: mostpurchasedproducts });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};

exports.expensivecheapestorder = async (req, res) => {  //get most and least expensive order

    try {

        const expensivecheapestorder = await sequelize.query(`(
            SELECT
            orderItems.orderId,
            SUM(
                orderItems.productQuantity * products.productPrice
            ) as total
            FROM
                orderItems
                INNER JOIN products ON orderItems.productId = products.productId
            GROUP BY
                orderId
            ORDER BY
                total DESC
            LIMIT
                1)
            UNION
            (SELECT
                orderItems.orderId,
                SUM(
                    orderItems.productQuantity * products.productPrice
                ) as total
            FROM
                orderItems
                INNER JOIN products ON orderItems.productId = products.productId
            GROUP BY
                orderId
            ORDER BY
                total ASC
            LIMIT
                1
            )`, { type: QueryTypes.SELECT });

        return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "Most expensive and cheapest orders.", data: expensivecheapestorder });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};