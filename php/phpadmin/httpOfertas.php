
<?php
// en este php se incluiran los comandos GET;POST;UPDATE;DELETE fisico y ideal
include("../conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET'){

    header('Content-Type: application/json');


    $sql = $sql = "SELECT ofertas.Id_Oferta, productos.Nombre as nombreProducto, ofertas.PrecioActual, ofertas.PrecioAnterior FROM ofertas JOIN productos ON ofertas.Id_producto = productos.Id";
    
    //preparamos la request
    $stmt= $conn->prepare($sql);
    //ejecutamos la secuencia
    $stmt->execute ();


    $result = $stmt->get_result();
    $ofertas = array();
    while($fila = $result->fetch_all(MYSQLI_ASSOC)){
        $ofertas["ofertas"]= $fila;
    }
    // $productos = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($ofertas);
    $conn->close();

}
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    
}
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){

}
if ($_SERVER['REQUEST_METHOD'] === 'Delete'){
    
}

?>