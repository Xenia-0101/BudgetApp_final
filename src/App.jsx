import { useEffect, useState } from "react";
import Styles from "./App.module.css";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./hooks/BudgetsContext";
import ModalAddBudgetForm from "./components/ModalAddBudgetForm";
import ModalAddExpenseForm from "./components/ModalAddExpenseForm";
import ModalViewExpenses from "./components/ModalViewExpenses";

function App() {
  const { budgets, expenses, handleSetCurrentBudget, getBudgetExpenses } =
    useBudgets();
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showViewExpenses, setShowViewExpenses] = useState(false);


  // handle window closing
  // ---------------------------------
  function openShowAddBudget() {
    setShowAddBudget(true);
  }

  useEffect(() => {
    setShowAddBudget(false);
  }, [showAddBudget]);
  // ---------------------------------

  function openShowAddExpense() {
    setShowAddExpense(true);
  }

  useEffect(() => {
    setShowAddExpense(false);
  }, [showAddExpense]);
  // ---------------------------------

  function openShowViewExpenses() {
    setShowViewExpenses(true);
  }

  useEffect(() => {
    setShowViewExpenses(false);
  }, [showViewExpenses]);
  // ---------------------------------

  function handleAddExpenseBtn(budgetId) {
    handleSetCurrentBudget(budgetId);
    openShowAddExpense();
  }

  function handleViewExpensesBtn(budgetId) {
    handleSetCurrentBudget(budgetId);
    openShowViewExpenses();
  }

  function getSpentAmount(budgetId) {
    const listOfExpenses = getBudgetExpenses(budgetId).map(
      (value) => value.amount
    );
    if (listOfExpenses.length != 0)
      return listOfExpenses.reduce((value, sum) => Number(value) + Number(sum));
    return "0";
  }

  return (
    <>
      <div className={Styles.wrapper}>
        <div className={Styles.header}>
          <h1>Budgets</h1>
          <button onClick={() => openShowAddBudget()}>Add Budget</button>
          <button onClick={() => handleAddExpenseBtn("1")}>Add Expense</button>
        </div>

        <div className={Styles.body}>
          {budgets.map((value) => {
            return (
              <BudgetCard
                key={value.id}
                id={value.id}
                name={value.name}
                max={value.max}
                handleAddExpenseBtn={() => handleAddExpenseBtn(value.id)}
                handleViewExpensesBtn={() => handleViewExpensesBtn(value.id)}
                spent={getSpentAmount(value.id)}
              />
            );
          })}
          <BudgetCard
            name="Total"
            max={budgets
              .map((value) => value.max)
              .reduce((value, sum) => Number(value) + Number(sum), 0)}
            spent={expenses
              .map((value) => value.amount)
              .reduce((value, sum) => Number(value) + Number(sum), 0)}
            footerHidden={true}
          />
        </div>
      </div>
      <ModalAddBudgetForm show={showAddBudget} />
      <ModalAddExpenseForm show={showAddExpense} />
      <ModalViewExpenses show={showViewExpenses} />
    </>
  );
}

export default App;
