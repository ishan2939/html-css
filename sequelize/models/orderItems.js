const { DataTypes } = require("sequelize");
const sequelize = require('../database/connection');

const OrderItem = sequelize.define("orderItem", {

    orderItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }

}, {
    timestamps: false,
    intialAutoIncrement: 1500
});

module.exports = OrderItem;