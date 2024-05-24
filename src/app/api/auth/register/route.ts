import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const emailFound = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (emailFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const usernameFound = await prisma.user.findUnique({
      where: { username: data.username },
    });
    if (usernameFound) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser: any = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password, ...user } = newUser;
    return NextResponse.json({ status: "success", user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
