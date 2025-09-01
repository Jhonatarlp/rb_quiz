import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"; // Importe o módulo 'path'
import { fileURLToPath } from 'url'; // Importe para resolver o __dirname
import respostaRoutes from "./routes/respostaRoutes.js";

dotenv.config();
const app = express();

// --- Adicione estas linhas para resolver o caminho do diretório ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ----------------------------------------------------------------

app.use(express.json());

// Rotas da API - É importante que elas venham ANTES do código que serve o frontend
app.use("/api/respostas", respostaRoutes);

// --- Adicione este bloco de código ---
// Serve os arquivos estáticos do frontend (React)
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Rota "catch-all": para qualquer outra requisição, envia o index.html do frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});
// ------------------------------------

// Conexão com Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

export default app;