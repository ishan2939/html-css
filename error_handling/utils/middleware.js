const MyError = require('../utils/error');

const errorHandler2 = (fuc) => async (req, res, next) => {
    try {
        await fuc();    //wait untill fuc executes
    }
    catch (err) {   //if fuc throws error then handle it
        next(err);
    }
}


const showError = (err, req, res, next) => {    //just very simple function to send error
    res.status(404).send(err.message);
}


const validateData = async (req, res, next) => {    //function to validate data

    try {
        let { email, password } = req.body; //get email password

        if (!(email && password)) { //if any one of them is not available
            throw new MyError(400, 'Not sufficient Data provided.');    //throw error
        }

        email = email.trim();
        password = password.trim(); //trim them just in case

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) { //check if email is valid
            throw new MyError(400, 'Invalid Email');    //if not then throw error
        }

        if (!(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/.test(password))) {  //check if password is valid
            throw new MyError(400, 'Invalid password', 
            ['Password must contain atleast 8 characters',
                'It also must have atleast 1 special character, 1 uppercase letter, 1 lowercase letter and 1 number']); //if not then throw error
        }

        next(); //if everything is valid then move to next

    }
    catch (err) {   //handle error
        res.status(err.statusCode).json({error: err.message, extra_details: err.extraDetails});
    }

}

module.exports = { errorHandler2, showError, validateData };