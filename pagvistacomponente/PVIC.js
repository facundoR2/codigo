// import { jsPDF } from "./js/jspdf.es.min.js";
//listener para la cabecera.
let Mp_Logo = document.getElementById("Logo-tienda");
let nuevologin = document.getElementById('Bingresar');
//se agregan los listeners para los buttons del menu lateral.
let GO_inicio = document.getElementById("bton-inicio");
let botonBusqueda = document.getElementById("BotonBuscar");
let BtonAccesorios = document.getElementById("bton-accesorios");
let BtonCategorias = document.getElementById("bton-categorias");
let Go_tocart = document.getElementById("bton-carrito");
let Go_mypc = document.getElementById("bton-ATP");
let Go_products = document.getElementById("bton-productos");

//////-.---------------------funcionalidad de la cabecera----------------------////////
botonBusqueda.addEventListener("click",function(){
    //si precina tecla enter.
        let B_item = document.getElementById('Barrabusqueda').value;
        document.getElementById("Barrabusqueda").innerHTML = B_item;
        var item = B_item;
        console.log(item);
        buscarProducto(B_item);
});

function buscarProducto(B_item){
     var busqueda = B_item;
     let search_Fdata = new FormData();
     search_Fdata.append("Busqueda",busqueda);

    fetch("http://localhost/Neutro/codigo/php/Buscarproducto-fe-pp1.php",{
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
//--validaciones para la barra de busqueda--//////.
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
//--fin validaciones para la barra de busqueda--///////.

//////-.--------------------- fin funcionalidad de la cabecera----------------------////////
//listeners de botones para navegar en las paginas.
GO_inicio.addEventListener("click",function(){
    window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
});
Mp_Logo.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
nuevologin.addEventListener("click",function(){
    if(nuevologin.innerHTML ==="Ingresar"){
        verificarSession()
        if(verificarSession == true){
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
BtonAccesorios.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagAccesorios/Acc-index.html";
});
Go_mypc.addEventListener("click",function(){
    alert("esta funcion todavia no esta lista");
    // window.location.href="http://localhost/Neutro/codigo/pagArmarTuPc/index.html";
});
Go_tocart.addEventListener("click",function(){
    var verf =verificarSession();
    if(verf){
        window.location.href="http://localhost/Neutro/codigo/pagCarrito/cart_index.html";
    }else{
        alert("por favor ingresa a una sesion para acceder a un carrito");
    }
});
//////-.--------------------- fin funcionalidad de la cabecera----------------------////////.
/////-------------------------seccion del producto seleccionado---------------------///////.
function Detalles(detalles){
    let contenedor_detalles = document.getElementById("contenedor_detalles");
    let details = document.createElement("p");
    details.className="producto_detalles";
    details.innerText = detalles;
    contenedor_detalles.appendChild(details); 
}
function traerproducto(){
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
        imagen.src = data[0].imagen;
        imagen.alt ="NO se recuperó imagen del producto";
        imagen.className="IMAGEN-Producto";
        var boton_comprar = document.createElement("button");
        boton_comprar.className = "Producto-comp-btons";
        boton_comprar.textContent="Comprar";
        boton_comprar.onclick=function(){
            var idproduct = data[0].id_producto;
            ComprarProducto(idproduct);
        }
        var boton_carrito = document.createElement("button");
        boton_carrito.className ="Producto-comp-btons";
        boton_carrito.textContent="añadir al carrito";
        boton_carrito.onclick= function(){
            var idproduct = data[0].id_producto;
            reservarProduct(idproduct);
            console.log("intentaste reservar el producto");
        }
        
        var detalle_caracteristicas = data[0].detalle_caracteristicas;

        li1.appendChild(infp);
        li2.appendChild(precio);
        li3.appendChild(boton_comprar);
        li4.appendChild(boton_carrito);
        m_ul.appendChild(li1);
        m_ul.appendChild(li2);
        m_ul.appendChild(li3);
        m_ul.appendChild(li4);
        content_dataproduct.appendChild(m_ul);
        contentview.appendChild(imagen);
        
        Detalles(detalle_caracteristicas);
    });
};

////////---funcionalidad  genereal respecto al producto seleccionado--///
// function crearcomprobante_pdf(idproduct){
//     var usuario = sessionStorage.getItem("usuario");
    

//     //creamos un papel
//     const doc = new jsPDF();
//     doc.text("hello word!", 10, 10);
//     doc.text(idproduct,10,20);
//     doc.text(usuario,10,30);
//     doc.save("a4.pdf");

// };

async function comprobarestado(idproduct){
    var formdata = new FormData();
    formdata.append("producto",idproduct);
    try{
        let response = await fetch("http://localhost/Neutro/codigo/php/producto/verificarexistencia.php",{
            method: 'POST',
            body: formdata,
        });
        if(response.ok){
            let data = await response.json();
            //se evalua la respuesta.
            if(data =="NO DISPONIBLE"){
                if(window.confirm("el producto se encuentra AGOTADO, por favor consulte en nuestros locales para mas info.")){
                    window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
                };
                

            }else{
                return data;
            }
        }else{
            throw new Error("la consulta fetch falló");
        }
    }catch(error){
        console.log(error);
        return "OCURRIO un error al verificar el estado del producto";
    }
    
   
};
async function Modificar_estado(idproduct, estado){
    var formdata = new FormData();
    var usuario = sessionStorage.getItem("usuario");
    formdata.append("producto",idproduct);
    formdata.append("estado", estado);
    formdata.append("usuario",usuario);
    try{
        let response = await fetch("http://localhost/Neutro/codigo/php/producto/confirmar_Compra.php",{
            method: 'POST',
            body: formdata,
        });
        if(response.ok){
            let data = await response.json();
            //se evalua la respuesta.
            if(data == "ESTADO MODIFICADO"){
                return data;
            }
        }else{
            throw new Error("La consulta para modificar estado falló");
        }
    }catch(error_modif){
        console.log(error_modif);
        alert("error al realizar la consulta");
    }
};
/// funcion en caso de accionar boton(comprar);
async function ComprarProducto(idproduct){
    //verificamos que el usuario este en una session.
    var verf =verificarSession();
    if(verf){
        alert("estas en una session, puedes comprar el Producto.");
        try{
            //busca consulta que id del producto estan disponibles.
            let mensaje = await comprobarestado(idproduct);
            if( mensaje == "DISPONIBLE"){
                //si el mensaje es disponible, modificamos el estado.
                alert("el producto esta disponible");
                var estado ="Comprado";
                try{
                    let mensaje_mod = await Modificar_estado(idproduct,estado);
                    if(mensaje_mod == "ESTADO MODIFICADO"){
                        
                    }
                }catch(error_modif){
                    console.log(error_modif);
                    alert("occurrio un error al modificar el estado el producto")
                }
                console.log("en este momento se creara un pdf con los datos de tramite.");
                
                // crearcomprobante_pdf(idproduct);
            }else{

                console.log(mensaje);
            }
            // confirmacion_compra(idproduct);
        }catch(error){
            console.log(error);
            alert("occurrio un error al procesar el producto");
        }
        //genera su reserva cambiando su estado.
        //genera pdf con numero de tramite.
    }if(!verf){
        alert("no estas en una session, no puedes reservar el producto.");
        window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
    }
};
function confirmacion_compra(idproduct){
    var verf =verificarSession();
    if(verf){
        alert("estas en una session, puedes Comprar el Producto.");
        var formdata = new FormData();
        var estado ="Comprado";
        formdata.append("idproducto",idproduct);
        formdata.append("estado",estado);

        alert("se creara un un pdf para validar el tramite");
        //actualiza informacion y agrega datos a compra.
        fetch("http://localhost/Neutro/codigo/php/producto/Confirmar_Compra.php",{
            method: 'POST',
            body: formdata,
        })

    }if(!verf){
        alert("no estas en una session");
        window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
    }
    
}

// funcionalidad  en caso de agregar carrito;

async function Meter_en_carrito(idproduct){
    try{
        let consulta = await comprobarestado(idproduct);
        if(consulta == "DISPONIBLE"){
            alert("la reserva esta disponible");
            try{
                let consulta = await crearReserva(idproduct);
                if(consulta == "se agrego el producto al carrito por 72hrs"){
                    alert("se agrego el producto al carrito por 72hrs");
                    window.location.replace("http://localhost/Neutro/codigo/pagCarrito/cart_index.html");
                }if(consulta == "Se actualizo correctamente carrito"){
                    alert("el producto se añadio al carrito");
                    window.location.replace("http://localhost/Neutro/codigo/pagCarrito/cart_index.html");
                }
            }catch(er){
                throw new console.error(er);
            }
        }
    }catch(err){}
};
async function crearReserva(idproduct){
    var usuario = sessionStorage.getItem("usuario");
    var formdata = new FormData();
    formdata.append("producto",idproduct);
    formdata.append("usuario",usuario);
    try{
        let response = await fetch("http://localhost/Neutro/codigo/php/carrito/CarritoActions.php",{
            method: 'POST',
            body: formdata,
        }).catch(error =>{console.log(error)})
        if(response.ok){
            let data = await response.json();
            //se evalua la respuesta.
            switch(data){
                
                case "CANTIDAD ACTUALIZADA CORRECTAMENTE":
                    return "Se actualizo correctamente carrito";
                case "ERROR FASE 1(upd product)":
                    if(window.confirm("no se a encontrado el producto, por favor consulte en nuestros locales para mas info. OCURRIO UN ERROR FASE 1 AL PROCESAR LA SOLICITUD")){
                        window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
                    };
                    break;
                case "ERROR FASE 2(find cart)":
                    if(window.confirm("OCURRIO UN ERROR FASE 2 AL PROCESAR LA SOLICITUD")){
                        window.location.replace("http://localhost/Neutro/codigo/pagPrincipal/index.html");
                    };
                    break;
                case "PRODUCTO INSERTADO DENTRO DE CARRITO CORRECTO":
                    return "se agrego el producto al carrito por 72hrs";
                default:
                    console.log(data);
                    return data;
            }
        }else{
            throw new Error("error al consultar la base");
        }
    }catch( Error){
        throw new Error;

        return err
    }
};  
function reservarProduct(idproduct){
    var verf =verificarSession();
    if(verf){
        alert("estas en una session, puedes reservar el Producto.");
        Meter_en_carrito(idproduct);
        // window.location.href="http://localhost/Neutro/codigo/pagCarrito/cart_index.html";

    }if(!verf){
        alert("no estas en una session");
        window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
    }

}

//--fin seccion funciones del producto.---///
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


//---seccion cookies------//
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
//--- fin seccion cookies------//
window.addEventListener("DOMContentLoaded",function(){
    traerproducto();
    configsession();

});