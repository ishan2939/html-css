const express = require('express');
const joi = require('joi');

const showError = require('./controllers/errorhandler');
const foo = require('./middleware');
const errorHandler2 = require('./utils/errohandler2');
const app = express();

app.use(express.json());

const getVariable = () => {
    return undefined;   
};


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
        //res.send("hello");
        next(err);
    }
});

app.use('/', showError);
//app.use(foo);


/*second way
app.get('/', errorHandler2 (async (req,res) => {
    let user = getVariable();
    if(user){
        res.send(user);
    }
    else{
        throw new Error("user not found.")
    }
}));

app.use('/', showError);
*/

// const schema = joi.object({
//     userId: joi.number().required()
// });

// app.post('/', errorHandler2(async (req, res) => {
//     const {error, value} = schema.validate({});

//     if(error){
//         throw new Error("UserID required");
//     }
// }));

// app.use('/', showError);

app.listen(3000, () => {
    console.log("Server started at port 3000...");
});