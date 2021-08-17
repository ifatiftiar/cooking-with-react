import React, { useContext } from "react";
import { RecipeContext } from "../App";
import RecipeIngredientEdit from "./RecipeIngredientEdit";

function RecipeEdit({ recipe }) {
    const { name, cookTime, servings, instructions, ingredients, id } = recipe;
    const { handleRecipeChange, handleRecipeSelect } =
        useContext(RecipeContext);

    function handleChange(changes) {
        handleRecipeChange(id, { ...recipe, ...changes });
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...ingredients];
        const index = newIngredients.findIndex((i) => i.id === id);
        newIngredients[index] = ingredient;
        handleChange({ ingredients: newIngredients });
    }

    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-btn-container">
                <button
                    className="btn recipe-edit__remove-btn"
                    onClick={() => handleRecipeSelect(undefined)}
                >
                    &times;
                </button>
            </div>
            <div className="recipe-edit__details-grid">
                <label className="recipe-edit__label" htmlFor="name">
                    Name
                </label>
                <input
                    className="recipe-edit__input"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onInput={(e) => handleChange({ name: e.target.value })}
                />

                <label className="recipe-edit__label" htmlFor="cookTime">
                    Cook Time
                </label>
                <input
                    className="recipe-edit__input"
                    type="text"
                    name="cookTime"
                    id="cookTime"
                    value={cookTime}
                    onInput={(e) => handleChange({ cookTime: e.target.value })}
                />

                <label className="recipe-edit__label" htmlFor="servings">
                    Servings
                </label>
                <input
                    className="recipe-edit__input"
                    type="number"
                    name="servings"
                    id="servings"
                    min="1"
                    value={servings}
                    onInput={(e) =>
                        handleChange({
                            servings: parseInt(e.target.value) || "",
                        })
                    }
                />

                <label className="recipe-edit__label" htmlFor="instructions">
                    Instructions
                </label>
                <textarea
                    className="recipe-edit__input"
                    type="text"
                    name="instructions"
                    id="instructions"
                    value={instructions}
                    onInput={(e) =>
                        handleChange({ instructions: e.target.value })
                    }
                />
            </div>
            <br />
            <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {ingredients.map((ingredient) => (
                    <RecipeIngredientEdit
                        handleIngredientChange={handleIngredientChange}
                        key={ingredient.id}
                        ingredient={ingredient}
                    />
                ))}
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button className="btn btn--primary">Add Ingredient</button>
            </div>
        </div>
    );
}

export default RecipeEdit;
