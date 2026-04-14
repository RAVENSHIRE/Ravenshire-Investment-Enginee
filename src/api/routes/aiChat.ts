import express from 'express';
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are Ravenshire AI, a sophisticated financial intelligence assistant. Provide concise, professional, and data-driven insights. Maintain a high-end institutional tone."
      }
    });
    res.json({ response: response.text });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: "Failed to process AI chat" });
  }
});

export default router;
