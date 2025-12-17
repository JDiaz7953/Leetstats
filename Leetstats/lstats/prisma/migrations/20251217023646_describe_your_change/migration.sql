-- DropForeignKey
ALTER TABLE "FolderWithProblems" DROP CONSTRAINT "FolderWithProblems_folderId_fkey";

-- AddForeignKey
ALTER TABLE "FolderWithProblems" ADD CONSTRAINT "FolderWithProblems_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
