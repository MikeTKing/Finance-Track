import { useState, useEffect, useCallback } from 'react';
import type { Transaction, Summary, CategoryBreakdown, CreateTransactionDTO } from './types';
import {
  fetchTransactions,
  fetchSummary,
  fetchBreakdown,
  createTransaction,
  deleteTransaction,
} from './api';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SpendingChart from './components/SpendingChart';
import Filters from './components/Filters';

interface FilterState {
  type: string;
  category: string;
  search: string;
}

type Tab = 'transactions' | 'charts';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [breakdown, setBreakdown] = useState<CategoryBreakdown[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [tab, setTab] = useState<Tab>('transactions');
  const [filters, setFilters] = useState<FilterState>({ type: '', category: '', search: '' });
  const [apiError, setApiError] = useState('');

  const loadTransactions = useCallback(async () => {
    setLoadingTx(true);
    setApiError('');
    try {
      const data = await fetchTransactions({
        type: filters.type || undefined,
        category: filters.category || undefined,
        search: filters.search || undefined,
      });
      setTransactions(data);
    } catch {
      setApiError('⚠️ Cannot connect to API. Make sure the backend is running on port 4000.');
    } finally {
      setLoadingTx(false);
    }
  }, [filters]);

  const loadSummaryAndChart = useCallback(async () => {
    setLoadingSummary(true);
    setLoadingChart(true);
    try {
      const [s, b] = await Promise.all([fetchSummary(), fetchBreakdown()]);
      setSummary(s);
      setBreakdown(b);
    } catch {
      // silently fail for summary
    } finally {
      setLoadingSummary(false);
      setLoadingChart(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    loadSummaryAndChart();
  }, [loadSummaryAndChart, transactions]);

  const handleAdd = async (data: CreateTransactionDTO) => {
    await createTransaction(data);
    await loadTransactions();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this transaction?')) return;
    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    await loadSummaryAndChart();
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 20px',
    background: active ? 'var(--blue)' : 'transparent',
    color: active ? '#fff' : 'var(--text-muted)',
    border: active ? 'none' : '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          💸 Finance Tracker
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '4px', fontSize: '14px' }}>
          Track your income & expenses in one place
        </p>
      </div>

      {/* API Error Banner */}
      {apiError && (
        <div style={{
          background: '#7f1d1d33',
          border: '1px solid var(--red)',
          borderRadius: 'var(--radius)',
          padding: '12px 16px',
          marginBottom: '20px',
          color: 'var(--red)',
          fontSize: '13px',
        }}>
          {apiError}
        </div>
      )}

      {/* Summary Cards */}
      <SummaryCards summary={summary} loading={loadingSummary} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button style={tabStyle(tab === 'transactions')} onClick={() => setTab('transactions')}>
          📋 Transactions
        </button>
        <button style={tabStyle(tab === 'charts')} onClick={() => setTab('charts')}>
          📊 Spending Chart
        </button>
      </div>

      {tab === 'transactions' && (
        <>
          <TransactionForm onAdd={handleAdd} />
          <Filters filters={filters} onChange={setFilters} />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            {loadingTx ? 'Loading…' : `${transactions.length} transaction${transactions.length !== 1 ? 's' : ''}`}
          </div>
          <TransactionList
            transactions={transactions}
            loading={loadingTx}
            onDelete={handleDelete}
          />
        </>
      )}

      {tab === 'charts' && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          boxShadow: 'var(--shadow)',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>
            💸 Expense Breakdown by Category
          </h2>
          <SpendingChart breakdown={breakdown} loading={loadingChart} />
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
        Finance Tracker · Built with React + TypeScript + Node.js · Deployable on Vercel
      </div>
    </div>
  );
}
