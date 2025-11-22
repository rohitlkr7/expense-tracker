import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ExpenseGraph = ({ data = [] }) => {
  if (!Array.isArray(data)) data = [];

  // convert expenses into category summary
  const categoryData = data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const finalData = Object.keys(categoryData).map((key) => ({
    category: key,
    amount: categoryData[key],
  }));

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#0e7490" }}>
        Expense Breakdown (Category-wise)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={finalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#06b6d4" radius={[1, 1, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseGraph;
