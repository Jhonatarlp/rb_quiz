import mongoose from "mongoose";

const respostaSchema = new mongoose.Schema({
  nome: String,
  resposta: String,
  data: { type: Date, default: Date.now }
});

export default mongoose.model("Resposta", respostaSchema);
