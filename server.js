// server.js
import express from "express";
import cors from "cors";
import { google } from "googleapis";

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = "https://docs.google.com/spreadsheets/d/16xPV8Lp2I1-qP4e7NbA87NIPlMDHCczoli_qV9wHD84/edit?usp=sharing"; // pega da URL do Google Sheets

// rota GET para buscar perguntas
app.get("/perguntas", async (req, res) => {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Quiz!A:B" // supondo que na aba "Quiz" tenha col A = Pergunta, col B = Opções (separadas por ;)
    });

    const rows = result.data.values || [];
    const perguntas = rows.map(row => ({
      pergunta: row[0],
      opcoes: row[1] ? row[1].split(";") : []
    }));

    res.json(perguntas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao carregar perguntas" });
  }
});

// rota POST para salvar respostas
app.post("/respostas", async (req, res) => {
  try {
    const { faculdade, respostas } = req.body;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Respostas!A:Z", // aba "Respostas"
      valueInputOption: "RAW",
      requestBody: {
        values: [[new Date().toISOString(), faculdade, ...respostas]]
      }
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar respostas" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
