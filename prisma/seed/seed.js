import "dotenv/config";
import { artists } from "./artists.js";
import { songs } from "./songs.js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.artist.createMany({
    data: artists,
  });
  const artistMap = Object.fromEntries(
    (await prisma.artist.findMany()).map((a) => [a.artistSlug, a.id]),
  );
  for (const song of songs) {
    const { artistSlug, releaseDate, ...songData } = song;

    await prisma.song.create({
      data: {
        ...songData,
        releaseDate: new Date(releaseDate),
        artistId: artistMap[artistSlug],
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
