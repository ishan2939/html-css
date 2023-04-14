const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, '/../data', 'quotes.json');

let quotes = [];


exports.get_home_page = (req, res) => {
    res.render('home', {
        path: "/home",
        title: "Home"
    });
};

exports.add_quote = async (req, res) => {
    fs.readFile(p, 'utf-8', (err, data) => {

        if (err) {
            res.send(err);
        }
        else {
            quotes = data ? JSON.parse(data) : [];
            quotes.push({ quote: req.body.quote, quotee: req.body.quotee });
            fs.writeFile(p, JSON.stringify(quotes), (err) => {
                if (err) {
                    return console.log(err);
                }
                res.redirect('/home');
            });
        }
    })


    //2nd way
    // const data= await fs.promises.readFile(p, 'utf-8');
    // let products = data ? JSON.parse(data) : [];
    // products.push({ quote: req.body.quote, quotee: req.body.quotee });
    // await fs.promises.writeFile(p,JSON.stringify(products));
    // res.redirect('/home');

};

exports.get_add_quote_page = (req, res) => {
    res.render('add_quote', {
        path: "/addquote",
        title: "Add quote"
    });
};

exports.generateRandomQuote = (req, res) => {
    fs.readFile(p, 'utf-8', (err, data) => {
        if (err)
            res.error(err);
        else {
            quotes = JSON.parse(data);
            if (quotes.length == 0)
                return res.send({});

            let index = Math.floor(Math.random() * quotes.length);
            res.send(quotes[index]);
        }
    });
}