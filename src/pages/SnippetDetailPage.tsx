import { Button } from '@/components/ui/Button'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Tag } from '@/components/ui/Tag'
import { comments } from '@/data/mockData'
import { useAppData } from '@/hooks/useAppData'
import { fetchSnippetById } from '@/services/snippetService'
import type { Snippet } from '@/types'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function SnippetDetailPage() {
  const { snippetId } = useParams()
  const { allSnippets, likedSnippetIds, savedSnippetIds, toggleLikedSnippet, toggleSavedSnippet, pushToast } = useAppData()
  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(true)
  const [assistantOpen, setAssistantOpen] = useState(false)

  useEffect(() => {
    let active = true

    fetchSnippetById(snippetId ?? '')
      .then((result) => {
        if (active) {
          setSnippet(result)
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
  }, [snippetId])

  const relatedSnippets = useMemo(() => {
    return allSnippets.filter((item) => item.id !== snippet?.id).slice(0, 3)
  }, [allSnippets, snippet?.id])

  if (loading) {
    return <div className="ui-panel p-8 text-sm text-[var(--text-secondary)]">Loading snippet...</div>
  }

  if (!snippet) {
    return (
      <EmptyState
        title="Snippet not found"
        description="The requested snippet could not be located in the current feed."
        actionLabel="Return to feed"
        onAction={() => window.history.back()}
      />
    )
  }

  const isLiked = likedSnippetIds.includes(snippet.id)
  const isSaved = savedSnippetIds.includes(snippet.id)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      <div className="grid gap-6 xl:grid-cols-[1.22fr_0.78fr]">
        <section className="space-y-5">
          <div className="ui-panel p-7">
            <p className="ui-kicker">Snippet Detail</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{snippet.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">{snippet.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {snippet.tags.map((tag) => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  toggleLikedSnippet(snippet.id)
                  pushToast({ title: isLiked ? 'Removed like' : 'Liked snippet', tone: 'success' })
                }}
              >
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  toggleSavedSnippet(snippet.id)
                  pushToast({ title: isSaved ? 'Bookmark removed' : 'Bookmark saved', tone: 'success' })
                }}
              >
                {isSaved ? 'Saved' : 'Bookmark'}
              </Button>
              <Button variant="ghost" onClick={() => setAssistantOpen(true)}>
                AI Assistant
              </Button>
            </div>
          </div>

          <CodeBlock code={snippet.code} language={snippet.language} />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="ui-panel p-5">
              <p className="ui-kicker">Author</p>
              <div className="mt-4 flex items-center gap-4">
                <img src={snippet.author.avatar} alt={snippet.author.name} className="h-14 w-14 rounded-2xl object-cover" />
                <div>
                  <p className="text-base font-semibold text-[var(--text-primary)]">{snippet.author.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{snippet.author.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{snippet.author.bio}</p>
            </div>
            <div className="ui-panel p-5">
              <p className="ui-kicker">Engagement</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="ui-panel-soft p-3">
                  <p className="text-[var(--text-muted)]">Likes</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{snippet.likes}</p>
                </div>
                <div className="ui-panel-soft p-3">
                  <p className="text-[var(--text-muted)]">Bookmarks</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{snippet.bookmarks}</p>
                </div>
                <div className="ui-panel-soft p-3">
                  <p className="text-[var(--text-muted)]">Views</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{snippet.views}</p>
                </div>
                <div className="ui-panel-soft p-3">
                  <p className="text-[var(--text-muted)]">Created</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{snippet.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          <div className="ui-panel p-5">
            <p className="ui-kicker">Author Info</p>
            <p className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{snippet.author.name}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{snippet.author.handle}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{snippet.author.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-[var(--text-secondary)]">
                Followers {snippet.author.followers.toLocaleString()}
              </span>
              <span className="rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-[var(--text-secondary)]">
                Following {snippet.author.following}
              </span>
            </div>
          </div>

          <div className="ui-panel p-5">
            <p className="ui-kicker">Comments</p>
            <div className="mt-4 space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="ui-panel-soft p-4">
                  <div className="flex items-center gap-3">
                    <img src={comment.avatar} alt={comment.author} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{comment.author}</p>
                      <p className="text-xs text-[var(--text-muted)]">{comment.createdAt}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{comment.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ui-panel p-5">
            <p className="ui-kicker">Related</p>
            <div className="mt-4 space-y-3">
              {relatedSnippets.map((related) => (
                <Link
                  key={related.id}
                  to={`/snippets/${related.id}`}
                  className="block rounded-2xl border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] p-4 transition hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)]"
                >
                  <p className="text-sm font-medium text-[var(--text-primary)]">{related.title}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {related.language} | {related.author.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Modal open={assistantOpen} onClose={() => setAssistantOpen(false)} title="Workspace Assistant" description="Future: ask the assistant to explain, refactor, or generate adjacent code.">
        <div className="space-y-3 text-sm text-[var(--text-secondary)]">
          <div className="ui-panel-soft p-4">Explain this snippet line by line.</div>
          <div className="ui-panel-soft p-4">Generate a TypeScript variant for this pattern.</div>
          <Button variant="primary" className="mt-2" onClick={() => setAssistantOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </motion.div>
  )
}
