const { DataTypes } = require("sequelize");
const sequelize  = require('../database/connection');

const Order = sequelize.define('order', {

    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    orderStatus: {
        type: DataTypes.ENUM('confirmed', 'shipped', 'out for delivery', 'delivered', 'cancelled'),
        allowNull: false
    },

    expectedDeliveryDate: {
        type: DataTypes.DATE
    }

},{
    initialAutoIncrement: 1000
});

module.exports = Order;