const foo = (req, res, next) => {
    if (false) {
        next();
    }
    else {
        console.log("hey");
        res.send("middleware");
    }
}

module.exports = foo;