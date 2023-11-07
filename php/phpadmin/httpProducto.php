
<?php
// en este php se incluiran los comandos GET;POST;UPDATE;DELETE fisico y ideal
include("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET'){

    header('Content-Type: application/json');


    $sql = "SELECT * FROM productos";
    
    //preparamos la request
    $stmt= $conn->prepare($sql);
    //ejecutamos la secuencia
    $stmt->execute ();


    $result = $stmt->get_result();
    $productos = array();
    while($fila = $result->fetch_all(MYSQLI_ASSOC)){
        $productos["productos"] =$fila;
    }
    // $productos = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($productos);
    $conn->close();

}
if ($_SERVER['REQUEST_METHOD'] === 'POST'){




}
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){

    $data = file_get_contents("php://input");

    //convertimos el form en un arreglo asociativo.
    parse_str($data, $params);

    $id = $params["idproducto"];
    $nombre = $params["nombre"];
    $caracts = $params["caracts"];
    

}
if ($_SERVER['REQUEST_METHOD'] === 'Delete'){
    
}

?>