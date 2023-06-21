const { DataTypes } = require("sequelize");
const sequelize = require('../database/connection');

const OrderItem = sequelize.define("orderItem", {

    orderItemId: {  //ORDER ITEM ID
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    productQuantity: {  //PRODUCT QUANTITY
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "Product quantity is invalid."
            }
        }
    }

}, {
    timestamps: false,
    intialAutoIncrement: 1500
});

module.exports = OrderItem;