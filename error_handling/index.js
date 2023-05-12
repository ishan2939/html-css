const express = require('express');
const joi = require('joi');

require('./config/database').connect_to_DB();
const controller = require('./controllers/controllers');
const middleware = require('./utils/middleware');

const app = express();

app.use(express.json());

/*const getVariable = () => {
    return undefined;   
};*/


//simple example (normal one)
/*
app.get('/', (req, res, next) => {
    let user = getVariable();
    try {
        if (user) {
            res.send(user);
        }
        else {
            throw new Error("User not found.");
        }
    }
    catch (err) {
        next(err);
    }
});

app.use('/', middleware.showError);
*/



//second way(using middleware)
/*
app.get('/', errorHandler2 (async (req,res) => {
    let user = getVariable();
    if(user){
        res.send(user);
    }
    else{
        throw new Error("user not found.")
    }
}));

app.use('/', middleware.showError);
*/


//third way(using joi)
/* 
const schema = joi.object({
    userId: joi.number().required()
});

app.post('/', errorHandler2(async (req, res) => {
    const {error, value} = schema.validate({});

    if(error){
        throw new Error("UserID required");
    }
}));

app.use('/', middleware.showError);
*/


//fourth way (manually handeled signup/login)
app.post('/signup', middleware.validateData, controller.signup);
app.post('/login', middleware.validateData, controller.login);

app.listen(3000, () => {
    console.log("Server started at port 3000...");
});