import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateInvestmentStrategy(topic: string) {
  const prompt = `
    As a senior investment strategist at a top-tier hedge fund, generate a professional investment strategy outline for the following topic: "${topic}".
    
    Format the response as a JSON object with the following structure:
    {
      "title": "Strategy Title",
      "sector": "Primary Sector",
      "conviction": "High/Medium/Low",
      "thesis": "A detailed 2-3 sentence investment thesis.",
      "risks": ["Risk 1", "Risk 2"],
      "timeHorizon": "e.g., 12-24 months",
      "catalysts": ["Catalyst 1", "Catalyst 2"]
    }
    
    Ensure the tone is institutional, data-driven, and concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
