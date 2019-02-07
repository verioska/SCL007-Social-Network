document.getElementById("page1").style.display="none"
document.getElementById("loginButton").addEventListener("click", function(){
  document.getElementById("body").style.background="white"
})
/* document.getElementById("page1").style.display="none" */
//auth.js
const checkAuthState = (callback) => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log("Hay un usuario > "+JSON.stringify(user));
      callback(user);
    }else{
      console.log("No está logueado");
      callback(null);
    }
  })
};
const registerUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log("Usuario registrado > "+JSON.stringify(user));
    })
    .catch((error) => {
      console.error("Error > "+error.message);
    });
}
const loginUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log("Usuario logueado > "+JSON.stringify(user));
    })
    .catch((error) => {
      console.error("Error > "+error.message);
    });
}
//data.js
let newRecipeKey = "";
const saveRecipe = (recipeTitle, recipeImage, ownerName, insRecipe, recipeIngredients, recipeServes, prepTime, recipeCost) => {
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
/* const deletePost = (id) => {
  let recipeRef = firebase.database().ref('recipe/' + id);
  recipeRef.remove()
} */
const readRecipes = (onRecipeChange) => {
  var recipeRef = firebase.database().ref('recipe');
  recipeRef.on('child_added', (recipe)=> {
    onRecipeChange(recipe);
  });
};
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
let imgUrl = "";
fileButton.addEventListener('change', function(e) {
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('recipeImg/' 
      + file.name);
  var task = storageRef.put(file);
  task.on('state_changed',
      function progress(snapshot) {
          var percentage = (snapshot.bytesTransferred / 
          snapshot.totalBytes) * 100;
          uploader.value = percentage;
      },
      function error(err) {
      },
      function complete() {
      }
  );
  storageRef.getDownloadURL().then(function(url) {
      console.log(newRecipeKey);
      console.log(url);
      imgUrl = url
      /* firebase.database().ref(`recipe/${newRecipeKey}`).update({
          urlImage : url 
        });*/
      // Insert url into an <img> tag to "download"
    }).catch(function(error) {
    
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
    
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
    
        case 'storage/canceled':
          // User canceled the upload
          break;
    
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
})
//main.js
window.onload = () => {
checkAuthState((user)=>{
  if(user){
    loginOrRegister.style.display = "none";
    app.style.display = "block";
    readRecipesFromDatabase();
  }else{
    loginOrRegister.style.display = "block";
    app.style.display = "none";
  }
});
};
const registerWithEmailAndPassword = () => {
const emailFromUser = emailTextfield.value;
const passwordFromUser = passwordTextfield.value;
registerUser(emailFromUser, passwordFromUser);
};
const loginUserWithEmailAndPassword = () => {
const emailFromUser = emailTextfield.value;
const passwordFromUser = passwordTextfield.value;
loginUser(emailFromUser, passwordFromUser);
};
//nueva 
const saveUserIntoDatabase = () => {
  const userId = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;
  saveUser(userId, userEmail);
}
const saveRecipesIntoDatabase = () => {
const recipeTitle = titleRecipe.value;
const recipeImage = imgUrl;
const ownerName = firebase.auth().currentUser.email;
const insRecipe = insRecipes.value;
const recipeIngredients = idIngredients.value;
const recipeServes = idServes.value;
const prepTime = idTime.value;
const recipeCost = idCost.value;
saveRecipe(recipeTitle, recipeImage, ownerName, insRecipe, recipeIngredients, recipeServes, prepTime, recipeCost);
}
const readRecipesFromDatabase = () => {
  readRecipes((recipe)=>{
      recipeContainer.innerHTML = 
      `
      <br><br>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${recipe.val().image}" alt="Recipe Image" style="width:300px;height:300px;"><br>
            <h3 class="title-class">${recipe.val().title}</h3><br>
            <p>${recipe.val().owner}</p><br>
            <p>Porciones: ${recipe.val().serves}</p><br>
            <p>Tiempo: ${recipe.val().time}</p><br>              
            <p>Costo: ${recipe.val().cost}</p>
          </div>
          <div class="flip-card-back">
            <p>Ingredientes</p><br> 
            <p>${recipe.val().Ingredients}</p><br>          
            <p>Instrucciones</p>
            <p>${recipe.val().recipes}</p><br>

          </div>
        </div>
      </div>
      <br><br>
      `+recipeContainer.innerHTML; 
  }); 
}



registerButton.addEventListener('click', registerWithEmailAndPassword);
loginButton.addEventListener('click', loginUserWithEmailAndPassword);
//nueva
/* saveUserData.addEventListener('click', saveUserIntoDatabase)  */
sendRecipe.addEventListener('click', saveRecipesIntoDatabase);





