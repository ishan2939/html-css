const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true }));

function convertToHourMinute(str){
    console.log(str);
    let hour =  parseInt(str.split(':')[0]);
    let minute = parseInt(str.split(':')[1]);
    return {
        hour: hour?hour:0,
        minute: minute?minute:0
    }
}
app.get('/', (req, res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err)
            return console.log(err.message);

        res.render('index', {
            addedTime: "",
            convertedTime: "",
            zoneFrom: "",
            zoneTo: "",
            zones: JSON.parse(data)
        });
    });
});

app.post('/convert', (req, res) => {

    const sourceTimezone = req.body.zoneFrom;
    const sourceDate = new Date("2023-05-12T"+req.body.time+":00Z");
    
    const destinationTimezone = req.body.zoneTo;
    
    const utcTime = sourceDate.getTime() + (sourceDate.getTimezoneOffset() * 60000);
    
    const sourceOffset = convertToHourMinute(sourceDate.toLocaleTimeString('en-us', { timeZoneName: 'short', timeZone: req.body.zoneFrom }).split(' ')[2].slice(3));
    const destinationOffset = convertToHourMinute(sourceDate.toLocaleTimeString('en-us', { timeZoneName: 'short', timeZone: req.body.zoneTo }).split(' ')[2].slice(3));

    const offsetDifferenceHour =  destinationOffset.hour - sourceOffset.hour;
    
    const offsetDifferenceMinute = destinationOffset.minute - sourceOffset.minute;

    const totalConversion = (offsetDifferenceHour * 3600000) + (offsetDifferenceMinute * 60000);
    console.log(sourceOffset, destinationOffset);
    const sourceTime = new Date(utcTime).toLocaleString('en-us');
    const destinationTime = new Date(utcTime + totalConversion).toLocaleString('en-us');

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err)
            return console.log(err.message);

        res.render('index', {
            zoneFrom: sourceTimezone,
            zoneTo: destinationTimezone,
            addedTime: sourceTime,
            convertedTime: destinationTime,
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