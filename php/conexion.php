<?php
$host="localhost";
$usuario="root";
$contraseña="";
$db="datos-local";

try{

    $conect = new PDO("mysql:host=$host;dbname=$db",$usuario,$contraseña);
    //establecer el modo error.
    $conect->setattribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    if(!$conect){
        echo json_encode("ERROR AL CONECTARSE");
    }else{
        echo json_encode("CONEXION EXITOSA");
    }

}catch(PDOException $e){

    echo json_encode("fallo al conectar a msql:". $e->getMessage());
}
?>



   

