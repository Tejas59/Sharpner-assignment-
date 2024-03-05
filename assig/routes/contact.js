const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/submit-contact', contactController.getSubmitContact);
router.post('/submit-contact', contactController.postSubmitContact);
router.get('/success', contactController.getSuccess);

module.exports = router;
