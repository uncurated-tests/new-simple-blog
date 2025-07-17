'use client'

import Link from 'next/link'
import { usePost } from '@/lib/hooks'
import { use } from 'react'

interface PostPageProps {
  params: Promise<{
    post: string
  }>
}

export default function PostPage({ params }: PostPageProps) {
  const resolvedParams = use(params)
  const { post, isLoading, isError } = usePost(resolvedParams.post)

  if (isError) {
    return (
      <div className="text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Post Not Found</h1>
          <p className="text-red-600 mb-4">The post you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  if (!post) {
    if (isLoading) {
      return (
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="text-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600">Post not found.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          ← Back to Blog
        </Link>
      </div>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <span>By {post.author}</span>
          <span>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-8 border">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </div>
      </div>
    </article>
  )
} 