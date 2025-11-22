import React from "react";

const formatDate = (date) => {
  if (!date) return "N/A";
  const d = new Date(date);
  if (d.toString() === "Invalid Date") return date;
  return d.toDateString();
};

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-cyan-700 tracking-wide">
        Transaction History
      </h2>

      <div className="overflow-x-auto backdrop-blur-xl bg-white/70 shadow-2xl rounded-xl border border-cyan-100">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to from-cyan-600 to-cyan-500 text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length ? (
              transactions.map((item) => (
                <tr
                  key={item._id}
                  onDoubleClick={() => onEdit(item)} // NEW: double-click edit
                  className="
                    border-b 
                    hover:bg-cyan-50/60 
                    transition-all 
                    duration-300 
                    cursor-pointer
                  "
                >
                  <td className="p-3 font-medium text-gray-900">{item.title}</td>

                  <td
                    className={`p-3 font-semibold ${
                      item.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{item.amount}
                  </td>

                  {/* Category badge UI */}
                  <td className="p-3">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                      {item.category}
                    </span>
                  </td>

                  <td className="p-3 text-gray-600">{formatDate(item.date)}</td>

                  <td className="p-3">
                    <div className="flex gap-3 justify-center items-center">

                      {/* Modern Edit Button */}
                      <button
                        onClick={() => onEdit(item)}
                        className="
                          bg-yellow-400 
                          text-black 
                          px-4 
                          py-1 
                          rounded-lg 
                          font-medium 
                          shadow 
                          hover:bg-yellow-500 
                          hover:scale-105 
                          active:scale-95 
                          transition-all 
                          duration-300
                        "
                      >
                        ✏ Edit
                      </button>

                      {/* Modern Delete Button */}
                      <button
                        onClick={() => onDelete(item._id)}
                        className="
                          bg-red-500 
                          text-white 
                          px-4 
                          py-1 
                          rounded-lg 
                          font-medium 
                          shadow 
                          hover:bg-red-600 
                          hover:scale-105 
                          active:scale-95
                          transition-all 
                          duration-300
                        "
                      >
                        🗑 Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-600 text-lg"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
