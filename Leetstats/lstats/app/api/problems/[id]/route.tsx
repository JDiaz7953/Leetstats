import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../../generated/prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  
  const id = params.id;

  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id: id,
      },
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json(problem, { status: 200 });
  } catch (err) {
    console.error("Error fetching problem:", err); // console.error?
    return NextResponse.json(
      { error: "failed to fetch probelm" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const problem = await prisma.problem.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    // Check if err is an object AND has a code property
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return NextResponse.json(
          { error: "Record not Found" },
          { status: 404 }
        );
      }
    }
    console.error("Error deleting problem:", err); // console.error?
    return NextResponse.json(
      { error: "failed to deleting probelem" },
      { status: 500 }
    );
  }
}
