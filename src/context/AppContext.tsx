import { currentUser, snippets } from '@/data/mockData'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { Snippet, ThemeMode, ToastMessage, User } from '@/types'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface AppContextValue {
  theme: ThemeMode
  toggleTheme: () => void
  toasts: ToastMessage[]
  pushToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  currentUser: User | null
  savedSnippetIds: string[]
  toggleSavedSnippet: (snippetId: string) => void
  likedSnippetIds: string[]
  toggleLikedSnippet: (snippetId: string) => void
  allSnippets: Snippet[]
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

function makeToastId() {
  return Math.random().toString(36).slice(2, 10)
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<ThemeMode>('code-slice-theme', 'dark')
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>(
    'code-slice-auth',
    true,
  )
  const [savedSnippetIds, setSavedSnippetIds] = useLocalStorage<string[]>('code-slice-saved', [
    'snippet-1',
    'snippet-4',
  ])
  const [likedSnippetIds, setLikedSnippetIds] = useLocalStorage<string[]>(
    'code-slice-liked',
    ['snippet-2'],
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      toasts,
      pushToast: (toast) => {
        const id = makeToastId()
        setToasts((currentToasts) => [{ id, ...toast }, ...currentToasts].slice(0, 4))
        window.setTimeout(() => {
          setToasts((currentToasts) => currentToasts.filter((item) => item.id !== id))
        }, 2800)
      },
      removeToast: (id) => setToasts((currentToasts) => currentToasts.filter((item) => item.id !== id)),
      isAuthenticated,
      login: () => setIsAuthenticated(true),
      logout: () => setIsAuthenticated(false),
      currentUser: isAuthenticated ? currentUser : null,
      savedSnippetIds,
      toggleSavedSnippet: (snippetId) => {
        setSavedSnippetIds((currentIds: string[]) =>
          currentIds.includes(snippetId)
            ? currentIds.filter((id) => id !== snippetId)
            : [...currentIds, snippetId],
        )
      },
      likedSnippetIds,
      toggleLikedSnippet: (snippetId) => {
        setLikedSnippetIds((currentIds: string[]) =>
          currentIds.includes(snippetId)
            ? currentIds.filter((id) => id !== snippetId)
            : [...currentIds, snippetId],
        )
      },
      allSnippets: snippets.map((snippet: Snippet) => ({
        ...snippet,
        saved: savedSnippetIds.includes(snippet.id),
      })),
    }),
    [
      isAuthenticated,
      likedSnippetIds,
      savedSnippetIds,
      setIsAuthenticated,
      setLikedSnippetIds,
      setSavedSnippetIds,
      setTheme,
      theme,
      toasts,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}
