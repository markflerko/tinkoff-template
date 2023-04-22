import { Button, Select, Table, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { ExpensesType } from '../../types/ExpensesTypes';

type ExpenseListProps = {
  expenses: ExpensesType[];
};

function ExpenseList({ expenses }: ExpenseListProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Filter expenses by category and date range
  const filteredExpenses = expenses.filter((expense) => {
    const isCategoryMatch =
      !categoryFilter || expense.category === categoryFilter;
    const isDateMatch =
      !startDate ||
      !endDate ||
      (expense.timestamp >= new Date(startDate).getTime() &&
        expense.timestamp < new Date(endDate).getTime() + 86400000);
    return isCategoryMatch && isDateMatch;
  });

  // Calculate total amount
  const total = filteredExpenses.reduce((acc, curr) => +acc + +curr.amount, 0);

  // Define categories for dropdown options
  const categories = [
    { label: 'All', value: '' },
    { label: 'Food', value: 'food' },
    { label: 'Housing', value: 'housing' },
    { label: 'Transportation', value: 'transportation' },
  ];

  // Sort expenses by timestamp
  const sortedExpenses = filteredExpenses.sort((a, b) => a.timestamp - b.timestamp);

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
        <TextInput
          placeholder="Start date (YYYY-MM-DD)"
          value={startDate}
          onChange={(event) => setStartDate(event.currentTarget.value)}
          style={{ marginLeft: '1rem', marginRight: '1rem' }}
        />
        <TextInput
          placeholder="End date (YYYY-MM-DD)"
          value={endDate}
          onChange={(event) => setEndDate(event.currentTarget.value)}
          style={{ marginLeft: '1rem', marginRight: '1rem' }}
        />
        <Button
          onClick={() => {
            setCategoryFilter('');
            setStartDate('');
            setEndDate('');
          }}
        >
          Clear filters
        </Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date (YYYY-MM-DD)</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.description}>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.timestamp).toISOString().slice(0, 10)}</td>
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
