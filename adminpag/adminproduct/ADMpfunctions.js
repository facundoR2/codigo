// se crean los contenedores de los elementos html
let inicio = document.getElementById("Logo-tienda");
let nuevologin = document.getElementById('Bingresar');
let btonProductos = document.getElementById("lm-bton-productos");
let btonOfertas = document.getElementById("lm-bton-ofertas");
// inicio funcionalidad de botones de  navegacion del Admin.
inicio.addEventListener("click",function(){
    let campousuario = document.getElementById("labelusuario");
    if(sessionStorage.getItem("autosave")){
        campousuario.innerHTML = sessionStorage.getItem("autosave");
    }
    campousuario.addEventListener("change",()=>{
        sessionStorage.setItem("autosave",campousuario.innerHTML);
    })
    window.location.href="http://localhost/Neutro/codigo/adminpag/ADindex.html";
});

btonProductos.addEventListener("click",function(){
    window.location.href="ADMpindex.html#controlador-productos";
})