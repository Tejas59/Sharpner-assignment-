// routes.js

const express = require('express');
const router = express.Router();
const signinController = require('../controller/signinController');

// Sign-up route


// Sign-in route
router.post('/signin', signinController.signInUser);

module.exports = router;
