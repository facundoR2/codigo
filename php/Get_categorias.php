<?php
include_once ("conexion.php");


$sql_categorias = "SELECT DISTINCT Categoria FROM productos";

$result_categorias = $conn->query($sql_categorias) or die("error al ejecutar consulta categorias");

//crear array vacio para almacenar los arrays de productos por categoria.
$productos_array =array();

while($fila_categoria = mysqli_fetch_assoc($result_categorias)){
    $categoria = $fila_categoria["Categoria"];

    //consulta sql para obtener los 5 primeros productos de la categoria actual.
    $sql_productos = "SELECT * FROM Productos WHERE Categoria = '$categoria' AND Estado='alta' LIMIT 5";

    //ejecutamos la consulta y guardamos el resultado.
    $resultado_productos = $conn->query($sql_productos) or die("Error al ejecutar consulta de productos");

    //creamos array vacio para almacenar los productos  de la categoria actual
    $categoria_array = array();

    //recorremos el resultado de productos
    while($fila_producto = mysqli_fetch_assoc($resultado_productos)){
        $categoria_array[]=$fila_producto;
    }

    //añadimos el array de la categoria al array general
    $productos_array[$categoria]=$categoria_array;
}
//cerrar conexion a BD
mysqli_close($conn);
header('Content-Type: application/json');


echo json_encode($productos_array);
?>