//se agrega una fuente para mejor calidad visual.
// FontFace: {
//     new (family="", source= "" | BinaryData, descriptors? FontFaceDescriptors | undefined): FontFace;
//     prototype: FontFace;
// }

//se agregan los listeners para los buttons del menu lateral.
var Go_login = document.getElementById("#btonNeutrologin");
// var Go_toaccesory = document.getElementById("#Baccesorios");
// var Go_tocategory = document.getElementById("#Bcategorias");
// var GO_tofavorites = document.getElementById("#Bfav");
// var Go_tocart = document.getElementById("#Bcarrito");
// var Go_mypc = document.getElementById("#Batp");


function irapagLogin(){
    window.location.href="localhost/neutro/codigo/pag login/login neutro/index.html";

}
//listener para el boton que ingresa ¿
Go_login.addEventListener("click", irapagLogin);

