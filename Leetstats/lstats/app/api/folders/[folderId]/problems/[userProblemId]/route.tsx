import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

//Gets the folder plus the contents within in it
export async function DELETE(
  request: Request,
  { params }: { params: { folderId: string; userProblemId: string } }
) {
  const { folderId } = await params;
  const { userProblemId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //Check if the folder belongs to the user first
  const folder = await prisma.folder.findFirst({
    where: {
      id: folderId,
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
    const folderWithProblems = await prisma.folderWithProblems.deleteMany({
      where: {
        folderId: folderId,
        userProblemId: userProblemId,
      },
    });
    if (folderWithProblems.count === 0) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Problem deleted" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting problem", err);
    return NextResponse.json(
      { error: "Unable delete problem from folder" },
      { status: 500 }
    );
  }
}
