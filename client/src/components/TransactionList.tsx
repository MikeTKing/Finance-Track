import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  loading: boolean;
  onDelete: (id: string) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const CATEGORY_ICONS: Record<string, string> = {
  salary: '💼', freelance: '💻', investment: '📊',
  food: '🍔', transport: '🚗', housing: '🏠',
  entertainment: '🎬', health: '💊', shopping: '🛍️',
  utilities: '⚡', other: '📦',
};

export default function TransactionList({ transactions, loading, onDelete }: Props) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
        Loading transactions…
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '60px 20px',
        background: 'var(--surface)', borderRadius: 'var(--radius)',
        border: '1px solid var(--border)', color: 'var(--text-muted)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
        <div style={{ fontSize: '16px', fontWeight: 500 }}>No transactions found</div>
        <div style={{ fontSize: '13px', marginTop: '6px' }}>Add your first transaction above</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {transactions.map((t) => (
        <div
          key={t.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '14px 16px',
            transition: 'border-color 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--blue)')}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          {/* Icon */}
          <div style={{
            width: '42px', height: '42px', borderRadius: '10px',
            background: t.type === 'income' ? '#14532d33' : '#7f1d1d33',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', flexShrink: 0,
          }}>
            {CATEGORY_ICONS[t.category] ?? '📦'}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {t.title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {t.category} · {t.date}
              {t.note && <span> · {t.note}</span>}
            </div>
          </div>

          {/* Amount */}
          <div style={{
            fontWeight: 700, fontSize: '16px',
            color: t.type === 'income' ? 'var(--green)' : 'var(--red)',
            flexShrink: 0,
          }}>
            {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
          </div>

          {/* Delete */}
          <button
            onClick={() => onDelete(t.id)}
            title="Delete"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-muted)',
              padding: '4px 8px',
              fontSize: '13px',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#7f1d1d44';
              e.currentTarget.style.color = 'var(--red)';
              e.currentTarget.style.borderColor = 'var(--red)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}
