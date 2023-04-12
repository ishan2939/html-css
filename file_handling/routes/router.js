const express = require('express');

const fileController = require('../controllers/fileContoller');

const router = express.Router();

router.route('/createfile').post(fileController.createFile);

router.route('/readfile').get(fileController.readFromFile);

router.route('/writefile').post(fileController.writeIntoFile);

router.route('/updatefile').patch(fileController.appendIntoFile);

module.exports = router;