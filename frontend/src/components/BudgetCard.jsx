import React, { useState } from "react";

const BudgetCard = ({ budget = 0, totalExpense = 0, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleSave = () => {
    onUpdate(Number(newBudget));
    setEditMode(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-cyan-600 dark:text-cyan-400 font-semibold mb-2">Monthly Budget</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-2">Total Budget: ₹{budget}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Spent: ₹{totalExpense}</p>
      <p className="text-gray-700 dark:text-gray-300 font-bold">
        Remaining: ₹{budget - totalExpense}
      </p>

      {editMode ? (
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-cyan-500 outline-none dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="mt-3 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          Edit Budget
        </button>
      )}
    </div>
  );
};

export default BudgetCard;
