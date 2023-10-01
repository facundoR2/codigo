<?php 
session_start();
include("conexion.php");
$_SESSION['jsonaEnviar']='';
//capturamos el Id y Nombre del formData.
// $Nombre =$_POST["Nombre"];
$Nombre ="Impresora HP Laserjet Pro M428fdw";
//sanitizar el nombre para evitar inyeccion sql
$Nombre =mysqli_real_escape_string($conn,$Nombre);
// realizamos la busqueda en la base de datos ?
$consulta= mysqli_query($conn, "SELECT * FROM stock WHERE Nombre='$Nombre'");
//creamos un array para capturar los resultados (si es que hay).
$resultado = array();
//verificar si algun registro coincide.
if ($consulta && mysqli_num_rows($consulta)>0){
    while($fila =mysqli_fetch_assoc($consulta)){
        $resultado[]= $fila;
    }
    $_SESSION['jsonaEnviar']=$resultado;
    echo json_encode("BUSQUEDA Y ENVIO EXITOSO");
}
else{
    echo json_encode("no se encontro nombre");
}
mysqli_close($conn);
?>
