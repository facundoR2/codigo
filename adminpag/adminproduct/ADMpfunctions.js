// se crean los contenedores de los elementos html
let inicio = document.getElementById("Logo-tienda");
let nuevologin = document.getElementById('Bingresar');
let ADMproducts = document.getElementById("bton-adm-Products");
let Grafics = document.getElementById("bton-grafics-stats");
let orders = document.getElementById("bton-adm-orders");

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
ADMproducts.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/adminproduct/ADMpindex.html";
});
Grafics.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/estadisticas/stas_index.html";
})
orders.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/ordenes/orders_index.html";
})