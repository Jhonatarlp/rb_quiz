const express = require('express');
const path = require('path');

const app = express();

// Se você tiver API do backend, monte aqui, ex.:
// const apiRouter = require('./backend'); // ajuste conforme seu código
// app.use('/api', apiRouter);

// Servir arquivos estáticos do build do React
const buildPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(buildPath));

// Rota de health-check (útil para Render)
app.get('/healthz', (_req, res) => {
  res.status(200).send('ok');
});

// Para qualquer rota que não seja API/estático, devolve o index.html do React
app.get('*', (_req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Porta do Render vem em process.env.PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on :${port}`);
});
