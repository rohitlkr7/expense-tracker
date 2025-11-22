import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, expense, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title || "",
        amount: expense.amount || "",
        category: expense.category || "",
        date: expense.date ? expense.date.split("T")[0] : "",
      });
    }
  }, [expense]);

  if (!isOpen || !expense) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(expense._id, formData);
    
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white/90 border border-cyan-300 shadow-2xl p-6 w-96 rounded-2xl relative animate-scaleUp">

        <h2 className="text-2xl font-bold text-center text-cyan-700 mb-4 drop-shadow">
          ✨ Edit Expense
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="text-gray-600 text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-gray-600 text-sm">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-600 text-sm">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select Category</option>
              <option value="Food">🍕 Food</option>
              <option value="Travel">🚗 Travel</option>
              <option value="Shopping">🛍 Shopping</option>
              <option value="Bills">💡 Bills</option>
              <option value="Health">💊 Health</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-gray-600 text-sm">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition shadow"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 shadow-md hover:shadow-cyan-300/40 transition"
            >
              Update ✔
            </button>
          </div>
        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }

          .animate-scaleUp {
            animation: scaleUp 0.25s ease-out;
          }
          @keyframes scaleUp {
            from { transform: scale(0.85); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
       ` }
      </style>
    </div>
  );
};

export default EditModal;
