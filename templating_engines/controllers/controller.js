const fs = require("fs");
const path = require("path");

exports.get_home_page = (req, res) => {
    res.render('home', {
        path: "/home",
        title: "Home"
    });
};

const p = path.join(__dirname, '/../data', 'quotes.json');
exports.add_quote = (req, res) => {
    console.log(req.body);
    fs.readFile(p, 'utf-8', (err, data) => {
        console.log("hello");
        if (err) {
            return console.log(err);
        }
        else {
            products = data ? JSON.parse(data) : [];
            products.push({ quote: req.body.quote, quotee: req.body.quotee });
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if(err){
                    return console.log(err);
                }
                res.sendFile(path.join(__dirname, '/../views/pug', 'home.pug'));
            });
            //res.redirect('/home');

            // function write(){
            //     fs.writeFile(p, JSON.stringify(products), (err) => {
            //         if(err){
            //             return console.log(err);
            //         }
            //         return new Promise((res,rej)=>{
            //             res()
            //         })
            //     });
            // }
            // await write();

        }
    })
    // res.render('add_quote',{
    //     path: "/addquote",
    //     title: "Add quote"
    // });
    // console.log(req.body)
    // res.send("hello");
};

exports.add_quote_page = (req, res) => {
    res.render('add_quote', {
        path: "/addquote",
        title: "Add quote"
    });
};


