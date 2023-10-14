<!-- en este php se incluiran los comandos GET;POST;UPDATE;DELETE fisico y ideal -->
<?php
include("../conexion.php");

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    $sql = "SELECT * FROM productos";
    
    //preparamos la request
    $stmt= mysqli_query($conn,$sql);
    //ejecutamos la secuencia
    $datos = mysqli_fetch_all($stmt,MYSQLI_ASSOC);
    print_r($datos);
    $json = json_encode($datos);
    echo $json;
    $conn->close();

}
if ($_SERVER['REQUEST_METHOD'] === 'POST'){

}
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){

}
if ($_SERVER['REQUEST_METHOD'] === 'Delete'){
    
}

?>