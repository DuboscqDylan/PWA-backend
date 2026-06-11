import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/songs", async (req, res) => {
  try {
    const songs = await prisma.song.findMany();
    res.json(songs);
  } catch (error) {
    console.error("Error en GET /songs:");
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/songs/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const song = await prisma.song.findUnique({ where: { id } });
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/songs", async (req, res) => {
  try {
    const song = await prisma.song.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/songs/:id", async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

app.delete("/songs/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.song.delete({ where: { id } });
    res.status(200).json({
      message: "Canción eliminada",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
