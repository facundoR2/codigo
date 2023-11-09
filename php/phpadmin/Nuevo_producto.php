<?php include("../conexion.php");

$numero_producto = $_POST["idproducto"];
$nombre_producto = $_POST["nombre"];
$caracteristicas = $_POST["Caracteristicas"];
$Detalles = $_POST["Detalles"];
$imagen = $_POST["imagen"];
$idstock = $_POST["idstock"];
$Costo = $_POST["Costo"];
$estado = $_POST["Estado"];
$categoria = $_POST["Categoria"];


//fase 1: revisar que no hayan preexistencias:

$id_producto = "0".$idstock . "0".$categoria ."0". $numero_producto;
// echo ($id_producto);

$sql_validate = "SELECT * FROM productos WHERE  id_producto = ?";

$stmt_validate = $conn->prepare($sql_validate);

$stmt_validate->bind_param("s",$id_producto);

$stmt_validate->execute();

$result_validate = $stmt_validate->get_result();
if($result_validate->num_rows == 0){

    $sql_nuevo = "INSERT INTO productos ( Id, id_producto,
     Nombre, Caracteristicas, detalle_caracteristicas, 
     Costo, imagen, id_stock, Estado, Categoria) VALUES (NULL, ? , ? , ? , ? , ? , ? , ? , ? , ? )";
    $stmt_nuevo = $conn->prepare($sql_nuevo);
    $stmt_nuevo->bind_param("ssssisisi", $id_producto, $nombre_producto, $caracteristicas, $Detalles, $Costo, $imagen, $idstock , $estado ,$categoria );
    $stmt_nuevo->execute();
    // Obtener el número de filas afectadas
    $filas = $conn->affected_rows;
    // Verificar si se insertó una fila
    if ($filas == 1) {
        echo json_encode("PRODUCTO INSERTADO CORRECTAMENTE");
    } else {
        $error = $conn->error;
        echo json_encode("ERROR AL INSERTAR NUEVO PRODUCTO: ".$error);
    }


}else{
    echo json_encode("EL PRODUCTO YA EXISTE");
}







?>