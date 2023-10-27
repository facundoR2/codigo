
//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");

//////////// seccion para la funcionalidad de busqueda ////////////////////.
let buscador = document.getElementById("buscador");
let botonBusqueda = document.getElementById("BotonBuscar");
let logoitem = document.getElementById("Logo-tienda");
logoitem.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
botonBusqueda.addEventListener("click",function(){
    //si precina tecla enter.
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
/////////////////////////////////////// fin seccion busqueda.////////////////
//////////////////////////////////////seccion verificaciones/////////////////
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
/////////////fin seccion session./////////////////
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

//---------------------seccion sobre Producto.----------------------------//
//cargar productos.
//funcion para redigir a una pagina cuando se de click en comprar a un producto.
function iraproducto(Nombre){
    //verificamos que capturo el nombre.
    console.log(Nombre);
    //agregamos el nombre dentro de sessionStorege(solo se almacena dentro de la session hasta que se cierra o reinicia la pag).
    sessionStorage.setItem("producto",Nombre);
    window.location.href="http://localhost/Neutro/codigo/pagvistacomponente/PVICindex.html";
            
};

/////////////---------seccion trerproducto----------///////////
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
////////////----------fin funcion------------------- ////////
///////////-----------seccion configsession------////////
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
////////////----------fin funcion------------------- ////////
//-----funcionalidad de  confirmar cookies--------////
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
function confirmarCookies(){
    const botonAceptarCookies  =document.getElementById("bton-aceptar-cookies");
    const avisocookies = document.getElementById("aviso-cookies");
    const fondoavisocookies = document.getElementById("fondo-aviso-cookies");

    if(!localStorage.getItem('Cookies-aceptadas')){
        avisocookies.classList.add("activo");
        fondoavisocookies.classList.add("activo");
    }
    botonAceptarCookies.addEventListener("click",() =>{
        avisocookies.classList.remove("activo");
        fondoavisocookies.classList.remove("activo");

        localStorage.setItem('Cookies-aceptadas', true);
        crearCookie("aceptarCookies","si",365);
    })
}
////////////------------fin funcionalidad----------------------------////.
//creamos un listener para cuando el DOM se termine de cargar, realice la funcion.
window.addEventListener("DOMContentLoaded",function(){
    confirmarCookies();
    traerproducto();
    configsession();
    
    
});



// fin cargar productos
//cargar stat



//fin cargar stat
// fin seccion productos
