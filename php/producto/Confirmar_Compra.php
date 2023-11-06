<?php
include_once ("../conexion.php");


$idproducto = $_POST["producto"];
$estado = $_POST["estado"];
$usuario = $_POST["usuario"];

if( !empty($idproducto) && !empty($estado) && !empty($usuario)){

    //actualizamos el estado del producto.
    $sql = "UPDATE productos SET estado = ? WHERE id_producto = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ss", $estado, $idproducto);

    $stmt->execute();
    $num_rows = $stmt->affected_rows;
    if($num_rows>0){ 
        //AR,23,"Tierra del Fuego"
        // echo json_encode("se actualizo el estado correctamente");
        // $timezone = geoip_time_zone_by_country_and_region('AR',23);
        $tiempo = date("Y-m-d-H:i:s.u");
        $hora = date("H:i");
        $id= NULL;
        $idtramite =$idproducto.$hora/2;
        $sql_compra = "INSERT INTO compras (id, 
        Fecha_compra, id_usuario , id_producto , id_tramite) VALUES (?,?,?,?,?)";
        $stmt = $conn->prepare($sql_compra);
        $stmt->bind_param("issii", $id, $tiempo, $usuario, $idproducto, $idtramite);
        $stmt->execute();
        $num = $stmt->affected_rows;

        if($num>0){
            echo json_encode("ESTADO MODIFICADO");
            echo json_encode($idtramite);
        }
        
    }

}
?>