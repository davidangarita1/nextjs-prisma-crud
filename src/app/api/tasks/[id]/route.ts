import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

interface GetProps {
  params: {
    id: number;
  };
}

export async function GET(request: Request, { params }: GetProps) {
  const result = await prisma.task.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ status: "success", data: result });
}

export async function PUT(request: Request, { params }: GetProps) {
  const data = await request.json();
  const taskUpdated = await prisma.task.update({
    where: { id: Number(params.id) },
    data,
  });

  return NextResponse.json({ status: "success", data: taskUpdated });
}

export async function DELETE(request: Request, { params }: GetProps) {
  try {
    const [taskRemoved]: any = await prisma.task.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ status: "success", data: taskRemoved.id });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error });
  }
}
