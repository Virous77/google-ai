import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs/promises";
dotenv.config();

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

// Gemini Vision
const geminiConfig = {
  temperature: 0.4,
  topP: 1,
  topK: 32,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro-vision",
  geminiConfig,
});

const generate = async () => {
  try {
    // Read image file
    const filePath = "some-image.jpeg";
    const imageFile = await fs.readFile(filePath);
    const imageBase64 = imageFile.toString("base64");

    const promptConfig = [
      { text: "Can you tell me about this image whats happening there?" },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      },
    ];

    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });
    const response = result.response;
    console.log(response.text());
  } catch (error) {
    console.log(" response error", error);
  }
};

generate();
