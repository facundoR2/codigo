<?php
include ("conexion.php");
$mail = $_POST['Mail'];
$contraseña = $_POST['Contraseña'];

// se encripta la contraseña por seguridad.
$hash = password_hash($contraseña, PASSWORD_DEFAULT);

//primero por reglas de clave fornea , creamos el carrito del nuevo usuario.
//creamos un array para la confirmaciones.
$confirm = array();
//traemos el ultimo id de carrito agregado.
$sql = "SELECT MAX(Id) FROM carritos";
//preparamos la consulta.
$stmt =$conn->prepare($sql);
//ejecutamos la consulta.
$stmt->execute();
//obtenemos el resultado.
$result = $stmt->get_result();
//armamos un array asociativo.
$maximo_id = $result->fetch_array(MYSQLI_ASSOC)["MAX(Id)"];
//creamos el nuevo IdCarrito.
$nuevo_idCarrito = $maximo_id + 1;

$sql ="SELECT MAX(Id) FROM usuarios";
    //preparamos la consulta.
    $stmt =$conn->prepare($sql);
    //ejecutamos la consulta.
    $stmt->execute();
    //obtenemos el resultado.
    $result = $stmt->get_result();
    //armamos un array asociativo.
    $maximo_id_usuario = $result->fetch_array(MYSQLI_ASSOC)["MAX(Id)"];
    $nuevo_idUsuario = $maximo_id_usuario + 1;
    $stmt->free_result();
    //creamos el carrito del usuario.
    $PRi=NULL;
    $cantidad =0;
    $DR_carrito ='se creo nuevo carrito';
    $sql = "INSERT INTO carritos (id, Usuario_id, Productos_Reservados_id, CantidadProductos, DetalleReserva) VALUES (?,?,?,?,?)";
    $stmt=$conn->prepare($sql);
    //vinculamos los parametros.
    $stmt->bind_param("iiiis", $nuevo_idCarrito, $nuevo_idUsuario, $PRi, $cantidad, $DR_carrito);
    //ejecutamos la consulta.
    $stmt->execute();
    if($stmt->affected_rows > 0){
        $confirm[0] = "se agrego carrito al usuario correctamente";
        // echo json_encode("se agrego carrito al usuario correctamente");
    }




//insertamos la nueva fila en la tabla usuarios.

$id=NULL;
$sql = "INSERT INTO usuarios(Id, IdCarrito, NombreUsuario, Contraseña, Nivel) VALUES (?, ?, ?, ?, 1)";

$stmt =$conn->prepare($sql);
//vinculamos los parametros.
$stmt->bind_param("iiss", $id, $nuevo_idCarrito, $mail, $hash);
//ejecutamos la consulta.
$stmt->execute();
//verificamos si se insertó correctamente.
if($stmt->affected_rows > 0){
    $confirm[1] = "se inserto usuario Correctamente";
    // echo json_encode("se inserto usuario Correctamente");
    echo  json_encode($confirm);
    



}else{
    echo "error al insertar usuario.";
}



?>