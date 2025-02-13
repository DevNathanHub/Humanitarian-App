import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// GET User by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  console.log('GET /api/users/[id] route', params);
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 400 });
  }
}

// UPDATE User
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email, role } = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { name, email, role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 400 });
  }
}

// DELETE User
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 400 });
  }
}
