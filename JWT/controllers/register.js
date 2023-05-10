const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, 'config', '.env')});

exports.register = async (req, res) => {
    //console.log(process.env.SECRET_KEY);

    try{
        const {name, email, password, role} = req.body;

        if(!(name && email && password && role)){
            return res.status(400).send("Not sufficient data provided.");
        }
        
        const ifUserExists = await User.findOne({ email : email.toLowerCase() });
        if(ifUserExists){
            return res.status(409).send("User already exists.");
        }

        encryptedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            fullName: name,
            email:  email.toLowerCase(),
            password: encryptedPassword,
            role: role
        });

        const token = jwt.sign(
            {user_id : user._id, email},
            process.env.SECRET_KEY,
            {
                expiresIn: "2h"
            }
        )

        user.token = token;

        res.status(201).json({
            "status": "Registered successfully",    
            "user" : user
        });
    }
    catch(err){
        console.log(err);
    }
}   