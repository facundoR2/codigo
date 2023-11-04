<?php
include_once ("../conexion.php");


$idproducto = $_POST["producto"];


//consulta para confirmar si hay stock
$sql= "SELECT * FROM productos WHERE  Estado='alta' AND id_producto = ? ";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $idproducto);
$stmt->execute();
$result = $stmt->get_result()->num_rows;
if($result == 0){
    $comprobacion="NO DISPONIBLE";
    echo json_encode($comprobacion);
}if($result>0){
    echo json_encode("DISPONIBLE");
}
?>