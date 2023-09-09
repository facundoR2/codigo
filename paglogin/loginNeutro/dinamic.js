// variables que recolectan los botones para los listener.
var Go_login = document.getElementById("botonlogin");
var Go_inicio = document.getElementById("btoninicio");
var Go_accesorios =document.getElementById("btonaccesorios");
var Go_categorias = document.getElementById("btoncategorias");
var Go_ATP = document.getElementById("btonATP");


//listener para el boton que ingresa ¿
Go_login.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/paglogin/loginNeutro/indexlogin.html";
});
Go_inicio.addEventListener("click",function(){
    window.location.href="http://localhost/neutro/codigo/pagPrincipal/index.html";
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

function login(){
    login.preventDefault();
    // crea variables para recolectar los valores del formulario login
    var email = document.querySelector("#IngMail").value;
    var contraseña = document.querySelector("#IngContraseña").value;
    // crea una peticion xmlhttp para hacer una peticion AJAX.
    var Xrequest = new XMLHttpRequest();
    Xrequest.open("POST","LoginsUsuario.php");
    Xrequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //prepara la bandera para que realize la funcion cuando cambie el estado de la request.
    Xrequest.onreadystatechange = function(){
        if(Xrequest.readyState == 4 && Xrequest.status ==200){
            var respuesta =Xrequest.responseText;
            // si el php devuelve una respuesta exitosa.
            if(respuesta == "LOGIN CON EXITO"){
                //translada al usuario a la pagina 
                window.location.href="http://localhost/neutro/codigo/pagPrincipal/index.html";
            }else{
                // si el login no fue correcto, tira mensaje de error.
                alert(respuesta);
            }
        }
    };
    Xrequest.send("mailusuario="+ email + "&contraseña="+ contraseña);
}

