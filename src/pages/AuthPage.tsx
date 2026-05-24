import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useAppData } from '@/hooks/useAppData'
import { motion } from 'framer-motion'
import type { FormEvent } from 'react'
import { useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export type AuthMode = 'login' | 'register' | 'forgot'

interface AuthPageProps {
  mode: AuthMode
}

const modeCopy: Record<AuthMode, { title: string; description: string; action: string }> = {
  login: {
    title: 'Welcome back',
    description: 'Continue where you left off and keep your snippet vault close.',
    action: 'Sign in',
  },
  register: {
    title: 'Create your workspace',
    description: 'Start collecting interview-ready snippets in a polished developer hub.',
    action: 'Create account',
  },
  forgot: {
    title: 'Reset access',
    description: 'We will help you get back into your code library in a few steps.',
    action: 'Send reset link',
  },
}

export function AuthPage({ mode }: AuthPageProps) {
  const { login, pushToast } = useAppData()
  const navigate = useNavigate()
  const location = useLocation()
  const copy = modeCopy[mode]

  const fromPath = useMemo(() => {
    const state = location.state as { from?: { pathname?: string } } | null
    return state?.from?.pathname ?? '/dashboard'
  }, [location.state])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (mode !== 'forgot') {
      login()
      pushToast({ title: 'Authenticated', description: 'You are back in Code Slice.', tone: 'success' })
      navigate(fromPath, { replace: true })
      return
    }

    pushToast({
      title: 'Reset link sent',
      description: 'Check your inbox for a password reset link.',
      tone: 'success',
    })
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1120px] gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="ui-panel ui-spotlight p-8 lg:p-10"
        >
          <p className="ui-kicker">Code Slice</p>
          <SectionHeading className="mt-4" title={copy.title} description={copy.description} eyebrow="Developer Workspace" />

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              'Save reusable interview patterns',
              'Preview syntax-highlighted code instantly',
              'Switch between polished dark and light modes',
              'Share snippets with a cleaner profile system',
            ].map((item) => (
              <div key={item} className="ui-panel-soft p-4 text-sm text-[var(--text-secondary)]">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/">
              <Button variant="secondary">Back Home</Button>
            </Link>
            <Link to={mode === 'login' ? '/register' : '/login'}>
              <Button variant="ghost">{mode === 'login' ? 'Create Account' : 'Sign In Instead'}</Button>
            </Link>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.04 }}
          className="ui-panel p-8 lg:p-10"
        >
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{copy.action}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{mode === 'login' ? 'Access your workspace' : 'Secure and minimal form flow'}</p>
            </div>
            <span className="ui-code rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Secure
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === 'register' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="ui-input" placeholder="Full name" required />
                <input className="ui-input" placeholder="Username" required />
              </div>
            ) : null}

            <input className="ui-input" type="email" placeholder="Email address" required />

            {mode !== 'forgot' ? <input className="ui-input" type="password" placeholder="Password" required /> : null}

            {mode === 'register' ? <input className="ui-input" type="password" placeholder="Confirm password" required /> : null}

            {mode === 'login' ? (
              <div className="flex items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-[color:var(--border-subtle)] bg-[var(--surface-soft)]" defaultChecked />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
                  Forgot password?
                </Link>
              </div>
            ) : null}

            <Button variant="primary" size="lg" fullWidth type="submit">
              {copy.action}
            </Button>
          </form>

          <div className="ui-panel-soft mt-8 p-5 text-sm text-[var(--text-secondary)]">
            This frontend currently uses a polished mock auth flow so the UX remains complete without a live backend.
          </div>
        </motion.section>
      </div>
    </div>
  )
}
