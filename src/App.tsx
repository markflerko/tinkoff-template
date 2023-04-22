import React from 'react';
import logo from './logo.svg';
import './App.css';
import ExpenseForm from './components/ExpenseForm';

function App() {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm />
    </div>
  );
}

export default App;
