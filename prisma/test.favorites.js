import { prisma } from "./src/lib/prisma.js";

const favorites = await prisma.favorite.findMany();

console.log(favorites);

await prisma.$disconnect();