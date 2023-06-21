const { DataTypes } = require("sequelize");
const sequelize  = require('../database/connection');

const Order = sequelize.define('order', {

    orderId: {  //ORDER ID
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    orderStatus: {  //ORDER STATUS
        type: DataTypes.ENUM('confirmed', 'shipped', 'out for delivery', 'delivered', 'cancelled'),
        allowNull: false
    },

    expectedDeliveryDate: { //EXPECTED DELIVERY DATE
        type: DataTypes.DATE
    }

},{
    initialAutoIncrement: 1000
});

module.exports = Order;