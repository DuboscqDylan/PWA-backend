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
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { generateAccessToken, generateRefreshToken } from "./utils/jwt.js";
import auth from "./middlewares/auth.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.get("/favorites", auth, async (req, res, next) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        song: true,
      },
    });
    res.json({
      success: true,
      data: favorites.map((f) => f.song),
    });
  } catch (error) {
    next(error);
  }
});

app.post("/favorites", auth, async (req, res, next) => {
  const { songId } = Number(req.body.songId);;
  if (!songId) {
    return res.status(400).json({
      success: false,
      message: "songId required",
    });
  }
  try {
    const song = await prisma.song.findUnique({
      where: {
        id: songId,
      },
    });

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Canción no encontrada",
      });
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_songId: {
          userId: req.user.id,
          songId,
        },
      },
    });

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: "La canción ya está en favoritos",
      });
    }

    await prisma.favorite.create({
      data: {
        songId,
        userId: req.user.id,
      },
    });
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.delete("/favorites/:songId", auth, async (req, res, next) => {
  const { songId } = Number(req.params.songId);
  try {
    const favorite = await prisma.favorite.findFirst({
      where: {
        songId,
        userId: req.user.id,
      },
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorito no encontrado",
      });
    }

    await prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    res.status.json({
      success: true,
      message: "Favorito eliminado",
    });
  } catch (error) {
    next(error);
  }
});

app.post("/auth/register", validateRegister, async (req, res, next) => {
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

app.post("/auth/login", validateLogin, async (req, res, next) => { 
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

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

app.get("/auth/me", auth, async (req, res, next) => { 
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

app.post("/auth/logout", async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    await prisma.refreshToken.deleteMany({
      where: {
        token: refreshToken,
      },
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/auth/refresh", async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Requiere refresh token",
    });
  }

  try {
    const storedToken = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
      include: {
        user: true,
      },
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token invalidoa",
      });
    }

    if (storedToken.expiresAt < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Refresh token expirado",
      });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const accessToken = generateAccessToken(storedToken.user);

    res.status(200).json({
      success: true,
      data: {
        accessToken,
      },
    });
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
