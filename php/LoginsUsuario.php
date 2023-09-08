<?php

//conectar a la base de datos
$conexion = mysqli_conectar("localhost","root","","datos.local");
//se obtienen datos del usuario
$email = $_POST["mailusuario"];
$password =$_POST["contraseña"];
//se validan los datos
if (empty($email) || empty($password)){
    //si se encuentra vacios devolverá un  error
    echo"Debe ingresar un mail y contraseña";
}else{
    $sql ="SELECT * FROM info WHERE infoMail = '$email'";
    $resultado = mysqli_query($conexion,$sql);
    if($resultado){
        //si la consulta se ejecuta correctamente.
        if (mysqli_num_rows($resultado)>0){
            //en caso de encontrar una contraseña, que la obtenga.
            $fila = msqli_fetch_assoc($resultado);
            $password_hash = $fila["contraseña"];
            // luego verifica que la contraseña sea igual
            if (password_verify($password,$password_hash)){
                // que devuelva un mensaje de exito
                echo"LOGIN CON EXITO";
            }else{
                // sino tira un error.
                echo"Contraseña incorrecta";
            }
        }else{
            //si no hay ningun mail que coincida, devuelve un error.
            echo "No se encontrado el mail";
        }
    } else
    {
        // si la consulta falla devuelve error.
        echo"error al consultar la BASE";
    }

}
?>