// app/api/problems/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  //Allows us to filter
  const { searchParams } = new URL(request.url);

  const difficulty = searchParams.get("difficulty") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const where: any = {};

  if (difficulty) {
    where.difficulty = difficulty;
  }

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  try {
    //why try?
    const problems = await prisma.problem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(problems, { status: 200 }); // anytime we fetch from the database are we always using this line?
  } catch (err) {
    console.error("Error fetching problems:", err);
    return NextResponse.json(
      { error: "failed to fetch probelms" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // what is this request field doing? how does it work?
  try {
    const body = await request.json();
    const { title, difficulty, link, tags } = body;

    if (!title || !difficulty || !link) {
      return NextResponse.json(
        { error: "title, difficulty, and link are required" },
        { status: 400 }
      );
    }

    const problem = await prisma.problem.create({
      data: {
        title,
        difficulty,
        link,
        tags: Array.isArray(tags) ? tags : [],
      },
    });
    return NextResponse.json(problem, { status: 201 });
  } catch (err) {
    console.error("error creating a problem", err);
    return NextResponse.json(
      { error: "failed to create problem" },
      { status: 500 }
    );
  }
}
