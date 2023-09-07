//se agrega una fuente para mejor calidad visual.
// FontFace: {
//     new (family="", source= "" | BinaryData, descriptors? FontFaceDescriptors | undefined): FontFace;
//     prototype: FontFace;
// }

//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById("#Bingresar");
let Go_toaccesory = document.getElementById("#Baccesorios");
let Go_tocategory = document.getElementById("#Bcategorias");
let GO_tofavorites = document.getElementById("#Bfav");
let Go_tocart = document.getElementById("#Bcarrito");
let Go_mypc = document.getElementById("#Batp");

//listener para el boton que ingresa ¿
nuevologin.addEventListener("click",function(){
    Event.preventDefault();
    try {
        irapagLogin();

        
    } catch (error) {
        console.log(error);
        
    }
    
    

})
function irapagLogin(){
    window.location.href="localhost/neutro/codigo/pag login";

}
