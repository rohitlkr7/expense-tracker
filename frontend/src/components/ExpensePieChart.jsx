import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses = [] }) => {

  if (!Array.isArray(expenses) || expenses.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "15px", color: "#888" }}>
        No expense data available
      </p>
    );
  }

  // FIX: Convert amount to number + safe category
  const categoryTotals = expenses.reduce((acc, exp) => {
    const category = exp.category || "Unknown";
    const amount = Number(exp.amount) || 0;

    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  if (values.every((v) => v === 0)) {
    return (
      <p style={{ textAlign: "center", marginTop: "15px", color: "#888" }}>
        No valid numeric data for chart
      </p>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#00bcd4",
          "#4caf50",
          "#ff9800",
          "#e91e63",
          "#9c27b0",
          "#3f51b5",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: "100%", maxWidth: 300, margin: "auto" }}>
      <Pie data={data} />
    </div>
  );
};

export default ExpensePieChart;
