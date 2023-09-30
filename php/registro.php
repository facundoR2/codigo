<?php
include ("conexion.php");
$mail = $_POST['Mail'];
$contraseña = $_POST['Contraseña'];

$query = "INSERT INTO info(id, Mail, Contraseña) VALUES ('NULL','$mail','$contraseña')";
$ejecutar =mysqli_query($conn, $query);

if($ejecutar){
    echo json_encode("USUARIO REGISTRADO EXITOSAMENTE");
}
?>