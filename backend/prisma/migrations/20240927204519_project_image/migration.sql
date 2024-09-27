/*
  Warnings:

  - You are about to drop the column `authorId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `projects` table. All the data in the column will be lost.
  - Added the required column `actorId` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content1` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_authorId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "authorId",
DROP COLUMN "content",
ADD COLUMN     "actorId" INTEGER NOT NULL,
ADD COLUMN     "content1" TEXT NOT NULL,
ADD COLUMN     "content2" TEXT,
ADD COLUMN     "content3" TEXT,
ADD COLUMN     "project_image" TEXT;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
