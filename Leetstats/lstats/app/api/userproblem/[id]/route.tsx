import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { z } from "zod";
const patchSchema = z
  .object({
    notes: z.string().optional(),
    code: z.string().optional(),
    nextReviewAt: z.coerce.date().optional(),
    lastTimeAttempted: z.coerce.date().optional(),
    ease: z.number(),
  })
  .strict();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    return NextResponse.json(
      { message: "Problem has been deleted from save" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unable to delete problem from save", err);
    return NextResponse.json(
      { error: "Unable to delete problem from save" },
      { status: 500 }
    );
  }
}

//Write Patch Functions
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  const {id }= await params;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
   console.log("params.id: ",id )
   console.log("userID: ",userId )
  try {
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid entry", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const updateUserProblem = await prisma.userProblem.updateMany({
      where: { id: id, userId: userId },
      data: parsed.data,
    });
    if (updateUserProblem.count === 0 || updateUserProblem.count > 1) {
      return NextResponse.json(
        { error: "Unable to find problem/MULTIPLE PROBLEMS BEING UPDATED" },
        { status: 404 }
      );
    }
    return NextResponse.json(updateUserProblem, { status: 200 });
  } catch (err) {
    console.error("Error updating problem", err);
    return NextResponse.json(
      { error: "Failed to update problem" },
      { status: 500 }
    );
  }
}
