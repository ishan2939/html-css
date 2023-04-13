const express = require('express');
const multer = require('multer');

const controller = require('../controllers/controller');

const router = express.Router();

router.route('/home').get(controller.get_home_page);

router.route('/addquote').get(controller.add_quote_page).post(controller.add_quote);


// router.post('/addquote', (req, res) => {
//     controller.add_quote(req, res);
// })
module.exports = router;
