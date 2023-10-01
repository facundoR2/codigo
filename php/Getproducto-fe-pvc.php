<?php
include ("conexion.php");
session_start();
$datosproducto = isset($_SESSION['jsonaEnviar'])?$_SESSION['jsonaEnviar']:'NO hay datos';
echo json_encode($datosproducto);
//destruimos la session para limpiar la informacion asociada
//tanto en el server como del lado cliente.
session_destroy();
?>