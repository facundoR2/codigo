<?php include("../conexion.php");


$id =$_POST["id"];


$sql="SELECT * FROM productos WHERE id_producto = ? LIMIT 1";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $id);

$stmt->execute();

$result = $stmt->get_result();
$producto = mysqli_fetch_all($result, MYSQLI_ASSOC);
header('Content-Type: application/json');
echo json_encode($producto);
$conn->close();
?>