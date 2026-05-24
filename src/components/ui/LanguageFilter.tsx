import { cn } from '@/lib/cn'

interface LanguageFilterProps {
  languages: string[]
  value: string
  onChange: (value: string) => void
}

export function LanguageFilter({ languages, value, onChange }: LanguageFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => onChange(language)}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-medium tracking-[0.01em] transition duration-200',
            value === language
              ? 'border-transparent bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]'
              : 'border-[color:var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
          )}
        >
          {language}
        </button>
      ))}
    </div>
  )
}
