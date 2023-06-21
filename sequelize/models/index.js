const sequelize = require('../database/connection');

const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const OrderItem = require('./orderItems');

exports.syncTables = () => {    //sync tables

    User.hasMany(Order, { foreignKey: "userId", onDelete: 'CASCADE' });
    Order.belongsTo(User,
        {
            foreignKey: "userId"
        }
    );

    Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: 'CASCADE' });
    OrderItem.belongsTo(Order,
        {
            foreignKey: "orderId"
        }
    );

    Product.hasMany(OrderItem, { foreignKey: "productId", onDelete: 'CASCADE' });
    OrderItem.belongsTo(Product,
        {
            foreignKey: "productId"
        }
    );

    sequelize.sync({ alter: true });    //allow alter
};