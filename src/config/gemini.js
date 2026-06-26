// package.json should have: { "type": "module" }
// Install dependencies:
// npm install @google/genai mime

import { GoogleGenAI } from "@google/genai";

// Put your API key directly here for testing (NOT recommended for production)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual key

async function runChat(prompt, onChunk) {
  try {
    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    for await (const chunk of response) {
      const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (text) onChunk(text);
    }
  } catch (err) {
    console.error(err);

    if (err.status === 429) {
      onChunk("⚠️ API quota exceeded. Please try again later.");
    } else {
      onChunk("⚠️ Something went wrong.");
    }
  }
}

export default runChat;
