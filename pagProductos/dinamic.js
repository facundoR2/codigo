//se agrega una fuente para mejor calidad visual.
// FontFace: {
//     new (family="", source= "" | BinaryData, descriptors? FontFaceDescriptors | undefined): FontFace;
//     prototype: FontFace;
// }

//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let Go_toaccesory = document.getElementById("bton-accesorios");
let Go_tocategory = document.getElementById("bton-categorias");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");
let Go_products = document.getElementById("bton-productos");

// seccion para la funcionalidad de busqueda.
let buscador = document.getElementById("buscador");
let B_item = document.getElementById('Barrabusqueda');
let botonBusqueda = document.getElementById("BotonBuscar");

buscador.addEventListener("click",function(){
    item = B_item;
    console.log(item);
});
function buscarProducto(B_item){

};

// fin seccion busqueda.

//listeners de botones para navegar en las paginas.
nuevologin.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/paglogin/index.html";
});
Go_toaccesory.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagCategorias(buscador)/index.html";
});
Go_mypc.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagArmarTuPc/index.html";
    

});
Go_tocategory.addEventListener("click",function(){

    window.location.href="http://localhost/neutro/codigo/pag"
});
Go_mypc.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/"

});
