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
logoitem.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
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
//------------------- fin seccion busqueda--------------------//.
//--------------seccion configuraciones de session-----------//.
function verificarSession(){
    let usuarionombre = document.getElementById("labelusuario");
    var usuario = usuarionombre.textContent;
    console.log(usuario);
    if (usuario == "cliente"){
        alert("no has ingresado a una session");
        window.location.href="http://localhost/neutro/codigo/paglogin/loginindex.html";
        var respuesta = false;
        return respuesta;
    }else{
        alert("estas en una session");
        var respuesta = true;
        return respuesta;
    }
};
function configsession(){
    var label = document.getElementById("labelusuario");
    var botonsession = document.getElementById("Bingresar");
    var usuario = sessionStorage.getItem("usuario");
    if( label =="" || !usuario){
        label.innerHTML="cliente";
        
    }else{
        label.innerHTML = usuario;
        botonsession.innerHTML ="cerrar session";
    }     
};
//-----------------------fin seccion session---------------------////.
//listeners de botones para navegar en las paginas.
nuevologin.addEventListener("click",function(){
    verificarSession()
    if(verificarSession==true){
        alert("ya estas en una session");
    }else{
        window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
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

//---------------------inicio seccion traer productos-------------------//.
function buscarProducto(B_item){
    var busqueda = B_item;
    let search_Fdata = new FormData();
    search_Fdata.append("Busqueda",busqueda);

   fetch("http://localhost/Neutro/codigo/php/Buscarproducto-fe-pp1.php",{
       method: 'POST',
       body: search_Fdata
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
function traerproducto(){
    fetch("http://localhost/Neutro/codigo/php/Getproducto-fe-pp.php")
    //convertimos la respuesta en un  objeto json.
    .then(Response => Response.json())
    .then(data=>{
        information = data;
        let contenedorproductos = document.getElementById("contenedor-productos");
        for(var i=0;i<information.length;i++){
            //creamos div para el producto
            var producto = document.createElement("div");
            //le asigno nombre
            producto.className ="Producto";
            producto.onclick=function(){
                var h3 = this.querySelector("h3");
                var nom = h3.textContent;
                console.log("comprarste el producto: " + nom);
                iraproducto(nom);
            }
            var nombre = document.createElement("h3");
            nombre.className="Newsproducts";
            nombre.textContent = information[i].Nombre;
            //creo y le asigno una imagen
            var img = document.createElement("img");
            img.alt="no hay imagen disponible.";
            img.src = information[i].Imagen;
            //creamos y asignamos un parrafo para el precio.
            var precio  = document.createElement("p");
            precio.className="Product-p";
            precio.textContent = "$"+ information[i].Costo;
            //agregamos los items al contenedor "producto".
            producto.appendChild(img);
            producto.appendChild(nombre);
            producto.appendChild(precio);
            //agregamos el producto al contenedor de productos.
            contenedorproductos.appendChild(producto);
        };
    });
};

//-------------------------seccion cookies-------------------------------//.
function crearCookie(nombre, valor, dias){
    var fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias*24*60*60*1000));
    var expira = "expires="+ fecha.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expira +";path=/";
}
// Función para obtener el valor de una cookie por su nombre
function obtenerCookie(nombre) {
    var nombreCookie = nombre + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nombreCookie) == 0) {
        return cookie.substring(nombreCookie.length, cookie.length);
      }
    }
    return"";
}
//------------------fin seccion cookies--------------------//.
window.addEventListener("DOMContentLoaded",function(){
    confirmarCookies();
    // traerproducto();
    configsession();
});