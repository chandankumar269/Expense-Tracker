export default function ExpenseList({
  expenses,
  deleteExpense,
}) {
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="expense-card"
        >
          <div className="expense-info">
            <h3>{expense.title}</h3>

            <p>
              ₹{expense.amount} •{" "}
              {expense.category}
            </p>
          </div>

          <button
            className="delete-btn"
            onClick={() =>
              deleteExpense(expense._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}