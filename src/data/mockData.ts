import type {
  AdminMetric,
  Feature,
  Snippet,
  Stat,
  Testimonial,
  User,
} from '@/types'

export const languages = [
  'All',
  'JavaScript',
  'TypeScript',
  'React',
  'SQL',
  'Python',
  'C++',
  'Java',
  'Bash',
]

export const trendingTags = [
  'array',
  'dp',
  'binary-search',
  'react-hooks',
  'sql-joins',
  'interview',
  'memoization',
  'graph',
  'frontend',
  'utility',
]

export const features: Feature[] = [
  {
    title: 'Reusable snippet vault',
    description:
      'Organize compact, polished snippets by language, topic, and difficulty with a workflow that feels like your own personal dev toolbox.',
    icon: '01',
  },
  {
    title: 'Fast discovery',
    description:
      'Search, filter, and browse trending code patterns without friction so you can get from question to solution quickly.',
    icon: '02',
  },
  {
    title: 'Built for sharing',
    description:
      'Clean cards, readable syntax highlighting, and social-proof details make every snippet look ready for a community feed.',
    icon: '03',
  },
  {
    title: 'Developer-first UX',
    description:
      'Keyboard shortcuts, copy actions, and live previews keep the interface sharp for people who live in code.',
    icon: '04',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'Code Slice feels like the missing layer between a notes app and a social platform. I can save interview patterns in seconds.',
    name: 'Arihant Rao',
    role: 'Frontend Engineer',
    company: 'LinearStack',
  },
  {
    quote:
      'The snippet cards are clean enough to share in a team review and fast enough to use during prep sessions.',
    name: 'Maya Chen',
    role: 'Staff Developer',
    company: 'Northstar Labs',
  },
  {
    quote:
      'This layout nails the balance between modern SaaS polish and practical developer utility.',
    name: 'Jordan Lee',
    role: 'Platform Engineer',
    company: 'Cloudcraft',
  },
]

export const stats: Stat[] = [
  { label: 'Snippets saved', value: '12.4k', trend: '+18% this week' },
  { label: 'Active creators', value: '3.8k', trend: '+9% this month' },
  { label: 'Avg. snippet rating', value: '4.9/5', trend: 'Top 2% in platform' },
  { label: 'Interview queries solved', value: '21k', trend: '+31% since last sprint' },
]

export const adminMetrics: AdminMetric[] = [
  { label: 'Users', value: '8,492', change: '+12.4%' },
  { label: 'Published snippets', value: '14,328', change: '+8.1%' },
  { label: 'Reports resolved', value: '96%', change: '+3.2%' },
  { label: 'Flagged content', value: '24', change: '-16%' },
]

export const sidebarLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Feed', href: '/snippets' },
  { label: 'Create', href: '/create' },
  { label: 'Profile', href: '/profile' },
  { label: 'Admin', href: '/admin' },
]

export const developerShortcuts = [
  'Ctrl K search snippets',
  'Ctrl / open filter drawer',
  'C copy highlighted code',
  'B bookmark snippet',
]

const author: User = {
  id: 'u1',
  name: 'Riya Patel',
  handle: '@riya.codes',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  role: 'Full Stack Developer',
  bio: 'Builds helpful UI systems and shares interview-ready code patterns.',
  followers: 18400,
  following: 231,
}

const secondAuthor: User = {
  id: 'u2',
  name: 'Devon Brooks',
  handle: '@devonstack',
  avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  role: 'Backend Engineer',
  bio: 'Loves database tuning, APIs, and battle-tested utilities.',
  followers: 9200,
  following: 184,
}

const thirdAuthor: User = {
  id: 'u3',
  name: 'Anika Sharma',
  handle: '@anikasharma',
  avatar:
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
  role: 'React Specialist',
  bio: 'Crafting reusable components and teaching clean frontend architecture.',
  followers: 11400,
  following: 312,
}

