/*
  Warnings:

  - You are about to drop the column `endTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EventTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Publication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PublicationTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TopicTranslation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `organizationId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "EventTranslation" DROP CONSTRAINT "EventTranslation_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileTranslation" DROP CONSTRAINT "ProfileTranslation_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTranslation" DROP CONSTRAINT "ProjectTranslation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_topicId_fkey";

-- DropForeignKey
ALTER TABLE "PublicationTranslation" DROP CONSTRAINT "PublicationTranslation_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "TopicTranslation" DROP CONSTRAINT "TopicTranslation_topicId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "endTime",
DROP COLUMN "image",
DROP COLUMN "link",
DROP COLUMN "ownerId",
DROP COLUMN "startTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "organizerId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "description",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "role",
ADD COLUMN     "organizationId" INTEGER NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE "EventTranslation";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "ProfileTranslation";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectTranslation";

-- DropTable
DROP TABLE "Publication";

-- DropTable
DROP TABLE "PublicationTranslation";

-- DropTable
DROP TABLE "Topic";

-- DropTable
DROP TABLE "TopicTranslation";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "version" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "section" TEXT NOT NULL,
    "canCreate" BOOLEAN NOT NULL DEFAULT false,
    "canRead" BOOLEAN NOT NULL DEFAULT false,
    "canUpdate" BOOLEAN NOT NULL DEFAULT false,
    "canDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CulturalEvent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CulturalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "reportedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityProject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CityProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherHistory" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "conditions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeatherHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON "Vehicle"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCategory_name_key" ON "ProjectCategory"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityProject" ADD CONSTRAINT "CityProject_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProjectCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
