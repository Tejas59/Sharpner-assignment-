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

exports.getEditExpense = (req, res) => {
    const expenseId = req.params.id;
    Expense.findByPk(expenseId)
      .then(expense => {
        if (!expense) {
          res.status(404).send({ message: 'Expense not found' });
        } else {
          res.render('edit-expense', { expense });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
      });
  };

  exports.postEditExpense = async (req, res, next) => {
    const { id } = req.params;
    const { amount, description } = req.body;

    try {
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).send({ message: 'Expense not found' });
        }

        expense.amount = amount;
        expense.description = description;
        await expense.save();

        res.redirect('/');
    } catch (err) {
        next(err);
    }
};