export const snippets: Snippet[] = [
  {
    id: 'snippet-1',
    title: 'Binary search first greater element',
    description:
      'A compact pattern for finding the first value greater than a target in sorted arrays.',
    language: 'JavaScript',
    tags: ['binary-search', 'array', 'interview'],
    code: `function firstGreater(arr, target) {
  let left = 0
  let right = arr.length - 1
  let answer = -1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] > target) {
      answer = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return answer
}`,
    author,
    likes: 482,
    bookmarks: 128,
    views: '9.4k',
    createdAt: '2h ago',
    trending: true,
    saved: true,
  },
  {
    id: 'snippet-2',
    title: 'React debounce hook',
    description:
      'A reusable hook that delays updates until the user pauses typing, perfect for search inputs.',
    language: 'React',
    tags: ['react-hooks', 'performance', 'search'],
    code: `import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}`,
    author: thirdAuthor,
    likes: 368,
    bookmarks: 94,
    views: '7.1k',
    createdAt: '4h ago',
    trending: true,
  },
  {
    id: 'snippet-3',
    title: 'SQL top customers by revenue',
    description:
      'A window-function query for ranking customers and keeping the output ready for dashboards.',
    language: 'SQL',
    tags: ['sql-joins', 'analytics', 'ranking'],
    code: `WITH ranked_sales AS (
  SELECT
    customer_id,
    SUM(total_amount) AS revenue,
    DENSE_RANK() OVER (ORDER BY SUM(total_amount) DESC) AS revenue_rank
  FROM orders
  GROUP BY customer_id
)
SELECT *
FROM ranked_sales
WHERE revenue_rank <= 10
ORDER BY revenue_rank, customer_id;`,
    author: secondAuthor,
    likes: 214,
    bookmarks: 61,
    views: '4.8k',
    createdAt: '6h ago',
  },
  {
    id: 'snippet-4',
    title: 'Two-pointer container max area',
    description:
      'Classic interview solution using two pointers to minimize complexity and maximize clarity.',
    language: 'C++',
    tags: ['array', 'two-pointer', 'interview'],
    code: `int maxArea(vector<int>& height) {
  int left = 0;
  int right = height.size() - 1;
  int best = 0;

  while (left < right) {
    best = max(best, min(height[left], height[right]) * (right - left));
    if (height[left] < height[right]) {
      ++left;
    } else {
      --right;
    }
  }

  return best;
}`,
    author: thirdAuthor,
    likes: 541,
    bookmarks: 146,
    views: '11.2k',
    createdAt: '1d ago',
    saved: true,
  },
  {
    id: 'snippet-5',
    title: 'Java null-safe builder',
    description:
      'A utility pattern for composing immutable objects without noisy null checks.',
    language: 'Java',
    tags: ['utility', 'builder', 'java'],
    code: `public final class AccountBuilder {
  private String name;
  private String email;

  public AccountBuilder name(String value) {
    this.name = value;
    return this;
  }

  public AccountBuilder email(String value) {
    this.email = value;
    return this;
  }

  public Account build() {
    return new Account(Objects.requireNonNull(name), email == null ? "" : email);
  }
}`,
    author,
    likes: 173,
    bookmarks: 51,
    views: '3.1k',
    createdAt: '1d ago',
  },
  {
    id: 'snippet-6',
    title: 'Promise pool for API batching',
    description:
      'Keeps a limited number of async tasks in flight to prevent browser or API overload.',
    language: 'TypeScript',
    tags: ['async', 'api', 'performance'],
    code: `export async function promisePool<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  const queue = [...items]
  const active = new Set<Promise<void>>()

  while (queue.length > 0 || active.size > 0) {
    while (queue.length > 0 && active.size < limit) {
      const item = queue.shift()!
      const task = worker(item).finally(() => active.delete(task))
      active.add(task)
    }

    if (active.size > 0) {
      await Promise.race(active)
    }
  }
}`,
    author: secondAuthor,
    likes: 293,
    bookmarks: 77,
    views: '5.6k',
    createdAt: '2d ago',
    trending: true,
  },
]

export const comments = [
  {
    id: 'c1',
    author: 'Sana',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
    body: 'This is the exact pattern I use for interview prep. Clean and production-ready.',
    createdAt: '15m ago',
  },
  {
    id: 'c2',
    author: 'Marco',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    body: 'The explanation and code size together make this easy to review quickly.',
    createdAt: '1h ago',
  },
]

export const currentUser: User = {
  id: 'me',
  name: 'Code Slice User',
  handle: '@codeslice',
  avatar:
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80',
  role: 'Product Engineer',
  bio: 'Builds polished product experiences and saves snippets for interview prep.',
  followers: 4300,
  following: 187,
}

