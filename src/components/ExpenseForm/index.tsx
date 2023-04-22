import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { ExpensesType } from '../../types/ExpensesTypes';

type ExpenseFormProps = {
  setExpenses: (expenses: ExpensesType[]) => void;
};

function ExpenseForm({ setExpenses }: ExpenseFormProps) {
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    category: '',
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // save expense data locally
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const result = [...expenses, expense];
    localStorage.setItem('expenses', JSON.stringify(result));
    setExpenses(result);
    console.log('Submitting expense:', expense);
    setExpense({ description: '', amount: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <TextInput
        label="Description"
        placeholder="Enter description"
        value={expense.description}
        onChange={(event) =>
          setExpense({ ...expense, description: event.target.value })
        }
        style={{ width: '100%', marginRight: '10px' }}
      />
      <TextInput
        label="Amount"
        placeholder="Enter amount"
        value={expense.amount}
        onChange={(event) =>
          setExpense({ ...expense, amount: event.target.value })
        }
        style={{ width: '100%', marginRight: '10px' }}
      />
      <TextInput
        label="Category"
        placeholder="Enter category"
        value={expense.category}
        onChange={(event) =>
          setExpense({ ...expense, category: event.target.value })
        }
        style={{ width: '100%' }}
      />
      <Button type="submit" style={{marginTop: '24px'}}>Add expense</Button>
    </form>
  );
}

export default ExpenseForm;