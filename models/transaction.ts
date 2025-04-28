import mongoose, { Schema, model, models } from 'mongoose';
import { Transaction } from '@/types';

const transactionSchema = new Schema<Transaction>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

export const TransactionModel =
  models.Transaction || model<Transaction>('Transaction', transactionSchema);