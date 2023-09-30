<?php 
include("conexion.php");
//capturamos el Id y Nombre del formData.
$Nombre =$_POST["Nombre"];

// realizamos la busqueda en la base de datos ?
$sql = "SELECT * FROM stock WHERE Nombre LIKE '%$Nombre%'";
$consulta = mysqli_query($conn, $sql);
$resultado =mysqli_fetch_array($sql);

//verificar si algun registro coincida con el id y nombre
if ($resultado->num_rows>0){
    $json = json_encode($resultado);
    //si hay registro, va a redigir a otra pagina.
    echo json_encode($resultado);
}else{
    echo  json_decode("no se encontro ningun registro con ese nombre");
}

?>