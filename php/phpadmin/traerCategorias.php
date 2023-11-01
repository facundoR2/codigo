<?php include("../conexion.php");
session_start();


$sql = "SELECT * from categorias";

$stmt = $conn->prepare($sql);

$stmt->execute();
$result = $stmt->get_result();
$categorias = array();
while($fila = $result->fetch_all(MYSQLI_ASSOC)){
    $categorias["categorias"] = $fila;
}
header('Content-Type: application/json');
echo json_encode($categorias);
$conn->close();
?>