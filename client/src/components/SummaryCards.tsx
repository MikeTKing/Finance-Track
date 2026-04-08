import type { Summary } from '../types';

interface Props {
  summary: Summary | null;
  loading: boolean;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function SummaryCards({ summary, loading }: Props) {
  const cards = [
    {
      label: 'Total Balance',
      value: summary ? fmt(summary.balance) : '$0.00',
      color: summary && summary.balance >= 0 ? 'var(--green)' : 'var(--red)',
      icon: '💰',
      bg: 'linear-gradient(135deg, #1e293b, #273549)',
    },
    {
      label: 'Total Income',
      value: summary ? fmt(summary.totalIncome) : '$0.00',
      color: 'var(--green)',
      icon: '📈',
      bg: 'linear-gradient(135deg, #14532d22, #1e293b)',
    },
    {
      label: 'Total Expenses',
      value: summary ? fmt(summary.totalExpenses) : '$0.00',
      color: 'var(--red)',
      icon: '📉',
      bg: 'linear-gradient(135deg, #7f1d1d22, #1e293b)',
    },
    {
      label: 'Transactions',
      value: summary ? String(summary.transactionCount) : '0',
      color: 'var(--blue)',
      icon: '🔢',
      bg: 'linear-gradient(135deg, #1e3a5f22, #1e293b)',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: card.bg,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500 }}>{card.label}</span>
            <span style={{ fontSize: '20px' }}>{card.icon}</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: card.color }}>
            {loading ? <span style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Loading…</span> : card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
