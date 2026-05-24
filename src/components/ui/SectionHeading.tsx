import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, title, description, action, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-4', className)}>
      <div>
        {eyebrow ? <p className="ui-kicker">{eyebrow}</p> : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.15rem]">{title}</h2>
        {description ? <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
