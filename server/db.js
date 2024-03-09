import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url1 = process.env.MONGODBCONNECTION;
const url2 = process.env.MONGODBCONNECTIONMOVIES;
const url3 = process.env.MONGODBCONNECTIONWATCHEDMOVIES; // Add the connection URL for the third database

// Conectar ao primeiro banco de dados
const db1 = mongoose.createConnection(url1, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Conectar ao segundo banco de dados
const db2 = mongoose.createConnection(url2, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Conectar ao terceiro banco de dados
const db3 = mongoose.createConnection(url3, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export { db1, db2, db3 };

// Função para conectar aos bancos de dados
export async function connectToDatabases() {
  try {
    await db1.openUri(url1);
    console.log('Conectado ao banco de dados - auth');

    await db2.openUri(url2);
    console.log('Conectado ao banco de dados - filmes');

    await db3.openUri(url3);
    console.log('Conectado ao banco de dados - filmesAssistidos');
  } catch (error) {
    console.error('Erro ao conectar aos bancos de dados:', error);
  }
}
