<?php

require_once "models/connection.php";
require_once "controllers/post.controller.php";


if (isset($_POST)) {

    $columns = array();

    foreach (array_keys($_POST) as $key => $value) {
        array_push($columns, $value);
    }

    /* Validar las tablas y las columnas */
    if (empty(Connection::getColumnsData($table, $columns))) {
        $json = array(
            "status" => 400,
            "results" => "Error: Fields in the form do not match the database"
        );

        echo json_encode($json, http_response_code($json['status']));

        return;
    }

    $response = new PostController();

    if (isset($_GET["register"]) && $_GET["register"] == true) {
        /* Petición POST para registrar usuarios */
        $suffix = $_GET["suffix"] ?? "usuario";
        $response->postRegister($table, $_POST, $suffix);

    } else if (isset($_GET["login"]) && $_GET["login"] == true) {
        /* Petición POST para loguear un usuario */
        $suffix = $_GET["suffix"] ?? "usuario";
        $response->postLogin($table, $_POST, $suffix);

    } else {
        /* Peticiones POST para usuarios autorizados */

        if ($_GET["token"]) {
            $tabla = $_GET["tabla"] ?? "usuarios";
            $suffix = $_GET["suffix"] ?? "usuario";

            $validate = Connection::tokenValidate($_GET["token"], $tabla, $suffix);

            if ($validate == "ok") {
                /* Solicitamos respuesta del controlador para crear datos en cualquier tabla */
                $response->postData($table, $_POST);
            }

            if ($validate == "expirado") {
                $json = array(
                    "status" => 303,
                    "results" => "Error: the token has expired"
                );

                echo json_encode($json, http_response_code($json["status"]));
                return;
            }

            if ($validate == "no-auth") {
                $json = array(
                    "status" => 400,
                    "results" => "Error: the user is not authorized"
                );

                echo json_encode($json, http_response_code($json["status"]));
                return;
            }

        } else {
            $json = array(
                "status" => 400,
                "results" => "Error: authorized required"
            );

            echo json_encode($json, http_response_code($json["status"]));
            return;
        }
    }
}