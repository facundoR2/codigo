<?php
include ("conexion.php");
$mail = $_POST['Mail'];
$contraseña = $_POST['Contraseña'];

// se encripta la contraseña por seguridad.
$hash = password_hash($contraseña, PASSWORD_DEFAULT);

$sql = "INSERT INTO info(id, Mail, Contraseña) VALUES ('NULL','?','?)";
//preparamos la consulta.
$stmt =$conn->prepare($sql);
//binculamos los parametros con valores insertar.
$stmt->bind_param("ss", $mail, $hash);
//ejecutamos la consulta.
$stmt->execute();

if($ejecutar){
    echo json_encode("USUARIO REGISTRADO EXITOSAMENTE");
}
?>