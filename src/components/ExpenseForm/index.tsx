import { Button, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { ExpensesType } from '../../types/ExpensesTypes';

type ExpenseFormProps = {
  setExpenses: (expenses: ExpensesType[]) => void;
};

function ExpenseForm({ setExpenses }: ExpenseFormProps) {
  const [expense, setExpense] = useState({
    description: '',
    amount: 0,
    category: '',
    timestamp: 0,
  });

  const categories = ['food', 'housing', 'transportation'];

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // save expense data locally
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expense.timestamp = Date.now();
    const result = [...expenses, expense];
    localStorage.setItem('expenses', JSON.stringify(result));
    setExpenses(result);
    console.log('Submitting expense:', expense);
    setExpense({ description: '', amount: 0, category: '', timestamp: 0 });
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
          setExpense({ ...expense, amount: Number(event.target.value) })
        }
        style={{ width: '100%', marginRight: '10px' }}
      />
      <Select
        data={categories}
        label="Category"
        placeholder="Select category"
        value={expense.category}
        onChange={(value: string) =>
          setExpense({ ...expense, category: value })
        }
        style={{ width: '100%', marginRight: '10px' }}
      />
      <Button type="submit" style={{ marginTop: '24px' }}>
        Add expense
      </Button>
    </form>
  );
}

export default ExpenseForm;
