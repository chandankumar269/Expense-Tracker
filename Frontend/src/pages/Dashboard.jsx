import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function Dashboard() {
  const [expenses, setExpenses] =
    useState([]);

  const fetchExpenses = async () => {
    const { data } =
      await API.get("/expenses");

    setExpenses(data);
  };

const navigate = useNavigate();

const logoutHandler = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const [darkMode, setDarkMode] =
  useState(
    localStorage.getItem("theme") ===
      "dark"
  );

  const toggleTheme = () => {
  const newTheme = !darkMode;

  setDarkMode(newTheme);

  localStorage.setItem(
    "theme",
    newTheme ? "dark" : "light"
  );

  document.body.className = newTheme
    ? "dark"
    : "";
};

  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);

    fetchExpenses();
  };

useEffect(() => {
  fetchExpenses();

  const savedTheme =
    localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add(
      "dark"
    );
  }
}, []);

  const total = expenses.reduce(
    (sum, item) =>
      sum + Number(item.amount),
    0
  );
return (
  <div className="container">
    <div className="header">
      <h1>Expense Tracker</h1>
<button
  className="theme-btn"
  onClick={toggleTheme}
>
  {darkMode
    ? "☀️ Light"
    : "🌙 Dark"}
</button>
      <button
        className="logout-btn"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>

    <div className="total-card">
      <h2>Total Expense : ₹{total}</h2>
    </div>

    <ExpenseForm
      fetchExpenses={fetchExpenses}
    />

    <ExpenseList
      expenses={expenses}
      deleteExpense={deleteExpense}
    />
  </div>
);
}