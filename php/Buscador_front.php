<?php

require_once ("conexion.php");


//recibimos el parametro de busqueda de la barra buscador.

$SEARCH = $_POST["Busqueda"];
// sanitizamos.

$SEARCH = filter_var($SEARCH, FILTER_SANITIZE_STRING);
// verificar si no esta vacio.
if (!empty($SEARCH)){
    //eliminar caract especiales para la busqueda SQL
    $buscar = mysqli_real_escape_string($conn,$SEARCH);
    //realizar la consulta SQL
    $sql = "SELECT * FROM stock WHERE Tipo LIKE '%$SEARCH%'";
    //preparamos la consulta.
    $consulta = mysqli_query($conn,$sql);
    if(mysqli_num_rows($consulta)>0){
        $rspt = array();
        if (mysqli_num_rows($consulta)>0){
            while($fila = mysqli_fetch_assoc($consulta)){
                $rspt[] = $fila;
            }
            echo json_encode($rspt);
        }
    }else{
        $sql ="SELECT * FROM stock WHERE Nombre LIKE '%$SEARCH%'";
        $consulta = mysqli_query($conn, $sql);
        if(mysqli_num_rows($consulta)>0){
            //si encuentra un resultado, lo guarda en un arreglo.
            while($fila = mysqli_fetch_assoc($consulta)){
                $rspt[] = $fila;
            }
            echo json_encode($rspt);
        }else{
            //en caso de no encontrar la busqueda.
            header('Content-Type: application/json');
            echo json_encode("No se encontro la busqueda.");

        }
    }   
}else{
    header('Content-Type: application/json');
    echo json_encode("Busqueda vacia");
}
?>