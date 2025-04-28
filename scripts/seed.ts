import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../lib/db'; 
import { TransactionModel } from '../models/transaction';
import { CategoryModel } from '../models/category';
import { BudgetModel } from '../models/budget';
import { format, subMonths } from 'date-fns';


dotenv.config({ path: '.env.local' });

async function seedDB() {
  try {
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    
    await connectDB();

    
    await TransactionModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await BudgetModel.deleteMany({});

    
    const categories = [
      { name: 'Food' },
      { name: 'Rent' },
      { name: 'Utilities' },
      { name: 'Transportation' },
      { name: 'Entertainment' },
    ];

    const insertedCategories = await CategoryModel.insertMany(categories);
    console.log('Categories seeded:', insertedCategories);

    
    const transactions = [
      {
        amount: 50,
        date: new Date(),
        description: 'Grocery shopping',
        category: 'Food',
      },
      {
        amount: 1200,
        date: new Date(),
        description: 'Monthly rent',
        category: 'Rent',
      },
      {
        amount: 75,
        date: new Date(),
        description: 'Electricity bill',
        category: 'Utilities',
      },
      {
        amount: 30,
        date: new Date(),
        description: 'Bus pass',
        category: 'Transportation',
      },
      {
        amount: 15,
        date: new Date(),
        description: 'Movie ticket',
        category: 'Entertainment',
      },
      
      {
        amount: 45,
        date: subMonths(new Date(), 1),
        description: 'Restaurant dinner',
        category: 'Food',
      },
      {
        amount: 1100,
        date: subMonths(new Date(), 1),
        description: 'Monthly rent',
        category: 'Rent',
      },
      {
        amount: 80,
        date: subMonths(new Date(), 1),
        description: 'Water bill',
        category: 'Utilities',
      },
    ];

    const insertedTransactions = await TransactionModel.insertMany(transactions);
    console.log('Transactions seeded:', insertedTransactions);

    
    const currentMonth = format(new Date(), 'yyyy-MM');
    const budgets = [
      { category: 'Food', amount: 200, month: currentMonth },
      { category: 'Rent', amount: 1200, month: currentMonth },
      { category: 'Utilities', amount: 100, month: currentMonth },
      { category: 'Transportation', amount: 50, month: currentMonth },
      { category: 'Entertainment', amount: 30, month: currentMonth },
    ];

    const insertedBudgets = await BudgetModel.insertMany(budgets);
    console.log('Budgets seeded:', insertedBudgets);

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}


seedDB();