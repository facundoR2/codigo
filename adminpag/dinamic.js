// se crean los contenedores de los elementos html
let nuevologin = document.getElementById('Bingresar');
let ADMproducts = document.getElementById("bton-adm-Products");
let Grafics = document.getElementById("bton-grafics-stats");
let orders = document.getElementById("bton-adm-orders");

// inicio funcionalidad de botones de  navegacion del Admin.

ADMproducts.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/adminproduct/ADMpindex.hmtl";
});
Grafics.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/estadisticas/stas_index.html";
})
orders.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/adminpag/ordenes/orders_index.html";
})


