interface StatCardProps {
  label: string
  value: string
  trend: string
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="ui-panel p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{value}</p>
        <span className="rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
          {trend}
        </span>
      </div>
    </div>
  )
}
