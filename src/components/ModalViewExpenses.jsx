import { useEffect, useState } from "react";

import Styles from "./ViewExpenses.module.css";
import { useBudgets } from "../hooks/BudgetsContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import ModalEditExpenseForm from "./ModalEditExpenseForm";
import { dateFormatter } from "../utils/dateTimeFormatter";
import ModalEditBudgetForm from "./ModalEditBudgetForm ";

export default function ModalViewExpenses({ show }) {
  const {
    getBudgetExpenses,
    currentBudget,
    getBudgetTotalSpent,
    deleteExpense,
  } = useBudgets();

  const [showWindow, setShowWindow] = useState(false);

  const [showEditExpense, setShowEditExpense] = useState(false);
  const [editExpenseValue, setEditExpenseValue] = useState("");

  const [showEditBudget, setShowEditBudget] = useState(false)

  const [sortBy, setSortBy] = useState("id")
  const [sortAscending, setSortAscending] = useState(true)

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

  // handle editExpense window opening and closing
  // ---------------------------------
  function openShowEditExpense() {
    setShowEditExpense(true);
  }
  
  useEffect(() => {
    setShowEditExpense(false);
  }, [showEditExpense]);
  
  // ---------------------------------
  
  function handleEditExpense(value) {
    setEditExpenseValue(value);
  }
  
  useEffect(() => {
    if (editExpenseValue != "") {
      openShowEditExpense();
    }
  }, [editExpenseValue, currentBudget.max]);
  // ---------------------------------

  // handle editBudget window opening and closing
  // ---------------------------------
  function openEditBudget() {
    setShowEditBudget(true)
  }

  useEffect(() => {
    setShowEditBudget(false)
  }, [showEditBudget])
  // ---------------------------------
  
  // handle sorting
  // ---------------------------------
  function toggleSortAscending() {
    return setSortAscending(prev => !prev)
  }

  function handleSorting(type) {
    setSortBy(type)
    toggleSortAscending()
  }



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
            <span>Expenses</span>
            <button
              className="closeBtn"
              onClick={() => handleShowWindow(false)}
            >
              ✖
            </button>
          </div>
          <div className={Styles.subheading}>
            <span>
              Budget:
              <span className={Styles.subValue}>{currentBudget.name}</span>
            </span>
            <span>
              Limit:
              <span className={Styles.subValue}>
                {currencyFormatter.format(currentBudget.max)}
              </span>
            </span>
            <span>
              Spent:
              <span className={Styles.subValue}>
                {currencyFormatter.format(
                  getBudgetTotalSpent(currentBudget.id)
                )}
              </span>
            </span>
            <span>
              <button onClick={openEditBudget} >Set Limit</button>
            </span>
          </div>
          <div className={Styles.body}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    Description <button className="caretBtn" onClick={() => handleSorting( "description")} ><div  className={Styles.caret} /></button>
                  </th>
                  <th>
                    Amount <button className="caretBtn" onClick={() => handleSorting( "amount")} ><div  className={Styles.caret} /></button>
                  </th>
                  <th>Created At <button className="caretBtn" onClick={() => handleSorting( "id")} ><div  className={Styles.caret} /></button>
                  </th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {getBudgetExpenses(currentBudget.id, sortBy, sortAscending).map((value, index) => {
                  return (
                    <tr key={value.id}>
                      <td>{index + 1}.</td>
                      <td>{value.description}</td>
                      <td>{currencyFormatter.format(value.amount)}</td>
                      <td>
                      {dateFormatter(value.id)}
                      </td>
                      <td className={Styles.expenseButtons}>
                        <button onClick={() => handleEditExpense(value)}>
                          Edit
                        </button>
                        <button onClick={() => deleteExpense(value.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalEditExpenseForm show={showEditExpense} expense={editExpenseValue} />
      <ModalEditBudgetForm show={showEditBudget} />
    </>
  );
}
