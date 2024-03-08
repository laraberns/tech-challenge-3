import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url1 = process.env.MONGODBCONNECTION;
const url2 = process.env.MONGODBCONNECTIONMOVIES;

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

export { db1, db2 };

// Função para conectar aos bancos de dados
export async function connectToDatabases() {
  try {
    await db1.openUri(url1);
    console.log('Conectado ao banco de dados - auth');

    await db2.openUri(url2);
    console.log('Conectado ao banco de dados - filmes');
  } catch (error) {
    console.error('Erro ao conectar aos bancos de dados:', error);
  }
}


