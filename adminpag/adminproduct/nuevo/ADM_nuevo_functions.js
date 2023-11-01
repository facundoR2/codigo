// se crean los contenedores de los elementos html
let inicio = document.getElementById("Logo-tienda");
let nuevologin = document.getElementById('Bingresar');
let btonProductos = document.getElementById("lm-bton-productos");
let btonOfertas = document.getElementById("lm-bton-ofertas");
// inicio funcionalidad de botones de  navegacion del Admin.
inicio.addEventListener("click",function(){
    let campousuario = document.getElementById("labelusuario");
    if(sessionStorage.getItem("autosave")){
        campousuario.innerHTML = sessionStorage.getItem("autosave");
    }
    campousuario.addEventListener("change",()=>{
        sessionStorage.setItem("autosave",campousuario.innerHTML);
    })
    window.location.href="http://localhost/Neutro/codigo/adminpag/ADindex.html";
});

//funcion de editar producto//

function traerProducto(){
    var id= sessionStorage.getItem("idproduct");
    if(!id){
        alert("no se seleccionó ningun ID de producto");
    }
    let formdata = new FormData();
    formdata.append("id",id);
    var url ="http://localhost/Neutro/codigo/php/phpadmin/editarproducto.php";
    fetch(url,{
        method: 'POST',
        body: formdata,
    })
    .then(response=>{
        if(response.ok){
            
            return response.json();
        }
    })
    .then(data =>{
        console.log(data);
        var input_id = document.getElementById("prcto-in-id");
        input_id.value = data[0].id_producto;
        var input_nombre = document.getElementById("prcto-in-nombre");
        input_nombre.value = data[0].Nombre;
        var input_caract = document.getElementById("prcto-in-crtcs");
        input_caract.value = data[0].Caracteristicas;
        var input_imgurl = document.getElementById("prcto-in-img");
        input_imgurl.value = data[0].imagen;
        var input_Estado = document.getElementById("prcto-in-Estado");
        input_Estado.value = data[0].Estado;
        var input_Categoria = document.getElementById("prcto-in-Categoria");
        input_Categoria.value = data[0].Categoria;

    });
}

function enviarEdicion(){
    let formulario = document.getElementById("form-prcto");
    formulario.addEventListener("submit",function(e){
        e.preventDefault();

        let idproducto = document.getElementById("procto-in-id").value;
        document.getElementById("procto-in-id").innerHTML = idproducto;
        let nombre = document.getElementById("prcto-in-nombre").value;
        document.getElementById("prcto-in-nombre").innerHTML =nombre;
        let Caracteristicas = document.getElementById("prcto-in-crtcs").value;
        document.getElementById("prcto-in-crtcs").innerHTML = Caracteristicas;
        let urlimagen = document.getElementById("prcto-in-img").value;
        document.getElementById("prcto-in-img").innerHTML = urlimagen;
        let estado = document.getElementById("prcto-in-estado").value;
        document.getElementById("prcto-in-estado").innerHTML = estado;
        

    });
}
window.addEventListener("DOMContentLoaded",function(){
    traerProducto();
})