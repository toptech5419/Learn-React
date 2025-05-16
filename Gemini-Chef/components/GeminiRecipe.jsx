import React from "react"
import ReactMarkdown from "react-markdown"

export default function GeminiRecipe({ recipe }) {
    return (
        <section className="suggested-recipe-container">
            <h2>Recipe Suggestion</h2>
            <ReactMarkdown>{recipe}</ReactMarkdown>
        </section>
    )
}