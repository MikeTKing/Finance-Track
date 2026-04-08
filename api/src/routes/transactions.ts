import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as store from '../store';
import {
  ApiResponse,
  Transaction,
  CreateTransactionDTO,
  UpdateTransactionDTO,
  Summary,
  CategoryBreakdown,
  Category,
} from '../types';

const router = Router();

// GET /api/transactions - Get all transactions (with optional filters)
router.get('/', (req: Request, res: Response) => {
  let transactions = store.getAll();

  const { type, category, startDate, endDate, search } = req.query;

  if (type && (type === 'income' || type === 'expense')) {
    transactions = transactions.filter((t) => t.type === type);
  }

  if (category && typeof category === 'string') {
    transactions = transactions.filter((t) => t.category === category);
  }

  if (startDate && typeof startDate === 'string') {
    transactions = transactions.filter((t) => t.date >= startDate);
  }

  if (endDate && typeof endDate === 'string') {
    transactions = transactions.filter((t) => t.date <= endDate);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    transactions = transactions.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.note && t.note.toLowerCase().includes(q))
    );
  }

  // Sort by date descending
  transactions.sort((a, b) => (a.date < b.date ? 1 : -1));

  const response: ApiResponse<Transaction[]> = { success: true, data: transactions };
  res.json(response);
});

// GET /api/transactions/summary - Get financial summary
router.get('/summary', (_req: Request, res: Response) => {
  const transactions = store.getAll();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const summary: Summary = {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    transactionCount: transactions.length,
  };

  const response: ApiResponse<Summary> = { success: true, data: summary };
  res.json(response);
});

// GET /api/transactions/breakdown - Get spending by category
router.get('/breakdown', (_req: Request, res: Response) => {
  const transactions = store.getAll().filter((t) => t.type === 'expense');

  const map = new Map<Category, { total: number; count: number }>();

  for (const t of transactions) {
    const existing = map.get(t.category) || { total: 0, count: 0 };
    map.set(t.category, {
      total: existing.total + t.amount,
      count: existing.count + 1,
    });
  }

  const breakdown: CategoryBreakdown[] = Array.from(map.entries()).map(
    ([category, { total, count }]) => ({ category, total, count })
  );

  breakdown.sort((a, b) => b.total - a.total);

  const response: ApiResponse<CategoryBreakdown[]> = { success: true, data: breakdown };
  res.json(response);
});

// GET /api/transactions/:id - Get single transaction
router.get('/:id', (req: Request, res: Response) => {
  const transaction = store.getById(req.params.id);

  if (!transaction) {
    const response: ApiResponse<null> = { success: false, error: 'Transaction not found' };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Transaction> = { success: true, data: transaction };
  return res.json(response);
});

// POST /api/transactions - Create a new transaction
router.post('/', (req: Request, res: Response) => {
  const body = req.body as CreateTransactionDTO;

  if (!body.title || !body.amount || !body.type || !body.category || !body.date) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Missing required fields: title, amount, type, category, date',
    };
    return res.status(400).json(response);
  }

  if (body.amount <= 0) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Amount must be greater than 0',
    };
    return res.status(400).json(response);
  }

  if (!['income', 'expense'].includes(body.type)) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Type must be "income" or "expense"',
    };
    return res.status(400).json(response);
  }

  const newTransaction: Transaction = {
    id: uuidv4(),
    title: body.title.trim(),
    amount: Number(body.amount),
    type: body.type,
    category: body.category,
    date: body.date,
    note: body.note?.trim(),
  };

  const created = store.create(newTransaction);
  const response: ApiResponse<Transaction> = {
    success: true,
    data: created,
    message: 'Transaction created successfully',
  };
  return res.status(201).json(response);
});

// PUT /api/transactions/:id - Update a transaction
router.put('/:id', (req: Request, res: Response) => {
  const body = req.body as UpdateTransactionDTO;
  const updated = store.update(req.params.id, body);

  if (!updated) {
    const response: ApiResponse<null> = { success: false, error: 'Transaction not found' };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Transaction> = {
    success: true,
    data: updated,
    message: 'Transaction updated successfully',
  };
  return res.json(response);
});

// DELETE /api/transactions/:id - Delete a transaction
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = store.remove(req.params.id);

  if (!deleted) {
    const response: ApiResponse<null> = { success: false, error: 'Transaction not found' };
    return res.status(404).json(response);
  }

  const response: ApiResponse<null> = {
    success: true,
    message: 'Transaction deleted successfully',
  };
  return res.json(response);
});

export default router;
