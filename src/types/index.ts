export type ThemeMode = 'dark' | 'light'

export type SnippetLanguage =
  | 'JavaScript'
  | 'TypeScript'
  | 'React'
  | 'SQL'
  | 'Python'
  | 'C++'
  | 'Java'
  | 'Bash'

export interface User {
  id: string
  name: string
  handle: string
  avatar: string
  role: string
  bio: string
  followers: number
  following: number
}

export interface Comment {
  id: string
  author: string
  avatar: string
  body: string
  createdAt: string
}

export interface Snippet {
  id: string
  title: string
  description: string
  language: SnippetLanguage
  tags: string[]
  code: string
  author: User
  likes: number
  bookmarks: number
  views: string
  createdAt: string
  trending?: boolean
  saved?: boolean
}

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface Stat {
  label: string
  value: string
  trend: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface ToastMessage {
  id: string
  title: string
  description?: string
  tone?: 'default' | 'success' | 'error'
}

export interface AdminMetric {
  label: string
  value: string
  change: string
}
