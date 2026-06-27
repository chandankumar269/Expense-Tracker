import { useState } from "react";
import API from "../services/api";

export default function ExpenseForm({
  fetchExpenses,
}) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const [customCategory, setCustomCategory] =
    useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const finalCategory =
      form.category === "Other"
        ? customCategory
        : form.category;

    await API.post("/expenses", {
      ...form,
      category: finalCategory,
      date: new Date(),
    });

    setForm({
      title: "",
      amount: "",
      category: "",
    });

    setCustomCategory("");

    fetchExpenses();
  };

  return (
    <form
      className="expense-form"
      onSubmit={submitHandler}
    >
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({
            ...form,
            amount: e.target.value,
          })
        }
      />

      <select
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      >
        <option value="">
          Select Category
        </option>

        <option value="Food">
          Food
        </option>

        <option value="Travel">
          Travel
        </option>

        <option value="Shopping">
          Shopping
        </option>

        <option value="Bills">
          Bills
        </option>

        <option value="Entertainment">
          Entertainment
        </option>

        <option value="Education">
          Education
        </option>

        <option value="Health">
          Health
        </option>

        <option value="Other">
          Other (Create New)
        </option>
      </select>

      {form.category === "Other" && (
        <input
          type="text"
          placeholder="Enter Custom Category"
          value={customCategory}
          onChange={(e) =>
            setCustomCategory(e.target.value)
          }
        />
      )}

      <button type="submit">
        Add Expense
      </button>
    </form>
  );
}