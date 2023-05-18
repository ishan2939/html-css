const router = require('express').Router();
const userController = require('../controllers/user');
const recordController = require('../controllers/record');

router.route('/adduser').post(userController.addUser);
router.route('/addtask').post(recordController.addTask);

module.exports = router;