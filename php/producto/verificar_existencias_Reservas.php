<?php
include_once ("../conexion.php");


$idproducto = $_POST["producto"];
$estado = $_POST["estado"];

//consulta para confirmar si el producto no esta previamente reservado ya al momento de intentar una reserva.
$sql= "SELECT * FROM productos WHERE  Estado='alta' AND id_producto = ? ";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s",$idproducto);

$stmt->execute();

$result = $stmt->get_result();
$producto = $result->fetch_array(MYSQLI_ASSOC);




$sql_update = "UPDATE productos SET Estado ='$estado' WHERE id_producto = ?";

$stmt_update = $conn->prepare($sql_update);

$stmt_update->bind_param("s",$idproducto);

$stmt_update->execute();


$num_update = $stmt_update->affected_rows;
// echo($num_update);
//verificamos que se ha modificado el registro.
if($num_update>0){
    $aprobado = "se actualizo el estado correctamente";
    header('Content-Type: application/json');
    // echo json_encode($aprobado);
    echo json_encode($producto);
    
} 



?>