// Step 1: Import Gemini client
import { GoogleGenerativeAI } from "@google/generative-ai";

// Step 2: Initialize client with API key
const apiKey = process.env.GEMINI_API_KEY || "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(apiKey);

// Step 3: Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

// Step 4: Simple chatbot loop
async function runChat() {
  if (apiKey === "YOUR_API_KEY") {
    console.log("Please replace 'YOUR_API_KEY' with your actual Gemini API key from Google AI Studio, or set the GEMINI_API_KEY environment variable.");
    return;
  }

  try {
    const chat = model.startChat();

    // Example user messages
    const userMessages = [
      "Hello, who are you?",
      "Can you tell me a fun fact about computers?",
      "Thank you!"
    ];

    for (const msg of userMessages) {
      const result = await chat.sendMessage(msg);
      console.log("User:", msg);
      console.log("Bot:", result.response.text());
      console.log("---");
    }
  } catch (error) {
    console.error("Error communicating with Gemini API:", error.message);
  }
}

runChat();
