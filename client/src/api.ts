import axios from 'axios';
import type {
  ApiResponse,
  Transaction,
  CreateTransactionDTO,
  Summary,
  CategoryBreakdown,
} from './types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({ baseURL: BASE_URL });

export const fetchTransactions = async (params?: {
  type?: string;
  category?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Transaction[]> => {
  const res = await api.get<ApiResponse<Transaction[]>>('/api/transactions', { params });
  return res.data.data ?? [];
};

export const fetchSummary = async (): Promise<Summary> => {
  const res = await api.get<ApiResponse<Summary>>('/api/transactions/summary');
  return res.data.data!;
};

export const fetchBreakdown = async (): Promise<CategoryBreakdown[]> => {
  const res = await api.get<ApiResponse<CategoryBreakdown[]>>('/api/transactions/breakdown');
  return res.data.data ?? [];
};

export const createTransaction = async (data: CreateTransactionDTO): Promise<Transaction> => {
  const res = await api.post<ApiResponse<Transaction>>('/api/transactions', data);
  return res.data.data!;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/api/transactions/${id}`);
};
