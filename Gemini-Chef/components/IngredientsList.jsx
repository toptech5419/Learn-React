import React, { forwardRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

const IngredientsList = forwardRef((props, ref) => {
    const { ingredients, getRecipe, isLoading, onRemoveIngredient } = props;

    const ingredientsListItems = ingredients.map((ingredient, index) => (
        <li key={`${ingredient}-${index}`} className="ingredient-item">
            <span>{ingredient}</span>
            <button 
                type="button" 
                className="remove-ingredient" 
                onClick={() => onRemoveIngredient(index)}
                aria-label={`Remove ${ingredient}`}
            >
                ×
            </button>
        </li>
    ));

    return (
        <section className="ingredients-section">
            <h2>Ingredients on hand:</h2>
            {ingredients.length === 0 ? (
                <p className="no-ingredients">No ingredients added yet. Add some ingredients to get started!</p>
            ) : (
                <ul className="ingredients-list" aria-live="polite">
                    {ingredientsListItems}
                </ul>
            )}
            
            {ingredients.length >= 3 && (
                <div className="get-recipe-container" ref={ref}>
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button 
                        onClick={getRecipe} 
                        disabled={isLoading}
                        aria-busy={isLoading}
                        className={isLoading ? "loading" : ""}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                                <span>Finding recipe...</span>
                            </>
                        ) : "Get a recipe"}
                    </button>
                </div>
            )}
        </section>
    );
});

IngredientsList.displayName = "IngredientsList";

export default IngredientsList;