import express from "express";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("API Redbull Quiz está funcionando!");
});

app.get("/api/test", (req, res) => {
  res.json({ status: "ok", message: "API respondendo corretamente!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app;
