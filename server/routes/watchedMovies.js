import express from 'express';
import { WatchedMovie } from '../models/WatchedMovies.js';

const router = express.Router();

// Rota para adicionar um filme assistido
router.post('/add', async (req, res) => {
  try {
    const { user_id, movie_id, Title, Poster } = req.body;

    const existingWatchedMovie = await WatchedMovie.findOne({ user_id, movie_id });

    if (existingWatchedMovie) {
      return res.status(400).json({ message: 'Este filme já foi marcado como assistido.' });
    }

    const watchedMovie = new WatchedMovie({ user_id, movie_id, Title, Poster });
    await watchedMovie.save();

    res.status(201).json({ message: 'Filme assistido registrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar filme assistido:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Rota para remover um filme assistido
router.delete('/remove', async (req, res) => {
    try {
        const { user_id, movie_id } = req.body;

        const existingWatchedMovie = await WatchedMovie.findOneAndDelete({ user_id, movie_id });

        if (!existingWatchedMovie) {
            return res.status(404).json({ message: 'Filme assistido não encontrado.' });
        }

        res.status(200).json({ message: 'Filme assistido removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover filme assistido:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// Modifique a rota para aceitar o user_id como parâmetro
router.get('/getByUserId/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    // Busque os filmes assistidos associados ao user_id fornecido
    const watchedMovies = await WatchedMovie.find({ user_id });
    res.json(watchedMovies);
  } catch (error) {
    console.error('Erro ao obter filmes assistidos:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});


export { router as WatchedRouter };
