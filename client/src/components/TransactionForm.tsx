import { useState } from 'react';
import type { CreateTransactionDTO, TransactionType, Category } from '../types';

interface Props {
  onAdd: (data: CreateTransactionDTO) => Promise<void>;
}

const CATEGORIES: Category[] = [
  'salary', 'freelance', 'investment',
  'food', 'transport', 'housing',
  'entertainment', 'health', 'shopping',
  'utilities', 'other',
];

const today = () => new Date().toISOString().split('T')[0];

export default function TransactionForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<CreateTransactionDTO>({
    title: '',
    amount: 0,
    type: 'expense',
    category: 'food',
    date: today(),
    note: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) return setError('Title is required');
    if (form.amount <= 0) return setError('Amount must be greater than 0');
    setLoading(true);
    try {
      await onAdd(form);
      setForm({ title: '', amount: 0, type: 'expense', category: 'food', date: today(), note: '' });
      setOpen(false);
    } catch {
      setError('Failed to add transaction. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
    fontSize: '14px',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'var(--blue)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'opacity 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {open ? '✕ Cancel' : '+ Add Transaction'}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: '16px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>New Transaction</h3>

          {error && (
            <div style={{ background: '#7f1d1d44', border: '1px solid var(--red)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', color: 'var(--red)', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Title *</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="e.g. Monthly Salary"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Amount ($) *</label>
              <input
                style={inputStyle}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={form.amount || ''}
                onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Date *</label>
              <input
                style={inputStyle}
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Type *</label>
              <select
                style={inputStyle}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
              >
                <option value="income">💚 Income</option>
                <option value="expense">❤️ Expense</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Category *</label>
              <select
                style={inputStyle}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Note (optional)</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Add a note…"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'var(--green)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: 600,
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Saving…' : '✓ Save Transaction'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
