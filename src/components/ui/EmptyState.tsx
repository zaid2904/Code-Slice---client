import { Button } from '@/components/ui/Button'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="ui-panel-soft p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-1)] text-xl text-[var(--text-muted)]">
        0
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
