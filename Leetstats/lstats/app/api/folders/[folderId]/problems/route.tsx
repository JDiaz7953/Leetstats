import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

//Gets the folder plus the contents within in it
export async function POST(
  request: Request,
  { params }: { params: { folderId: string } }
) {
  const id = params.folderId;
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { userProblemId } = body;

  if (!userProblemId || typeof userProblemId !== "string") {
    return NextResponse.json(
      { error: "Problem obtaining userProblemId" },
      { status: 400 }
    );
  }

  //Check if the folder belongs to the user first
  const folder = await prisma.folder.findFirst({
    where: {
      id: id,
      userId: userId,
    },
    select: { id: true },
  });
  if (!folder) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });
  }

  //Check if the userProblem belongs to the user
  const userProblem = await prisma.userProblem.findFirst({
    where: {
      id: userProblemId,
      userId: userId,
    },
    select: { id: true },
  });
  if (!userProblem) {
    return NextResponse.json(
      { error: "Saved Problem not found" },
      { status: 404 }
    );
  }

  try {
    const folderWithProblems = await prisma.folderWithProblems.create({
      data: {
        folderId: id,
        userProblemId: userProblemId,
      },
    });
    return NextResponse.json(folderWithProblems, { status: 201 });
  } catch (err) {
    console.error("error saving problem", err);
    return NextResponse.json(
      { error: "unable to save problem to folder" },
      { status: 409 }
    );
  }
}
