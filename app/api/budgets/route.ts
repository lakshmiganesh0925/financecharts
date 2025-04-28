import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { BudgetModel } from '@/models/budget';
import { BudgetZodSchema } from '@/types/schemas';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = BudgetZodSchema.parse(body);
    const budget = await BudgetModel.findOneAndUpdate(
      { category: parsed.category, month: parsed.month },
      parsed,
      { upsert: true, new: true }
    );
    return NextResponse.json(budget, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const budgets = await BudgetModel.find();
    return NextResponse.json(budgets);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}