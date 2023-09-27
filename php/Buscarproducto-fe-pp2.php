<?php
include("conexion.php");
//capturamos el Id y Nombre del formData.
$id =$_POST["Id"];
$Nombre =$_POST["Nombre"];

// realizamos la busqueda en la base de datos ?
$sql = "SELECT * FROM stock WHERE Id = ? AND  Nombre = ?";
$stmt = $conn->prepare($sql);
//vinculamos los parametros.
$stmt->bind_param("is",$id,$Nombre);
// ejecutar el statement.
$stmt->execute();
// obtener resultado.
$resultado = $stmt->get_result();

//verificar si algun registro coincida con el id y nombre
if ($resultado->num_rows>0){
    //si hay registro, va a redigir a otra pagina.
    header("window.location.href='http://localhost/Neutro/codigo/pagvistacomponente/index.html");
}else{
    echo  json_decode("no se encontro ningun registro con ese id y nombre");
}
?>