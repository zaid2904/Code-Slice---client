import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  active?: boolean
  className?: string
  onClick?: () => void
}

export function Tag({ children, active, className, onClick }: TagProps) {
  const sharedClassName = cn(
    'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[0.01em] transition duration-200',
    active
      ? 'border-transparent bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]'
      : 'border-[color:var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
    className,
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={sharedClassName}>
        {children}
      </button>
    )
  }

  return <span className={sharedClassName}>{children}</span>
}
