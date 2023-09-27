//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");
let Go_products = document.getElementById("bton-productos");

// seccion recibir datos de barrabusqueda.
window.onload = function(){
    //obtener la cadena de consulta con los parametros de datos.
    var query = window.location.search;
    //si no esta vacía.
    if (query){
        //eliminar el signo ? del inicio y dividir la cadena por el signo = 
        var partes = query.substring(1).split("=");
        //obtener nombre y valor.
        var nombre = partes[0];
        var valor = partes[1];
        //si el nombre es data.
        if(nombre == "data"){
            //convertir en json
            var datos = JSON.parse(valor);
            //se busca el contenedor de resultados.
            var resultado = document.getElementById("Contenedor-busqueda");
            document.addEventListener("DOMContentLoaded",function(datos){
                //iniciamos un bucle para recorrer el objeto.
                for (var i=0;i<datos.length;i++){
                    //creamos un elemento div para cada producto de la busqueda
                    var producto = document.createElement("div");
                    producto.className = "BBproducto";
                    //creamos un h3 para el nombre del producto.
                    var nombre = document.createElement("h3");
                    nombre.textContent = datos[i].Nombre;
                    //creamos una imagen para cada producto.
                    var img = document.createElement("img");
                    img.alt = "imagen del producto no disponible";
                    //creamos un parrafo para el precio.
                    var precio = document.createElement("p");
                    precio.textContent = "$" + datos[i].Costo;
                    //creamos boton de compra.
                    var buttoncomprar =document.createElement("button");
                    buttoncomprar.onclick= "iraproducto(datos[i].Id,datos[i].Nombre)";
                    //añadimos las variables al div del producto.
                    producto.appendChild(img);
                    producto.appendChild(nombre);
                    producto.appendChild(precio)
                    producto.appendChild(buttoncomprar);
                    //agregamos el producto al contenedor de busqueda.
                    resultado.appendChild(producto);
                }
            });
        }
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
     var busqueda = B_item
     let searchjson = JSON.stringify(busqueda);
    fetch("http://localhost/Neutro/codigo/php/Buscarproducto-fe-pbo.php",{
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