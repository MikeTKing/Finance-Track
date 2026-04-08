import type { Category, TransactionType } from '../types';

interface FilterState {
  type: string;
  category: string;
  search: string;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const CATEGORIES: Category[] = [
  'salary', 'freelance', 'investment',
  'food', 'transport', 'housing',
  'entertainment', 'health', 'shopping',
  'utilities', 'other',
];

const selectStyle: React.CSSProperties = {
  padding: '8px 12px',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text)',
  fontSize: '13px',
  outline: 'none',
};

export default function Filters({ filters, onChange }: Props) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '16px',
      alignItems: 'center',
    }}>
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search transactions…"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        style={{
          ...selectStyle,
          flex: '1',
          minWidth: '180px',
        }}
      />

      {/* Type filter */}
      <select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value as TransactionType | '' })}
        style={selectStyle}
      >
        <option value="">All Types</option>
        <option value="income">💚 Income</option>
        <option value="expense">❤️ Expense</option>
      </select>

      {/* Category filter */}
      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value as Category | '' })}
        style={selectStyle}
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
        ))}
      </select>

      {/* Clear */}
      {(filters.type || filters.category || filters.search) && (
        <button
          onClick={() => onChange({ type: '', category: '', search: '' })}
          style={{
            ...selectStyle,
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}
