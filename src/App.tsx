import { useEffect, useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { ExpensesType } from './types/ExpensesTypes';
import { Chart } from './components/Chart';
import data from './mockData.json'

function App() {
  const [expenses, setExpenses] = useState<ExpensesType[]>([]);

  useEffect(() => {
    // retrieve expenses from local storage
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    if (savedExpenses.length === 0) {
      // if there are no saved expenses in local storage, set mock data
      const mockExpenses = data;
      localStorage.setItem('expenses', JSON.stringify(mockExpenses));
      setExpenses(mockExpenses);
    } else {
      // otherwise, set the retrieved expenses
      setExpenses(savedExpenses);
    }
  }, []);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm setExpenses={setExpenses} />
      <br />
      <ExpenseList expenses={expenses} />
      <br />
      <Chart expenses={expenses}/>
    </div>
  );
}

export default App;
