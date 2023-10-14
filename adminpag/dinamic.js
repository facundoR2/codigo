// se crean los contenedores de los elementos html
let nuevologin = document.getElementById('Bingresar');
let ADMproducts = document.getElementById("bton-adm-Products");
let Grafics = document.getElementById("bton-grafics-stats");
let orders = document.getElementById("bton-adm-orders");

// inicio funcionalidad de botones de  navegacion del Admin.

ADMproducts.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/adminproduct/ADMpindex.html";
});
Grafics.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/estadisticas/stas_index.html";
})
orders.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/ordenes/orders_index.html";
})

// ------------------- fin botones de nav ------------------//
// -----------------funcion para solicitar los datos de las tablas---------//
 async function obtenerinfo(){

    let respuesta = await fetch ("http://localhost/Neutro/codigo/php/phpadmin/httpProducto.php");
    if(respuesta.ok){
        let datos = await respuesta.json();
        let tabla = document.createElement("table");
        let tbody = document.createElement("tbody");
        for(let item of datos){
            let fila = document.createElement("tr");
            let celdaId = document.createElement("td");
            celdaId.textContent= item.id;
            let celdaNombre = document.createElement("td");
            celdaNombre.textContent = item.Nombre;
        }
    }
}
