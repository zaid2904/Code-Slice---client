import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: ReactNode
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'border border-transparent bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] hover:opacity-90',
  secondary:
    'border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-primary)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)]',
  ghost:
    'border border-transparent bg-transparent text-[var(--text-secondary)] hover:border-[color:var(--border-subtle)] hover:bg-[var(--surface-soft)] hover:text-[var(--text-primary)]',
  danger:
    'border border-[color:var(--border-strong)] bg-[var(--surface-1)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-3.5 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.01em] transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
