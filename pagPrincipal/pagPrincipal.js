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

botonBusqueda.addEventListener("click",function(){
    //si precina tecla enter.
        let B_item = document.getElementById('Barrabusqueda').value;
        document.getElementById("Barrabusqueda").innerHTML = B_item;
        item = B_item;
        console.log(item);
        buscarProducto(B_item);
});
function buscarProducto(B_item){
     var busqueda = B_item
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
//funcion para redigir a una pagina cuando se de click en comprar a un producto.
function iraproducto(Id,Nombre){
    console.log(Id);
    console.log(Nombre);
    var formdata = new FormData();
    formdata.append("Id",Id);
    formdata.append("Nombre",Nombre);
    fetch("http://localhost/Neutro/codigo/php/Buscarproducto-fe-pp2.php",{
        method: 'POST',
        body: formdata
    })


};
function mostrarproductos(productos){
    for(var i=0;i<productos.length;i++){
        //creamos div para el producto
        var producto = document.createElement("div");
        //le asigno nombre
        producto.className ="producto";
        var nombre = document.createElement("h4");
        nombre.textContent = productos[i].Nombre;
        //creo y le asigno una imagen
        var img = document.createElement("img");
        //todavia no esta la imagen, asi que solo declaramos el texto alternativo.
        img.alt ="imagen del producto";
        //creamos el parrafo para las caracteristicas
        var caract = document.createElement("p");
        caract.textContent = productos[i].Caracteristicas;
        var precio  = document.createElement("p");
        //creamos otro para el precio
        precio.textContent = "$"+productos[i].Costo;
        //creamos y configuramos el boton de compra del producto
        var buttoncomprar = document.createElement("button");
        buttoncomprar.textContent="comprar";
        buttoncomprar.className="bton-compra";
        buttoncomprar.value = true;
        buttoncomprar.onclick= "iraproducto(productos[i].Id,productos[i].Nombre)";
        //agregamos los items al contenedor "producto".
        producto.appendChild(img);
        producto.appendChild(nombre);
        producto.appendChild(caract);
        producto.appendChild(precio);
        producto.appendChild(buttoncomprar);
        //agregamos el producto al contenedor de productos.
        contenedorproductos.appendChild(producto);
    }
};

//creamos un listener para cuando el DOM se termine de cargar, realice la funcion.
window.addEventListener("DOMContentLoaded",function(){
    //hacemos una peticion de productos a la base de datos
    fetch("http://localhost/Neutro/codigo/php/Getproducto-fe-pp.php")
    //convertimos la respuesta en un  objeto json.
    .then(Response => Response.json())
    .then(data=>{
        productos = data;
        //usamos la funcion de mostrar pasandole de parametro los productos buscados.
        mostrarproductos(productos);
    })

});



// fin cargar productos
//cargar stat

//fin cargar stat
// fin seccion productos
