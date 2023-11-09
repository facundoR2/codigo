<?php include("../conexion.php");
// idproducto,nombre,Caracteristicas,Detalles,imagen, precio,Estado,Categoria

$idproducto = $_POST["idproducto"];
$nombre = $_POST["nombre"];
$caracteristicas = $_POST["Caracteristicas"];
$Detalles = $_POST["Detalles"];
$imagen = $_POST["imagen"];
$precio = $_POST["precio"];
$estado = $_POST["Estado"];
$categoria = $_POST["Categoria"];

$sql="UPDATE  productos SET Nombre = ? , Caracteristicas = ? , detalle_caracteristicas = ? , Costo = ? , imagen = ? , Estado = ? , Categoria = ?   WHERE id_producto = ? LIMIT 1";

$stmt = $conn->prepare($sql);

$stmt->bind_param("sssissis", $nombre ,$caracteristicas, $Detalles, $precio, $imagen, $estado, $categoria, $idproducto);

if($stmt->execute()){
    $stmt->close();
    $conn->close();
    echo json_encode("MODIFICACION CORRECTA");
}else{
    echo json_encode("ERROR AL MODIFICAR");
}
?>