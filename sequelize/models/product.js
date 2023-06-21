const { DataTypes } = require("sequelize");
const sequelize = require('../database/connection');

const Product = sequelize.define("product", {

    productId: {    //PRODUCT ID
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    productName: {  //PRODUCT NAME
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Product name is required."
            },
            notEmpty: {
                msg: "Product name can't be empty."
            },
            len: {
                args: [3, "Infinity"],
                msg: "Product name must be longer than 2 characters."
            }
        }
    },

    productIcon: {  //PRODUCT ICON
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Product icon is required."
            },
            notEmpty: {
                msg: "Product icon can't be empty."
            },
            len: {
                args: [1, 1],
                msg: "Product could have only 1 icon."
            }
        }
    },

    productPrice: { //PRODUCT PRICE
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Product price is required."
            },
            min: {
                args: [0],
                msg: "Product price can't be negative."
            }
        }
    },

    productQuantity: {  //PRODUCT QUANTITY
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Product quantity is required."
            },
            min: {
                args: [0],
                msg: "Product quantity can't be negative number."
            }
        }
    },

    productDesc: {  //PRODUCT DESCRIPTION
        type: DataTypes.TEXT,
        defaultValue: 'No description found.'
    }

}, {
    initialAutoIncrement: 500
});

module.exports = Product;