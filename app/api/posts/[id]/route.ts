import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// GET Post by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { comments: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching post" },
      { status: 500 }
    );
  }
}

// UPDATE Post
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, body } = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: { title, body },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating post" },
      { status: 500 }
    );
  }
}

// DELETE Post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting post" },
      { status: 500 }
    );
  }
}
