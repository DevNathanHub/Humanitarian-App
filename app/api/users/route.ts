// /app/api/users/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET All Users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 400 });
  }
}

// CREATE User
export async function POST(req: Request) {
  const { email, name, role } = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        role,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 400 });
  }
}
