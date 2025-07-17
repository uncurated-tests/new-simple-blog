import useSWR from 'swr'

// Define types for our data
export interface PostSummary {
  slug: string
  title: string
  author: string
  date: string
}

export interface Post extends PostSummary {
  content: string
}

// Generic fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Custom hook to fetch all posts
export function usePosts() {
  const { data, error, isLoading } = useSWR<PostSummary[]>('/api/posts', fetcher)

  return {
    posts: data,
    isLoading,
    isError: error
  }
}

// Custom hook to fetch a single post by slug
export function usePost(slug: string) {
  const { data, error, isLoading } = useSWR<Post>(
    slug ? `/api/posts/${slug}` : null,
    fetcher
  )

  return {
    post: data,
    isLoading,
    isError: error
  }
} 