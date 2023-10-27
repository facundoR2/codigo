<!-- en este php se incluiran los comandos GET;POST;UPDATE;DELETE fisico y ideal -->
<?php
include("../conexion.php");

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    $sql = "SELECT * FROM productos";
    
    //preparamos la request
    $stmt= $conn->query($sql);
    //ejecutamos la secuencia
    $stmt->execute();
    $products = array();
    if($stmt->num_rows > 0){
        while($row = $stmt->fetch_assoc()){
            $products[] = $row;
        }
    }
    $conn->close();
    return  json_encode($products);

}
if ($_SERVER['REQUEST_METHOD'] === 'POST'){

}
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){

}
if ($_SERVER['REQUEST_METHOD'] === 'Delete'){
    
}

?>