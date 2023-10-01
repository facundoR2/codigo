//listener para la barra de busqueda:
let menupricipal = document.getElementById("Logo-tienda");

//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");
let Go_products = document.getElementById("bton-productos");

//listeners de botones para navegar en las paginas.
menupricipal.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
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

//////////////////////// seccion mostrar producto buscado.
window.addEventListener("DOMContentLoaded",function(){
    //hacemos peticion para buscar el producto seleccionado.
    fetch("http://localhost/Neutro/codigo/php/Getproducto-fe-pvc.php")
    .then(
        Response =>Response.json())
        .then(data =>{
            let contentview = document.getElementById("content-prcto-view");
            let content_dataproduct = document.getElementById("info-producto-compra");
            if(data =="NO hay datos"){
            }
            else{
                //se crean li para ordenar la info y precio.
                var li1 =document.createElement("li");
                var li2 =document.createElement("li");
                var li3 =document.createElement("li");
                //se crea el p para caract.
                var infp = document.createElement("p");
                infp.textContent = data.Caracteristicas;
                infp.className="INFOproducto";
                // se crea el p para PRecio.
                var precio = document.createElement("p");
                precio.textContent= "$"+data.Costo;
                precio.className="PRECIO-Producto";
                // se crea el Img para la imagen del producto.
                var imagen = document.createElement("img");
                imagen.src = data.imagen;
                imagen.alt ="<h1>NO se recuperó imagen del producto</h1>";
                imagen.className="IMAGEN-Producto";
                var botoncompra = document.createElement("button");
                var botonreserva = document.createElement("button");
                botoncompra.className ="Producto-Botondecompra";
                botoncompra.textContent="comprar";
                botoncompra.onclick= function(){
                    compraproducto();
                    console.log("compraste el producto");
                }
                botonreserva.onclick =function(){
                    reservarproducto();
                    console.log("Reservaste el producto");
                }
                contentview.appendChild(imagen);
                li1.appendChild(infp);
                li2.appendChild(precio);
                li3.appendChild(botoncompra);
                li3.appendChild(botonreserva);
                content_dataproduct.appendChild(li1);
                content_dataproduct.appendChild(li2);
                content_dataproduct.appendChild(li3);
        }




        });
});