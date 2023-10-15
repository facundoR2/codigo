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

//parte de validaciones de session

function validaremail(email){
    //expresion que verifica si el elmail tiene patron de usuario@dominio.extension .(acepta ñ).
    const formadominio = /^ [a-zA-Z0-9._-]+@ [a-zA-Z0-9.-]+\. ( [a-zA-Z]{2,4})+$/;
    return(formadominio.test(email));
        
}
function validarcontraseña(contraseña){
    //expresion que verifica si tiene almenos 8 caracteres, una letra mayuscula,una letra minuscula,un numero.
    var regla_ex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return regla_ex.test(contraseña);

}
//fin parte de validaciones de session
var formulario = document.getElementById("formulariologin");
formulario.addEventListener("submit", function(Event){
    Event.preventDefault();
    // crea variables para recolectar los valores del formulario login
    let email = document.getElementById("initEmail").value;
    document.getElementById("initEmail").innerHTML = email;
    let contraseña = document.getElementById("initContraseña").value;
    document.getElementById("initContraseña").innerHTML = contraseña;
    validaremail(email);
    validarcontraseña(contraseña);
    if(validaremail(email)==true){
        alert("Email u contraseña incorrecto");
    }else{
        if(validarcontraseña(contraseña)==false){
            alert("Contraseña incorrecta");
        }else{
            console.log(email);
            console.log(contraseña);
            var formdata = new FormData();
            formdata.append("Mail",email);
            formdata.append("Contraseña",contraseña);
            fetch("http://localhost/Neutro/codigo/php/LoginUsuario.php", {
                method: "POST",
                body: formdata
            })
            .then(function(respuesta){
                if(respuesta.ok){
                    if(respuesta =="usuario u contrase\u00f1a incorrecto"){
                        alert("usuario u contrase\u00f1a incorrecto");
                    }
                    return respuesta.json();
                }else{
                    //mostrar error de respuesta no exitosa
                    throw new Error("respuesta salio mal");
                }
            }).then(function(data){
                if(data[0].Nivel ==1){
                    console.log(data);
                    alert("Bienvenido "+ data[0].NombreUsuario);
                }
                if(data[0].Nivel ==2){
                    console.log(data);
                    alert("Bienvenido admin: "+data[0].NombreUsuario);
                }
                if(data[0].Nivel ==3){

                }
            })
        }
    }
});
