const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, '/../data', 'quotes.json');

let quotes = [];

exports.get_home_page = (req, res) => {
    fs.readFile(p, 'utf-8', (err, data) => {
        if (err) {
            res.render("error", {
                title: 500,
                error_code: 500,
                error_message: "No such file or directory found."
            });
        }
        else {
            quotes = JSON.parse(data);
            if (quotes.length == 0)
                return res.send({});
            let index = Math.floor(Math.random() * quotes.length);
            res.render("home", {
                path: "/home",
                title: "Home",
                quote: quotes[index].quote,
                person: quotes[index].quotee
            });
        }
    });
};

exports.get_all_quotes = (req, res) => {
    fs.readFile(p, 'utf-8', (err, data) => {
        if (err) {
            res.render("error", {
                title: 500,
                error_code: 500,
                error_message: "No such file or directory found."
            })
        }
        else{
            res.render("get_all_quotes", {
                quotes: JSON.parse(data),
                hasQuotes: JSON.parse(data).length != 0 ? true : false,
                path: '/getallquotes',
                title: 'Get All Quotes'
            });
        }
    });
};

exports.add_quote = async (req, res) => {
    fs.readFile(p, 'utf-8', (err, data) => {
        if (err) {
            res.render("error", {
                title: 500,
                error_code: 500,
                error_message: "No such file or directory found."
            });
        }
        else {
            quotes = data ? JSON.parse(data) : [];
            if (req.body.quote && req.body.quotee) {
                quotes.push({ quote: req.body.quote, quotee: req.body.quotee });
                fs.writeFile(p, JSON.stringify(quotes), (err) => {
                    if (err) {
                        res.render("error", {
                            title: 500,
                            error_code: 500,
                            error_message: "For some reason we were not able to store your data"
                        });
                        return;
                    }
                    res.redirect('/home');
                });
            }
            else
                alert('Enter valid values only.')
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
