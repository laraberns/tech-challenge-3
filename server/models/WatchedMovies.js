import mongoose from "mongoose";
import { db3 } from '../db.js';

const WatchedMovieSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    movie_id: { type: String, required: true, unique: true }
});

const WatchedMovieModel = db3.model('watchedmovies', WatchedMovieSchema);

export { WatchedMovieModel as WatchedMovie };
