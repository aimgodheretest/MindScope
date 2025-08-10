// package.json should have: { "type": "module" }
// Install dependencies:
// npm install @google/genai mime

import { GoogleGenAI } from "@google/genai";

// Put your API key directly here for testing (NOT recommended for production)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual key

async function runChat(prompt, onChunk) {
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };

  const model = "gemini-2.5-pro";

  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    // Extract text from the streaming chunk safely
    const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (text) {
      onChunk(text); // send to UI
    }
  }
}

export default runChat;
