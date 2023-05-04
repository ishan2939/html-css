const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true }));
  
app.get('/', (req, res) => {
    res.render('index',{
        addedTime: "",
        convertedTime: "",
        timeZone: ""
    });
});

app.post('/convert', (req, res) => {
    let today = new Date();
    let time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), req.body.time.split(':')[0], req.body.time.split(':')[1]);
    let final = time.toLocaleString('en-US', { timeZone: req.body.zone });
    let x = new Date(final);
    res.render('index', {
        addedTime: time.toLocaleString('en-US'),
        convertedTime: final,
        timeZone: req.body.zone
    });
});

app.use("*", (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server started at port 3000...");
})