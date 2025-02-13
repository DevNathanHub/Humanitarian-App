import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// CREATE Post
export async function POST(req: Request) {
  try {
    const { title, body, userId } = await req.json();
    const post = await prisma.post.create({
      data: { title, body, userId },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating post' }, { status: 400 });
  }
}

// GET All Posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true }, // Include comments for each post
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 400 });
  }
}
