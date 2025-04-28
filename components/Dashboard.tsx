'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import BudgetForm from './BudgetForm';
import MonthlyExpensesChart from './charts/MonthlyExpensesChart';
import CategoryPieChart from './charts/CategoryPieChart';
import BudgetVsActualChart from './charts/BudgetVsActualChart';
import { Transaction, Category, Budget } from '@/types';
import { TransactionZodSchema } from '@/types/schemas';
import { BudgetZodSchema } from '@/types/schemas';
import { z } from 'zod';

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, categoriesRes, budgetsRes] = await Promise.all([
          fetch('/api/transactions'),
          fetch('/api/categories'),
          fetch('/api/budgets'),
        ]);

        if (!transactionsRes.ok || !categoriesRes.ok || !budgetsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const transactionsData = await transactionsRes.json();
        
        const transactionsWithDates = transactionsData.map((t: Transaction) => ({
          ...t,
          date: typeof t.date === 'string' ? new Date(t.date) : t.date,
        }));
        setTransactions(transactionsWithDates);
        setCategories(await categoriesRes.json());
        setBudgets(await budgetsRes.json());
      } catch {
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleAddTransaction = async (data: z.infer<typeof TransactionZodSchema>) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newTransaction = await res.json();
        setTransactions([newTransaction, ...transactions]);
      } else {
        setError('Failed to add transaction');
      }
    } catch {
      setError('Failed to add transaction');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTransactions(transactions.filter((t) => t._id !== id));
      } else {
        setError('Failed to delete transaction');
      }
    } catch {
      setError('Failed to delete transaction');
    }
  };

  const handleAddBudget = async (data: z.infer<typeof BudgetZodSchema>) => {
    try {
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const newBudget = await res.json();
        setBudgets([...budgets.filter((b) => b.month !== data.month || b.category !== data.category), newBudget]);
      } else {
        setError('Failed to set budget');
      }
    } catch {
      setError('Failed to set budget');
    }
  };

  const totalExpenses = transactions
    .filter((t) => {
      const date = typeof t.date === 'string' ? new Date(t.date) : t.date;
      return date.toISOString().slice(0, 7) === new Date().toISOString().slice(0, 7);
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryBreakdown: { [key: string]: number } = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as { [key: string]: number });

  const total = Object.values(categoryBreakdown).reduce((sum: number, val: number) => sum + val, 0);

  const categoryPercentages = Object.keys(categoryBreakdown).map((category) => ({
    category,
    percentage: total > 0 ? ((categoryBreakdown[category] / total) * 100).toFixed(2) : '0.00',
  }));

  const spendingInsights = budgets
    .filter((b) => b.month === new Date().toISOString().slice(0, 7))
    .map((budget) => {
      const actual = transactions
        .filter((t) => {
          const date = typeof t.date === 'string' ? new Date(t.date) : t.date;
          return t.category === budget.category && date.toISOString().slice(0, 7) === budget.month;
        })
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        category: budget.category,
        overBudget: actual > budget.amount,
        difference: actual - budget.amount,
      };
    })
    .filter((insight) => insight.overBudget);

  return (
    <div className="container mx-auto p-4 space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm categories={categories} onSubmit={handleAddTransaction} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Set Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetForm categories={categories} onSubmit={handleAddBudget} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Total Expenses (This Month): ${totalExpenses.toFixed(2)}</p>
            <div>
              <h3>Category Breakdown:</h3>
              <ul>
                {categoryPercentages.map((item) => (
                  <li key={item.category}>
                    {item.category}: {item.percentage}%
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Spending Insights:</h3>
              {spendingInsights.length > 0 ? (
                <ul>
                  {spendingInsights.map((insight) => (
                    <li key={insight.category}>
                      Over budget in {insight.category} by ${insight.difference.toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>All categories within budget!</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyExpensesChart transactions={transactions} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPieChart transactions={transactions} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetVsActualChart transactions={transactions} budgets={budgets} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList transactions={transactions.slice(0, 5)} onDelete={handleDeleteTransaction} />
        </CardContent>
      </Card>
    </div>
  );
}