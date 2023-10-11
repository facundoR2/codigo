<?php
include("../../php/conexion.php");
//confirmamos si lo conseguimos y luego capturamos el mail y contraseña por el post.
if(isset($_POST["Mail"]) && isset($_POST["Contraseña"])){
    $usuario = filter_var($_POST["Mail"], FILTER_SANITIZE_STRING);
    $contraseña = filter_var($_POST["Contraseña"], FILTER_SANITIZE_STRING);

    //prepara consulta SQL para buscar el usuario por Mail.
    $sql = "SELECT * FROM info WHERE Mail = :Mail";
    $stmt = $conn->prepare($sql);

    //ejecuta la consulta con el valor de nombre de usuario.
    $stmt->execute(array(":Mail"=> $usuario));

    $nombre = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$nombre){
        echo json_encode("busqueda exitosa");
        //inicia una sesion y fuarda el nombre de usuario en una variable de session.
        session_start();
        
        $_SESSION["username"] = $usuario;
    }else{
        echo json_encode("usuario no encontrado");
    }
}else{
    echo json_encode("datos incompletos");
}

?>