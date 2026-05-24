import { SnippetCard } from '@/components/snippet/SnippetCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { LanguageFilter } from '@/components/ui/LanguageFilter'
import { Pagination } from '@/components/ui/Pagination'
import { SearchBar } from '@/components/ui/SearchBar'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SnippetCardSkeleton } from '@/components/ui/Skeleton'
import { Tag } from '@/components/ui/Tag'
import { languages, trendingTags } from '@/data/mockData'
import { fetchSnippetFeed } from '@/services/snippetService'
import type { Snippet } from '@/types'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

const pageSize = 4

export function SnippetFeedPage() {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('All')
  const [selectedTag, setSelectedTag] = useState('all')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [snippets, setSnippets] = useState<Snippet[]>([])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    setPage(1)
  }

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    setPage(1)
  }

  useEffect(() => {
    let active = true

    fetchSnippetFeed()
      .then((feed) => {
        if (active) {
          setSnippets(feed)
        }
      })
      .catch(() => {
        if (active) {
          setError('Unable to load the snippet feed at the moment.')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const matchesLanguage = language === 'All' || snippet.language === language
      const matchesTag = selectedTag === 'all' || snippet.tags.includes(selectedTag)
      const searchValue = `${snippet.title} ${snippet.description} ${snippet.author.name} ${snippet.tags.join(' ')}`.toLowerCase()
      const matchesQuery = searchValue.includes(query.toLowerCase())

      return matchesLanguage && matchesTag && matchesQuery
    })
  }, [language, query, selectedTag, snippets])

  const totalPages = Math.max(1, Math.ceil(filteredSnippets.length / pageSize))
  const pagedSnippets = filteredSnippets.slice((page - 1) * pageSize, page * pageSize)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      <SectionHeading
        eyebrow="Feed"
        title="Find reusable code in seconds"
        description="Search by topic, language, and tag with a clean ranking flow built for fast developer scanning."
      />

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="space-y-5">
          <div className="ui-panel p-4">
            <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
              <SearchBar value={query} onChange={handleQueryChange} placeholder="Search title, author, or tag" />
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] p-2">
                <LanguageFilter languages={languages} value={language} onChange={handleLanguageChange} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag active={selectedTag === 'all'} onClick={() => handleTagChange('all')}>
                All tags
              </Tag>
              {trendingTags.slice(0, 8).map((tag) => (
                <Tag key={tag} active={selectedTag === tag} onClick={() => handleTagChange(tag)}>
                  #{tag}
                </Tag>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <SnippetCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <EmptyState title="Feed unavailable" description={error} actionLabel="Try again" onAction={() => window.location.reload()} />
          ) : pagedSnippets.length === 0 ? (
            <EmptyState
              title="No results"
              description="Try changing the search query, language, or tag."
              actionLabel="Clear filters"
              onAction={() => {
                setQuery('')
                setLanguage('All')
                setSelectedTag('all')
                setPage(1)
              }}
            />
          ) : (
            <div className="grid gap-5">
              {pagedSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          )}

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </section>

        <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          <div className="ui-panel p-5">
            <p className="ui-kicker">Snapshot</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Visible snippets', value: `${filteredSnippets.length}` },
                { label: 'Language', value: language === 'All' ? 'All' : language },
                { label: 'Active tag', value: selectedTag === 'all' ? 'Any' : `#${selectedTag}` },
              ].map((item) => (
                <div key={item.label} className="ui-panel-soft p-3">
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ui-panel p-5">
            <p className="ui-kicker">Trending Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagChange(tag)}
                  className="rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-xs text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  )
}
