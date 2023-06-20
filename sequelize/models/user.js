const { DataTypes } = require("sequelize");
const sequelize  = require('../database/connection');

const User = sequelize.define("user", {

    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notNull: {
                msg: "First name is required."
            },
            notEmpty: {
                msg: "First name can't be empty."
            }
        }
    },

    lname: {
        type: DataTypes.STRING(20),
        defaultValue: ""
    },

    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.getDataValue('fullName');
        },
        set() {
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
        unique: {
            msg: "Email already exists."
        },
        validate: {
            notNull: {
                msg: "Email is required."
            },
            isEmail: {
                msg: "Invalid email."
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required."
            },
            len: {
                args: [8, "Infinity"],
                msg: "Password must be atleast 8 character long."
            }
        },
    },

    gender: {
        type: DataTypes.STRING,
        defaultValue: "male",
        validate: {
            isIn: {
                args: [["male", "female"]],
                msg: "Entered value of gender is not valid."
            }
        },
    },

    birthDate: {
        type: DataTypes.DATE,
        validate: {
            isDate: {
                msg: "Invalid date."
            },
            isBefore: {
                args: new Date(new Date().setFullYear(new Date().getFullYear() - 10)).toLocaleDateString(),
                msg: "User must be atleast 10 years old."
            }
        },
    },

    address: {
        type: DataTypes.TEXT
    }

});

module.exports = User;
