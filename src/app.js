import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import prisma from "./lib/prisma.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import validateSong from "./middlewares/validateSong.js";
import validateRegister from "./middlewares/validateRegister.js";
import validateLogin from "./middlewares/validateLogin.js";
import { generateToken } from "./utils/jws.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

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
    res.json(favorites.map((f) => f.songId));
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

app.post("auth/register", validateRegister, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email ya registrado",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.post("auth/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.get("auth/me", auth, async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user
  })
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
