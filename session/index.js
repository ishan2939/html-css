const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config({path: path.join(__dirname, 'config', '.env')});
const app = express();

app.use(express());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use(helmet());

app.use(sessions({
    secret: process.env.SECRET_KEY,
    saveUnitialized: true,
    cookie: {maxAge: 1000*60*60*24},
    resave: false
}));

const username = 'harkhanishan';
const password = '12345';

app.get('/', (req,res) => {
    let session = req.session;
    if(session.userid){
        res.status(200).send(`<h1>Hey there, welcome <a href=\'/logout'>click to logout</a></h1>`);
    }
    else{
        res.status(200).sendFile('views/index.html',{root:__dirname});
    }
});

app.post('/user', (req,res) => {
    if(req.body.username === username && req.body.password === password){
        let session=req.session;
        session.userid=req.body.username;
        res.status(200).send(`<h1>Hey there, welcome <a href=\'/logout'>click to logout</a></h1>`);
    }
    else{
        res.status(401).send("Invalid credentials");
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(3000, (req,res)=>{
    console.log("Server started on port 3000...");
});