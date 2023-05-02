const showError = (err, req, res, next) => {
    res.status(404).send(err.message);
}

module.exports = showError;