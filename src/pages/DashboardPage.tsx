import { SnippetCard } from '@/components/snippet/SnippetCard'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SnippetCardSkeleton } from '@/components/ui/Skeleton'
import { StatCard } from '@/components/ui/StatCard'
import { stats } from '@/data/mockData'
import { useAppData } from '@/hooks/useAppData'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function DashboardPage() {
  const { currentUser, allSnippets } = useAppData()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(timer)
  }, [])

  const recentSnippets = allSnippets.slice(0, 4)
  const savedSnippets = allSnippets.filter((snippet) => snippet.saved).slice(0, 3)
  const trendingSnippets = allSnippets.filter((snippet) => snippet.trending).slice(0, 4)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      <section className="ui-panel ui-spotlight p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="ui-kicker">Workspace</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[3.2rem]">
              Welcome back{currentUser ? `, ${currentUser.name.split(' ')[0]}` : ''}.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Your personal command center for reusable snippets, saved patterns, and fresh ideas from the developer feed.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/create">
              <Button variant="primary">Create Snippet</Button>
            </Link>
            <Link to="/snippets">
              <Button variant="secondary">Open Feed</Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="space-y-5">
        <SectionHeading eyebrow="Recent" title="Your latest activity" description="Quickly jump back into snippets you touched most recently." />
        {loading ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <SnippetCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {recentSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} compact />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <SectionHeading eyebrow="Saved" title="Snippets you keep returning to" />
          <div className="grid gap-5">
            {savedSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} compact />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <SectionHeading eyebrow="Trending" title="What developers are discussing now" />
          <div className="ui-panel p-4">
            <div className="space-y-2">
              {trendingSnippets.map((snippet) => (
                <Link
                  key={snippet.id}
                  to={`/snippets/${snippet.id}`}
                  className="block rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3 transition hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)]"
                >
                  <p className="text-sm font-medium text-[var(--text-primary)]">{snippet.title}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {snippet.language} | {snippet.author.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
