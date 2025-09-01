import Resposta from "../models/respostaModel.js";

export const salvarResposta = async (req, res) => {
  try {
    const novaResposta = new Resposta(req.body);
    await novaResposta.save();
    res.status(201).json(novaResposta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarRespostas = async (req, res) => {
  try {
    const respostas = await Resposta.find();
    res.json(respostas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
