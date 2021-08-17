import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeEdit from "./components/RecipeEdit";
import RecipeList from "./components/RecipeList";
import "./css/App.css";

export const RecipeContext = createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
    const [selectedRecipeId, setSelectedRecipeId] = useState();
    const [recipes, setRecipes] = useState(sampleRecipies);

    const selectedRecipe = recipes.find(
        (recipe) => recipe.id === selectedRecipeId
    );

    useEffect(() => {
        const recipesJSON = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (recipesJSON !== null) {
            setRecipes(recipesJSON);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    }, [recipes]);

    const recipeContextValue = {
        handleRecipeAdd,
        handleRecipeDelete,
        handleRecipeSelect,
        handleRecipeChange,
    };

    // handleRecipeAdd start
    function handleRecipeAdd() {
        const newRecipe = {
            id: uuidv4(),
            name: "",
            servings: 1,
            cookTime: "",
            instructions: "",
            ingredients: [
                {
                    id: uuidv4(),
                    name: "",
                    amoount: "",
                },
            ],
        };
        setRecipes([...recipes, newRecipe]);
        setSelectedRecipeId(newRecipe.id);
    }
    // handleRecipeAdd end

    // handleRecipeDelete start
    function handleRecipeDelete(id) {
        if (selectedRecipeId === null && selectedRecipeId === id) {
            setSelectedRecipeId(undefined);
        }
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    }
    // handleRecipeAdd end

    // handleRecipeSelect start
    function handleRecipeSelect(id) {
        setSelectedRecipeId(id);
    }
    // handleRecipeSelect end

    // handleRecipeChange
    function handleRecipeChange(id, recipe) {
        const newRecipes = [...recipes];
        const index = newRecipes.findIndex((r) => r.id === id);
        newRecipes[index] = recipe;
        setRecipes(newRecipes);
    }

    return (
        <RecipeContext.Provider value={recipeContextValue}>
            <RecipeList recipes={recipes} handleRecipeAdd={handleRecipeAdd} />
            {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
        </RecipeContext.Provider>
    );
}

const sampleRecipies = [
    {
        id: 1,
        name: "Plain Chicken",
        servings: 3,
        cookTime: "1:45",
        instructions:
            "1. Put salt on chicken \n 2. Put chicken in oven \n 3. Eat the chicken",
        ingredients: [
            {
                id: 1,
                name: "chicken",
                amount: "2 pounds",
            },
            {
                id: 2,
                name: "salt",
                amount: "2 Tbs",
            },
        ],
    },
    {
        id: 2,
        name: "Vegetable",
        servings: 5,
        cookTime: "0:45",
        instructions:
            "1. Put salt on vegetable \n 2. Put vegetable in oven \n 3. Eat the vegetable",
        ingredients: [
            {
                id: 1,
                name: "vegetable",
                amount: "3 pounds",
            },
            {
                id: 2,
                name: "paprika",
                amount: "2 Tbs",
            },
        ],
    },
];

export default App;
