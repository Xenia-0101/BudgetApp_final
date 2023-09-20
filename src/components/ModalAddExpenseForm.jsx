import Styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import Select from "./Select";
import { useBudgets } from "../hooks/BudgetsContext";

const EXPENSE_INITIAL = {
  description: "",
  amount: "",
  budgetId: "",
};

export default function ModalAddExpenseForm(props) {
  const { show } = props;
  const { addExpense, currentBudget } = useBudgets();

  const [showWindow, setShowWindow] = useState(false);

  const [expenseForm, setExpenseForm] = useState(EXPENSE_INITIAL);

  // handle window opening and closing
  // ---------------------------------
  function handleShowWindow(state) {
    setShowWindow(state);
  }

  useEffect(() => {
    if (show === true) {
      handleShowWindow(true);
    }
  }, [show]);
  // ---------------------------------

  // handle form submission
  // ---------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    addExpense({ ...expenseForm, budgetId: currentBudget.id });
    console.log(expenseForm)
    setExpenseForm(EXPENSE_INITIAL);

    handleShowWindow(false);
  }

  function handleChange(e) {
    setExpenseForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  // ---------------------------------

  return (
    <>
      <div
        className={Styles.modal}
        style={
          showWindow ? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        <div className={Styles.wrapper}>
          <div className={Styles.header}>
            <span>New Expense</span>
            <button
              className="closeBtn"
              onClick={() => handleShowWindow(false)}
            >
              ✖
            </button>
          </div>
          <div className={Styles.body}>
            <form onSubmit={handleSubmit}>
              <label>
                Description
                <input
                  name="description"
                  value={expenseForm.description}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label>
                Amount
                <input
                  name="amount"
                  value={expenseForm.amount}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label>
                Budget
                <Select />
              </label>
              <button className={Styles.addBtn} type="submit">
                Add
              </button>
            </form>
          </div>
          <div className={Styles.footer}></div>
        </div>
      </div>
    </>
  );
}
