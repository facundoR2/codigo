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

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    
    $Nueva_categoria = $_POST["categoria"];

    //revisamos que la categoria no exista previamente.
    $sql_confirm = "SELECT * FROM categorias WHERE Nombre = ?";

    $stmt_confirm = $conn->prepare($sql_confirm);

    $stmt_confirm->bind_param("s",$Nueva_categoria);

    $stmt_confirm->execute();

    $resultado = $stmt_confirm->get_result();
    if($resultado->num_rows == 0){

        $sql_nuevo = "INSERT INTO  categorias (id, Nombre) VALUES (NULL,?)";

        $stmt_nuevo = $conn->prepare($sql_nuevo);
    
        $stmt_nuevo->bind_param("is", $id, $Nueva_categoria);
    
        $stmt_nuevo->execute();
    
        $filas = $conn->affected_rows;
        if($fila == 1 ){
            echo json_encode("CATEGORIA AGREGADA CORRECTAMENTE");
        }else{
            $error = $conn->error;
            echo json_encode("ERROR AL AGREGAR NUEVA CATEGORIA: ".$error);
        }

    }else{
        echo json_encode("CATEGORIA YA EXISTENTE");
    }
   



}

?>