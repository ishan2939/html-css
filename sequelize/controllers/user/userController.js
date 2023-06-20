const sequelize = require('../../database/connection');
const User = require('../../models/user');
const statusCodes = require('../../constants/constant');

exports.addUser = async (req, res) => {
    try {

        const { userId, ...data } = req.body;
        const newUser = await User.create(data);

        return res.status(statusCodes.SUCCESS_CREATED["code"]).json({ status: "Suceess", message: "User created successfully.", data: newUser });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {

        const userId = req.params.id;
        const foundUser = await User.findByPk(userId, { attributes: ["userId", [sequelize.literal('CONCAT(fname, " ", lname)'), "name"], 'email', "gender", "birthDate", "address"] });
        if (foundUser)
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Suceess", message: "User found successfully.", data: foundUser });
        else
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "No such user exists in database.", data: foundUser });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.findAll({ attributes: ["userId", [sequelize.literal('CONCAT(fname, " ", lname)'), "name"], 'email', "gender", "birthDate", "address"] });
        if (users.length != 0)
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Suceess", message: "Users found successfully.", data: users });
        else
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "There are no users in database." });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};