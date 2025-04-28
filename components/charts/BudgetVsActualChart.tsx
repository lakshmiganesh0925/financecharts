'use client';

import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { Transaction, Budget } from '@/types';

interface BudgetVsActualChartProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function BudgetVsActualChart({ transactions, budgets }: BudgetVsActualChartProps) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const actual = transactions.reduce((acc: { [key: string]: number }, t) => {
    if (t.date.toISOString().slice(0, 7) === currentMonth) {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const chartData = budgets
    .filter((b) => b.month === currentMonth)
    .map((budget) => ({
      category: budget.category,
      budget: budget.amount,
      actual: actual[budget.category] || 0,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="budget" fill="#8884d8" />
        <Line type="monotone" dataKey="actual" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}