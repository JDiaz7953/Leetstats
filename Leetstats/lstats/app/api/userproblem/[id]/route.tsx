import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  const id = params.id;
  if (!userId) {
    return NextResponse.json({ error: "unaurthorized" }, { status: 401 });
  }

  try {
    const userProblem = await prisma.userProblem.deleteMany({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (userProblem.count === 0) {
      return NextResponse.json(
        { error: "Saved Problem does not exist" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Problem has been deleted from save" }, {status: 200});
  } catch (err) {
    console.error("Unable to delete problem from save", err);
    return NextResponse.json(
      { error: "Unable to delete problem from save" },
      { status: 500 }
    );
  }
}

//Write Patch Functions 

