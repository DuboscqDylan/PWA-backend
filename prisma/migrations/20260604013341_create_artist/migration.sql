/*
  Warnings:

  - You are about to drop the column `artist` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Song` table. All the data in the column will be lost.
  - Added the required column `album` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artistId` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plays` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "artist",
DROP COLUMN "year",
ADD COLUMN     "album" TEXT NOT NULL,
ADD COLUMN     "artistId" INTEGER NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "plays" INTEGER NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artistSlug" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_artistSlug_key" ON "Artist"("artistSlug");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
