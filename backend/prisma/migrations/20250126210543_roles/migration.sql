/*
  Warnings:

  - You are about to drop the column `canCreate` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `canDelete` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `canRead` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `canUpdate` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CityProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CulturalEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeatherHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `action` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hierarchyLevel` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CityProject" DROP CONSTRAINT "CityProject_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "canCreate",
DROP COLUMN "canDelete",
DROP COLUMN "canRead",
DROP COLUMN "canUpdate",
ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "granted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "defaultRole" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hierarchyLevel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "organizationId",
DROP COLUMN "roleId";

-- DropTable
DROP TABLE "CityProject";

-- DropTable
DROP TABLE "CulturalEvent";

-- DropTable
DROP TABLE "ProjectCategory";

-- DropTable
DROP TABLE "WeatherHistory";

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
