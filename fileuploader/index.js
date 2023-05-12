const express = require('express');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({

    destination: './assests',   //destination to store images
    filename: function (req, file, cb) { //filename that we want to keep
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({

    storage: storage,   //handle storage part
    limits: { fileSize: 1000000 }, //limit of file
    fileFilter: function (req, file, cb) {    //file filter validations
        checkFileType(file, cb);
    }

}).single('uploadedimage'); //only one file is allowed

function checkFileType(file, cb) {

    const fileTypes = '.jpeg.jpg.png.gif'; //allowed formats

    const extname = fileTypes.includes(path.extname(file.originalname).toLowerCase()); //extension name

    const mimetype = fileTypes.includes(file.mimetype.split('/')[1]);   //mime type

    if (extname && mimetype) { //if they follow validations
        return cb(null, true); //pass error as null and accept file by passing true
    }
    else {
        cb("Error: Only image files are allowed"); //else pass error
    }

}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assests')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.render('home', { //render home page
        msg: '',
        filepath: ''
    });

});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => { //call upload

        if (err) {  //if error exists
            res.render('home', {    //render home page with error
                msg: err,
                filepath: ''
            })
        }
        else {

            if (req.file == undefined) {    //if file doesn't exists
                res.render('home', {    //render home page with error
                    msg: 'Error: No files selected',
                    filepath: ''
                })
            }
            else {  //else if everything is fine
                res.render('home', {    //render home page with message
                    msg: 'File successfully uploaded.',
                    filepath: `${req.file.filename}`
                })
            }

        }

    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000...");
});