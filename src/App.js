import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeList from './components/RecipeList'
import './css/App.css'

export const RecipeContext = createContext()

function App() {
  const [recipes, setRecipes] = useState(sampleRecipies)

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete
  }

  // handleRecipeAdd start
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr.',
      ingredients: [
        {
          id: uuidv4(),
          name: 'name',
          amoount: '1 Tbs'
        }
      ]
    }
    setRecipes([...recipes, newRecipe])

    console.log(recipes)
  }
  // handleRecipeAdd end

  // handleRecipeDelete start
  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }
  // handleRecipeAdd end

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList 
        recipes={recipes} />
    </RecipeContext.Provider>
  );

  
}



const sampleRecipies = [
  {
    id:1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on chicken \n 2. Put chicken in oven \n 3. Eat the chicken',
    ingredients: [
      {
        id:1,
        name: 'chicken',
        amount: '2 pounds'
      },
      {
        id: 2,
        name: 'salt',
        amount: '2 Tbs'
      }
    ]
  },
  {
    id:2,
    name: "Vegetable",
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put salt on vegetable \n 2. Put vegetable in oven \n 3. Eat the vegetable',
    ingredients: [
      {
        id:1,
        name: 'vegetable',
        amount: '3 pounds'
      },
      {
        id: 2,
        name: 'paprika',
        amount: '2 Tbs'
      }
    ]
  },
]

export default App;
