import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useAppData } from '@/hooks/useAppData'
import { cn } from '@/lib/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Feed', to: '/snippets' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Create', to: '/create' },
]

const quickActions = [
  { label: 'Open Dashboard', path: '/dashboard', hint: 'overview' },
  { label: 'Browse Feed', path: '/snippets', hint: 'discover snippets' },
  { label: 'Create Snippet', path: '/create', hint: 'new editor draft' },
  { label: 'View Profile', path: '/profile', hint: 'account and stats' },
]

export function Navbar() {
  const { currentUser, logout, isAuthenticated, pushToast } = useAppData()
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const menuRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('mousedown', onPointerDown)
    return () => window.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    const onHotkey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
      }
      if (event.key === 'Escape') {
        setCommandOpen(false)
      }
    }

    window.addEventListener('keydown', onHotkey)
    return () => window.removeEventListener('keydown', onHotkey)
  }, [])

  const visibleActions = useMemo(() => {
    const normalized = commandQuery.trim().toLowerCase()
    if (!normalized) {
      return quickActions
    }

    return quickActions.filter((action) => {
      const value = `${action.label} ${action.hint}`.toLowerCase()
      return value.includes(normalized)
    })
  }, [commandQuery])

  return (
    <>
      <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-1)] px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur">
          <Link to="/" className="group flex min-w-0 items-center gap-3">
            <div className="ui-code flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] text-[0.7rem] tracking-[0.2em] text-[var(--text-muted)] transition group-hover:border-[color:var(--border-strong)] group-hover:text-[var(--text-primary)]">
              <img src="/src/assets/logo.png" alt="" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[0.04em] text-[var(--text-primary)]">Code Slice</p>
              <p className="truncate text-[0.68rem] text-[var(--text-muted)]">Developer Workspace</p>
            </div>
          </Link>

          <nav className="ml-3 hidden items-center gap-1 rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] p-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-xs font-medium tracking-[0.02em] transition',
                    isActive
                      ? 'bg-[var(--button-primary-bg)] text-[var(--button-primary-text)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="ml-auto hidden items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-2 text-xs text-[var(--text-muted)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-primary)] md:inline-flex"
          >
            <span>Quick Find</span>
            <span className="ui-code rounded-full border border-[color:var(--border-subtle)] px-1.5 py-0.5 text-[0.62rem]">Ctrl K</span>
          </button>

          <ThemeToggle />

          {isAuthenticated && currentUser ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] p-1 pr-3 transition hover:border-[color:var(--border-strong)]"
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="h-8 w-8 rounded-full object-cover" />
                <span className="hidden text-xs font-medium text-[var(--text-primary)] sm:block">{currentUser.handle}</span>
              </button>

              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="absolute right-0 mt-3 w-56 rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-1)] p-2 shadow-[var(--shadow-soft)]"
                  >
                    <Link
                      to="/profile"
                      className="block rounded-xl px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/create"
                      className="block rounded-xl px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                      onClick={() => setMenuOpen(false)}
                    >
                      New Snippet
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout()
                        setMenuOpen(false)
                        pushToast({ title: 'Signed out', description: 'You are now browsing in guest mode.' })
                      }}
                      className="mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                    >
                      Logout
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-2 text-xs text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-primary)] sm:inline-flex"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[var(--button-primary-bg)] px-4 py-2 text-xs font-medium text-[var(--button-primary-text)] transition hover:opacity-90"
              >
                Start
              </Link>
            </div>
          )}
        </div>
      </header>

      <AnimatePresence>
        {commandOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/65 p-4 backdrop-blur-sm"
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              className="mx-auto mt-20 w-full max-w-xl rounded-[1.6rem] border border-[color:var(--border-subtle)] bg-[var(--surface-1)] p-3 shadow-[var(--shadow-soft)]"
              onClick={(event) => event.stopPropagation()}
            >
              <input
                autoFocus
                value={commandQuery}
                onChange={(event) => setCommandQuery(event.target.value)}
                placeholder="Type a command or route"
                className="ui-input ui-code border-none bg-[var(--surface-soft)] text-sm"
              />
              <div className="mt-3 space-y-1">
                {visibleActions.map((action) => (
                  <button
                    key={action.path}
                    type="button"
                    onClick={() => {
                      navigate(action.path)
                      setCommandOpen(false)
                      setCommandQuery('')
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-[var(--surface-hover)]"
                  >
                    <span className="text-sm text-[var(--text-primary)]">{action.label}</span>
                    <span className="ui-code text-[0.68rem] text-[var(--text-muted)]">{action.hint}</span>
                  </button>
                ))}
                {visibleActions.length === 0 ? (
                  <p className="rounded-xl px-3 py-2 text-sm text-[var(--text-muted)]">No matches found.</p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
