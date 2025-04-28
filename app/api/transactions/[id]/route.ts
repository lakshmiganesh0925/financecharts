import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { TransactionModel } from '@/models/transaction';
import { TransactionZodSchema } from '@/types/schemas';

export async function PUT(request: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  try {
    await connectDB();
    const body = await request.json();
    const parsed = TransactionZodSchema.parse(body);
    const transaction = await TransactionModel.findByIdAndUpdate(params.id, parsed, { new: true });
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(transaction);
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function DELETE(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  try {
    await connectDB();
    const transaction = await TransactionModel.findByIdAndDelete(params.id);
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}