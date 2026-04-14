import express from 'express';
import { GoogleGenAI, Type } from "@google/genai";

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

router.post('/', async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "Topic is required" });

  const prompt = `As a senior investment strategist at a top-tier hedge fund, generate a professional investment strategy outline for the following topic: "${topic}". Ensure the tone is institutional, data-driven, and concise.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The title of the investment strategy" },
            sector: { type: Type.STRING, description: "The primary industrial sector" },
            conviction: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "The level of conviction in the strategy" },
            thesis: { type: Type.STRING, description: "A detailed 2-3 sentence investment thesis" },
            risks: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of potential risks"
            },
            timeHorizon: { type: Type.STRING, description: "Expected duration of the investment (e.g., 12-24 months)" },
            catalysts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of key market catalysts"
            }
          },
          required: ["title", "sector", "conviction", "thesis", "risks", "timeHorizon", "catalysts"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    res.json(JSON.parse(text));
  } catch (error) {
    console.error("Gemini Strategy Error:", error);
    res.status(500).json({ error: "Failed to generate strategy" });
  }
});

export default router;
