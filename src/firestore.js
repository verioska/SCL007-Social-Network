firebase.initializeApp({
    apiKey:  "AIzaSyDHLmYAZ629IFPCNCCmioTKsnoLUAsRAo8",
    authDomain:  "red-social-1d44f.firebaseapp.com",
    projectId:  "red-social-1d44f",
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
  
  function guardar(){

    firebase.auth().onAuthStateChanged(function(user) {
        let name1=document.getElementById("name").value;
        let age1=document.getElementById("age").value;
        let biography1=document.getElementById("biography").value;
        let country1=document.getElementById("country").value;
        console.log(name1,"este es mi nombre")
        let dbUser = db.collection("users")
        .doc(user.uid).set({
            email: user.email,
            name: name1,
            age: age1,
            biography: biography1,
            country: country1,
        });
        let recipe = document.getElementById("algo").value
        db.collection("users").doc(user.uid).collection('recipes').add({
            receta: recipe,
        });
        db.collection("rootRecipes").add({
            receta: recipe,
        });
    });
 }
 


  db.collection("users").add({
    name: "Ada",
    age: "Lovelace",
    country: 1815,
    biography:"hola"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

       