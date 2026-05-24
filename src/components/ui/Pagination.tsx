import { cn } from '@/lib/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-2 text-xs text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={cn(
            'h-9 min-w-9 rounded-full border px-3 text-xs transition',
            currentPage === page
              ? 'border-transparent bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]'
              : 'border-[color:var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
          )}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-2 text-xs text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  )
}

