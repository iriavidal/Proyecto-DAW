<?php

require_once "models/connection.php";

$routesArray = explode("/", parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));
$routesArray = array_filter($routesArray);

/* Cuando no se hacen peticiones a la API */
if (empty($routesArray)) {

    $json = array(
        "status" => 400,
        "results" => "Not Found"
    );

    echo json_encode($json, http_response_code($json['status']));

    return;
}

/* Cuando sí se hacen peticiones a la API */
if (!empty($routesArray) && isset($_SERVER['REQUEST_METHOD'])) {
    $table = parse_url($routesArray[1], PHP_URL_PATH);

    /* Peticiones GET */
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        include "services/get.php";
    }

    /* Peticiones POST */
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        include "services/post.php";
    }

    /* Peticiones PUT */
    if ($_SERVER['REQUEST_METHOD'] == "PUT") {
        include "services/put.php";
    }

    /* Peticiones DELETE */
    if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
        include "services/delete.php";
    }

}