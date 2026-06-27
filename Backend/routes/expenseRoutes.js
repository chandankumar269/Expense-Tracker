const router = require("express").Router();

const {
  getExpenses,
  addExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.get("/", protect, getExpenses);

router.post("/", protect, addExpense);

router.delete(
  "/:id",
  protect,
  deleteExpense
);

module.exports = router;