<?php
include ("../conexion.php");
$mail = $_POST['Mail'];
$contraseña = $_POST['Contraseña'];

if(empty($mail) || empty($contraseña)){
    echo json_encode("El mail y la contraseña no pueden estar vacios");
}else{
    // se encripta la contraseña por seguridad.
    $hash = password_hash($contraseña, PASSWORD_DEFAULT);
    //verificamos que el usuario y la contraseña no existan previamente en la tabla.
    $sql1= "SELECT * FROM info WHERE Mail = ? AND Contraseña = ?";
    $stmt1 = $conn->prepare($sql1);
    $stmt1->bind_param("ss", $mail,$contraseña);
    $stmt1->execute();
    //obtenemos el numero de filas devueltas.
    $num = $stmt1->num_rows();
    //si el numero es mayor a cero, significa que ya existe un registro.
    if($num>0){
        //mostramos mensaje de error.
        echo json_encode("El mail y contraseña ingresados ya existen en la base de datos");
    }else{
        echo json_encode("el email y la contraseña son unicos");
    }
    $stmt1->close();
}

$conn->close();
?>