import { Button } from '@/components/ui/Button'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { Modal } from '@/components/ui/Modal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Tag } from '@/components/ui/Tag'
import { useAppData } from '@/hooks/useAppData'
import type { SnippetLanguage } from '@/types'
import { motion } from 'framer-motion'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'

const languages: SnippetLanguage[] = ['JavaScript', 'TypeScript', 'React', 'SQL', 'Python', 'C++', 'Java', 'Bash']

const initialCode = `function greet(name) {
  return \`Hello, ${'${name}'}!\`
}`

function renderMarkdown(text: string) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return escaped
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
}

export function CreateSnippetPage() {
  const { pushToast } = useAppData()
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [title, setTitle] = useState('Binary search lower bound')
  const [description, setDescription] = useState('A concise **lower bound** helper for sorted arrays with a clean React-style preview.')
  const [language, setLanguage] = useState<SnippetLanguage>('TypeScript')
  const [tags, setTags] = useState('binary-search, array, interview')
  const [code, setCode] = useState(initialCode)

  const tagList = useMemo(() => tags.split(',').map((tag) => tag.trim()).filter(Boolean), [tags])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    pushToast({ title: 'Snippet saved locally', description: 'This mock form is ready for backend integration.', tone: 'success' })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      <SectionHeading
        eyebrow="Create"
        title="Write in flow, preview in real time"
        description="A focused editor workspace with compact metadata controls, keyboard-first writing, and a polished monochrome preview."
      />

      <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
        <section className="space-y-5">
          <div className="ui-panel p-5">
            <p className="ui-kicker">Snippet Setup</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input className="ui-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Snippet title" required />
              <select
                className="ui-input bg-[var(--surface-1)]"
                value={language}
                onChange={(event) => setLanguage(event.target.value as SnippetLanguage)}
              >
                {languages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className="ui-input mt-3 min-h-24 resize-y"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Short summary for the feed"
            />
            <input className="ui-input mt-3" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="Tags separated by commas" />
          </div>

          <div className="ui-panel overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-subtle)] px-5 py-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.01em] text-[var(--text-primary)]">Code Editor</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Distraction-free writing surface</p>
              </div>
              <Button variant="ghost" type="button" onClick={() => setAssistantOpen(true)}>
                AI Assist
              </Button>
            </div>
            <textarea
              className="ui-code min-h-[500px] w-full resize-y bg-transparent px-5 py-4 text-sm leading-7 text-[var(--text-secondary)] outline-none"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary" size="lg">
              Publish
            </Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => pushToast({ title: 'Draft saved', tone: 'success' })}>
              Save Draft
            </Button>
          </div>
        </section>

        <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          <div className="ui-panel p-5">
            <p className="ui-kicker">Live Preview</p>
            <div className="ui-panel-soft mt-4 p-4">
              <p className="ui-code text-[0.66rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">{language}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {tagList.map((tag) => (
                  <Tag key={tag}>#{tag}</Tag>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]" dangerouslySetInnerHTML={{ __html: renderMarkdown(description) }} />
            </div>
            <div className="mt-4">
              <CodeBlock code={code} language={language} compact />
            </div>
          </div>

          <div className="ui-panel p-5">
            <p className="ui-kicker">Markdown</p>
            <div className="ui-panel-soft mt-3 p-4 text-sm leading-7 text-[var(--text-secondary)]">
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(description) }} />
            </div>
          </div>
        </aside>
      </form>

      <Modal open={assistantOpen} onClose={() => setAssistantOpen(false)} title="Workspace Assistant" description="Future helper for code suggestions, lint hints, and snippet generation.">
        <div className="space-y-3 text-sm text-[var(--text-secondary)]">
          <p className="ui-panel-soft p-4">Generate a JavaScript version of this snippet.</p>
          <p className="ui-panel-soft p-4">Suggest tags and a stronger title.</p>
        </div>
      </Modal>
    </motion.div>
  )
}
