export type TransactionType = 'income' | 'expense';

export type Category =
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'food'
  | 'transport'
  | 'housing'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'utilities'
  | 'other';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // ISO date string
  note?: string;
}

export interface CreateTransactionDTO {
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  note?: string;
}

export interface UpdateTransactionDTO {
  title?: string;
  amount?: number;
  type?: TransactionType;
  category?: Category;
  date?: string;
  note?: string;
}

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
}

export interface CategoryBreakdown {
  category: Category;
  total: number;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
