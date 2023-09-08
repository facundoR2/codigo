//se agrega una fuente para mejor calidad visual.
// FontFace: {
//     new (family="", source= "" | BinaryData, descriptors? FontFaceDescriptors | undefined): FontFace;
//     prototype: FontFace;
// }

//se agregan los listeners para los buttons del menu lateral.
let nuevologin = document.getElementById("#Blogin");
let Go_toaccesory = document.getElementById("#Baccesorios");
let Go_tocategory = document.getElementById("#Bcategorias");
let GO_tofavorites = document.getElementById("#Bfav");
let Go_tocart = document.getElementById("#Bcarrito");
let Go_mypc = document.getElementById("#Batp");

function login(){
    login.preventDefault();
    // crea variables para recolectar los valores del formulario login
    var email = document.querySelector("#Ingmail").nodeValue;
    var contraseña = document.querySelector("#IngContraseña").nodeValue;
    // crea una peticion xmlhttp
    var Xrequest = new XMLHttpRequest();
    Xrequest.open("POST","LoginsUsuario.php");
    Xrequest.setRequestHeader("Content-type","localhost/neutro/codigo//form-urlencoded");
    Xrequest.onreadystatechange = function(){
        if(Xrequest.readyState == 4 && Xrequest.status ==200){
            var respuesta =Xrequest.responseText;
            // si el php devuelve una respuesta exitosa.
            if(respuesta == "LOGIN CON EXITO"){
                //translada al usuario a la pagina 
                window.location.href="http://localhost/neutro/codigo/pag%20principal/";
            }else{
                // si el login no fue correcto, tira mensaje de error.
                alert(respuesta);
            }
        }
    };
    Xrequest.send("mailusuario="+ email + "&contraseña="+ contraseña);
}

