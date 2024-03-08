import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { UserRouter } from './routes/user.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"], // Allow requests from this origin
    credentials: true
}))
app.use(cookieParser())

// Use the 'UserRouter' for routes starting with '/auth'
app.use('/auth', UserRouter)

mongoose.connect(process.env.MONGODBCONNECTION)

app.listen(1999, () => console.log('Servidor rodando na 1999'))