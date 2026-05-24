import { cn } from '@/lib/cn'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-2xl bg-[linear-gradient(110deg,var(--surface-soft),var(--surface-hover),var(--surface-soft))] bg-[length:200%_100%]',
        className,
      )}
    />
  )
}

export function SnippetCardSkeleton() {
  return (
    <div className="ui-panel p-5">
      <Skeleton className="h-6 w-28" />
      <Skeleton className="mt-4 h-8 w-4/5" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-3/4" />
      <div className="mt-5 flex gap-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-12" />
      </div>
    </div>
  )
}
