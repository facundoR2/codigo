
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
        localStorage.setItem("busqueda",JSON.stringify(data));
        window.location.href="http://localhost/Neutro/codigo/pagBuscarObjeto/PBOindex.html?datos=" +JSON.stringify(data);
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
    console.log(Nombre);
    var formdata = new FormData();
    formdata.append("Nombre",Nombre);
    fetch("http://localhost/Neutro/codigo/php/iraProducto-fe-pp2.php",{
        method: 'POST',
        body: formdata
    })
    .then(respuesta =>{
        if(respuesta.ok){
            return respuesta.json();
        }
    })
    .then(data=>{
        if(data ==="BUSQUEDA Y ENVIO EXITOSO"){
            window.location.href="http://localhost/Neutro/codigo/pagvistacomponente/PVICindex.html";
        };
    });
};
// fin funcion //
// var botones = document.querySelectorAll("Producto-Botondecompra");
//     botones.forEach((boton)=> {
//         boton.addEventListener("mouseover", function(){
//             console.log("entro");
//             boton.addEventListener("click",function(){
//                 var h3 = this.parentElement.querySelector("h3");
//                 var nombre = h3.textContent;
//                 iraproducto(nombre);

//         });
//     });
// });

//funcion para una pequeña cantidad de productos aleatorios.

// function mostrarproductos(information){
    
    
// };

//creamos un listener para cuando el DOM se termine de cargar, realice la funcion.
window.addEventListener("DOMContentLoaded",function(){
    //hacemos una peticion de productos a la base de datos
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
            var nombre = document.createElement("h3");
            nombre.className="Newsproducts";
            nombre.textContent = information[i].Nombre;
            //creo y le asigno una imagen
            var img = document.createElement("img");
            img.alt="no hay imagen disponible.";
            img.src = information[i].Imagen;
            //todavia no esta la imagen, asi que solo declaramos el texto alternativo.
            //creamos el parrafo para las caracteristicas
            var caract = document.createElement("p");
            caract.innerText = information[i].Caracteristicas;
            var precio  = document.createElement("p");
            var botoncompra = document.createElement("button");
            botoncompra.className ="Producto-Botondecompra";
            botoncompra.textContent="comprar";
            botoncompra.onclick= function(){
                var h3 = this.parentElement.querySelector("h3");
                var nom = h3.textContent;
                console.log("comprarste el producto: " + nom);
                iraproducto(nom);
            }
            //creamos otro para el precio
            // producto.price.textContent=information[i].Costo;
            precio.textContent = "$"+ information[i].Costo;
            //agregamos los items al contenedor "producto".
            producto.appendChild(img);
            producto.appendChild(nombre);
            producto.appendChild(caract);
            producto.appendChild(precio);
            producto.appendChild(botoncompra);
            //agregamos el producto al contenedor de productos.
            contenedorproductos.appendChild(producto);
        };
        //usamos la funcion de mostrar pasandole de parametro los productos buscados.
        // crearProductos(information);
        // mostrarproductos(information);
    })
    
    
});



// fin cargar productos
//cargar stat



//fin cargar stat
// fin seccion productos
