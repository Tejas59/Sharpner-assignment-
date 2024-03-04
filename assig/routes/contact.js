const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/submit-contact', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'submit-contact.html'));
});

router.post('/submit-contact', (req, res, next) => {
    res.redirect('/admin/success');
});

router.get('/success', (req, res, next) => {
    res.send('Form successfully filled.');
});

module.exports = router;
