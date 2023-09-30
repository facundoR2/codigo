//se agregan listeners para la seccion cabecera.
let Icon_logo = document.getElementById("Logo-tienda");

//se agregan los listeners para los buttons del menu lateral.
var Go_inicio = document.getElementById("btoninicio");
var Go_accesorios =document.getElementById("bton-accesorios");
var Go_categorias = document.getElementById("btoncategorias");
var Go_ATP = document.getElementById("btonATP");
// listener para botones de conexion.
let Go_registro = document.getElementById("btonRegistrar");
let Go_login = document.getElementById("btonlogin");
let Go_recovery = document.getElementById("Btonrecuperarcuenta");

//listener para botones cabecera.
Icon_logo.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
//listener para el boton que ingresa ¿
Go_registro.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/paglogin/pagregistro/indexregistro.html";
});
Go_login.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/paglogin/loginNeutro/indexlogin.html";
});
Go_inicio.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
})
Go_accesorios.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagAccesorios/Acc-index.html";
})
Go_categorias.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagCategorias/index.html";
})
Go_ATP.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagArmarTuPc/index.html";
})
