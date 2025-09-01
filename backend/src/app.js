import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import respostaRoutes from "./routes/respostaRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Rotas
app.use("/api/respostas", respostaRoutes);

// Conexão com Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

export default app;
