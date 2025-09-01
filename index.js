// backend/index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const RespostaSchema = new mongoose.Schema({
  usuario: String,
  respostas: Object,
  timestamp: Date,
});

const Resposta = mongoose.model("Resposta", RespostaSchema);

app.post("/api/respostas", async (req, res) => {
  try {
    const novaResposta = new Resposta(req.body);
    await novaResposta.save();
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
