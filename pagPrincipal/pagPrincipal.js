//se agrega una fuente para mejor calidad visual.
// FontFace: {
//     new (family="", source= "" | BinaryData, descriptors? FontFaceDescriptors | undefined): FontFace;
//     prototype: FontFace;
// }

//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
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
//seccion verificaciones
function verificarSession(){
    let usuarionombre = document.getElementById("labelusuario");
    var usuario = usuarionombre.textContent;
    console.log(usuario);
    if (usuario == "cliente"){
        alert("no has ingresado a una session");
        window.location.href="http://localhost/neutro/codigo/paglogin/index.html";
        var respuesta = false;
        return respuesta;
    }else{
        alert("estas en una session");
        var respuesta = true;
        return respuesta;
    }
};
//fin seccion session.
//listeners de botones para navegar en las paginas.
nuevologin.addEventListener("click",function(){
    verificarSession()
    if(verificarSession==true){
        alert("ya estas en una session");
    }else{
        window.location.href="http://localhost/Neutro/codigo/paglogin/index.html";
    }
    
});
BtonCategorias.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagCategorias/index.html";
});
BtonAccesorios.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagAccesorios/index.html";
});
Go_mypc.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagArmarTuPc/index.html";
});
Go_tocart.addEventListener("click",function(){
    verificarSession()
    if(verificarSession==true){
        window.location.href="http://localhost/Neutro/codigo/pagCarrito/index.html";
    }else{
        alert("por favor ingresa a una sesion para acceder a un carrito");
    }
});