const express = require('express');
require('./config/databse').connect_to_DB();
const path =  require('path');

const app = express();

const router = require('./routes/routes');

app.use(express.json());

app.disable("etag");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname , 'views', 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000, () => {
    console.log("Server started at port 3000...");
});