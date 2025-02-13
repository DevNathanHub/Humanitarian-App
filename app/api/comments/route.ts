import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE Comment
export async function POST(req: Request) {
  const { comment, postId } = await req.json();

  try {
    const newComment = await prisma.comment.create({
      data: {
        comment,
        postId,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating comment' }, { status: 400 });
  }
}
export async function GET({ params }: { params: { postId?: string; id?: string } }) {
  try {
    if (params.id) {
      // GET Comment by ID
      const comment = await prisma.comment.findUnique({
        where: { id: params.id },
        include: {
          post: true, // Include post for the comment
        },
      });

      if (!comment) {
        return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
      }

      return NextResponse.json(comment);
    } else if (params.postId) {
      // GET Comments by Post ID
      const comments = await prisma.comment.findMany({
        where: { postId: params.postId },
        include: {
          post: true, // Include the post for each comment
        },
      });
      return NextResponse.json(comments);
    } else {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching comments' }, { status: 400 });
  }
}


// UPDATE Comment
export async function PUT({ params, request }: { params: { id: string }; request: Request }) {
  const { comment } = await request.json();

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: params.id },
      data: { comment },
    });
    return NextResponse.json(updatedComment);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating comment' }, { status: 400 });
  }
}

// DELETE Comment
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    await prisma.comment.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Comment deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting comment' }, { status: 400 });
  }
}
