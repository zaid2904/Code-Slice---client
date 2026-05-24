import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { adminMetrics } from '@/data/mockData'
import { motion } from 'framer-motion'

const users = [
  { name: 'Ava Thompson', role: 'Moderator', status: 'Active' },
  { name: 'Noah Patel', role: 'Community', status: 'Review needed' },
  { name: 'Lina Gomez', role: 'Creator', status: 'Trusted' },
  { name: 'Ethan Park', role: 'Admin', status: 'Online' },
]

const reports = [
  { title: 'Spam links detected', detail: '3 snippets reported across two categories.' },
  { title: 'Duplicate content', detail: 'Potential duplicates grouped for moderation.' },
  { title: 'Policy reminder', detail: 'New creators are being routed to onboarding.' },
]

export function AdminPanelPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      <SectionHeading
        eyebrow="Admin"
        title="Moderation, analytics, and reports in one calm control room"
        description="Focused information density with compact controls and higher readability for day-to-day operations."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => (
          <div key={metric.label} className="ui-panel p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{metric.value}</p>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">{metric.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <section className="ui-panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="ui-kicker">Manage Users</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">Moderation queue</h3>
            </div>
            <Button variant="secondary" size="sm">
              Export
            </Button>
          </div>
          <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-[color:var(--border-subtle)]">
            <table className="min-w-full divide-y divide-[color:var(--border-subtle)] text-left text-sm">
              <thead className="bg-[var(--surface-soft)] text-[var(--text-muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-secondary)]">
                {users.map((user) => (
                  <tr key={user.name}>
                    <td className="px-4 py-4 font-medium text-[var(--text-primary)]">{user.name}</td>
                    <td className="px-4 py-4">{user.role}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full border border-[color:var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-5">
          <div className="ui-panel p-6">
            <p className="ui-kicker">Analytics</p>
            <div className="mt-5 space-y-4">
              {[
                { label: 'Snippet submissions', value: 84 },
                { label: 'Reports resolved', value: 72 },
                { label: 'Flagged content', value: 18 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">{item.label}</span>
                    <span className="text-[var(--text-muted)]">{item.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                    <div className="h-full rounded-full bg-[var(--text-primary)]/70" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ui-panel p-6">
            <p className="ui-kicker">Reports</p>
            <div className="mt-4 space-y-3">
              {reports.map((report) => (
                <div key={report.title} className="ui-panel-soft p-4">
                  <p className="font-medium text-[var(--text-primary)]">{report.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{report.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}
