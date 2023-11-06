<?php include("../conexion.php");

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    //recibimos los parametros de la consulta.
    $carrito_usuario  =$_GET["usuario"];

    //buscamos el carrito usando el nombre de usuario.

    $sql_get = "SELECT IdCarrito FROM usuarios WHERE NombreUsuario = ?";

    $stmt_get =$conn->prepare($sql_get);

    $stmt_get->bind_param("s", $carrito_usuario);

    $stmt_get->execute();

    $result = $stmt_get->get_result();

    $idCarrito_get = $result->fetch_assoc()["IdCarrito"];

    if($idCarrito_get > 0){
        //se encuentra el carrito, se seleccionan los productos del carrito_detalle.
        $sql= "SELECT  id_producto FROM carrito_detalle WHERE id_carrito = ?";

        $stmt=$conn->prepare($sql);

        $stmt->bind_param("i",$idCarrito_get);

        $stmt->execute();

        $result = $stmt->get_result();
        //se obtiene el array con todos los productos.
        $id_productos = mysqli_fetch_all($result,MYSQLI_ASSOC);
        

        $datos_productos = array();

        foreach($id_productos as $id_producto){
            $estado_get = "En Carrito";
            $sql_producto ="SELECT * FROM productos WHERE id_producto = ? AND Estado = ?";

            $stmt_producto = $conn->prepare($sql_producto);
            $stmt_producto->bind_param("ss",$id_producto["id_producto"], $estado_get);
            $stmt_producto->execute();

            $result_producto = $stmt_producto->get_result();

            //se obtiene array asociativo para los datos del producto.
            $datos_producto = mysqli_fetch_assoc($result_producto);
            //insertamos el array de datos dentros del array datos_productos.
            array_push($datos_productos,$datos_producto);
        }
        header("Content-Type: application/json");
        echo json_encode($datos_productos , JSON_UNESCAPED_UNICODE);

    }elseif($idCarrito_get == 0){
        echo json_encode("ERROR FASE 2(find cart)");
    }
    

}
if ($_SERVER['REQUEST_METHOD'] === 'POST'){

    //recibimos los parametros de la consulta.
    $idproducto = $_POST["producto"];
    $usuario  =$_POST["usuario"];

    //FASE 1: actualizar estado.
    //actualizamos el estado del producto a Reservado(72hrs).

    $estado = 'En Carrito';
    
    $sql_update = "UPDATE productos SET estado = ? WHERE id_producto = ? LIMIT 1";

    $stmt_update = $conn->prepare($sql_update);

    $stmt_update->bind_param("ss", $estado, $idproducto);

    $stmt_update->execute();

    $sql ="SELECT id_stock FROM productos WHERE id_producto =? LIMIT 1";
    $stmt =$conn->prepare($sql);
    $stmt->bind_param("s",$idproducto);
    $stmt->execute();
    $result = $stmt->get_result();
    $id_stock = $result->fetch_assoc()["id_stock"];

    $sql = "SELECT Costo FROM productos WHERE id_producto = ? LIMIT 1";
    $stmt =$conn->prepare($sql);
    $stmt->bind_param("i",$idproducto);
    $stmt->execute();
    $result = $stmt->get_result();
    $Costo = $result->fetch_assoc()["Costo"];

    $update_num = $stmt_update->affected_rows;

    if($update_num>0){
        //fase 2: buscar carrito del usuario.
        //buscamos el carrito usando el nombre de usuario.

        $sql = "SELECT IdCarrito FROM usuarios WHERE NombreUsuario = ?";

        $stmt =$conn->prepare($sql);

        $stmt->bind_param("s", $usuario);

        $stmt->execute();

        $result= $stmt->get_result();
        $idCarrito = $result->fetch_assoc()["IdCarrito"];
        // $num = $stmt->num_rows;
        if($idCarrito > 0){
            //verificacion sobre existencia de carrito_detalle con este idcarrito y este idproducto.
            $sql_cart = "SELECT * FROM carrito_detalle WHERE id_carrito = ? AND id_producto = ?";
            $stmt= $conn->prepare($sql_cart);
            $stmt->bind_param("is", $idCarrito, $idproducto);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $cantidad = 1;
                //el producto ya existe en el carrito , asi que actualizamos la cantidad solamente.
                $sql_update = "UPDATE carrito_detalle SET cantidad = cantidad + ? WHERE id_carrito = ? AND id_producto = ?";
                $stmt_update =$conn->prepare($sql_update);
                $stmt_update->bind_param("iis", $cantidad, $idCarrito, $idproducto);
                $stmt_update->execute();
                //actualizamos el total del carrito.
                $sql_update_carrito = "UPDATE carritos SET Total = Total + ? WHERE id = ?";
                    $stmt_update_carrito = $conn->prepare($sql_update_carrito);
                    $stmt_update_carrito->bind_param("ii", $Costo,$idCarrito);
                    $stmt_update_carrito->execute();



                //restamos la cantidad de stock.
                $sql_update ="UPDATE stock SET Cantidad = Cantidad - ? WHERE Id_producto = ?";
                $stmt_update =$conn->prepare($sql_update);
                $stmt_update->bind_param("ii", $cantidad, $id_stock);
                $stmt_update->execute();
                echo json_encode("CANTIDAD ACTUALIZADA CORRECTAMENTE");
                $stmt->close();
                $stmt_update->close();
                $conn->close();
            }else{
                //el producto no se encuentra en el carrito , procede a agregarse.
               
                $sql_insert = "INSERT INTO carrito_detalle(id_carrito, id_producto, cantidad) VALUES (?,?,1)";
                $stmt_insert = $conn->prepare($sql_insert);
                $stmt_insert->bind_param("is", $idCarrito, $idproducto);
                $stmt_insert->execute();
                //actualizamos el stock:
                $sql_update ="UPDATE stock SET Cantidad = Cantidad - ? WHERE Id_producto = ?";
                $stmt_update =$conn->prepare($sql_update);
                $stmt_update->bind_param("ii", $cantidad, $id_stock);
                $stmt_update->execute();
                
                if( $stmt_insert->affected_rows == 1){
                    //actualizamos la tabla carrito con el nuevo precio.
                    $sql_update_carrito = "UPDATE carritos SET Total = Total + ? WHERE id = ?";
                    $stmt_update_carrito = $conn->prepare($sql_update_carrito);
                    $stmt_update_carrito->bind_param("ii", $Costo,$idCarrito);
                    $stmt_update_carrito->execute();

                    echo json_encode ("PRODUCTO INSERTADO DENTRO DE CARRITO CORRECTO");
                }else{
                    echo json_encode("OCURRIO UN ERROR INSERTAR");
                }
                $stmt->close();
                $stmt_insert->close();
                $stmt_update_carrito->close();

            }

        }elseif($idCarrito == 0){
            echo json_encode("ERROR FASE 2(find cart)");
        }

    }elseif($update_num === 0){
        echo json_encode("ERROR FASE 1(upd product)");
    }

    //cerramos los statement y la conexion.
}
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    //recibimos los parametros de la consulta.
    $data = file_get_contents("php://input");

    //convertimos el form en un arreglo asociativo.
    parse_str($data, $params);

    $usuario = $params["usuario"];
    $idproducto = $params["producto"];


    //actualizamos el estado del producto de nuevo a alta.
    $estado = 'alta';
     
    $sql_update = "UPDATE productos SET estado = ? WHERE id_producto = ?";
 
    $stmt_update = $conn->prepare($sql_update);
 
    $stmt_update->bind_param("ss", $estado, $idproducto);

    $stmt_update->execute();

    $update_num = $stmt_update->affected_rows;
    if($update_num > 0){
        //se actualizo el estado de un producto, se procede con la op.
        $sql ="SELECT id_stock FROM productos WHERE id_producto =?";
        $stmt =$conn->prepare($sql);
        $stmt->bind_param("s",$idproducto);
        $stmt->execute();
        $result = $stmt->get_result();
        $id_stock = $result->fetch_assoc()["id_stock"];
        $sql = "SELECT Costo FROM productos WHERE id_producto = ? LIMIT 1";
        $stmt =$conn->prepare($sql);
        $stmt->bind_param("s",$idproducto);
        $stmt->execute();
        $result = $stmt->get_result();
        $Costo = $result->fetch_assoc()["Costo"];
        //fase 2: buscar carrito del usuario.
        //buscamos el carrito usando el nombre de usuario.

        $sql = "SELECT IdCarrito FROM usuarios WHERE NombreUsuario = ?";

        $stmt =$conn->prepare($sql);

        $stmt->bind_param("s", $usuario);

        $stmt->execute();

        $result= $stmt->get_result();
        $idCarrito = $result->fetch_assoc()["IdCarrito"];
        $num = $stmt->num_rows;
        if($idCarrito > 0){
            //fase 3: buscar carrito detalle.
            //verificacion sobre existencia de carrito_detalle con este idcarrito y este idproducto.
            $sql_cart = "SELECT * FROM carrito_detalle WHERE id_carrito = ? AND id_producto = ?";
            $stmt= $conn->prepare($sql_cart);
            $stmt->bind_param("is", $idCarrito, $idproducto);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                //fase final: actualizar datos.
                //se encuentra el carrito detalle con el producto.
                $cantidad = 1;
                // actualizamos la cantidad.
                $sql_update = "UPDATE carrito_detalle SET cantidad = cantidad - ? WHERE id_carrito = ? AND id_producto = ?";
                $stmt_update =$conn->prepare($sql_update);
                $stmt_update->bind_param("iis", $cantidad, $idCarrito, $idproducto);
                $stmt_update->execute();
                //restamos la cantidad de stock.
                $sql_update ="UPDATE stock SET Cantidad = Cantidad + ? WHERE Id_producto = ?";
                $stmt_update =$conn->prepare($sql_update);
                $stmt_update->bind_param("ii", $cantidad, $id_stock);
                $stmt_update->execute();
                echo json_encode("CANTIDAD ACTUALIZADA CORRECTAMENTE");
                $stmt->close();
                $stmt_update->close();
                $conn->close();
            }else{
                echo json_encode("ERROR FASE 3(find cart-details");
            }
        }
        elseif($idCarrito == 0){
            echo json_encode("ERROR FASE 2(find cart)");
        }
    }elseif($update_num === 0){
        echo json_encode("ERROR FASE 1(upd product)");
    }
}





?>