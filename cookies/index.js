const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname + '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));


const userCredentials = {
    "username": "harkhanishan",
    "password": '12345678'
}

app.get('/welcome', (req,res) => {
    let username = req.cookies.username;

    return res.render('welcome', {username});
});

app.get('/', (req, res)=>{
    let username = req.cookies['username'];

    return res.render('home', {username});
});

app.get('/login', (req, res)=>{
    let warn = req.query.msg ? true : false;

    if(warn){
        return res.render('login', {
            error: "Invalid credentials"
        });
    }
    else{
        res.render('login');
    }
});

app.post('/login', (req, res)=>{
    let {username, password} = req.body;

    if(username === userCredentials.username && password === userCredentials.password){
        res.cookie("username", username);
        return res.redirect('/');
    }
    else{
        return res.redirect('/login?msg=failed');
    }
});

app.get('/logout', (req, res)=>{
    res.clearCookie("username");
    return res.redirect('/login');
})
//normal cookie operations
/*
app.get('/', (req,res) => {
    res.send('<h1>Welcome to cookie world👋</h1>');
});

app.get('/setcookie', (req, res)=>{
    res.cookie('name', 'ishan harkhani');
    res.send('<h1>Cookie has been saved successfully.👋</h1>')
});

app.get('/getcookie', (req, res)=>{
    console.log(req.cookies.name);
    res.json({
        name: req.cookies.name
    });
});

app.get('/deletecookie', (req, res)=>{
    res.clearCookie("name");
    res.send('<h1>Cookie is deleted now.</h1>')
});
*/
app.listen(3000, (req, res)=>{
    console.log("Server started on port 3000...");
});