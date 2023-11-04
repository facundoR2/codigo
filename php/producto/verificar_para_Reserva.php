<?php
include_once ("../conexion.php");


$idproducto = $_POST["producto"];
$estado = $_POST["estado"];

//consulta para confirmar si el producto no esta previamente reservado ya al momento de intentar una reserva.
$sql= "SELECT * FROM productos WHERE  Estado='alta' AND id_producto = ? ";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$idproducto);
$stmt->execute();
$num_result = $stmt->affected_rows;
if($num_result>0){
    //se confirma que el producto esta apto para reserva.
    $result = $stmt->get_result();
    $producto = $result->fetch_array(MYSQLI_ASSOC);
    //se actualiza el estado del producto usando su id unico como indice.
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
}else{
    echo "el producto no se encuentra disponible";
}
$stmt->close();
$conn->close();
?>