import { snippets } from '@/data/mockData'
import { api } from '@/services/api'
import type { Snippet } from '@/types'
import axios from 'axios'

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

export async function fetchSnippetFeed(): Promise<Snippet[]> {
  try {
    const response = await api.get<Snippet[]>('/snippets')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      await wait(420)
      return snippets
    }

    throw error
  }
}

export async function fetchSnippetById(snippetId: string): Promise<Snippet | null> {
  const feed = await fetchSnippetFeed()
  return feed.find((snippet) => snippet.id === snippetId) ?? null
}
