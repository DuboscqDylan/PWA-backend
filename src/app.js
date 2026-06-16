import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import validateSong from "./middlewares/validateSong.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/songs", async (req, res, next) => {
  try {
    const songs = await prisma.song.findMany({
      include: { artist: true },
    });
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

app.get("/songs/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const song = await prisma.song.findUnique({
      where: { id },
      include: { artist: true },
    });
    if (!song) {
      const err = new Error("Song not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json(song);
  } catch (error) {
    next(error);
  }
});

app.post("/songs", validateSong, async (req, res, next) => {
  try {
    const song = await prisma.song.create({
      data: { ...req.body },
    });
    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
});

app.put("/songs/:id", validateSong, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const song = await prisma.song.update({
      where: { id },
      data: { ...req.body },
    });
    res.json(song);
  } catch (error) {
    next(error);
  }
});

app.delete("/songs/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.song.delete({ where: { id } });
    res.status(200).json({ message: "Canción eliminada" });
  } catch (error) {
    next(error);
  }
});

app.get("/favorites", async (req, res, next) => {
  try {
    const favorites = await prisma.favorite.findMany({
      select: { songId: true },
    });
    res.json(favorites.map(f => f.songId));
  } catch (error) {
    next(error);
  }
});

app.post("/favorites", async (req, res, next) => {
  const { songId } = req.body;
  if (!songId) {
    const err = new Error("songId required");
    err.statusCode = 400;
    return next(err);
  }
  try {
    await prisma.favorite.create({ data: { songId } });
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.delete("/favorites/:songId", async (req, res, next) => {
  const { songId } = req.params;
  try {
    await prisma.favorite.deleteMany({
      where: { songId: parseInt(songId) },
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
