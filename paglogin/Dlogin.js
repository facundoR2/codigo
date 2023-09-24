//se agrega una fuente para mejor calidad visual.
// FontFace: {
//     new (family="", source= "" | BinaryData, descriptors? FontFaceDescriptors | undefined): FontFace;
//     prototype: FontFace;
// }

//se agregan los listeners para los buttons del menu lateral.
var Go_login = document.getElementById("botonlogin");
var Go_inicio = document.getElementById("btoninicio");
var Go_accesorios =document.getElementById("btonaccesorios");
var Go_categorias = document.getElementById("btoncategorias");
var Go_ATP = document.getElementById("btonATP");
var Go_register = document.getElementById("btonRegistrarcuenta");


//listener para el boton que ingresa ¿
Go_register.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/paglogin/pagregistro/indexregistro.html";
});
Go_login.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/paglogin/loginNeutro/indexlogin.html";
});
Go_inicio.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
})
Go_accesorios.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagAccesorios/index.html";
})
Go_categorias.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagCategorias(buscador)/index.html";
})
Go_ATP.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagArmarTuPc/index.html";
})
