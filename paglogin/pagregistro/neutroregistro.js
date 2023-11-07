//listener para la barra de busqueda:
let Mp_Logo = document.getElementById("Logo-tienda");
//listeners de botones para navegar en las paginas.
Mp_Logo.addEventListener("click",function(){
    window.location.href="http://localhost/Neutro/codigo/pagPrincipal/index.html";
});
// funcion para registrarse.
function validaremail(email){
    //expresion que verifica si el elmail tiene patron de usuario@dominio.extension .(acepta ñ).
    const formadominio = /^ [a-zA-Z0-9._-]+@ [a-zA-Z0-9.-]+\. ( [a-zA-Z]{2,4})+$/;
    return(formadominio.test(email));
        
}
function validarcontraseña(contraseña){
    let lengthReq = document.getElementById("length");
    let upperReq = document.getElementById("upper");
    let lowerReq = document.getElementById("lower");
    let numberReq = document.getElementById("number");
    let symbolReq = document.getElementById("symbol");
    if (contraseña.length >=8){
        lengthReq.style.color ="green";
    }else{
        lengthReq.style.color ="red";
    }

    if(/[A-Z]/.test(contraseña)){
        upperReq.style.color ="green";
    }else{}
    if(/a-z/.test(contraseña)){
        lowerReq.style.color ="green";

    }else{
        lowerReq.style.color ="red";
    }
    if(/\d/.test(contraseña)){
        numberReq.style.color ="green";

    }else{
        numberReq.style.color ="red";
    }
    //validar ausencia de simbolos.
    if(/^[A-Za-z0-9]+$/.test(contraseña)) {
        symbolReq.style.color ="green";
    }else{
        symbolReq.style.color ="red";
    }
    //expresion que verifica si tiene almenos 8 caracteres, una letra mayuscula,una letra minuscula,un numero.
    var regla_ex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    return regla_ex.test(contraseña);

}
function validarduplicado(mail,contraseña){
    var formdata = new FormData();
    formdata.append("Mail",mail);
    formdata.append("Contraseña",contraseña);
    fetch("http://localhost/Neutro/codigo/php/usuarios/verificacion_registro.php",{
        method: 'POST',
        body: formdata,
    })
    .then(function(response){
        if(response.ok){
            console.log(response);
        }
    })
}
//----------fin seccion validaciones----//
function insertarNuevoUsuario( mail, contraseña){
    var formdata = new FormData();
    formdata.append("Mail",mail);
    formdata.append("Contraseña",contraseña);
    fetch("http://localhost/Neutro/codigo/php/registro.php", {
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
        if(data[0]==="se inserto usuario Correctamente"){
            alert("se a creado el USUARIO CORRECTAMENTE");
            window.location.href="http://localhost/Neutro/codigo/paglogin/loginindex.html";
        }
    });

}
var formulario = document.getElementById("formularioRegistro");
formulario.addEventListener("submit", function(Event){
    Event.preventDefault();
     // crea variables para recolectar los valores del formulario login
    // primero se crea la variable para obtener el valor
    let mail = document.getElementById("Reg-ipt-email").value;
    //luego se escribe el valor sobre la variable
    document.getElementById("Reg-ipt-email").innerHTML = mail;
    let contraseña = document.getElementById("Reg-ipt-contraseña").value;
    document.getElementById("Reg-ipt-contraseña").innerHTML = contraseña;
    // le pasamos las variables a las funciones de validacion.
    validaremail(mail);
    validarcontraseña(contraseña);
    if(validaremail(mail) == true){
        alert("Email incorrecto");
    }else{
        if(validarcontraseña(contraseña) == false){
            alert("Contraseña incorrecta");
        }else{
            console.log(mail);
            console.log(contraseña);
            validarduplicado(mail,contraseña);
            insertarNuevoUsuario(mail, contraseña);
        }
    }
});