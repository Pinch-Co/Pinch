import * as React from 'react';
import {
  // ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#DEDEDE', '#37B2AA'];

interface ChartProps {
  goalAmount: number;
  currentAmount: number;
}

function GoalChart(props: ChartProps) {
  const {
    goalAmount, currentAmount,
  } = props;

  const amountLeft = (goalAmount - currentAmount);

  const data = [
    { name: 'goalAmount', value: amountLeft },
    { name: 'currentAmount', value: currentAmount },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        innerRadius={70}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default GoalChart;
