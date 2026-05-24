import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { useAppData } from '@/hooks/useAppData'
import { cn } from '@/lib/cn'
import type { Snippet } from '@/types'
import { Link } from 'react-router-dom'

interface SnippetCardProps {
  snippet: Snippet
  compact?: boolean
}

export function SnippetCard({ snippet, compact }: SnippetCardProps) {
  const { toggleLikedSnippet, toggleSavedSnippet, likedSnippetIds, savedSnippetIds, pushToast } = useAppData()
  const isLiked = likedSnippetIds.includes(snippet.id)
  const isSaved = savedSnippetIds.includes(snippet.id)

  const handleAction = (action: () => void, message: string) => {
    action()
    pushToast({ title: message, tone: 'success' })
  }

  return (
    <article
      className={cn(
        'ui-panel group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--border-strong)]',
        compact && 'p-4',
      )}
    >
      {snippet.trending ? (
        <span className="absolute right-4 top-4 rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Trending
        </span>
      ) : null}

      <div className="flex items-start gap-4">
        <img src={snippet.author.avatar} alt={snippet.author.name} className="h-11 w-11 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-[var(--text-muted)]">
            <span>{snippet.author.name}</span>
            <span>|</span>
            <span>{snippet.createdAt}</span>
            <span>|</span>
            <span>{snippet.views} views</span>
          </div>
          <Link to={`/snippets/${snippet.id}`} className="mt-2 block">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] transition group-hover:text-[var(--text-secondary)]">
              {snippet.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{snippet.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {snippet.tags.map((tag) => (
          <Tag key={tag}>#{tag}</Tag>
        ))}
      </div>

      <div className="ui-panel-soft mt-5 bg-[var(--surface-2)] p-4 ui-code text-xs leading-7 text-[var(--text-secondary)]">
        {snippet.code.split('\n').slice(0, compact ? 5 : 7).join('\n')}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAction(() => toggleLikedSnippet(snippet.id), isLiked ? 'Removed from likes' : 'Added to likes')}
          >
            {isLiked ? 'Liked' : 'Like'} {snippet.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleAction(() => toggleSavedSnippet(snippet.id), isSaved ? 'Bookmark removed' : 'Snippet saved')}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
        <Link
          to={`/snippets/${snippet.id}`}
          className="rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        >
          Open
        </Link>
      </div>
    </article>
  )
}
