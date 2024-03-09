const Expense = require('../models/expense');

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.render('index', { expenses });
  } catch (err) {
    next(err);
  }
};

exports.createExpense = async (req, res, next) => {
  const { amount, description } = req.body;
  try {
    await Expense.create({ amount, description });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Expense.destroy({ where: { id } });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
