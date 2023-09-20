import { useBudgets } from "../hooks/BudgetsContext";
import Styles from "./Select.module.css";
import { useEffect, useState } from "react";

export default function Select() {
  const { budgets, currentBudget, handleSetCurrentBudget } = useBudgets();
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Uncategorised");


  return (
    <>
      <div
        className={Styles.wrapper}
        onClick={() => setShow((prev) => !prev)}
        onBlur={() => setShow(() => false)}
        tabIndex={0}
      >
        <div className={Styles.selectedItem}>{currentBudget.name}</div>
        <div className={Styles.divider} />
        <div className={Styles.caret} />
        <ul
          className={Styles.menu}
          style={show ? { visibility: "visible" } : { visibility: "hidden" }}
        >
          {budgets.map((value) => {
            return (
              <li
                key={value.id}
                className={
                  value.name === selectedItem ? Styles.highlight : "none"
                }
                onClick={() => handleSetCurrentBudget(value.id)}
              >
                {value.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
