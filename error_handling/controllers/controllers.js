const User = require('../model/user');
const MyError = require('../utils/error');

const signup = async (req, res) => {

    try {
        const { email, password } = req.body;   //get password and email

        const found = await User.findOne({ email: email.toLowerCase() });   //check if user already exists
        if (found) {
            throw new MyError(400, 'User already exists.'); //throw error if it does
        }

        const newUser = await User.create({ //else create User
            email: email.toLowerCase(),
            password: password
        });

        res.status(201).json({  //send the response
            "status": "Registered successfully",
            "user": newUser
        });
    }
    catch (err) {   //handle errors
        res.status(err.statusCode).send(err.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;   //get email and password

        const user = await User.findOne({ email: email.toLowerCase() });    //get user with entered email

        if (!(user && user.password === password)) // if user doesn't exists or password is wrong
            throw new MyError(400, 'Invalid Credentials');  //then throw error

        res.status(200).json({  //else send the response
            "status": "Logged in successfully",
            "message": `hello👋 ${user.email}`
        });

    }
    catch (err) {   //handle error
        res.status(err.statusCode).send(err.message);
    }
}

module.exports = { signup, login };