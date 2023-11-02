<?php
include ("conexion.php");


$Nombre =$_POST["Nombre"];
// $Nombre ="Impresora HP Laserjet Pro M428fdw";
//sanitizar el nombre para evitar inyeccion sql
$Nombre =mysqli_real_escape_string($conn,$Nombre);
// realizamos la busqueda en la base de datos ?
$consulta= mysqli_query($conn, "SELECT * FROM productos WHERE Nombre='$Nombre' LIMIT 1");
//creamos un array para capturar los resultados (si es que hay).
$resultado = array();
//verificar si algun registro coincide.
if ($consulta && mysqli_num_rows($consulta)>0){
    while($fila =mysqli_fetch_assoc($consulta)){
        $resultado[]= $fila;
    }
    $json = json_encode($resultado);
    echo $json;

}
else{
    echo json_encode("no se encontro nombre");
}
?>