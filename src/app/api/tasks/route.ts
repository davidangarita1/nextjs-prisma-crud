import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json({ status: "success", data: tasks });
}

export async function POST(request: Request) {
  const { title, description } = await request.json();
  const newTask = await prisma.task.create({
    data: {
      title,
      description,
    },
  });
  return NextResponse.json({ status: "success", data: newTask });
}
