/*
  Warnings:

  - A unique constraint covering the columns `[songId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_songId_key" ON "Favorite"("songId");
