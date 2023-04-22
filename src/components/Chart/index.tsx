import { Cell, Label, Legend, Pie, PieChart } from 'recharts';
import { ExpensesType } from '../../types/ExpensesTypes';

type ChartProps = {
  expenses: ExpensesType[];
};

export const Chart = ({ expenses }: ChartProps) => {
  const expensesByCategory = expenses.reduce((acc, { category, amount }) => {
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {} as Record<string, number>);

  const categoriesKeys = Object.keys(expensesByCategory);
  const colors = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#AF19FF',
    '#FA541C',
    '#FAAD14',
    '#A0D911',
    '#52C41A',
    '#13C2C2',
    '#1890FF',
    '#2F54EB',
    '#722ED1',
    '#EB2F96',
    '#FF4D4F',
    '#FF7A45',
    '#FFC53D',
    '#73D13D',
    '#36CFC9',
    '#40A9FF',
  ];

  const data = categoriesKeys.map((category, index) => {
    return {
      name: category,
      value: expensesByCategory[category],
      fill: randomColor(),
    };
  });

  function randomColor(): string {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          fill="#8884d8"
          label={({ name, value }) => `${name}: ${value}`} // Custom label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={randomColor()} /> // Random color
          ))}
          <Label
            position="center"
            fill="#000"
            fontSize={18}
            fontWeight="bold"
          />
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};
