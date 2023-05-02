const express = require('express');
const foodControllers = require('./../controllers/foodController');

const router = express.Router();

router.param('id', foodControllers.checkId);

router.route('/').get(foodControllers.getAllFoodItems).post(foodControllers.addFoodItem);

router.route('/:id').get(foodControllers.getFoodItem).patch(foodControllers.updateFoodItem).delete(foodControllers.deleteFoodItem);

module.exports =  router;