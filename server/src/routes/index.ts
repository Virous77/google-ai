import express from "express";
import { getChat } from "../controllers/gemini";

const router = express.Router();

router.post("/chat", getChat);

export default router;
