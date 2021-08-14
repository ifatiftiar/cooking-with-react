import React from 'react';
import Recipe from './Recipe';

function RecipeList({recipes}) {
    return (
        <div>
            {
                recipes.map(recipe =>  <Recipe key={recipe.id}  {...recipe}  />
                )
            }
        </div>
    );
}

export default RecipeList;