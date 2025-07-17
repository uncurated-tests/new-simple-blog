import useSWR, { mutate } from 'swr'
import { useEffect } from 'react'

// Define types for our data
export interface PostSummary {
  slug: string
  title: string
  author: string
  username: string
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

  // Pre-populate individual post caches when posts list is loaded
  useEffect(() => {
    if (data && !error) {
      // Fetch and cache individual posts in parallel
      data.forEach(async (postSummary) => {
        try {
          // Fetch the full post data
          const fullPost = await fetcher(`/api/posts/${postSummary.slug}`)
          // Pre-populate the cache for this individual post
          mutate(`/api/posts/${postSummary.slug}`, fullPost, false)
        } catch (error) {
          // Silently fail - individual post will be fetched when needed
          console.warn(`Failed to preload post ${postSummary.slug}:`, error)
        }
      })
    }
  }, [data, error])

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