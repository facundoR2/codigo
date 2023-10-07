// funcion para iniciar session.
var formulario = document.getElementById("formulariologin");


formulario.addEventListener("submit", function(Event){
    Event.preventDefault();
    // crea variables para recolectar los valores del formulario login
    // primero se crea la variable para obtener el valor
    var mail = document.getElementById("Mail").value;
    //luego se escribe el valor sobre la variable
    document.getElementById("Mail").innerHTML = mail;
    var contraseña = document.getElementById("Contraseña").value;
    document.getElementById("Contraseña").innerHTML = contraseña;
    var nombre = mail;
    var pass = contraseña;
    //confirmacion de que se capturo los datos correctamente.
    console.log(nombre);
    console.log(pass);
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
    });
});