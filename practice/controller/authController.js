const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname,'..' ,'config', '.env')});

const User = require('../models/user');


exports.getSignUpPage = async (req, res) => {
    try{
        return res.render('signup', {error: ''});

    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getLoginPage = async (req, res) => {
    try{
        return res.render('login', {error: ''});

    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.register = async (req, res) => {

    try{
        const {fname, username, email, password} = req.body; //get user details

        if(!(fname && username && email && password)){   //apply validation
            return res.render('signup', {error: 'Not sufficient data provided.'});   //show error
        }
        
        const ifUserExists = await User.findOne({ email : email.toLowerCase() });   //get user with entered email

        if(ifUserExists){   //if user does exists
            return res.render('signup', {error: 'User alredy exists.'});   //show error
        }

        //if user doesn't exists
        encryptedPassword = await bcrypt.hash(password,10); //encrypt password

        const user = await User.create({    //create user
            fname: fname,
            lname: req.body.lname,
            username: username,
            email:  email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign( //generate token
            {user_id : user._id, email},
            process.env.SECRET_KEY,
            {
                expiresIn: "2h"
            }
        )

        user.token = token; //add token to user

        alert('User registered successfully.');

        return res.redirect('/login');
    }
    catch(err){ //handle error
        console.log(err);
        return res.status(400).send(err.message);
    }
};

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;   //get email password

        if (!(email && password)) { //if they don't exist
            return res.status(400).send("Not sufficient data provided");    //throw error
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });  //get user with entered email

        if (userExists) {   //if user exists

            const isPasswordCorrect = await bcrypt.compare(password, userExists.password);  //compare passwords

            if(isPasswordCorrect){  //if they match

                const token = jwt.sign( //generate token
                    { user_id: userExists._id, email },
                    process.env.SECRET_KEY,
                    { expiresIn: "2d" }
                )
    
                userExists.token = token;   //add it to user
    
                const cookie = {
                    token: token
                };

                res.cookie("token", cookie, {
                    httpOnly: true,
                    expires: new Date(Date.now() + (2*24*60*60*1000))
                });
                return res.redirect('/');
            }
            return res.status(400).send("Invalid credentials"); //if password is incorrect then show error
        }
        return res.status(404).send("No such user exists.");    //if user doesn't exists then show error
    }
    catch(err){ //handle error
        console.log(err);
        return res.status(400).send(err.message);
    }
};

exports.logout = async (req, res) => {

}