const sequelize = require('../../database/connection');
const User = require('../../models/user');
const statusCodes = require('../../constants/constant');

exports.addUser = async (req, res) => { //add user

    try {

        const { userId, ...data } = req.body;   //extract userId(just in case if someone tries to add userId manually)
        const newUser = await User.create(data);    //create user

        return res.status(statusCodes.SUCCESS_CREATED["code"]).json({ status: "Suceess", message: "User created successfully.", data: newUser });   //send response

    } catch (err) { //if error occurs
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message }); //send error
    }

};

exports.getUser = async (req, res) => { //get user by userId

    try {

        const userId = req.params.id;
        const foundUser = await User.findByPk(userId, { 
            attributes: [
                "userId", 
                [sequelize.literal('CONCAT(fname, " ", lname)'), "name"], 
                'email', 
                "gender", 
                "birthDate", 
                "address"
            ] 
        });

        if (foundUser)  //if user found then send info
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Suceess", message: "User found successfully.", data: foundUser });
        else    //if not then send message
            return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: "No such user exists in database.", data: foundUser });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.findAll({ 
            attributes: [
                "userId", 
                [sequelize.literal('CONCAT(fname, " ", lname)'), "name"], 
                'email', 
                "gender", 
                "birthDate",
                "address"
            ] 
        });

        if (users.length != 0)  //if there are users in database then send them
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Suceess", message: "Users found successfully.", data: users });
        else    //if there are no users in database then send error
            return res.status(statusCodes.ERROR_OK["code"]).json({ status: "Success", message: "There are no users in database." });

    } catch (err) {
        return res.status(statusCodes.ERROR_BAD_REQUEST["code"]).json({ status: "Failure", message: err.message });
    }

};