import { SnippetCard } from '@/components/snippet/SnippetCard'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatCard } from '@/components/ui/StatCard'
import { useAppData } from '@/hooks/useAppData'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function ProfilePage() {
  const { currentUser, allSnippets } = useAppData()

  if (!currentUser) {
    return null
  }

  const uploadedSnippets = allSnippets.slice(0, 3)
  const savedSnippets = allSnippets.filter((snippet) => snippet.saved).slice(0, 3)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      <section className="ui-panel ui-spotlight p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-5">
            <img src={currentUser.avatar} alt={currentUser.name} className="h-24 w-24 rounded-[1.75rem] object-cover" />
            <div>
              <p className="ui-kicker">Profile</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{currentUser.name}</h1>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {currentUser.handle} | {currentUser.role}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">{currentUser.bio}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/create">
              <Button variant="primary">New Snippet</Button>
            </Link>
            <Link to="/snippets">
              <Button variant="secondary">View Feed</Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Followers" value={currentUser.followers.toLocaleString()} trend="+14%" />
        <StatCard label="Following" value={currentUser.following.toString()} trend="+3%" />
        <StatCard label="Uploaded snippets" value={uploadedSnippets.length.toString()} trend="This month" />
        <StatCard label="Saved snippets" value={savedSnippets.length.toString()} trend="Evergreen" />
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <SectionHeading eyebrow="Uploaded" title="Your recent contributions" />
          <div className="grid gap-5">
            {uploadedSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} compact />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <SectionHeading eyebrow="Network" title="Community around your profile" />
          <div className="ui-panel p-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="ui-panel-soft p-4">
                <p className="text-[var(--text-muted)]">Followers</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{currentUser.followers.toLocaleString()}</p>
              </div>
              <div className="ui-panel-soft p-4">
                <p className="text-[var(--text-muted)]">Following</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{currentUser.following}</p>
              </div>
            </div>
            <div className="ui-panel-soft mt-4 p-4 text-sm text-[var(--text-secondary)]">
              Profile modules are ready for social graph and people discovery extensions.
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading eyebrow="Saved" title="Bookmarks ready to reuse" />
        <div className="grid gap-5 lg:grid-cols-2">
          {savedSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} compact />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
