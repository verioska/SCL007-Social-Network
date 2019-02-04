document.getElementById("ingresar").addEventListener("click",(event) => {

    document.getElementById("page2").style.display="block"
    document.getElementById("page1").style.display="none"
    document.getElementById("body").style.background="white";

})

document.getElementById("home").addEventListener("click",(event) => {
    document.getElementById("page3").style.display="block"
    document.getElementById("body").style.background="white";
    document.getElementById("page4").style.display="none"
    document.getElementById("page5").style.display="none"
    document.getElementById("page6").style.display="none"

    document.getElementById('home_page').innerHTML ="Esto es home" 


})
document.getElementById("lupa").addEventListener("click",(event) => {
    document.getElementById("page3").style.display="none"
    document.getElementById("page4").style.display="block"
    document.getElementById("page5").style.display="none"
    document.getElementById("page6").style.display="none"
    document.getElementById("page7").style.display="none"

    document.getElementById('lupa_page').innerHTML ="Esto es buscar" 


})

document.getElementById("mas").addEventListener("click",(event) => {
    document.getElementById("page3").style.display="none"
    document.getElementById("page4").style.display="none"
    document.getElementById("page5").style.display="block"
    document.getElementById("page6").style.display="none"
    document.getElementById("page7").style.display="none"

    document.getElementById('mas_page').innerHTML ="Esto es gregar" 


})

document.getElementById("favoritos").addEventListener("click",(event) => {
    document.getElementById("page3").style.display="none"
    document.getElementById("page4").style.display="none"
    document.getElementById("page5").style.display="none"
    document.getElementById("page6").style.display="block"
    document.getElementById("page7").style.display="none"

    
    document.getElementById('favoritos_page').innerHTML ="Esto es favoritos" 


})

document.getElementById("user").addEventListener("click",(event) => {
    document.getElementById("page3").style.display="none"
    document.getElementById("page4").style.display="none"
    document.getElementById("page5").style.display="none"
    document.getElementById("page6").style.display="none"
    document.getElementById("page7").style.display="block"

    document.getElementById('user_page').innerHTML ="Esto es el perfil del usuario" 


})
