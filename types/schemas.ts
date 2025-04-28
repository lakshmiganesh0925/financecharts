import { z } from 'zod';

export const TransactionZodSchema = z.object({
  amount: z.number().positive(),
  date: z.date(),
  description: z.string().min(1),
  category: z.string().min(1),
});

export const BudgetZodSchema = z.object({
  category: z.string().min(1),
  amount: z.number().positive(),
  month: z.string().regex(/^\d{4}-\d{2}$/),
});