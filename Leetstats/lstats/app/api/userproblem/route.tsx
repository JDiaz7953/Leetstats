import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "../../../generated/prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //if not needed why use them in the problem one?
  const difficulty = searchParams.get("difficulty") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const where: Record<string, unknown> = {};
  where.userId = userId;

  if (difficulty) {
    where.problem = {
      ...(where.problem ?? {}),
      difficulty: difficulty,
    };
  }

  if (search) {
    where.problem = {
      ...(where.problem ?? {}),
      title: {
        contains: search,
        mode: "insensitive",
      },
    };
  }

  try {
    const userProblems = await prisma.userProblem.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { problem: true },
    });
    return NextResponse.json(userProblems, { status: 200 });
  } catch (err) {
    console.error("Unable to fetch users problems", err);
    return NextResponse.json(
      { error: "Unable to fetch users problem" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const { problemId, notes, code, nextReviewAt, lastTimeAttempted, ease } =
      body;

    if (!problemId || typeof problemId !== "string") {
      return NextResponse.json(
        { error: "Invalid problemId" },
        { status: 400 }
      );
    }

    const userProblem = await prisma.userProblem.create({
      data: {
        userId,
        problemId,
        notes,
        code,
        nextReviewAt,
        lastTimeAttempted,
        ease,
      },
    });
    return NextResponse.json(userProblem, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Problem already saved" },
          { status: 409 }
        );
      }
    }
    console.error("Unable to save problem", err);
    return NextResponse.json(
      { error: "Unable to save Problem" },
      { status: 500 }
    );
  }
}
