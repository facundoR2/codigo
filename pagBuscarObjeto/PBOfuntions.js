//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let GO_inicio = document.getElementById("bton-inicio");
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");
let Go_products = document.getElementById("bton-productos");

// seccion recibir datos de barrabusqueda.
window.onload = function(){
    let busqueda =sessionStorage.getItem["busqueda"];
    if(busqueda ==null){
        console.log("la busqueda es nula");
        var alertcontent = document.getElementById("alertas");
        var info = document.createElement("p");
        info.innerHTML="lo sentimos, su busqueda no a podido ser encontrada, pruebe con nuestro buscador";
        alertcontent.appendChild(info);
    if(busqueda == " "){
        console.log("la busqueda esta vacia");
        var alertcontent = document.getElementById("alertas");
        var info = document.createElement("p");
        info.innerHTML="lo sentimos, su busqueda no a podido ser encontrada, pruebe con nuestro buscador";
        alertcontent.appendChild(info);
    }
    }else{
        //se busca el contenedor de resultados.
        var resultado = document.getElementById("Contenedor-busqueda");
        document.addEventListener("DOMContentLoaded",function(){
            let busqueda =sessionStorage.getItem["busqueda"];
            //iniciamos un bucle para recorrer el objeto.
            //creamos un elemento div para cada producto de la busqueda
            var producto = document.createElement("div");
            producto.className = "BBproducto";
            //creamos un h3 para el nombre del producto.
            var nombre = document.createElement("h3");
            nombre.textContent = busqueda[0].Nombre;
            //creamos una imagen para cada producto.
            var img = document.createElement("img");
            img.alt = "imagen del producto no disponible";
            //creamos un parrafo para el precio.
            var precio = document.createElement("p");
            precio.textContent = "$" + busqueda[0].Costo;
            //creamos boton de compra.
            var buttoncomprar =document.createElement("button");
            buttoncomprar.onclick= function(){

            };
            //añadimos las variables al div del producto.
            producto.appendChild(img);
            producto.appendChild(nombre);
            producto.appendChild(precio)
            producto.appendChild(buttoncomprar);
            //agregamos el producto al contenedor de busqueda.
            resultado.appendChild(producto);
        });
    }
};

//fin seccion barrabusqueda.
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
    var busqueda = B_item;
    let search_Fdata = new FormData();
    search_Fdata.append("Busqueda",busqueda);

   fetch("http://localhost/Neutro/codigo/php/Buscarproducto-fe-pp1.php",{
       method: 'POST',
       body: search_Fdata,
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
       sessionStorage.setItem("busqueda",JSON.stringify(data));
       window.location.href="http://localhost/Neutro/codigo/pagBuscarObjeto/PBOindex.html";
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
GO_inicio.addEventListener("click",function(){
    window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
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