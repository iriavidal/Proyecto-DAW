<?php
declare(strict_types=1);

use DI\ContainerBuilder;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;
use App\Controllers\CitasController;
use App\Middleware\CitasMiddleware;

define("APP_ROOT", dirname(__DIR__));

/* Incluye el archivo autoload.php, que carga automáticamente todas las clases y dependencias necesarias. */
require APP_ROOT . "/vendor/autoload.php";

/* Crea un ContainerBuilder que construirá el contenedor de dependencias. Explicación detallada más abajo */
$builder = new ContainerBuilder();
/* Configura el contenedor para que use las definiciones en definitions.php y luego lo construye. */
$container = $builder->addDefinitions(APP_ROOT . "/config/definiciones.php")->build();
/* Establece el contenedor en AppFactory, permitiendo que Slim gestione las dependencias de forma automática. */
AppFactory::setContainer($container);

$app = AppFactory::create();

/* Añade un middleware para analizar el cuerpo de las solicitudes (por ejemplo, JSON o formularios). */
$app->addBodyParsingMiddleware();

/* Activa el middleware de manejo de errores, mostrando detalles en caso de errores. */
$error_middleware = $app->addErrorMiddleware(true, true, true);

/* Obtiene el manejador de errores predeterminado. */
$error_handler = $error_middleware->getDefaultErrorHandler();

/* Establece el tipo de contenido de las respuestas de error a JSON, independientemente de la solicitud. */
$error_handler->forceContentType("application/json");


$app->group("/api", function (RouteCollectorProxy $group) {

    /* Define una ruta GET /api/citas que llama al controlador CitasController para obtener todas las citas. */
    $group->get("/citas", [CitasController::class, "getAllCitas"]);

    /* Define una ruta POST /api/citas que llama al método createCita en CitasController para crear una nueva cita. */
    $group->post("/citas", [CitasController::class, "createCita"]);

    /* Agrupa rutas que trabajan con un ID de cita y aplica el middleware CitaMiddleware, que verifica la existencia de la cita antes de procesar la solicitud. */
        /* Ruta para obtener una cita específica por idCita */
        $group->get("/citas/{idCita:[0-9]+}", CitasController::class . ":getCitaById")->add(CitasMiddleware::class);

        /* Ruta para obtener todas las citas de una mascota específica por idMascota */
        $group->get("/citas/mascota/{idMascota:[0-9]+}", CitasController::class . ":getAllCitasByMascota")->add(CitasMiddleware::class);

        /* Ruta para obtener todas las citas asociadas a un veterinario específico por idVeterinario */
        $group->get("/citas/veterinario/{idVeterinario:[0-9]+}", CitasController::class . ":getAllCitasByVeterinario")->add(CitasMiddleware::class);

        /* Ruta para actualizar una cita específica por idCita */
        $group->patch("/citas/{idCita:[0-9]+}", CitasController::class . ":updateFechaCita")->add(CitasMiddleware::class);

        /* Ruta para eliminar una cita específica por idCita */
        $group->delete("/citas/{idCita:[0-9]+}", CitasController::class . ":deleteCita")->add(CitasMiddleware::class);
});

$app->run();
