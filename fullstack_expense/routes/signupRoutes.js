const express = require('express');
const router = express.Router();
const signupRoutes = require('../controller/signupController.js');

router.get('/', signupRoutes.renderSignupForm);

router.post('/signup',signupRoutes.createUser);




module.exports = router;