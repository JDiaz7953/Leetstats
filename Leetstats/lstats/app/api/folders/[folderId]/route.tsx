import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

//Gets the folder plus the contents within in it
export async function GET(
  request: Request,
  { params }: { params: { folderId: string } }
) {
  const { folderId } = await params;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: userId,
      },
      include: {
        folderWithProblems: {
          include: {
            userProblem: {
              include: {
                problem: true,
              },
            },
          },
        },
      },
    });

    if (!folder) {
      return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }

    return NextResponse.json(folder, { status: 200 });
  } catch (err) {
    console.error("Error fetching folder:", err); // console.error?
    return NextResponse.json(
      { error: "failed to fetch folder" },
      { status: 500 }
    );
  }
}

// Deletes a folder from the user
export async function DELETE(
  request: Request,
  { params }: { params: { folderId: string } }
) {
  const { folderId } = await params;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const folder = await prisma.folder.deleteMany({
      where: {
        id: folderId,
        userId: userId,
      },
    });
    if (folder.count === 0 || folder.count > 1) {
      return NextResponse.json({ error: "Record not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Folder Deleted" }, { status: 200 });
  } catch (err) {
    console.error("error deleting folder", err);
    return NextResponse.json(
      { error: "Failed to delete Folder" },
      { status: 500 }
    );
  }
}
