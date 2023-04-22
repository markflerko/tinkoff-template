import { useEffect, useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { ExpensesType } from './types/ExpensesTypes';

function App() {
  const [expenses, setExpenses] = useState<ExpensesType[]>([]);

  useEffect(() => {
    // retrieve expenses from local storage
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    setExpenses(savedExpenses);
  }, []);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm setExpenses={setExpenses} />
      <br />
      <ExpenseList expenses={expenses} />
      <br />
    </div>
  );
}

export default App;
