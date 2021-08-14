import RecipeList from './components/RecipeList'

function App() {
  return (
    <>
      <RecipeList recipes={sampleRecipies} />
    </>
  );
}

const sampleRecipies = [
  {
    id:1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: '1:45',
    instructions: '1. Put salt on chicken \n 2. Put chicken in oven \n 3. Eat the chicken'
  },
  {
    id:2,
    name: "Vegetable",
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put salt on vegetable \n 2. Put vegetable in oven \n 3. Eat the vegetable'
  },
]

export default App;
