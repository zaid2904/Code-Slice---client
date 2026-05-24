import { Button } from '@/components/ui/Button'
import { useAppData } from '@/hooks/useAppData'
import type { SnippetLanguage } from '@/types'
import hljs from 'highlight.js'
import { useMemo, useState } from 'react'

const languageMap: Record<SnippetLanguage, string> = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  React: 'jsx',
  SQL: 'sql',
  Python: 'python',
  'C++': 'cpp',
  Java: 'java',
  Bash: 'bash',
}

interface CodeBlockProps {
  code: string
  language: SnippetLanguage
  compact?: boolean
}

export function CodeBlock({ code, language, compact }: CodeBlockProps) {
  const { pushToast } = useAppData()
  const [copied, setCopied] = useState(false)

  const highlightedCode = useMemo(() => {
    const result = hljs.highlight(code, {
      language: languageMap[language] ?? 'javascript',
      ignoreIllegals: true,
    })

    return result.value
  }, [code, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    pushToast({
      title: 'Code copied',
      description: `${language} snippet is ready to paste.`,
      tone: 'success',
    })
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--border-subtle)] bg-[var(--surface-1)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="ui-code rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-1)] px-3 py-1 text-[0.64rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {language}
          </span>
          <span className="text-xs text-[var(--text-muted)]">Monochrome syntax</span>
        </div>
        <Button size="sm" onClick={handleCopy} variant="secondary">
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className={compact ? 'overflow-auto p-4 text-sm' : 'overflow-auto p-5 text-[0.92rem]'}>
        <code
          className="ui-code leading-7 text-[var(--text-secondary)]"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  )
}
