//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let logoitem = document.getElementById("Logo-tienda");
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_inicio = document.getElementById("bton-inicio");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");


// seccion para la funcionalidad de busqueda.
let buscador = document.getElementById("buscador");
let botonBusqueda = document.getElementById("BotonBuscar");
Go_inicio.addEventListener("click",function(){
    window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
});
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
//listeners de botones para navegar en las paginas.
nuevologin.addEventListener("click",function(){
    if(nuevologin.innerHTML ==="Ingresar"){
        verificarSession()
        if(verificarSession==true){
            alert("ya estas en una session, por favor cierra tu sesion si quieres iniciar otra diferente.");
            botonsession.innerHTML ="cerrar session";
        }else{
            window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
        }
    }if(nuevologin.innerHTML =="cerrar session"){
        //limpia todas las variables de la session.
        sessionStorage.clear();
        //devuelve a pagina principal.
        window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
    }
});
BtonCategorias.addEventListener("click",function(){
    alert("esta funcion todavia no esta lista");
    // window.location.href="http://localhost/Neutro/codigo/pagCategorias/index.html";
});

Go_mypc.addEventListener("click",function(){
    alert("esta funcion todavia no esta lista");
    // window.location.href="http://localhost/Neutro/codigo/pagArmarTuPc/index.html";
});
Go_tocart.addEventListener("click",function(){
    verificarSession()
    if(verificarSession==true){
        window.location.href="http://localhost/Neutro/codigo/pagCarrito/index.html";
    }else{
        alert("por favor ingresa a una sesion para acceder a un carrito");
    }
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
    //crea la variable que contiene el label
    var nomUsuario = sessionStorage.getItem("usuario");
    if(!nomUsuario){
        alert("no has ingresado a una session");
        window.location.href="http://localhost/neutro/codigo/paglogin/loginindex.html";
        return false;
    }else{
        return true;
    }
}

//-----------------------fin seccion session---------------------////.

//---------------------inicio seccion traer productos-------------------//.
function iraproducto(Nombre){
    //verificamos que capturo el nombre.
    console.log(Nombre);
    //agregamos el nombre dentro de sessionStorege(solo se almacena dentro de la session hasta que se cierra o reinicia la pag).
    sessionStorage.setItem("producto",Nombre);
    window.location.href="http://localhost/Neutro/codigo/pagvistacomponente/PVICindex.html";
            
};


function crearProductos(json){
    var productos = json;

    var categorias = Object.keys(productos);
    
    //reccorer array de claves y acceder a cada array por categoria.
    for(var i = 0 ; i<categorias.length;i++){
        //obtener id de categoria actual
        var id_categoria = categorias[i];

        //obtener el array de productos de categoria actual
        var productos_categoria = productos[id_categoria];

        //obtener contenedor de categoria por su id
        var contenedor = document.getElementById(id_categoria);
        

        //recorrer el array de productos 
        for (var j = 0; j < productos_categoria.length; j++) {
            // Obtener el producto actual
            var producto = productos_categoria [j];

            // Crear un elemento div para contener la información del producto
            var div = document.createElement ("div");
            div.className="Producto";
            div.onclick =function(){
                var h3 = this.querySelector("h3");
                var nom = h3.textContent;
                console.log("comprarste el producto: " + nom);
                iraproducto(nom);
            };

            // Crear un elemento h3 para mostrar el nombre del producto
            var h3 = document.createElement ("h3");
            h3.textContent = producto ["Nombre"];

            // Crear un elemento p para mostrar el precio del producto
            var p = document.createElement ("p");
            p.textContent = "$" + producto ["Costo"];
            // Crear un elemento img para mostrar la imagen del producto
            var img = document.createElement ("img");
            img.setAttribute ("src", producto ["imagen"]);
            img.setAttribute ("alt", "no se encontro imagen");

            // Añadir los elementos al div
            div.appendChild (img);
            div.appendChild (h3);
            div.appendChild (p);
            // Añadir el div al contenedor de categoría
            contenedor.appendChild (div);
        }
    }
}


function traerproducto(){
    fetch("http://localhost/Neutro/codigo/php/Get_categorias.php")
    //convertimos la respuesta en un  objeto json.
    .then(function(response){
        if(response.ok){
            return response.json();
        }
    })
    .then(function(data){
        console.log(data);
        crearProductos(data)
    });
}


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
function config_status_session(){
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
window.addEventListener("DOMContentLoaded",function(){
    traerproducto();
    config_status_session();
})