import Styles from "./BudgetCard.module.css";
import { currencyFormatter } from "../utils/currencyFormatter";
import { getBarColor, getBarWidth } from "../utils/progressFormatter";
import { useBudgets } from "../hooks/BudgetsContext";

export default function BudgetCard(props) {
  const {
    name,
    id,
    spent,
    max,
    handleAddExpenseBtn,
    handleViewExpensesBtn,
    footerHidden,
  } = props;
  const { deleteBudget } = useBudgets();
  const progress = spent / max;
  return (
    <div
      className={Styles.budgetCard}
      >
      <div className={Styles.cardHeader}>
        <span className={Styles.cardName}>{name}</span>
        <span className={Styles.cardSpent}>
          {currencyFormatter.format(spent)}
        </span>
        <span className={Styles.cardMax}>
          / {currencyFormatter.format(max)}
        </span>
      </div>

      <div className={Styles.progressBarBorder}>
        <div
          className={Styles.progressBarFill}
          style={{
            width: getBarWidth(progress),
            backgroundColor: getBarColor(progress),
          }}
        />
      </div>

      {/* hides footer on the "Total" card */}
      {!footerHidden && (
        <div className={Styles.cardFooter}>
          <button
            disabled={id === "1" && true}
            onClick={() => deleteBudget(id)}
          >
            Delete Budget
          </button>
          <button onClick={handleAddExpenseBtn}>Add Expense</button>
          <button onClick={handleViewExpensesBtn}>View Expenses</button>
        </div>
      )}
    </div>
  );
}
