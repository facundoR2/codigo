//se agrega una fuente para mejor calidad visual.
// FontFace: {
//     new (family="", source= "" | BinaryData, descriptors? FontFaceDescriptors | undefined): FontFace;
//     prototype: FontFace;
// }

//se agregan los listeners para los buttons del menu lateral.
let Go_login = document.getElementById("botonlogin");
// var Go_toaccesory = document.getElementById("#Baccesorios");
// var Go_tocategory = document.getElementById("#Bcategorias");
// var GO_tofavorites = document.getElementById("#Bfav");
// var Go_tocart = document.getElementById("#Bcarrito");
// var Go_mypc = document.getElementById("#Batp");

//listener para el boton que ingresa ¿
Go_login.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/paglogin/loginNeutro/indexlogin.html";

});

