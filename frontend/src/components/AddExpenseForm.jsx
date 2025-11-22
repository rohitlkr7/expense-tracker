import React, { useState } from "react";

const AddExpenseForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense"); // income or expense
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toLocaleDateString(),
    };

    onAdd(newTransaction);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 mt-6">
      <h3 className="text-cyan-600 dark:text-cyan-400 text-xl font-semibold mb-5 text-center">
        Add New Expense / Income
      </h3>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          placeholder="Title (e.g., Food, Salary)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Category */}
        <input
          type="text"
          placeholder="Category (Food, Travel, Salary)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
 