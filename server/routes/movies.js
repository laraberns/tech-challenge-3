import express from "express";
import { Movie } from '../models/Movies.js'

const router = express.Router()

router.get("/getAll", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro para renderizar filmes" });
  }
})

export { router as MovieRouter }