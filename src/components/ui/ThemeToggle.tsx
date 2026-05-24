import { Button } from '@/components/ui/Button'
import { useAppData } from '@/hooks/useAppData'

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppData()

  return (
    <Button variant="secondary" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
      <span className="text-[0.64rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">Mode</span>
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </Button>
  )
}
