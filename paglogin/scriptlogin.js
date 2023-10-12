//se agregan listeners para la seccion cabecera.
let Icon_logo = document.getElementById("Logo-tienda");

//se agregan los listeners para los buttons del menu lateral.
var Go_inicio = document.getElementById("btoninicio");
var Go_accesorios =document.getElementById("bton-accesorios");
var Go_categorias = document.getElementById("btoncategorias");
var Go_ATP = document.getElementById("btonATP");
// listener para botones de conexion.
let Go_recovery = document.getElementById("Btonrecuperarcuenta");

//listener para botones cabecera.
Icon_logo.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
//listener para los botones de navegacion.
Go_inicio.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
Go_accesorios.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagAccesorios/Acc-index.html";
});
Go_categorias.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagCategorias/index.html";
});
Go_ATP.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagArmarTuPc/index.html";
});
//////////fin seccion botones de navegacion////////////.
// funcion para iniciar session.
var formulario = document.querySelector("formulariologin");
formulario.addEventListener("submit", function(Event){
    Event.preventDefault();
    // crea variables para recolectar los valores del formulario login
    var email = document.getElementById("InitEmail").value;
    var contraseña = document.getElementById("InitContraseña").value;
    //luego se escribe el valor sobre la variable.
    document.getElementById("initEmail").innerHTML = email;
    document.getElementById("initContraseña").innerHTML = contraseña;

    console.log(nombre);
    console.log(pass);
    var formdata = new FormData();
    formdata.append("Mail",email);
    formdata.append("Contraseña",contraseña);

    fetch("http://localhost/Neutro/codigo/php/LoginUsuario.php", {
        method: "POST",
        body: formdata
    })
    .then(function(respuesta){
        if(respuesta.ok){
            return respuesta.json();
        }else{
            //mostrar error de respuesta no exitosa
            throw new Error("respuesta salio mal");
        }
    })
    .then(function(data){
        console.log(data);
        if(data ==="busqueda exitosa"){
            if(data.Nivel === 1){
                alert("has iniciado sesion como cliente");
                window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
                
            }
        }
    });
});
