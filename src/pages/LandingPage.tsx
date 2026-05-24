import { SnippetCard } from '@/components/snippet/SnippetCard'
import { Button } from '@/components/ui/Button'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { Modal } from '@/components/ui/Modal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { features, stats, testimonials } from '@/data/mockData'
import { useAppData } from '@/hooks/useAppData'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function LandingPage() {
  const { allSnippets } = useAppData()
  const [assistantOpen, setAssistantOpen] = useState(false)
  const trendingSnippets = allSnippets.filter((snippet) => snippet.trending).slice(0, 3)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 pb-10">
      <section className="ui-panel ui-spotlight overflow-hidden p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-6">
            <p className="ui-kicker">Developer Snippet Platform</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-6xl">
              Build and share code in a workspace that feels premium.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              A calm interface for writing, organizing, and shipping reusable snippets with instant preview and keyboard-first flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Start Building
                </Button>
              </Link>
              <Link to="/snippets">
                <Button variant="secondary" size="lg">
                  Explore Feed
                </Button>
              </Link>
              <Button variant="ghost" size="lg" onClick={() => setAssistantOpen(true)}>
                Open Assistant
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Fast search', 'Instant preview', 'Code-first flow'].map((item) => (
                <div key={item} className="ui-panel-soft px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <CodeBlock code={trendingSnippets[0]?.code ?? ''} language={trendingSnippets[0]?.language ?? 'JavaScript'} />
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="ui-panel p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{stat.value}</p>
                  <p className="mt-2 text-xs text-[var(--text-secondary)]">{stat.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Trending" title="What developers are saving right now" description="Compact, practical patterns with strong readability and quick copy actions." />
        <div className="grid gap-5 lg:grid-cols-3">
          {trendingSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} compact />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Features" title="Designed for shipping velocity" description="Purpose-built for engineers who need less interface noise and faster retrieval." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="ui-panel p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--border-strong)]">
              <p className="ui-code text-[0.64rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">{feature.icon}</p>
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading eyebrow="Testimonials" title="Loved by teams who ship" description="Product feedback from engineers using Code Slice in their daily workflow." />
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="ui-panel p-6">
              <blockquote className="text-sm leading-7 text-[var(--text-secondary)]">"{testimonial.quote}"</blockquote>
              <figcaption className="mt-5 text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">{testimonial.name}</span> | {testimonial.role}, {testimonial.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="ui-panel p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-[var(--text-primary)]">Code Slice</p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              A focused developer workspace for reusable snippet management, discovery, and sharing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/snippets">
              <Button variant="secondary">Browse Feed</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary">Open Workspace</Button>
            </Link>
          </div>
        </div>
      </footer>

      <Modal open={assistantOpen} onClose={() => setAssistantOpen(false)} title="Workspace Assistant" description="A future assistant could suggest snippets, answer questions, and generate drafts.">
        <div className="space-y-4 text-sm text-[var(--text-secondary)]">
          <div className="ui-panel-soft p-4">Try: "show me a React debounce hook"</div>
          <div className="ui-panel-soft p-4">Try: "find SQL ranking patterns"</div>
        </div>
      </Modal>
    </motion.div>
  )
}
