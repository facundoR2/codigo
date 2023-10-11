//listener para la barra de busqueda:
let Mp_Logo = document.getElementById("Logo-tienda");

//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById('Bingresar');
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");
let Go_products = document.getElementById("bton-productos");

////// validaciones para la barra de busqueda///////.
function verificarSession(){
    let nomUsuario = document.getElementById("labelusuario");
    var nombre_de_session = nomUsuario.textContent;
    console.log(nombre_de_session);
    if(nombre_de_session ==="cliente"){
        alert("no has ingresado a una session");
        window.location.href="http://localhost/neutro/codigo/paglogin/loginindex.html";
        var respuesta = false;
        return respuesta;
    }else{
        alert("estas en una session");
        var respuesta = true;
        return respuesta;
    }
}
//listeners de botones para navegar en las paginas.
Mp_Logo.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
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

//////////////////////// seccion mostrar producto buscado.////////////.

/////////////////seccion validaciones respecto a producto.////////////////////////

//////fin seccion validaciones.////////////////////
////// seccion de funciones de Producto /////////////.
function compraproducto(){
    verificarSession();
    if(verificarSession==true){
        alert("estas en una session, puedes reservar el Producto.");
    }else{
        // window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
    }
};
function reservarProduct(){
    verificarSession();
    if(verificarSession==true){
        alert("estas en una session, puedes reservar el Producto.");
    }else{
        window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
    }

}

///////funciones dentro de el producto mostrado.//////////
window.addEventListener("DOMContentLoaded",function(){
    //hacemos peticion para buscar el producto seleccionado.
    let nombre =sessionStorage.getItem("producto");
    console.log(nombre);
    var formdata  =new FormData();
    formdata.append("Nombre",nombre);
    fetch("http://localhost/Neutro/codigo/php/Getproducto-fe-pvc.php",{
        method: 'POST',
        body: formdata,
    }).then(Response =>Response.json())
    .then(data =>{
        console.log(data);
        let contentview = document.getElementById("img-producto-reserva");
        let content_dataproduct = document.getElementById("info-producto-reserva");
        //se crean li para ordenar la info y precio.
        var m_ul =document.createElement("ul");
        m_ul.className="Ulproducto";
        var li1 =document.createElement("li");
        var li2 =document.createElement("li");
        var li3 =document.createElement("li");
        var li4 =document.createElement("li");
        //se crea el p para caract.
        var infp = document.createElement("p");
        infp.textContent = data[0].Caracteristicas;
        infp.className="INFOproducto";
        // se crea el p para PRecio.
        var precio = document.createElement("p");
        precio.textContent= "$"+data[0].Costo;
        precio.className="PRECIO-Producto";
        // se crea el Img para la imagen del producto.
        var imagen = document.createElement("img");
        imagen.src = data[0].Imagen;
        imagen.alt ="NO se recuperó imagen del producto";
        imagen.className="IMAGEN-Producto";
        var boton_carrito = document.createElement("button");
        boton_carrito.className ="Producto-comp-btons";
        boton_carrito.textContent="añadir al carrito";
        var botoncompra = document.createElement("button");
        botoncompra.className ="Producto-comp-btons";
        botoncompra.textContent="comprar";
        botoncompra.onclick= function(){
            compraproducto();
            console.log("compraste el producto");
        };
        boton_carrito.onclick= function(){
            reservarProduct();
            console.log("intentaste reservar el producto");
        }
        li1.appendChild(infp);
        li2.appendChild(precio);
        li3.appendChild(botoncompra);
        li4.appendChild(boton_carrito);
        m_ul.appendChild(li1);
        m_ul.appendChild(li2);
        m_ul.appendChild(li3);
        m_ul.appendChild(li4);
        content_dataproduct.appendChild(m_ul);
        contentview.appendChild(imagen);
    });

});