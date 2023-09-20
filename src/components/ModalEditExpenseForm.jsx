import Styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import Select from "./Select";
import { useBudgets } from "../hooks/BudgetsContext";


export default function ModalEditExpenseForm(props) {
  const { show, expense } = props;
  const { editExpense } = useBudgets();

  const [showWindow, setShowWindow] = useState(false);

  const [expenseForm, setExpenseForm] = useState(expense);

  // handle window opening and closing
  // ---------------------------------
  function handleShowWindow(state) {
    setShowWindow(state);
  }
  
  useEffect(() => {
    if (show === true) {
      setExpenseForm(expense)
      handleShowWindow(true);
    }
  }, [show]);
  // ---------------------------------

  // handle form submission
  // ---------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    editExpense(expenseForm);
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
            <span>Edit Expense</span>
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
                Save
              </button>
            </form>
          </div>
          <div className={Styles.footer}></div>
        </div>
      </div>
    </>
  );
}
