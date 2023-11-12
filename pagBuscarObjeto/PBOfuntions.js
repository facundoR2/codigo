//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById("Bingresar");
let GO_inicio = document.getElementById("bton-inicio");
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");
let Go_products = document.getElementById("bton-productos");

//--------------seccion navegacion------------//
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
BtonAccesorios.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagAccesorios/index.html";
});
BtonCategorias.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagCategorias/index.html";
});
Go_tocart.addEventListener("click",function(){
    verificarSession()
    if(verificarSession==true){
        window.location.href="http://localhost/Neutro/codigo/pagCarrito/index.html";
    }else{
        alert("por favor ingresa a una sesion para acceder a un carrito");
    }
});
Go_mypc.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagArmarTuPc/index.html";
});
//------------fin seccion navegacion--------//
//---------------seccion recibir datos de barrabusqueda.----------\\\\\\\\\\\\\\\\
function verificarBusqueda(){
    let busqueda = window.sessionStorage.getItem('busqueda');
    if(busqueda.includes( "No se encontro la busqueda.")){
        var aviso = 0;
        crearElemento(aviso);
    }else{
        //se busca el contenedor de resultados.
        crearElemento(busqueda);
    }
};


function crearElemento(busqueda){
    if(busqueda == 0){
        let aviso = document.createElement("p");
        aviso.innerText ="no se a encontrado lo que buscaba, pero tambien te puede interesar:";
        aviso.className="avisoMaloBusqueda";
        const alerta = document.getElementById("sp_alerta");
        alerta.appendChild(aviso);
    }else{
        let contenedor_B_productos = document.getElementById("contenedor_productos");
        
    }
};
//fin seccion barrabusqueda.
// seccion para la funcionalidad de busqueda.
let buscador = document.getElementById("buscador");
let botonBusqueda = document.getElementById("BotonBuscar");


function buscarProducto(B_item){
    var busqueda = B_item;
    let search_Fdata = new FormData();
    search_Fdata.append("Busqueda",busqueda);

   fetch("http://localhost/Neutro/codigo/php/Buscardor_front.php",{
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
    //crea la variable que contiene el label
    var nomUsuario = sessionStorage.getItem("usuario");
    if(!nomUsuario){
        alert("no has ingresado a una session");
        window.location.href="http://localhost/neutro/codigo/paglogin/loginindex.html";
        return false;
    }else{
        return true;
    }
};

//ficn seccion session.


window.addEventListener("DOMContentLoaded",function(){
    verificarBusqueda();
    
});