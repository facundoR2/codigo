<?php
include ("conexion.php");


//$conect para consultas.
$sql = "SELECT * FROM productos ORDER BY RAND() LIMIT 5";
$resultado = mysqli_query($conn,$sql);
$productos =array();
if (mysqli_num_rows($resultado)>0){
    while($fila =mysqli_fetch_assoc($resultado)){
        $productos[]= $fila;
    }
}
mysqli_close($conn);
// echo json_encode("productos azar buscados exitosamente");
$json = json_encode($productos);
echo $json;
?>