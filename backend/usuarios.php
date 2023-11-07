<?php

    require "database.php";

    if($_SERVER['REQUEST_METHOD'] === "POST"){
        $rawPostData = file_get_contents('php://input');
        $postData = json_decode($rawPostData, true);

        if($postData){
            $nombre = $postData['nombre'];
            $apellido = $postData['apellido'];
            $celular = $postData['celular'];
            $direccion = $postData['direccion'];
            $correo = $postData['correo'];
            $contrasena = $postData['contrasena'];

            $query = "INSERT INTO usu (nombre, apellido, celular, direccion, correo, contra) VALUES ('$nombre', '$apellido', '$celular', '$direccion', '$correo', '$contrasena')";
        
            if (mysqli_query($conn, $query)){
                echo "Data inserted successfully";
            }

        }
    }

    // echo "testing";
?>