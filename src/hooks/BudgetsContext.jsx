import React, { useContext, useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import useLocalStorage from "./useLocalStorage";
import {initialBudgets, initialExpenses} from "../utils/initialData"

const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", initialBudgets);
  const [expenses, setExpenses] = useLocalStorage("expenses", initialExpenses);
  
  const [currentBudget, setCurrentBudget] = useState({});

  function handleSetCurrentBudget(budgetId) {
    const budget = budgets.filter((value) => value.id == budgetId)[0];
    setCurrentBudget(() => budget);
  }

  function getBudgetExpenses(budgetId, type = "id", ascending = true) {
    const switchSorting = (obj1, obj2) => {
      switch (type) {
        case "description":
          var val1 = obj1.description.toUpperCase();
          var val2 = obj2.description.toUpperCase();
          break;
        case "amount":
          val1 = Number(obj1.amount);
          val2 = Number(obj2.amount);
          break;
        case "id":
          val1 = obj1.id;
          val2 = obj2.id;
          break;
        default:
          val1 = obj1.id;
          val2 = obj2.id;
      }
      if (val1 < val2) return -1;
      if (val1 > val2) return 1;
      return 0;
    };
    const expensesToSort = expenses.filter(
      (value) => value.budgetId == budgetId
    );
    if (ascending) return expensesToSort.sort(switchSorting);
    return expensesToSort.sort(switchSorting).reverse();
  }

  function getBudgetTotalSpent(budgetId) {
    const expenses = getBudgetExpenses(budgetId);
    const listOfValues = expenses.map((value) => value.amount);
    if (listOfValues.length != 0)
      return listOfValues.reduce((value, sum) => Number(value) + Number(sum));
    return 0;
  }

  function addExpense({ description, amount, budgetId }) {
    const newExpense = {
      id: new Date(Date.now()).toUTCString(),
      budgetId: budgetId,
      description: description,
      amount: amount,
    };
    setExpenses((prevValue) => [...prevValue, newExpense]);
  }

  function addBudget({ name, max }) {
    const newBudget = {
      id: uuidv1(),
      name: name,
      max: max,
    };
    setBudgets((prevValue) => [...prevValue, newBudget]);
  }

  function deleteExpense(expenseId) {
    setExpenses(() => expenses.filter((value) => value.id !== expenseId));
  }

  function deleteBudget(budgetId) {
    const newBudgets = budgets.filter((value) => {
      return value.id !== budgetId;
    });
    // change expense id to uncategorised
    const newExpenses = expenses.map((value) => {
      if (value.budgetId === budgetId) {
        return { ...value, budgetId: "1" };
      }
      return { ...value };
    });

    setBudgets(() => newBudgets);
    setExpenses(() => newExpenses);
  }

  function editExpense(newExpense) {
    const newExpenses = expenses.map((value) => {
      if (value.id === newExpense.id) {
        return {
          ...value,
          description: newExpense.description,
          amount: newExpense.amount,
          budgetId: currentBudget.id,
        };
      }
      return value;
    });
    setExpenses(newExpenses);
  }

  function editBudgetMax(budgetId, newMax) {
    const newBudgets = budgets.map((value) => {
      if (value.id === budgetId) {
        return { ...value, max: newMax };
      }
      return value;
    });
    setBudgets(() => newBudgets);
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        currentBudget,
        handleSetCurrentBudget,
        getBudgetExpenses,
        getBudgetTotalSpent,
        addExpense,
        addBudget,
        deleteExpense,
        deleteBudget,
        editExpense,
        editBudgetMax,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
