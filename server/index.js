import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabases} from './db.js';
import { UserRouter } from './routes/user.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { MovieRouter } from './routes/movies.js';
import { WatchedRouter } from './routes/watchedMovies.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'], // Allow requests from this origin
    credentials: true,
  })
);
app.use(cookieParser());

// Use the 'UserRouter' for routes starting with '/auth'
app.use('/auth', UserRouter);
app.use('/movies', MovieRouter);
app.use('/watchedMovies', WatchedRouter);

// Call the function to connect to databases
connectToDatabases();

app.listen(1999, () => console.log('Servidor rodando na 1999'));
