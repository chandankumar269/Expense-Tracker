const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({
    user: req.user,
  });

  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    user: req.user,
  });

  res.json(expense);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted",
  });
};