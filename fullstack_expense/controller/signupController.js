const User = require('../model/signupModel.js');

exports.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    await User.create({ username, email, password });
    res.redirect('/');
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Email is already registered.');
    }
    next(err);
  }
};

exports.renderSignupForm = (req, res) => {
  res.render('index');
};