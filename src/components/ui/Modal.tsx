import { Button } from '@/components/ui/Button'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, description, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            className="w-full max-w-xl rounded-[1.75rem] border border-[color:var(--border-subtle)] bg-[var(--surface-1)] p-6 shadow-[var(--shadow-soft)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--text-primary)]">{title}</h3>
                {description ? <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p> : null}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
                Close
              </Button>
            </div>
            <div className="mt-6">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
