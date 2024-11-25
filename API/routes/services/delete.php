<?php

require_once "models/connection.php";
require_once "controllers/delete.controller.php";

if (isset($_GET["id"]) && isset($_GET["nameId"])) {
    $columns = array($_GET["nameId"]);

    /* Validar las tablas y las columnas */
    if (empty(Connection::getColumnsData($table, $columns))) {
        $json = array(
            "status" => 400,
            "results" => "Error: Fields in the form do not match the database"
        );

        echo json_encode($json, http_response_code($json['status']));

        return;
    }

    /* Peticiones PUT para usuarios autorizados */
    if ($_GET["token"]) {
        $tabla = $_GET["tabla"] ?? "usuarios";
        $suffix = $_GET["suffix"] ?? "usuario";

        $validate = Connection::tokenValidate($_GET["token"], $tabla, $suffix);

        if ($validate == "ok") {
            /* Solicitamos respuesta del controlador para borrar datos de cualquier tabla */
            $response = new DeleteController();
            $response->deleteData($table, $_GET['id'], $_GET['nameId']);
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