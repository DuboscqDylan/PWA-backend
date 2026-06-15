import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/songs", async (req, res, next) => {
  try {
    const songs = await prisma.song.findMany();
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

app.get("/songs/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const song = await prisma.song.findUnique({ where: { id } });
    if (!song) {
      const error = new Error("Song not found");
      error.statusCode = 404;

      return next(error);
    }
    res.json(song);
  } catch (error) {
     next(error);
  }
});

app.post("/songs", async (req, res, next) => {
  try {
    const song = await prisma.song.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).json(song);
  } catch (error) {
     next(error);
  }
});

app.put("/songs/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const song = await prisma.song.update({
      where: { id },
      data: {
        ...req.body,
      },
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
    res.status(200).json({
      message: "Canción eliminada",
    });
  } catch (error) {
     next(error);
  }
});

app.use(notFound);
app.use(errorHandler);
export default app;
