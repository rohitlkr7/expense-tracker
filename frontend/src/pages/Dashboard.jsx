import React, { useEffect, useState, useContext } from "react";
import AddExpenseForm from "../components/AddExpenseForm";
import TransactionTable from "../components/TransactionTable";
import EditModal from "../components/EditModal";
import ExpenseGraph from "../components/ExpenseGraph";
import ExpensePieChart from "../components/ExpensePieChart";
import BudgetCard from "../components/BudgetCard";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [budget, setBudget] = useState(5000); // default budget
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/expenses/all");
      const data = (res.data || []).map((t) => ({
        ...t,
        date:
          typeof t.date === "string"
            ? new Date(t.date).toLocaleDateString()
            : t.date,
      }));
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    const inc = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + Number(t.amount), 0);
    const exp = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + Number(t.amount), 0);

    setIncomeTotal(inc);
    setExpenseTotal(exp);
  }, [transactions]);

  const handleAdd = async (payload) => {
    try {
      const body = {
        title: payload.title,
        amount: payload.amount,
        type: payload.type,
        category: payload.category || "General",
        date: new Date(),
      };

      const res = await axiosInstance.post("/expenses/add", body);
      const saved = res.data.expense || res.data;
      saved.date = new Date(saved.date).toLocaleDateString();

      setTransactions((prev) => [saved, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await axiosInstance.delete(`/expenses/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleEditOpen = (transaction) => setEditing(transaction);
  const handleEditSave = async (id, changes) => {
    try {
      const res = await axiosInstance.put(`/expenses/${id}`, changes);
      const updated = res.data.updated || res.data;
      if (updated.date) updated.date = new Date(updated.date).toLocaleDateString();
      setTransactions((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cyan-50 pt-14">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-full md:w-80">
          <BudgetCard
            budget={budget}
            totalExpense={expenseTotal}
            onUpdate={(newBudget) => setBudget(newBudget)}
          />

          <AddExpenseForm onAdd={handleAdd} />
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExpenseGraph data={transactions} />
            <ExpensePieChart expenses={transactions} />
          </div>

          {/* Transactions Table */}
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <TransactionTable
              transactions={transactions}
              onDelete={handleDelete}
              onEdit={handleEditOpen}
            />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <EditModal
          isOpen={!!editing}
          expense={editing}
          onClose={() => setEditing(null)}
          onUpdate={handleEditSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
