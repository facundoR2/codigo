// funcion para iniciar session.
var formulario = document.querySelector("formulariologin");
formulario.addEventListener("submit", function(Event){
    Event.preventDefault();
    // crea variables para recolectar los valores del formulario login
    var email = document.getElementById("IngMail");
    var contraseña = document.getElementById("IngContraseña");
    var nombre = email.innerText;
    var pass = contraseña.textContent;
    console.log(nombre);
    console.log(pass);
    var formdata = new FormData();
    formdata.append("Mail",email);
    formdata.append("Contraseña",contraseña);

    fetch("LoginsUsuario.php", {
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
    });
});