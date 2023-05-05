const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err)
            return console.log(err.message);

        res.render('index', {
            addedTime: "",
            convertedTime: "",
            timeZone: "",
            zones: JSON.parse(data)
        });
    });
});

app.post('/convert', (req, res) => {

    let today = new Date();
    //let timeFrom = new Date(today.getFullYear, today.getMonth(), today.getDate(), req.body.time.spilt)
    console.log(req.body.zoneFrom);
    let timeFromOffset = today.toLocaleTimeString('en-US', {timeZone: req.body.zoneFrom});
    
    //     let today = new Date();
    //     let time = new Date(today.getFullYear(), today.getMonth(), today.getDate(), req.body.time.split(':')[0], req.body.time.split(':')[1]);
    //     //console.log(time);
    //     //let timeFrom = new Date(req.body.time).toLocaleString('en-US', {timeZone: ''});
    //     let final = time.toLocaleString('en-US', { timeZone: req.body.zoneFrom });
    //     // console.log(new Date(new Date(final).setHours(req.body.time.split(':')[0])))
    //     //let final = 
    //     // console.log(final, timeFrom);
    //     let x = new Date(final);


    // var d = new Date();
    // d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
    //console.log(d);

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err)
            return console.log(err.message);

        res.render('index', {
            // addedTime: time.toLocaleString('en-US'),
            // convertedTime: final,
            // timeZone: req.body.zone,
            addedTime: "",
            convertedTime: "",
            timeZone: "",
            zones: JSON.parse(data)

        });
    });
});

app.use("*", (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server started at port 3000...");
})