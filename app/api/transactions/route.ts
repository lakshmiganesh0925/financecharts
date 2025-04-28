import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { TransactionModel } from '@/models/transaction';
import { TransactionZodSchema } from '@/types/schemas';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = TransactionZodSchema.parse(body);
    const transaction = await TransactionModel.create(parsed);
    return NextResponse.json(transaction, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const transactions = await TransactionModel.find().sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}