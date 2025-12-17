import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(folders, { status: 200 });
  } catch (err) {
    console.error("error fetching folder", err);
    return NextResponse.json(
      { error: "Failed to fetch folder" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  try {
    const body = await request.json();
    const { name } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!name) {
      return NextResponse.json(
        { error: "Folder must have a name" },
        { status: 400 }
      );
    }

    const folder = await prisma.folder.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(folder, { status: 201 });
  } catch (err) {
    console.error("Failed to create folder", err);
    return NextResponse.json(
      { error: "Failed to create folder" },
      { status: 500 }
    );
  }
}
