<?php

include ("conexion.php");


//recibimos el parametro de busqueda de la barra buscador.

$SEARCH = $_POST["Busqueda"];

// verificar si no esta vacio.
if (!empty($SEARCH)){
    //eliminar caract especiales para la busqueda SQL
    $buscar = mysqli_real_escape_string($conn,$SEARCH);
    //realizar la consulta SQL
    $sql = "SELECT * FROM stock WHERE Nombre LIKE '%$SEARCH%'";
    //preparamos la consulta.
    $result = mysqli_query( $conn, $sql);
    if (mysqli_num_rows($result)>0){
        while($fila = mysqli_fetch_assoc($result)){
            echo $fila[]
        }
    }
    //obtener numero de filas del resultado.
    $total = mysqli_num_rows($stmt);
    //si hay una fila que coincida.
    if ($total>0){
        $datos[]=array();
        //mandar mensaje que se encontraron resultados.
        echo json_encode("<p>se encotraron $total de resultados para: <b>$buscar</b></p>");
        //recorre la filas del resultado y muestra los datos buscados.
        while($row =mysqli_fetch_array($resultado)){
            $datos[]=array(
                "id"=>$row['Id'],
                "nombre"=>$row['Nombre']
            );

        }
        //devolver arreglo com JSON.
        echo json_encode($datos);
    }else{
        echo json_encode(array("error"=>"no se encontraron resultados para :$buscar"));
    }
}
?>