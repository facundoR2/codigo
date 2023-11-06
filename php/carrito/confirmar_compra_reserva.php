<?php include("../conexion.php");

//recibimos los parametros de la consulta.
$idproducto = $_POST["producto"];
$usuario  =$_POST["usuario"];

//FASE 1: actualizar estado.
//actualizamos el estado del producto a Comprado(24hrs).

$estado = 'Comprado';

$sql_update = "UPDATE productos SET estado = ? WHERE id_producto = ? LIMIT 1";

$stmt_update = $conn->prepare($sql_update);

$stmt_update->bind_param("ss", $estado, $idproducto);

$stmt_update->execute();


$update_num = $stmt_update->affected_rows;

if($update_num>0){
    //fase 2: buscar carrito del usuario.
    //buscamos el precio del producto.
    $sql = "SELECT Costo FROM productos WHERE id_producto = ? LIMIT 1";
    $stmt =$conn->prepare($sql);
    $stmt->bind_param("i",$idproducto);
    $stmt->execute();
    $result = $stmt->get_result();
    $Costo = $result->fetch_assoc()["Costo"];
    
    //buscamos el carrito usando el nombre de usuario.

    $sql = "SELECT IdCarrito FROM usuarios WHERE NombreUsuario = ?";

    $stmt =$conn->prepare($sql);

    $stmt->bind_param("s", $usuario);

    $stmt->execute();

    $result= $stmt->get_result();
    $idCarrito = $result->fetch_assoc()["IdCarrito"];
    // $num = $stmt->num_rows;
    if($idCarrito > 0 ){
        //verificacion sobre existencia de carrito_detalle con este idcarrito y este idproducto.
        $sql_cart = "SELECT * FROM carrito_detalle WHERE id_carrito = ? AND id_producto = ?";
        $stmt= $conn->prepare($sql_cart);
        $stmt->bind_param("is", $idCarrito, $idproducto);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows > 0){
            $cantidad = 1;
            //procedemos a restar la cantidad al carrito_detalle.
            //el producto ya existe en el carrito , asi que actualizamos la cantidad solamente.
            $sql_update = "UPDATE carrito_detalle SET cantidad = cantidad - ? WHERE id_carrito = ? AND id_producto = ?";
            $stmt_update =$conn->prepare($sql_update);
            $stmt_update->bind_param("iis", $cantidad, $idCarrito, $idproducto);
            $stmt_update->execute();

            //actualizamos el total de carrito.
            $sql_update_carrito = "UPDATE carritos SET Total = Total - ? WHERE id = ?";
            $stmt_update_carrito = $conn->prepare($sql_update_carrito);
            $stmt_update_carrito->bind_param("ii", $Costo,$idCarrito);
            $stmt_update_carrito->execute();
            //verificamos la cantidad del carrito_detalle.
            $sql_cant = "SELECT cantidad FROM carrito_detalle WHERE id_carrito = ? AND id_producto = ?";

            $stmt_cant = $conn->prepare($sql_cant);
            $stmt_cant->bind_param("is",$idCarrito, $idproducto);
            $stmt_cant->execute();
            $resultado_cant = $stmt_cant->get_result();
            $cant_producto = $resultado_cant->fetch_assoc()["cantidad"];
            if($cant_producto == 0){
                $sql_delete="DELETE  FROM carrito_detalle WHERE id_carrito = ? AND id_producto = ?";
                $stmt_delete =$conn->prepare($sql_delete);
                $stmt_delete->bind_param("is",$idCarrito,$idproducto);
                $stmt_delete->execute();
            }

            if($stmt_update->affected_rows == 1){

                $tiempo = date("Y-m-d-H:i:s.u");
                $hora = date("H:i");
                $id= NULL;
                $idtramite =$idproducto.$hora;
                $sql_compra = "INSERT INTO compras (id, Fecha_compra, id_usuario , id_producto , id_tramite) VALUES (?,?,?,?,?)";
                $stmt = $conn->prepare($sql_compra);
                $stmt->bind_param("issii", $id, $tiempo, $usuario, $idproducto, $idtramite);
                $stmt->execute();
                if($stmt->affected_rows >0){
                    echo json_encode($idtramite);
                };
                

            }else{
                echo json_encode("OCURRIO UN ERROR AL ACTUALIZAR DETALLES");
            }
        }

    }elseif($idCarrito == 0){
        echo json_encode("ERROR FASE 2(find cart)");
    }

}elseif($update_num === 0){
    echo json_encode("ERROR FASE 1(upd product)");
}
?>
