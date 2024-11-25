<?php
require_once "controllers/get.controller.php";

$select = $_GET["select"] ?? "*";

$orderBy = $_GET["orderBy"] ?? null;
$orderMode = $_GET["orderMode"] ?? null;

$startAt = $_GET["startAt"] ?? null;
$endAt = $_GET["endAt"] ?? null;

$filterTo = $_GET["filterTo"] ?? null;
$inTo = $_GET["inTo"] ?? null;

$response = new GetController();


if (isset($_GET["rel"]) && isset($_GET["type"]) && $table == "relations") {
    if (isset($_GET["linkTo"]) && isset($_GET["equalTo"])) {
        /* Peticiones GET con filtro entre tablas relacionadas */
        $response->getRelDataFilter($_GET["rel"], $_GET["type"], $select, $_GET["linkTo"], $_GET["equalTo"], $orderBy, $orderMode, $startAt, $endAt);

    } else if (isset($_GET["linkTo"]) && isset($_GET["search"])) {
        /* Petición GET para el buscador entre tablas relacionadas */
        $response->getRelDataSearch($_GET["rel"], $_GET["type"], $select, $_GET["linkTo"], $_GET["search"], $orderBy, $orderMode, $startAt, $endAt);

    } elseif (isset($_GET["linkTo"]) && isset($_GET["between1"]) && isset($_GET["between2"])) {
        /* Peticiones GET con rangos */
        $response->getRelDataRange($_GET["rel"], $_GET["type"], $select, $_GET["linkTo"], $_GET["between1"], $_GET["between2"], $orderBy, $orderMode, $startAt, $endAt, $filterTo, $inTo);

    } else {
        /* Peticiones GET sin filtro entre tablas relacionadas */
        $response->getRelData($_GET["rel"], $_GET["type"], $select, $orderBy, $orderMode, $startAt, $endAt);
    }
} else {
    if (isset($_GET["linkTo"]) && isset($_GET["search"])) {
        /* Petición GET para el buscador sin relaciones */
        $response->getDataSearch($table, $select, $_GET["linkTo"], $_GET["search"], $orderBy, $orderMode, $startAt, $endAt);

    } else if (isset($_GET["linkTo"]) && isset($_GET["equalTo"])) {
        /* Peticiones GET con filtro */
        $response->getDataFilter($table, $select, $_GET["linkTo"], $_GET["equalTo"], $orderBy, $orderMode, $startAt, $endAt);

    } elseif (isset($_GET["linkTo"]) && isset($_GET["between1"]) && isset($_GET["between2"])) {
        /* Peticiones GET con rangos */
        $response->getDataRange($table, $select, $_GET["linkTo"], $_GET["between1"], $_GET["between2"], $orderBy, $orderMode, $startAt, $endAt, $filterTo, $inTo);

    } else {
        /* Peticiones GET sin filtro */
        $response->getData($table, $select, $orderBy, $orderMode, $startAt, $endAt);
    }
}



