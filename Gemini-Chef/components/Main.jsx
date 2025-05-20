import React, { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import GeminiRecipe from "./GeminiRecipe";
import { getRecipeFromChefGemini } from "../ai";
import ErrorMessage from "./ErrorMessage";

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState("");
    
    const recipeSection = useRef(null);
    const inputRef = useRef(null);

    // Focus input field when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Scroll to recipe section when recipe is loaded
    useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipe]);

    async function getRecipe() {
        setIsLoading(true);
        setError(null);
        try {
            const recipeMarkdown = await getRecipeFromChefGemini(ingredients);
            setRecipe(recipeMarkdown);
        } catch (err) {
            console.error("Error fetching recipe:", err);
            setError("Failed to get recipe. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient").trim();
        
        if (newIngredient) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
            setInputValue("");
            inputRef.current.focus();
        }
    }

    function removeIngredient(indexToRemove) {
        setIngredients(prevIngredients => 
            prevIngredients.filter((_, index) => index !== indexToRemove)
        );
    }

    return (
        <main>
            <section className="app-description">
                <h2>Welcome to Gemini Chef!</h2>
                <p>Add ingredients you have on hand, and I'll suggest a delicious recipe you can make with them.</p>
            </section>

            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    value={inputValue}
                    onChange={handleInputChange}
                    ref={inputRef}
                />
                <button 
                    type="submit" 
                    disabled={!inputValue.trim()}
                    className={!inputValue.trim() ? "disabled" : ""}
                >
                    Add ingredient
                </button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isLoading={isLoading}
                    onRemoveIngredient={removeIngredient}
                    ref={recipeSection}
                />
            )}

            {error && <ErrorMessage message={error} />}

            {recipe && <GeminiRecipe recipe={recipe} />}
        </main>
    );
}