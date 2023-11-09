//listener para la cabecera.
let Mp_Logo = document.getElementById("Logo-tienda");
let nuevologin = document.getElementById('Bingresar');
//se agregan los listeners para los buttons del menu lateral.
let GO_inicio = document.getElementById("bton-inicio");
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_mypc = document.getElementById("bton-ATP");
let buscador = document.getElementById("buscador");
let logoitem = document.getElementById("Logo-tienda");
//////////// seccion para la funcionalidad de busqueda ////////////////////.
let botonBusqueda = document.getElementById("BotonBuscar");
botonBusqueda.addEventListener("click",function(){
    //si precina tecla enter.
        let B_item = document.getElementById('Barrabusqueda').value;
        document.getElementById("Barrabusqueda").innerHTML = B_item;
        item = B_item;
        console.log(item);
        buscarProducto(B_item);
});
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
})
/////////////////////////////////////// fin seccion busqueda.////////////////
GO_inicio.addEventListener("click",function(){
    window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
});
logoitem.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
BtonAccesorios.addEventListener("click",function(){
    window.location.replace("http://localhost/Neutro/codigo/pagAccesorios/Acc-index.html");
})

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
///////////-----------seccion configsession------////////
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
////////////----------fin seccion configsession------------------- ////////
///////////-------------seccion de productos---------------------/////////
//-------------sec de confirmacion---------------------////
function confirmarcompra(id_producto){
    var verf =verificarSession();
    if(verf){
        var usuario = sessionStorage.getItem("usuario");
        formdata = new FormData();
        formdata.append("producto",id_producto);
        formdata.append("usuario",usuario);
        var url ="http://localhost/Neutro/codigo/php/carrito/confirmar_compra_reserva.php";
        fetch(url,{
            method: 'POST',
            body: formdata,
        }).then(function(response){
            if(response.ok){
                return response.json();
            }
        })
        .then(function(data){
            if(window.confirm("se confirmo su compra, precente el numero de tramite en el local, idtramite:"+data)){
                if(window.confirm("desea seguir comprando?")){
                    window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
                }else{
                    sessionStorage.clear();
                    //devuelve a pagina principal.
                    window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
                }
            }
        })
        .catch(function(error){});
    }if(!verf){
        alert("no estas en una session, no puedes confirmar el producto.");
        window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
    }

}
//------------- FIN seccion de confirmacion------------////
function mostrar_Detalles(nom,img,prcto_detalles){
    let contenedor_detalles = document.getElementById("contenedor_detalles");
    
    //verificamos que capturo el nombre.
    console.log(nombre);
            
};
function traercarrito(){
    //hacemos peticion para buscar el producto seleccionado.
    let usuario =sessionStorage.getItem("usuario");
    console.log(usuario);
    var formdata  =new FormData();
    formdata.append("usuario",usuario);
    var params = new URLSearchParams(formdata).toString();
    var url = "http://localhost/Neutro/codigo/php/carrito/CarritoActions.php?"+params;
    fetch(url)
    .then(Response =>Response.json())
    .then(data =>{
        console.log(data);
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

            //creamos boton detalles:
            var bton_detalles = document.createElement("button");
            bton_detalles.innerText="Detalles";
            bton_detalles.className="prcto_btons";
            bton_detalles.onclick=function(){
                var h3 = this.parentElement.querySelector("h3");
                var img = this.parentElement.querySelector("img");
                var prcto_detalles = information[i].detalle_caracteristicas;
                var nom = h3.textContent;
                console.log("ingresaste al producto: " + nom);
                mostrar_Detalles(nom,img,prcto_detalles);
            };
            var bton_confirmar = document.createElement("button");
            bton_confirmar.innerText="Confirmar Compra";
            bton_confirmar.className="prcto_btons";
            bton_detalles.className="prcto_btons";
            var id_producto = data[i].id_producto;
            bton_confirmar.onclick=function(){
                confirmarcompra(id_producto);
            }
            //creo y le asigno una imagen
            var img = document.createElement("img");
            img.alt="no hay imagen disponible.";
            img.src = information[i].imagen;
            //creamos y asignamos un parrafo para el precio.
            var precio  = document.createElement("p");
            precio.className="Product-p";
            precio.textContent = "$"+ information[i].Costo;
            //agregamos los items al contenedor "producto".
            producto.appendChild(img);
            producto.appendChild(nombre);
            producto.appendChild(precio);
            producto.appendChild(bton_detalles);
            producto.appendChild(bton_confirmar);
            //agregamos el producto al contenedor de productos.
            contenedorproductos.appendChild(producto);
        };
    })
    .catch(function(error){

    });
}
///////////-------------seccion de productos---------------------/////////

window.addEventListener("DOMContentLoaded",function(){
    traercarrito();
    config_status_session();
    
});