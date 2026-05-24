import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center px-4 py-16">
      <div className="ui-panel max-w-xl p-8 text-center">
        <p className="ui-kicker">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">Route not found</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          The page you requested does not exist. Head back home or continue exploring the snippet feed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
          <Link to="/snippets">
            <Button variant="secondary">Browse Feed</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
