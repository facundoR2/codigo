// se crean los contenedores de los elementos html
let logo = document.getElementById("Logo-tienda");
let nuevologin = document.getElementById('Bingresar');
let inicio = document.getElementById("lm-bton-inicio");
let btonProductos = document.getElementById("lm-bton-productos");
let btonOfertas = document.getElementById("lm-bton-ofertas");
// inicio funcionalidad de botones de  navegacion del Admin.
logo.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/ADindex.html";
});
inicio.addEventListener("click",function(){
    window.location.replace("http://localhost/Neutro/codigo/adminpag/Adminproduct/ADMpindex.html");
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

//funciones de crear producto//
//funciones de crear categoria//
async function enviarNuevoProducto(idproducto,nombre,Caracteristicas,Detalles,urlimagen,idstock,Costo,estado,Categoria){

    var formdata = new FormData();
    formdata.append("idproducto",idproducto);
    formdata.append("nombre",nombre);
    formdata.append("Caracteristicas",Caracteristicas);
    formdata.append("Detalles",Detalles);
    formdata.append("imagen",urlimagen);
    formdata.append("idstock",idstock);
    formdata.append("Costo",Costo);
    formdata.append("Estado",estado);
    formdata.append("Categoria",Categoria);
    var url = "http://localhost/Neutro/codigo/php/phpadmin/Nuevo_producto.php";
    var mensaje = await fetch(url,{
        method: 'POST',
        body: formdata
    }).then(function(response){
        if(response.ok){
            return response.json();
        }
    }).then(function(data){
        switch(data){
            case "PRODUCTO INSERTADO CORRECTAMENTE":
                console.log("producto insertado en bd");
                return "producto insertado";

            case "ERROR AL INSERTAR NUEVO PRODUCTO: ":
                console.log(data);
                return "ocurrio un error al agregar el producto: error fase 1";

            case "EL PRODUCTO YA EXISTE":
                console.log("el producto ya existe en la BD");
                return "producto ya existente";

            case "ERROR AL CONECTAR BD":
                alert("el servidor no se encuentra disponible en estos momentos, sepa disculpar");
                window.location.replace("http://localhost/Neutro/codigo/adminpag/ADMpindex.html");
                break;
            default:
                console.log(data);
        }
    });
    if(mensaje == "producto ya existente"){
        alert("el producto que estas intentando ingresar ya existe, revisa cuidadosamente el listado de productos");
    }
    if(mensaje == "ocurrio un error al agregar el producto: error fase 1"){
        alert("el producto se pudo insertar en la base de datos, intentelo denuevo mas tarde");
    }
}
async function enviar_categoria(categoria){

    var formdata = new FormData();
    formdata.append("Categoria",categoria);
    var url = "http://localhost/Neutro/codigo/php/phpadmin/traerCategorias.php";
    var mensaje_promise = await fetch(url,{
        method: 'POST',
        body: formdata
    }).then(function(response){
        if(response.ok){
            return response.json();
        }
    }).then(function(data){
        switch(data){

            case "CATEGORIA AGREGADA CORRECTAMENTE":
                alert("se agregó la nueva categoria correctamente");
                window.location.reload();
                break;
            case "CATEGORIA YA EXISTENTE":
                alert("la categoria ingresada ya existe, por favor revise las opciones de categoria");
                break;
            case "ERROR AL AGREGAR NUEVA CATEGORIA: ".$error:
                alert("ocurrió un error al agregar la nueva categoria: " + $error);
                break;
            default:
                alert("no se pudo procesar la respuesta del servidor");
                break;
        }
    })
}
function verificarCategoria(Categoria){
    if(Categoria.length >15){
        alert("en nombre no debe exceder los 15 caracteres");
        return false;
    }else{return true;}
};


 

//captura de formulario nuevo producto.
let formulario = document.getElementById("form_nuevo_producto");
formulario.addEventListener("submit",function(e){
    e.preventDefault();

    let idproducto = document.getElementById("prcto-in-id").value;
    document.getElementById("prcto-in-id").innerText = idproducto;
    console.log(idproducto);
    let nombre = document.getElementById("prcto-in-nombre").value;
    document.getElementById("prcto-in-nombre").innerText =nombre;
    let Caracteristicas = document.getElementById("prcto-in-crtcs").value;
    document.getElementById("prcto-in-crtcs").innerText = Caracteristicas;
    let Detalles = document.getElementById("prcto-in-crtcs_details").value;
    document.getElementById("prcto-in-crtcs_details").innerText = Detalles;
    let urlimagen = document.getElementById("prcto-in-img").value;
    document.getElementById("prcto-in-img").innerText = urlimagen;
    let idstock = document.getElementById("prcto-in-stock").value;
    document.getElementById("prcto-in-stock").innerText = idstock;
    let Costo = document.getElementById("prcto-in-Precio").value;
    document.getElementById("prcto-in-Precio").innerText = Costo;
    let estado = document.getElementById("prcto-in-Estado").value;
    document.getElementById("prcto-in-Estado").innerText = estado;
    let Categoria = document.getElementById("prcto-in-Categoria").value;
    document.getElementById("prcto-in-Categoria").innerText = Categoria;


    enviarNuevoProducto(idproducto,nombre,Caracteristicas,Detalles,urlimagen,idstock,Costo,estado,Categoria);

});


let formulario_categoria = document.getElementById("form-nueva-categoria");
formulario_categoria.addEventListener("submit",function(){
    let Nombre_Ncategoria = document.getElementById("nombre_Ncategoria").value;
    document.getElementById("nombre_Ncategoria").innerText = Nombre_Ncategoria;
    var aprobado = verificarCategoria(Nombre_Ncategoria);
    if(aprobado){
        alert("su nueva categoria se esta procesando");
        enviar_categoria(Nombre_Ncategoria);
    }else{

    }
});
//-----configuraciones generales de la pagina----------//////.
function traerCategorias(idselect){
    let selectId = document.getElementById(idselect);
    fetch("http://localhost/Neutro/codigo/php/phpadmin/traerCategorias.php")
    .then(function(response){
        if(response.ok){
            return response.json();
        }
    }).then(function(data){
        // console.log(data);
        for(let i=0;i<data.categorias.length;i++){
            let option = document.createElement("option");
            option.value= data.categorias[i].id;
            option.text = data.categorias[i].Nombre;
            selectId.appendChild(option);
        }
    }).catch(function(error){
        console.log("error al cargar las categorias:",error);
    });
};
function traerstock(idselect){

    let stockId = document.getElementById(idselect);

    fetch("http://localhost/Neutro/codigo/php/phpadmin/traer_stock.php")
    .then(function(response){
        if(response.ok){
            return response.json();
        }
    }).then(function(data){
        // console.log(data);
        for(let e=0; e<data.stock.length;e++){
            let option = document.createElement("option");
            option.value = data.stock[e].Id_producto;
            option.text = data.stock[e].Nombre;
            stockId.appendChild(option);
        }
    }).catch(function(error){
        console.log("error al cargar los stocks: ", error);
    })


};
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
window.addEventListener('DOMContentLoaded', function () {
    config_status_session();
    let idselect = "prcto-in-Categoria";
    traerCategorias(idselect);
    let idselectstock = "prcto-in-stock";
    traerstock(idselectstock);
})