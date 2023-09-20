import Styles from "./Modal.module.css";
import { useState, useEffect } from "react";
import { useBudgets } from "../hooks/BudgetsContext";

export default function ModalEditBudgetForm(props) {
  const { show } = props;
  const { editBudgetMax, currentBudget } = useBudgets();

  const [showWindow, setShowWindow] = useState(false);

  const [budgetMax, setBudgetMax] = useState(currentBudget.max);

  // handle window opening and closing
  // ---------------------------------
  function handleShowWindow(state) {
    setShowWindow(state);
  }

  useEffect(() => {
    if (show === true) {
      handleShowWindow(true);
      setBudgetMax(currentBudget.max);
    }
  }, [show]);
  // ---------------------------------

  // handle form submission
  // ---------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    editBudgetMax(currentBudget.id, budgetMax);
    handleShowWindow(false);
  }

  function handleChange(e) {
    setBudgetMax(e.target.value);
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
            <span>Edit Budget Limit</span>
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
                Maximum Spending
                <input
                  name="max"
                  value={budgetMax}
                  onChange={(e) => handleChange(e)}
                />
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
