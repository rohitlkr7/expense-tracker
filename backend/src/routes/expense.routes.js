const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  filterExpenses,
} = require("../controllers/expense.controller");

const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/add", auth, addExpense);
router.get("/all", auth, getExpenses);
router.get("/filter", auth, filterExpenses);
router.put("/:id", auth, updateExpense);
router.delete("/:id", auth, deleteExpense);

module.exports = router;
