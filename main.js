document.getElementById("page1").style.display="none"

document.getElementById("home").addEventListener("click", function(){
  document.getElementById("root").style.display="block" 
  document.getElementById("page3").style.display="none"
 
})

document.getElementById("mas").addEventListener("click", function(){
  document.getElementById("page3").style.display="block"
  document.getElementById("root").style.display="none"
})

// document.getElementById("loginButton").addEventListener("click", function(){
//   document.getElementById("page3").style.display="none"
//   document.getElementById("root").style.display="block"
  
// })


document.getElementById("close_profile").addEventListener("click", function(){
  
  
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
        document.getElementById("page3").style.display="none"
        document.getElementById("root").style.display="block" 
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
    likesCount : 0,
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

const updateRecipe=(childSnapshot, prevChildKey)=>{
    var recipe = childSnapshot.val();
    console.log(childSnapshot, prevChildKey);
    document.getElementById('recipes_'+childSnapshot.key).innerHTML= recipe.recipes;
    document.getElementById('ingredients_'+childSnapshot.key).innerHTML=recipe.Ingredients;
};


const containerRoot = document.getElementById('root');

const readRecipesFromDatabase = () => {
    let recipeRef = firebase.database().ref('recipe');
    recipeRef.on("child_added", function(recipe){
      // container2=document.getElementById('div');
      // containerRoot.appendChild(container2)

      const form = document.createElement('form');
      form.setAttribute('class',"infoUser");
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
      img.Ingredients=recipe.val().Ingredients;
      img.image = recipe.val().image;
      img.onclick = onImgClick;
      img.recipes=recipe.val().recipes;
      

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

      const likeButton = document.createElement('button');
      likeButton.setAttribute('id', "like"+recipe.key);
      form.appendChild(likeButton);
      const likeButtonText = document.createTextNode('click');
      likeButton.appendChild(likeButtonText)
      likeButton.id = "like"+recipe.key;
      likeButton.oid = recipe.key;
      likeButton.title = recipe.val().title;
      likeButton.likeCount = recipe.likeCount;
      likeButton.onclick = onLikeClick;
      
      const likeNumberP = document.createElement('p');
      likeNumberP.setAttribute('id', 'number'+recipe.key)
      form.appendChild(likeNumberP);
      
      const likeNumber = document.createTextNode(recipe.val().likesCount);
      likeNumberP.appendChild(likeNumber);

      let list = document.getElementById("root");
      list.insertBefore(form, list.childNodes[0]);
});
}

const containerRoot2 = document.getElementById('root2');
function onImgClick(e) {

 let key =e.target.id;
 let image = e.target.image;
 let Ingredients = e.target.Ingredients;
 let recipes=e.target.recipes;
 console.log(containerRoot2)

 document.getElementById("root").style.display="none";
 document.getElementById("root2").style.display="block";
 const form1 = document.createElement('form');
 form1.setAttribute('id',"color");
 containerRoot2.appendChild(form1);

 const img=document.createElement('img')
 img.setAttribute('class',"img-class1");
 img.setAttribute('alt',"Recipe Image");
 img.setAttribute('style',"width:100px;height:100px;");
 img.setAttribute('src',image);
 img.setAttribute('type',button); //button not defined
 form1.appendChild(img);

 //eliminar
 const i=document.createElement('i');
 i.setAttribute('class',"fas fa-trash-alt iconoIngredients");
 form1.appendChild(i);
 i.setAttribute("id","delete_"+key)
 //document.getElementById("delete_"+key).addEventListener('click', erase)

 //editar
 const i2=document.createElement('i');
 i2.setAttribute('class',"fas fa-edit iconoIngredients");
 i2.setAttribute("id","edit_"+key)
 form1.appendChild(i2);
 document.getElementById("edit_"+key).addEventListener('click', openModal)



 const hIngredients=document.createElement('h4');
 form1.appendChild(hIngredients);
 const ingredientsProfile=document.createTextNode("Ingredientes");
 hIngredients.appendChild(ingredientsProfile);

 const p=document.createElement('p');
 form1.appendChild(p);
 const nameProfile=document.createTextNode(Ingredients);
 p.appendChild(nameProfile);
 p.setAttribute("id","ingredients_"+key)

 const br=document.createElement('br');
 form1.appendChild(br);

 const instructions=document.createElement('h4');
 form1.appendChild(instructions);
 const instructionsProfile=document.createTextNode("Instrucciones");
 instructions.appendChild(instructionsProfile);



 const pRecipes=document.createElement('p');
 form1.appendChild(pRecipes);
 const recipesProfile=document.createTextNode(recipes);
 pRecipes.appendChild(recipesProfile);
 pRecipes.setAttribute("id","recipes_"+key)
}

function onLikeClick(e) {
    let key = e.target.id;
    let oriKey = e.target.oid;
    let numberKey = e.target.nid; 
    document.getElementById(key).style.background = "lightblue";
    firebase.database().ref(`recipe/${oriKey}`).child(`likes/${firebase.auth().currentUser.uid}`).set({
      user: firebase.auth().currentUser.uid,
    }); 
    firebase.database().ref(`recipe/${oriKey}`).child("likes").on("value", function(snapshot) {
      firebase.database().ref(`recipe/${oriKey}`).update({
        likesCount : snapshot.numChildren(),
      })
      console.log("There are "+snapshot.numChildren()+" likes");
      document.getElementById(numberKey).innerHTML = "";
      document.getElementById(numberKey).innerHTML = snapshot.numChildren(); 
    });
  }

function openModal(event){

   var id = event.currentTarget.id.replace('edit_','');
   console.log(id)
   var modal = document.getElementById("myModal");
   modal.style.display = "block";
   document.getElementById('insRecipesE').value = document.getElementById('recipes_'+id).innerHTML;
   document.getElementById('idIngredientsE').value = document.getElementById('ingredients_'+id).innerHTML;
   document.getElementById('edit-key').value = id;
   }
   
   
   function cerrarModal(){
   var modal = document.getElementById('myModal');
   modal.style.display = "none";
   
   }
   
   
   function editRecipe(event){ //never used
   
   var id = document.getElementById('edit-key').value;
   var recipeRef = firebase.database().ref('recipe/'+id);
   //get field values
   var recipesnuevo=document.getElementById('insRecipesE').value
   var ingredientsNuevo=document.getElementById('idIngredientsE').value
   recipeRef.update({recipes: recipesnuevo,Ingredients:ingredientsNuevo},()=>{
   cerrarModal();
   });
   }


//click al icono eliminar
/* function oniClick(e){

  alert("hola")
}

//click al icono editar
function oni2Click(e){

  alert("hola editame")
} */




/* <form  id="color">
    <img  type="button"  src="${recipe.val().image}" alt="Recipe Image" style="width:100px;height:100px;"><br>
    <i class="fas fa-trash-alt"></i>
    <i class="fas fa-edit"></i>
    <p>Ingredientes</p><br>
           <p>${recipe.val().Ingredients}</p><br>
           <p>Instrucciones</p>
           <p id="recipes_${recipe.val().Key}">${recipe.val().recipes}</p><br>

</form> */

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

document.getElementById('save').addEventListener('click',editRecipe);
document.getElementsByClassName("close")[0].addEventListener("click", cerrarModal);