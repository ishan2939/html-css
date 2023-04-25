const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {

    try{
        const {name, email, password} = req.body;

        if(!(name && email && password)){
            return res.status(400).send("Not sufficient data provided.");
        }
        
        const ifUserExists = await User.findOne({ email : email.toLowerCase() });
        if(ifUserExists){
            return res.status(409).send("User already exists.");
        }

        encryptedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name: name,
            email:  email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            {user_id : user._id, email},
            'JSJSJS',
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