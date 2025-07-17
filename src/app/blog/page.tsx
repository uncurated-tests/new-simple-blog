'use client'

import Link from 'next/link'
import { usePosts } from '@/lib/hooks'

export default function BlogPage() {
  const { posts, isLoading, isError } = usePosts()

  if (isError) {
    return (
      <div className="text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Failed to load posts. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 border animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-6">
        {posts?.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow-sm p-6 border hover:shadow-md transition-shadow">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span>By {post.author} <span className="text-gray-500">@{post.username}</span></span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 