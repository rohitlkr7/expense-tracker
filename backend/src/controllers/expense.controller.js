const Expense = require("../models/Expense.model");

// ADD EXPENSE
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;

    const expense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category,
      type,
      date,
    });

    await expense.save();

    res.status(201).json({ message: "Expense Added Successfully", expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL EXPENSES
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!expense) return res.status(404).json({ message: "Expense Not Found" });

    res.json({ message: "Expense Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE EXPENSE
const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Expense Not Found" });

    res.json({ message: "Expense Updated", updated });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// FILTER EXPENSES (date, category, type)
const filterExpenses = async (req, res) => {
  try {
    const { type, category, from, to } = req.query;
    const query = { userId: req.user.id };

    if (type) query.type = type;
    if (category) query.category = category;
    if (from && to) query.date = { $gte: new Date(from), $lte: new Date(to) };

    const results = await Expense.find(query);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  filterExpenses,
};
