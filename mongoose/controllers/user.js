const User = require('../models/user');

exports.addUser = async (req, res) => {

    try {

        const { username, firstname, lastname } = req.body;

        if(!(username && firstname)){
            return res.status(400).send("Not sufficient data provided");
        }

        const userExists = await User.findOne({ userName: username });

        if (userExists) {
            return res.status(400).send("User already exists");
        }

        const user = await User.create({
            firstName: firstname,
            lastName: lastname,
            userName: username
        });

        res.status(200).json({
            status: "User created successfully.",
            user: user
        });
    }
    catch(err){
        res.status(400).send(err.message);
    }

};