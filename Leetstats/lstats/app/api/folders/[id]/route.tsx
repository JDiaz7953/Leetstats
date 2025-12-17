import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../../generated/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: id,
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


// ADD DELETE