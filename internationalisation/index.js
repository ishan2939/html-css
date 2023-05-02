const express = require('express');
const path = require('path');
const {I18n} = require('i18n');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: true })); 

const i18N = new I18n({
    locales: ['en', 'hi'],
    directory: path.join(__dirname, 'files')
});

app.use(i18N.init);

app.get('/', async (req, res) => {  
    res.render('home', {
        quote: res.__('message'),
        quotee: res.__('person')
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000...");
})