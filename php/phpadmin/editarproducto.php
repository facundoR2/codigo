<?php include("../conexion.php");


$id =$_POST["id"];
$nombre= $_POST["id"];
$caracteristicas =$_POST["id"];
$Detalles=$_POST["id"];
$estado=$_POST["id"];
$imagen=$_POST["id"];


$sql="UPDATE  productos SET  WHERE id_producto = ? LIMIT 1";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $id);

$stmt->execute();

$result = $stmt->get_result();
$producto = mysqli_fetch_all($result, MYSQLI_ASSOC);
header('Content-Type: application/json');
echo json_encode($producto);
$conn->close();
?>