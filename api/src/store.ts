import { Transaction } from './types';

// In-memory store (replace with a database in production)
let transactions: Transaction[] = [
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 5000,
    type: 'income',
    category: 'salary',
    date: '2026-04-01',
    note: 'April paycheck',
  },
  {
    id: '2',
    title: 'Rent Payment',
    amount: 1500,
    type: 'expense',
    category: 'housing',
    date: '2026-04-02',
    note: 'Monthly rent',
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    amount: 120,
    type: 'expense',
    category: 'food',
    date: '2026-04-03',
  },
  {
    id: '4',
    title: 'Freelance Project',
    amount: 800,
    type: 'income',
    category: 'freelance',
    date: '2026-04-04',
    note: 'Website redesign',
  },
  {
    id: '5',
    title: 'Netflix Subscription',
    amount: 15,
    type: 'expense',
    category: 'entertainment',
    date: '2026-04-05',
  },
  {
    id: '6',
    title: 'Electric Bill',
    amount: 90,
    type: 'expense',
    category: 'utilities',
    date: '2026-04-05',
  },
  {
    id: '7',
    title: 'Stock Dividend',
    amount: 250,
    type: 'income',
    category: 'investment',
    date: '2026-04-06',
  },
  {
    id: '8',
    title: 'Gym Membership',
    amount: 45,
    type: 'expense',
    category: 'health',
    date: '2026-04-06',
  },
];

export const getAll = (): Transaction[] => [...transactions];

export const getById = (id: string): Transaction | undefined =>
  transactions.find((t) => t.id === id);

export const create = (transaction: Transaction): Transaction => {
  transactions.push(transaction);
  return transaction;
};

export const update = (id: string, updates: Partial<Transaction>): Transaction | null => {
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return null;
  transactions[index] = { ...transactions[index], ...updates };
  return transactions[index];
};

export const remove = (id: string): boolean => {
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return false;
  transactions.splice(index, 1);
  return true;
};
