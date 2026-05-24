import { useAppData } from '@/hooks/useAppData'
import { AnimatePresence, motion } from 'framer-motion'

const toneClasses = {
  default: 'border-[color:var(--border-subtle)] bg-[var(--surface-1)]',
  success: 'border-[color:var(--border-strong)] bg-[var(--surface-2)]',
  error: 'border-[color:var(--border-strong)] bg-[var(--surface-1)]',
}

export function ToastCenter() {
  const { toasts, removeToast } = useAppData()

  return (
    <div className="fixed right-4 top-4 z-50 flex w-[min(92vw,24rem)] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className={`rounded-2xl border p-4 shadow-[var(--shadow-soft)] ${toneClasses[toast.tone ?? 'default']}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{toast.title}</p>
                {toast.description ? <p className="mt-1 text-sm text-[var(--text-secondary)]">{toast.description}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
              >
                x
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
