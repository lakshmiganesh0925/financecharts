export interface Transaction {
    _id: string;
    amount: number;
    date: Date;
    description: string;
    category: string;
  }
  
  export interface Category {
    _id: string;
    name: string;
  }
  
  export interface Budget {
    _id: string;
    category: string;
    amount: number;
    month: string; 
  }