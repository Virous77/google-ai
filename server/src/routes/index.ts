import express from "express";
import { getChat, getChatHistory } from "../controllers/gemini";

const router = express.Router();

router.post("/chat", getChat);
router.get("/history", getChatHistory);

export default router;
