const express = require('express');
const path = require('path');

const router = require('./routes/router');

const app = express();

// app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pug'));

app.use(express.static(path.join(__dirname, 'views', 'normal')));
app.use(express.urlencoded({
    extended: true
}));

// app.get('/', (req, res) => {
//     res.status(200).render('home');
// });

app.use('/', router);

app.get('/', (req, res) => {
    try{
        throw new Error("hello1");
    }
    catch(err){
        res.send(err.message);
    }
})

app.listen(3000, () => {
    console.log("Server started at port 3000...")
});

