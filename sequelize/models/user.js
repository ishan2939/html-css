const { Sequelize, DataTypes } = require("sequelize");

const User = Sequelize.define("user", {

    fname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lname: {
        type: DataTypes.STRING(20),
        defaultValue: "",
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, "Infinity"],
        },
    },
    gender: {
        type: DataTypes.STRING,
        defaultValue: "male",
        validate: {
            isIn: [["male", "female"]],
        },
    },
    b_date: {
        type: DataTypes.DATE,
        validate: {},
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
    
});
