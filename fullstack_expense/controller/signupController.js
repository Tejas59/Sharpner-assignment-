// signupController.js
const User = require('../model/signupModel.js');

exports.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    await User.create({ username, email, password });
    res.redirect('/');
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      // Email is already registered, render signup form with error message
      res.render('index', { error: 'Email is already registered.' });
    } else {
      next(err);
    }
  }
};

exports.renderSignupForm = (req, res) => {
  // Render signup form without error initially
  res.render('index', { error: null });
};
