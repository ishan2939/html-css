const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, 'config', '.env')});

const User = require('../model/user');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Not sufficient data provided");
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });

        if (userExists) {
            const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
            if(isPasswordCorrect){

                const token = jwt.sign(
                    { user_id: userExists._id, email },
                    process.env.SECRET_KEY,
                    { expiresIn: "2d" }
                )
    
                userExists.token = token;
    
                return res.status(200).json({
                    "status": "Logged in successfully",
                    "user": userExists
                });
            }
            return res.status(400).send("Invalid credentials");
        }
        return res.status(404).send("No such user exists.");
    }
    catch(err){
        console.log(err);
    }
}