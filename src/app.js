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

export default app;