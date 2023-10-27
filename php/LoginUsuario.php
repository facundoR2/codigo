<?php
include("conexion.php");

$usuario = $_POST["Mail"];
$contraseña = ($_POST["Contraseña"]); 
//confirmamos si lo conseguimos y luego capturamos el mail y contraseña por el post.
if(isset($_POST["Mail"]) && isset($_POST["Contraseña"])){

    //prepara consulta SQL para buscar el usuario y contraseña de tabla usuarios.
    $sql = "SELECT * FROM usuarios WHERE NombreUsuario = ?";
    //preparamos la consulta.
    $stmt = $conn->prepare($sql);

    //asignamos los parametros a la consulta.
    $stmt->bind_param("s", $usuario);

    //ejecutamos la consulta
    $stmt->execute();

    //se agrupa el resultado con una variable.
    $stmt->bind_result($id, $idcarrito, $NombreUsuario,$hash,$nivel);

    //creamos un array para los datos.
    $datos =array();
    
    //recorremos el resultado
    while($stmt->fetch()){
        //usamos passwordverify para comparar la contraseña con el hash.
        if(password_verify($contraseña, $hash)){
            //se confirma el usuario, iniciamos session.
            session_start();
            //guardamos el nombre del usuario en una variable de sesion.
            $_SESSION["username"] = $usuario;
            //se procede a guardar los datos en el array
            $datos[] =array("idcarrito"=>$idcarrito, "NombreUsuario"=>$NombreUsuario, "Nivel"=>$nivel);
            //se devuelve el array con los datos.
            echo json_encode($datos);
        }else{
            echo json_encode("usuario u contraseña incorrecto");
        }
    }

}else{
    echo json_encode("datos incompletos o vacios");
}
//cerramos conexion con BD.
$conn->close();
?>