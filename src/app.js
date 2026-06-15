import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/songs", async (req, res) => {
  try {
    const songs = await prisma.song.findMany({
      include: { artist: true }   // <-- add this
    });
    res.json(songs);
  } catch (error) {
    console.error("Error en GET /songs:");
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

 app.get("/api/songs/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const song = await prisma.song.findUnique({
     where: { id },
     include: { artist: true }    // so detail page can show artist name
   });
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/songs", async (req, res) => {
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

 app.put("/api/songs/:id", async (req, res) => {
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

 app.delete("/api/songs/:id", async (req, res) => {
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

// Get all favorite song IDs
app.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      select: { songId: true }
    });
    res.json(favorites.map(f => f.songId));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add a song to favorites
app.post('/api/favorites', async (req, res) => {
  const { songId } = req.body;
  if (!songId) return res.status(400).json({ error: 'songId required' });
  try {
    await prisma.favorite.create({
      data: { songId }
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not add favorite' });
  }
});

// Remove a song from favorites
app.delete('/api/favorites/:songId', async (req, res) => {
  const { songId } = req.params;
  try {
    await prisma.favorite.deleteMany({
      where: { songId: parseInt(songId) }
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not remove favorite' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
