const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getAllExpenses);
router.post('/add', expenseController.createExpense);
router.post('/:id/delete', expenseController.deleteExpense);
router.get('/:id/edit', expenseController.getEditExpense);
router.post('/:id/edit', expenseController.postEditExpense);


module.exports = router;





