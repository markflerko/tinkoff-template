import { ExpensesType } from '../../types/ExpensesTypes';

type ExpenseListProps = {
  expenses: ExpensesType[]
}

function ExpenseList({expenses}: ExpenseListProps) {
  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.description}>
          {expense.description} - {expense.amount} - {expense.category}
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
