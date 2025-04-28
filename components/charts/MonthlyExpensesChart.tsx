'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '@/types';
import { format } from 'date-fns';

interface MonthlyExpensesChartProps {
  transactions: Transaction[];
}

export default function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const data = transactions.reduce((acc: { [key: string]: number }, t) => {
    const month = format(new Date(t.date), 'yyyy-MM');
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {});
  const chartData = Object.keys(data)
    .sort()
    .map((month) => ({
      month,
      Expenses: data[month],
    }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Expenses" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}