import React, { useState } from 'react';
import { Table, Text, Badge } from '@mantine/core';
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text size="sm">Filter by category:</Text>
        <Badge
          size="md"
          color={categoryFilter ? 'blue' : 'gray'}
          variant={categoryFilter ? 'filled' : 'outline'}
          onClick={() => setCategoryFilter('')}
        >
          All
        </Badge>
        <Badge
          size="md"
          color="blue"
          variant={categoryFilter === 'food' ? 'filled' : 'outline'}
          onClick={() => setCategoryFilter('food')}
        >
          Food
        </Badge>
        <Badge
          size="md"
          color="blue"
          variant={categoryFilter === 'housing' ? 'filled' : 'outline'}
          onClick={() => setCategoryFilter('housing')}
        >
          Housing
        </Badge>
        <Badge
          size="md"
          color="blue"
          variant={categoryFilter === 'transportation' ? 'filled' : 'outline'}
          onClick={() => setCategoryFilter('transportation')}
        >
          Transportation
        </Badge>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.description}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
          <tr>
            <td>
              <Text size="lg" weight={500}>
                Total:
              </Text>
            </td>
            <td colSpan={2}>
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