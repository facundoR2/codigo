<?php include("../conexion.php");


$sql ="SELECT Id_producto, Nombre FROM stock";

$stmt = $conn->prepare($sql);

$stmt->execute();
$result = $stmt->get_result();
$stocks = array();

while($fila = $result->fetch_all(MYSQLI_ASSOC)){
    $stocks["stock"] = $fila;
}

header('Content-Type: application/json');
echo json_encode($stocks);
$stmt->close();
$conn->close();
?>