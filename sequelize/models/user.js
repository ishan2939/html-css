const { Sequelize, DataTypes } = require("sequelize");

const User = Sequelize.define("user", {
    u_id: {
        type:  DataTypes.INTEGER,
        primaryKey: true,
        AutoIncrement: true
    },

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

    fullName: {
        type: DataTypes.VIRTUAL,
        get(){
            return this.getDataValue('fullName');
        },
        set(){
            const fname = this.getDataValue('fname');
            const lname = this.getDataValue('lname');

            const fullName = fname[0].toUpperCase() + fname.slice(1) + ' ' +
                lname[0].toUpperCase() + lname.slice(1);
            
            this.setDataValue('fullName', fullName);
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
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
    }
});
