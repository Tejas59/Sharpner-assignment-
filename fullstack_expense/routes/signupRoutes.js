// routes.js

const express = require('express');
const router = express.Router();
const signupController = require('../controller/signupController');


// Sign-up route
router.post('/signup', signupController.createUser);

// Sign-in route


module.exports = router;
