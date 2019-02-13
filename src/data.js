/* let newRecipeKey = "";
export const saveRecipe = (recipeTitle, recipeImage, ownerName, insRecipe, recipeIngredients, recipeServes, prepTime, recipeCost) => {
  newRecipeKey = firebase.database().ref('recipe/boasfdisfbsfahb').child('likes').push().key;

  firebase.database().ref(`recipe/${newRecipeKey}`).set({
    title : recipeTitle,
    image : recipeImage,
    owner : ownerName,
    recipes: insRecipe,
    Key: newRecipeKey,
    Ingredients: recipeIngredients,
    serves: recipeServes,
    time: prepTime,
    cost: recipeCost,
      

  });
};

export const readRecipes = (onRecipeChange) => {
  var recipeRef = firebase.database().ref('recipe');
  recipeRef.on('child_added', (recipe)=> {
    onRecipeChange(recipe);
  });
}; */