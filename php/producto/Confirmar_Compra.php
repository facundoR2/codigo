<?php
include_once ("../conexion.php");


$idproducto = $_POST["producto"];
$estado = $_POST["estado"];

if(!empty($idproducto) || !empty($estado)){

    //actualizamos el estado del producto.
    $sql = "UPDATE productos SET estado = ? WHERE id_producto = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ss", $estado,$idproducto);

    $stmt->execute();

    $num_rows = $stmt->affected_rows;
    if($num_rows>0){
        echo("se actualizo el estado correctamente");
    }
}
?>