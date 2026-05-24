import { developerShortcuts, sidebarLinks } from '@/data/mockData'
import { cn } from '@/lib/cn'
import { NavLink } from 'react-router-dom'

const railLabels: Record<string, string> = {
  '/dashboard': 'DB',
  '/snippets': 'FD',
  '/create': 'CR',
  '/profile': 'PR',
  '/admin': 'AD',
}

export function Sidebar() {
  return (
    <aside className="sticky top-28 hidden h-fit w-[90px] shrink-0 lg:block">
      <section className="ui-panel p-3">
        <nav className="space-y-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              title={link.label}
              className={({ isActive }) =>
                cn(
                  'flex h-11 items-center justify-center rounded-xl border text-[0.64rem] font-semibold uppercase tracking-[0.18em] transition',
                  isActive
                    ? 'border-transparent bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]'
                    : 'border-[color:var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
                )
              }
            >
              {railLabels[link.href] ?? link.label.slice(0, 2)}
            </NavLink>
          ))}
        </nav>
      </section>

      <section className="ui-panel-soft mt-4 p-3">
        <p className="ui-kicker text-center">Keys</p>
        <ul className="mt-3 space-y-2 text-center">
          {developerShortcuts.slice(0, 3).map((shortcut) => (
            <li key={shortcut} className="ui-code text-[0.62rem] text-[var(--text-muted)]">
              {shortcut}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
