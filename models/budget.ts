import mongoose, { Schema, model, models } from 'mongoose';
import { Budget } from '@/types';

const budgetSchema = new Schema<Budget>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
});

export const BudgetModel = models.Budget || model<Budget>('Budget', budgetSchema);