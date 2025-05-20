import { GoogleGenerativeAI } from "@google/generative-ai";
import { HfInference } from '@huggingface/inference';

// System prompt for recipe generation
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page:
- A creative recipe name as an H1 heading
- Short description/intro
- Ingredients section with complete list including quantities
- Cooking instructions as numbered steps
- Serving suggestions
`;

/**
 * Initialize Gemini API client
 */
const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Fetches a recipe from Google's Gemini API based on provided ingredients
 * @param {Array} ingredientsArr - List of ingredients available to use
 * @returns {Promise<string>} - Recipe in markdown format
 * @throws {Error} - If API key is missing or API call fails
 */
export async function getRecipeFromChefGemini(ingredientsArr) {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error("Gemini API key is missing. Please check your environment variables.");
    }

    if (!ingredientsArr || ingredientsArr.length === 0) {
        throw new Error("No ingredients provided");
    }

    const ingredientsString = ingredientsArr.join(", ");
    
    try {
        // Use the Gemini SDK
        const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error fetching recipe from Gemini:", error);
        throw new Error("Failed to get recipe. Please try again later.");
    }
}

/**
 * Initialize Hugging Face Inference client
 */
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

/**
 * Alternative API for fetching recipes using Mistral model via Hugging Face
 * @param {Array} ingredientsArr - List of ingredients available to use
 * @returns {Promise<string>} - Recipe in markdown format
 * @throws {Error} - If API key is missing or API call fails
 */
export async function getRecipeFromMistral(ingredientsArr) {
    if (!import.meta.env.VITE_HF_ACCESS_TOKEN) {
        throw new Error("Hugging Face access token is missing. Please check your environment variables.");
    }
    
    if (!ingredientsArr || ingredientsArr.length === 0) {
        throw new Error("No ingredients provided");
    }

    const ingredientsString = ingredientsArr.join(", ");
    
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching recipe from Mistral:", error);
        throw new Error("Failed to get recipe. Please try again later.");
    }
}