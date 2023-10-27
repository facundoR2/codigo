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
    $idproducto = $_POST["id"];
    $nombreuser  =$_POST["Nombreusuario"];

    //buscamos el carrito usando el nombre de usuario.

    $sql = "SELECT IdCarrito FROM usuarios WHERE NombreUsuario = ?";

    $stmt =$conn->prepapre($sql);

    $stmt->bind_param("s", $nombreuser);

    $stmt->execute();

    $result= $stmt->fetch_assoc();

    if($result >0){

        $idCarrito = $result;

        $sql = "UPDATE carritos SET Productos_Reservados_id = concat(ifnull(Productos_Reservados_id,''),',?') WHERE  id = ?";
        
        $stmt = $conn->prepare($sql);
        
        $stmt->bind_param("ii", $idproducto, $idCarrito );
    }

    

}
if ($_SERVER['REQUEST_METHOD'] === 'PUT'){

}
if ($_SERVER['REQUEST_METHOD'] === 'Delete'){
    
}


?>