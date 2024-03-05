const path = require('path');

const getSubmitContact = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'submit-contact.html'));
};

const postSubmitContact = (req, res, next) => {
    res.redirect('/admin/success');
};

const getSuccess = (req, res, next) => {
    res.send('Form successfully filled.');
};

module.exports = {
    getSubmitContact,
    postSubmitContact,
    getSuccess
};
