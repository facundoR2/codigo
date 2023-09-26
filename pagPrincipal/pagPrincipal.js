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
let botonBusqueda = document.getElementById("BotonBuscar");

buscador.addEventListener("click",function(){
    let B_item = document.getElementById('Barrabusqueda').value;
    document.getElementById("Barrabusqueda").innerHTML = B_item;
    item = B_item;
    console.log(item);
    buscarProducto(B_item);
});
function buscarProducto(B_item){
     var busqueda = B_item
     let searchjson = JSON.stringify(busqueda);
    fetch("http://localhost/Neutro/codigo/php/Buscarproducto-fe.php",{
        method: 'GET',
        body: searchjson
    })
    .then(function(respuesta){
        if(respuesta.ok){
            console.log("busqueda exitosa");
            return respuesta.json();
        }else{
            console.log("busqueda incompleta");
            window.location.href="http://localhost/Neutro/codigo/pagBuscarObjeto/index.html";
        }
    })
    .then(function(data){
        console.log(data);

    });


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
//ficn seccion session.
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
    window.location.href="http://localhost/Neutro/codigo/pagAccesorios/Acc-index.html";
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
//seccion sobre Producto.
//cargar productos.
let contenedorproductos = document.getElementById("contenedor-productos");
function iraproducto(id,Nombre){


};
function mostrarproductos(productos){
    for(var i=0;i<productos.length;i++){
        //creamos div para el producto
        var producto = document.createElement("div");
        //le asigno nombre
        producto.className ="producto";
        var nombre = document.createElement("h3");
        nombre.textContent = productos[i].Nombre;
        var caract = document.createElement("p");
        caract.textContent = productos[i].Caracteristicas;
        var precio  = document.createElement("p");
        precio.textContent = "$"+productos[i].Costo;
        var buttoncomprar = document.createElement("button");
        buttoncomprar.textContent="comprar";
        buttoncomprar.className="bton-compra";
        buttoncomprar.onclick= iraproducto(productos[i].id,productos[i].Nombre);
        producto.appendChild(nombre);
        producto.appendChild(caract);
        producto.appendChild(precio);
        producto.appendChild(buttoncomprar);
        contenedorproductos.appendChild(producto);
    }
};


window.addEventListener("DOMContentLoaded",function(){
    fetch("http://localhost/Neutro/codigo/php/Getproducto-fe-pp.php")
    .then(Response => Response.json())
    .then(data=>{
        productos = data;
        mostrarproductos(productos);
    })

});



// fin cargar productos
//cargar stat

//fin cargar stat
// fin seccion productos
