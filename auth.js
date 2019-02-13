/* export const checkAuthState = (callback) => {
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
  
export const registerUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user)=>{
            console.log("Usuario registrado > "+JSON.stringify(user));
        })
        .catch((error) => {
            console.error("Error > "+error.message);
        });
}
  
export const loginUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user)=>{
        console.log("Usuario logueado > "+JSON.stringify(user));
      })
      .catch((error) => {
        console.error("Error > "+error.message);
      });
      
} */