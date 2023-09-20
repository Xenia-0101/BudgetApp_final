import { useBudgets } from "../hooks/BudgetsContext";
import Styles from "./Modal.module.css";
import { useState, useEffect } from "react";

const BUDGET_INITIAL = {
  name: "",
  max: "",
};

export default function ModalAddBudgetForm(props) {
  const { show } = props;
  const { addBudget } = useBudgets();

  const [showWindow, setShowWindow] = useState(false);

  const [budgetForm, setBudgetForm] = useState(BUDGET_INITIAL);

  // handle window opening and closing
  // ---------------------------------
  function handleShowWindow(state) {
    setShowWindow(() => state);
  }
  
  useEffect(() => {
    if (show === true) {
      handleShowWindow(true);
    }
  }, [show]);
  // ---------------------------------
  

  // handle form submission
  // ---------------------------------
  function handleChange(e) {
    setBudgetForm((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    addBudget(budgetForm)
    setBudgetForm(BUDGET_INITIAL)
    handleShowWindow(false)
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
            <span>New Budget</span>
            <button
              className="closeBtn"
              onClick={() => handleShowWindow(false)}
            >
              ✖
            </button>
          </div>

          <div className={Styles.body}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  value={budgetForm.name}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label>
                Maximum Spending
                <input
                  name="max"
                  type="text"
                  value={budgetForm.max}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <button className={Styles.addBtn} type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
