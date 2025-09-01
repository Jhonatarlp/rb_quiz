import express from "express";
import { salvarResposta, listarRespostas } from "../controllers/respostaController.js";

const router = express.Router();

router.post("/", salvarResposta);
router.get("/", listarRespostas);

export default router;
