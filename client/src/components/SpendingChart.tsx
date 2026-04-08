import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { CategoryBreakdown } from '../types';

interface Props {
  breakdown: CategoryBreakdown[];
  loading: boolean;
}

const COLORS = [
  '#3b82f6', '#ef4444', '#22c55e', '#eab308',
  '#a855f7', '#f97316', '#06b6d4', '#ec4899',
  '#84cc16', '#14b8a6', '#6366f1',
];

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function SpendingChart({ breakdown, loading }: Props) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
        Loading chart…
      </div>
    );
  }

  if (breakdown.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
        No expense data yet
      </div>
    );
  }

  const data = breakdown.map((b) => ({
    name: b.category.charAt(0).toUpperCase() + b.category.slice(1),
    value: b.total,
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => fmt(Number(value))}
            contentStyle={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text)',
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Table */}
      <div style={{ marginTop: '8px' }}>
        {breakdown.map((b, i) => (
          <div
            key={b.category}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: i < breakdown.length - 1 ? '1px solid var(--border)' : 'none',
              fontSize: '13px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
              <span style={{ textTransform: 'capitalize' }}>{b.category}</span>
              <span style={{ color: 'var(--text-muted)' }}>({b.count})</span>
            </div>
            <span style={{ fontWeight: 600, color: 'var(--red)' }}>{fmt(b.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
