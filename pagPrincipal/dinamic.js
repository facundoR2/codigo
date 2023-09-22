//se agrega una fuente para mejor calidad visual.
// FontFace: {
//     new (family="", source= "" | BinaryData, descriptors? FontFaceDescriptors | undefined): FontFace;
//     prototype: FontFace;
// }

//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let Go_toaccesory = document.getElementById("#bton-accesorios");
let Go_tocategory = document.getElementById("#Bcategorias");
let GO_tofavorites = document.getElementById("#Bfav");
let Go_tocart = document.getElementById("#Bcarrito");
let Go_mypc = document.getElementById("bton-ATP");

//listeners de botones para navegar en las paginas.
nuevologin.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/paglogin/index.html";
});
Go_toaccesory.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagCategorias(buscador)/index.html";
});
Go_mypc.addEventListener("click",function(){

});
GO_tofavorites.addEventListener();
Go_tocategory.addEventListener();
Go_mypc.addEventListener();