import {
  GenerateContentResult,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { appendToFile, readFromFile, writeToFile } from "./file";
import { marked } from "marked";
dotenv.config();

const gemini_api_key = process.env.API_KEY!;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

type TChatBody = {
  prompt: string;
  image: string;
  imageType: string;
};

const common = (req: Request) => {
  const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
  };

  const geminiVisionConfig = {
    temperature: 0.4,
    topP: 1,
    topK: 32,
    maxOutputTokens: 4096,
  };

  const config = req.query.image === "true" ? geminiVisionConfig : geminiConfig;

  const geminiModel = googleAI.getGenerativeModel({
    model: req.query.image === "true" ? "gemini-pro-vision" : "gemini-pro",
    ...config,
  });

  return geminiModel;
};

const getImageInfo = async (
  image: string,
  text: string,
  imageType: string,
  req: Request
) => {
  const promptConfig = [
    { text },
    {
      inlineData: {
        mimeType: imageType,
        data: image,
      },
    },
  ];

  const geminiModel = common(req);

  const result = await geminiModel.generateContent({
    contents: [{ role: "user", parts: promptConfig }],
  });

  return result;
};

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prompt: TChatBody = req.body;
    let result: GenerateContentResult;

    if (req.query.image === "true") {
      result = await getImageInfo(
        prompt.image,
        prompt.prompt,
        prompt.imageType,
        req
      );
    } else {
      const geminiModel = common(req);
      result = await geminiModel.generateContent(prompt.prompt);
    }

    const response = result.response;
    appendToFile({ user: prompt, ai: marked.parse(response.text()) });
    res.status(200).json({ response: "ok" });
  } catch (error) {
    next(error);
  }
};

export const getChatHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = readFromFile();
    res.status(200).json({ history: data });
  } catch (error) {
    next(error);
  }
};
