import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const postsPath = path.join(process.cwd(), 'posts.json')
    const postsData = fs.readFileSync(postsPath, 'utf8')
    const posts = JSON.parse(postsData)
    
    // Return only the required fields for the list
    const postsList = posts.map((post: any) => ({
      slug: post.slug,
      title: post.title,
      author: post.author,
      date: post.date,
    }))
    
    return NextResponse.json(postsList)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
} 