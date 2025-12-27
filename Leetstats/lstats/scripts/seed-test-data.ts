import "dotenv/config";
import { prisma } from "@/lib/prisma";
const TEST_USER_ID = process.env.TEST_USER_ID;

function requireEnv(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

async function main() {
  const userId = requireEnv("TEST_USER_ID", TEST_USER_ID);

  console.log("Seeding for userId:", userId);

  // 1) Ensure User exists
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: `test+${userId}@example.com`,
      name: "Seed Test User",
    },
  });

  // 2) Create a few global Problems
  const problems = await prisma.problem.createMany({
    data: [
      {
        title: "Two Sum",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/two-sum/",
        tags: ["array", "hashmap"],
      },
      {
        title: "Valid Parentheses",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/valid-parentheses/",
        tags: ["stack", "string"],
      },
      {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        tags: ["sliding-window", "hashmap"],
      },
    ],
    skipDuplicates: true,
  });

  console.log("Problems createMany:", problems);

  // Fetch them back so we have IDs
  const all = await prisma.problem.findMany({
    where: {
      title: {
        in: [
          "Two Sum",
          "Valid Parentheses",
          "Longest Substring Without Repeating Characters",
        ],
      },
    },
    select: { id: true, title: true, difficulty: true },
  });

  console.log("Seed problems:", all);

  // 3) Create some folders
  const folder1 = await prisma.folder.create({
    data: { userId, name: "Warmup" },
  });
  const folder2 = await prisma.folder.create({
    data: { userId, name: "Sliding Window" },
  });

  console.log("Created folders:", folder1.id, folder2.id);

  // 4) Save problems to the user (UserProblem)
  // Use upsert pattern based on your @@unique([userId, problemId]) constraint
  const saved: { userProblemId: string; problemId: string; title: string }[] = [];

  for (const p of all) {
    const row = await prisma.userProblem.upsert({
      where: {
        userId_problemId: { userId, problemId: p.id },
      },
      update: {},
      create: {
        userId,
        problemId: p.id,
        notes: `Seed notes for ${p.title}`,
        code: "",
        ease: 250,
        lastTimeAttempted: new Date(),
        nextReviewAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      },
      select: { id: true, problemId: true },
    });

    saved.push({ userProblemId: row.id, problemId: row.problemId, title: p.title });
  }

  console.log("Created/confirmed UserProblems:", saved);

  // 5) Add some saved problems into folders (FolderWithProblems)
  // Put first two in Warmup, third in Sliding Window
  await prisma.folderWithProblems.createMany({
    data: [
      { folderId: folder1.id, userProblemId: saved[0].userProblemId },
      { folderId: folder1.id, userProblemId: saved[1].userProblemId },
      { folderId: folder2.id, userProblemId: saved[2].userProblemId },
    ],
    skipDuplicates: true,
  });

  console.log("Linked problems into folders.");

  console.log("Seed complete.");
  console.log("Folder Warmup:", folder1.id);
  console.log("Folder Sliding Window:", folder2.id);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
