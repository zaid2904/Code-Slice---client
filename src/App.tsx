import { AppShell } from '@/components/layout/AppShell'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { ToastCenter } from '@/components/ui/ToastCenter'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { CreateSnippetPage } from '@/pages/CreateSnippetPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { SnippetDetailPage } from '@/pages/SnippetDetailPage'
import { SnippetFeedPage } from '@/pages/SnippetFeedPage'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

function TransitionOutlet() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}

function PublicLayout() {
  return (
    <AppShell sidebar={false}>
      <TransitionOutlet />
    </AppShell>
  )
}

function WorkspaceLayout() {
  return (
    <AppShell>
      <TransitionOutlet />
    </AppShell>
  )
}

function AuthLayout() {
  return <Outlet />
}

export default function App() {
  return (
    <div className="min-h-screen">
      <ToastCenter />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/snippets" element={<SnippetFeedPage />} />
          <Route path="/snippets/:snippetId" element={<SnippetDetailPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<WorkspaceLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create" element={<CreateSnippetPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
          </Route>
        </Route>

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
