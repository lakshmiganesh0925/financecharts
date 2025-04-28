import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { CategoryModel } from '@/models/category';

export async function GET() {
  try {
    await connectDB();
    const categories = await CategoryModel.find();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }
    const category = await CategoryModel.create({ name });
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}