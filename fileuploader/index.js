const express = require('express');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './assests',
    filename:  function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('uploadedimage');

function checkFileType(file, cb){
    const fileTypes = '.jpeg.jpg.png.gif';

    const extname = fileTypes.includes(path.extname(file.originalname).toLowerCase());

    const mimetype = fileTypes.includes(file.mimetype.split('/')[1]);

    if(extname && mimetype){
        return cb(null, true);
    }
    else{
        cb("Error: Only image files are allowed");
    }

}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assests')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)  => {
    res.render('home',{
        msg: '',
        filepath : ''
    });
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('home', {
                msg: err,
                filepath: ''
            })
        }
        else{
            if(req.file == undefined){
                res.render('home', {
                    msg: 'Error: No files selected',
                    filepath: ''
                })
            }
            else{
                res.render('home', {
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