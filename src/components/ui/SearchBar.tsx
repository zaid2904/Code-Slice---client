interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search snippets, tags, or authors' }: SearchBarProps) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 text-sm text-[var(--text-secondary)] transition focus-within:border-[color:var(--border-strong)] focus-within:bg-[var(--surface-hover)]">
      <span className="ui-code rounded-full border border-[color:var(--border-subtle)] px-2 py-0.5 text-[0.67rem] text-[var(--text-muted)]">
        Ctrl K
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
      />
    </label>
  )
}
