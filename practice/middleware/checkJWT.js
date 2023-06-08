const jwt = require('jsonwebtoken');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, '..', 'config', '.env')});

exports.verifyToEnter = (req, res, next) => {

    const token = (req.cookies['token'])?req.cookies['token'].token:undefined;   //get token

    if(!token){ //if it doesn't exists then throw error
        return res.redirect('/signup');
        //return res.status(403).send("A token is required for authentication.");
    }

    try{    //if it does exists
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  //verify the token
        req.user = decoded; //add token to req to access it in next middleware

    }
    catch(err){ //handle error
        console.log(err.message);
        return res.redirect('/signup');
    }
    
    return next();
};

exports.verifyToLeave = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || (req.cookies['token'])?req.cookies['token'].token:undefined;   //get token

    if(token){ //if it doesn't exists then throw error
        return res.redirect('/');
        //return res.status(403).send("A token is required for authentication.");
    }
    return next();
};