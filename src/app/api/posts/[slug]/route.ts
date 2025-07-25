import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const postsPath = path.join(process.cwd(), 'posts.json')
    const postsData = fs.readFileSync(postsPath, 'utf8')
    const posts = JSON.parse(postsData)
    
    const post = posts.find((p: any) => p.slug === slug)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const authorFollowers = await new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
      return Math.floor(Math.random() * (10000 - 100 + 1)) + 100
    });
    
    return NextResponse.json({
      ...post,
      twitter: {
        followers: authorFollowers,
        username: post.username,
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
} 