import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
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

    function handleIngredientAdd() {
        console.log({ ...recipe.ingredients });
        const newIngredients = {
            id: uuidv4(),
            name: "",
            amount: "",
        };
        handleChange({ ingredients: [...recipe.ingredients, newIngredients] });
    }

    function handleIngredientDelete(id) {
        handleChange({
            ingredients: recipe.ingredients.filter((i) => i.id !== id),
        });
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
                    onChange={(e) => handleChange({ name: e.target.value })}
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
                    onChange={(e) => handleChange({ cookTime: e.target.value })}
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
                    onChange={(e) =>
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
                    onChange={(e) =>
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
                        handleIngredientDelete={handleIngredientDelete}
                        key={ingredient.id}
                        ingredient={ingredient}
                        recipe={recipe}
                    />
                ))}
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button
                    className="btn btn--primary"
                    onClick={handleIngredientAdd}
                >
                    Add Ingredient
                </button>
            </div>
        </div>
    );
}

export default RecipeEdit;
