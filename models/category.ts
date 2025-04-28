import mongoose, { Schema, model, models } from 'mongoose';
import { Category } from '@/types';

const categorySchema = new Schema<Category>({
  name: { type: String, required: true, unique: true },
});

export const CategoryModel = models.Category || model<Category>('Category', categorySchema);