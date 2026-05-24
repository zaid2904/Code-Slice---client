import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
  sidebar?: boolean
}

export function AppShell({ children, sidebar = true }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1280px] gap-8 px-4 pb-14 pt-8 sm:px-6 lg:px-10">
        {sidebar ? <Sidebar /> : null}
        <div className="min-w-0 flex-1">{children}</div>
      </main>
    </div>
  )
}
