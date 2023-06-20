const sequelize = require('../database/connection');

const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const OrderItem = require('./orderItems');

exports.syncTables = () => {

    User.hasMany(Order, { foreignKey: "userId" });
    Order.belongsTo(User,
        {
            foreignKey: "userId",
            onDelete: 'CASCADE'
        }
    );

    Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: 'CASCADE' });
    OrderItem.belongsTo(Order,
        {
            foreignKey: "orderId"
        }
    );

    Product.hasMany(OrderItem, { foreignKey: "productId" });
    OrderItem.belongsTo(Product,
        {
            foreignKey: "productId",
            onDelete: 'CASCADE'
        }
    );

    sequelize.sync({ alter: true });
};