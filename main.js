document.getElementById("page1").style.display="none"

document.getElementById("home").addEventListener("click", function(){
  document.getElementById("page3").style.display="none"
  
  
})

document.getElementById("loginButton").addEventListener("click", function(){
  document.getElementById("page3").style.display="none"
  document.getElementById("root").style.display="block"
  
})


document.getElementById("close").addEventListener("click", function(){
  
  
   document.getElementById("root").style.display="none"
   document.getElementById("page3").style.display="none"
  firebase.auth().signOut()
  .then(function(){
      console.log('Saliendo...')
  
  })
  .catch(function(error){
      console.log(error)
  
  })
  })

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

const containerRoot = document.getElementById('root');

const readRecipesFromDatabase = () => {
    let recipeRef = firebase.database().ref('recipe');
    recipeRef.on("child_added", function(recipe){
      // container2=document.getElementById('div');
      // containerRoot.appendChild(container2)

      const form = document.createElement('form');
      form.setAttribute('id',"infoUser");
      containerRoot.appendChild(form);

      const i=document.createElement('i');
      i.setAttribute('class',"far fa-user");
      form.appendChild(i);

      const p=document.createElement('p');
      form.appendChild(p);
      const nameProfile=document.createTextNode(recipe.val().owner);
      p.appendChild(nameProfile);

      const h3=document.createElement('h3');
      h3.setAttribute('class',"title-class");
      form.appendChild(h3);
      const titleProfile=document.createTextNode(recipe.val().title);
      h3.appendChild(titleProfile);

      const img=document.createElement('img')
      img.setAttribute('class',"img-class");
      img.setAttribute('alt',"Recipe Image");
      img.setAttribute('style',"width:100px;height:100px;");
      img.setAttribute('src',recipe.val().image);
      form.appendChild(img);
      img.id = recipe.key;
      img.onclick = onImgClick;

      const i2=document.createElement('i2');
      i2.setAttribute('class',"far fa-clock iconoRecipes");
      form.appendChild(i2);
      const timeProfile=document.createTextNode(recipe.val().time);
      i2.appendChild(timeProfile);

      const i3=document.createElement('i3');
      i3.setAttribute('class',"fas fa-dollar-sign iconoRecipes");
      form.appendChild(i3);
      const moneyProfile=document.createTextNode(recipe.val().cost);
      i3.appendChild(moneyProfile);

      const i4=document.createElement('i4');
      i4.setAttribute('class',"fas fa-users iconoRecipes");
      form.appendChild(i4);
      const userProfile=document.createTextNode(recipe.val().serves);
      i4.appendChild(userProfile);

      let list = document.getElementById("root");
      list.insertBefore(form, list.childNodes[0]);
});
}

function onImgClick(e) {
var key = e.target.id;
var title = e.target.title;
alert('hola bb');
}

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


registerButton.addEventListener('click', registerWithEmailAndPassword);
loginButton.addEventListener('click', loginUserWithEmailAndPassword);
sendRecipe.addEventListener('click', saveRecipesIntoDatabase);