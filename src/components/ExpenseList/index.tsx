import { Select, Table, Text } from '@mantine/core';
import { useState } from 'react';
import { ExpensesType } from '../../types/ExpensesTypes';

type ExpenseListProps = {
  expenses: ExpensesType[];
};

function ExpenseList({ expenses }: ExpenseListProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  // Filter expenses by category
  const filteredExpenses = categoryFilter
    ? expenses.filter((expense) => expense.category === categoryFilter)
    : expenses;

  // Calculate total amount
  const total = filteredExpenses.reduce((acc, curr) => +acc + +curr.amount, 0);

  // Define categories for dropdown options
  const categories = [
    { label: 'All', value: '' },
    { label: 'Food', value: 'food' },
    { label: 'Housing', value: 'housing' },
    { label: 'Transportation', value: 'transportation' },
  ];

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size="sm">Filter by category:</Text>
        <Select
          placeholder="All"
          value={categoryFilter}
          onChange={(value) => setCategoryFilter(value || '')}
          data={categories}
        />
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.description}>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.timestamp).toLocaleDateString()}</td>
            </tr>
          ))}
          <tr>
            <td>
              <Text size="lg" weight={500}>
                Total:
              </Text>
            </td>
            <td colSpan={3}>
              <Text size="lg" weight={500}>
                ${total}
              </Text>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseList;