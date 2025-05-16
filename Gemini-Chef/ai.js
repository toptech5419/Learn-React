import { GoogleGenerativeAI } from "@google/generative-ai"
import { HfInference } from '@huggingface/inference'
console.log("Gemini API Key:", import.meta.env.VITE_GEMINI_API_KEY);
console.log("Hugging Face API Key:", import.meta.env.VITE_HF_ACCESS_TOKEN);
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

const gemini = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export async function getRecipeFromChefGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
}

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}