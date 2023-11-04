<?php include("../conexion.php");

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    //recibimos los parametros de la consulta.
    $idproducto = $_GET["id"];
    $nombreuser  =$_GET["Nombreusuario"];

    //buscamos el carrito usando el nombre de usuario.

    $sql = "SELECT IdCarrito FROM usuarios WHERE NombreUsuario = ?";

    $stmt =$conn->prepapre($sql);

    $stmt->bind_param("s", $nombreuser);

    $stmt->execute();

    $result= $stmt->fetch_assoc();

    if($result >0 ){
        $idCarrito = $result;

        $sql= "SELECT  Productos_Reservados_id FROM carritos WHERE id = ?";

        $stmt=$conn->prepare($sql);

        $stmt->bind_params("i",$idCarrito);

        $stmt->execute();

        $result = $stmt->fetch_assoc();

        return json_encode($result);
    }

}
if ($_SERVER['REQUEST_METHOD'] === 'POST'){

    //recibimos los parametros de la consulta.
    $idproducto = $_POST["producto"];
    $usuario  =$_POST["usuario"];

    //actualizamos el estado del producto a Reservado(72hrs).

    $estado = "En Carrito";
    
    $sql_update = "UPDATE productos SET estado = ? WHERE id_producto = ?";

    $stmt_update = $conn->prepare($sql_update);

    $stmt_update->bind_param("ss", $estado, $idproducto);

    $stmt_update->execute();
    
    $update_num = $stmt_update->affected_rows;

    if($update_num>0){
        //buscamos el carrito usando el nombre de usuario.

        $sql = "SELECT IdCarrito FROM usuarios WHERE NombreUsuario = ?";

        $stmt =$conn->prepare($sql);

        $stmt->bind_param("s", $usuario);

        $stmt->execute();

        $result= $stmt->get_result();
        $idCarrito = $result->fetch_array(MYSQLI_ASSOC);
        $num = $stmt->num_rows;
        if($result >0){
            $sql_cart = "SELECT * FROM carrito_detalle WHERE id_carrito =$idCarrito AND id_producto =$idproducto";
            $stmt= $conn->prepare($sql_cart);
            $stmt->execute();
            $resultado = $stmt->get_result();
            $num_filas = $resultado->num_rows;
            if($num_filas>0){
                $cantidad =1;
                //el producto ya existe en el carrito , asi que actualizamos la cantidad solamente.
                $sql_update = "UPDATE carrito_detalle SET cantidad = cantidad + $cantidad WHERE id_carrito = $idCarrito AND id_producto = $idproducto";
                $stmt_update =$conn->prepare($sql_update);
                $stmt_update->execute();
                echo("CANTIDAD ACTUALIZADA CORRECTAMENTE");
                $stmt->close();
            }elseif (!$num_filas){
                # code...
                echo json_encode("ERROR ACTUALIZACION");
            }else{
                //el producto no se encuentra en el carrito , procede a agregarse.
                $cantidad = 1;
                $DT = NULL;
                $id = NULL;
                $sql_cart = "INSERT INTO carrito_detalle( Id, id_carrito, id_producto, cantidad, DT_reserva) VALUES (?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("iisis", $id, $idCarrito, $idproducto, $cantidad, $DT);

                $stmt->execute();
                if(mysqli_stmt_affected_rows($stmt) ==1){
                    echo json_encode ("PRODUCTO INSERTADO DENTRO DE CARRITO CORRECTO");
                }else{
                    echo json_encode("OCURRIO UN ERROR INSERTAR");
                }

            }

        }elseif($result == 0){
            echo json_encode("ERROR FASE 2");
        }

    }elseif($update_num == 0){
        echo json_encode("ERROR FASE 1");
    }

    //cerramos los statement y la conexion.
    $stmt_update->close();
    
    $conn->close();
}
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){

}
if ($_SERVER['REQUEST_METHOD'] === 'Delete'){
    
}


?>