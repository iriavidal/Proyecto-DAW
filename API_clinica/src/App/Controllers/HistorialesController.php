<?php
declare(strict_types=1);

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\HistorialesRepository;
use Valitron\Validator;
use Slim\Exception\HttpBadRequestException;

class HistorialesController
{
    public function __construct(private HistorialesRepository $repository, private Validator $validator)
    {
        $this->validator->mapFieldsRules([
            "idMascota" => ["required", "integer"],
            "fecha_y_hora" => ["required"],
            "urlArchivo" => ["required"]
        ]);
    }

    public function getAllHistoriales(Request $request, Response $response): Response
    {
        $historiales = $this->repository->getAllHistoriales();
        $response->getBody()->write(json_encode($historiales));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Obtener un historial específico (usando el middleware para obtener el atributo "cita")
    public function getHistorialById(Request $request, Response $response): Response
{
    $historial = $request->getAttribute("historial");

    if (!$historial) {
        throw new HttpBadRequestException($request, "Historial no encontrada");
    }

    $response->getBody()->write(json_encode($historial));

    return $response->withHeader('Content-Type', 'application/json');
}


    // Crear un nuevo historial
    public function createHistorial(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        $this->validator = $this->validator->withData($data);

        if (!$this->validator->validate()) {
            $response->getBody()->write(json_encode($this->validator->errors()));

            return $response->withStatus(422);
        }

        $idHistorial = $this->repository->createHistorial($data);

        $response->getBody()->write(json_encode(['idHistorial' => $idHistorial]));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    // Eliminar un historial existente
    public function deleteHistorial(Request $request, Response $response, array $args): Response
    {
        $idHistorial = (int) $args['idHistorial'];

        $rows = $this->repository->deleteHistorial($idHistorial);

        if ($rows === 0) {
            throw new HttpBadRequestException($request, "No se encontró ningún historial para eliminar.");
        }

        $response->getBody()->write(json_encode(['rows' => $rows]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}