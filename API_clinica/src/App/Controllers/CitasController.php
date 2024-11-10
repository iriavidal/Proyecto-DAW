<?php
declare(strict_types=1);

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\CitasRepository;
use Valitron\Validator;
use Slim\Exception\HttpBadRequestException;

class CitasController
{
    public function __construct(private CitasRepository $repository, private Validator $validator)
    {
        $this->validator->mapFieldsRules([
            "idCita" => ["required", "integer"],
            "idMascota" => ["required", "integer"],
            "idVeterinario" => ["required", "integer"],
            "fecha_y_hora" => ["required"],
        ]);
    }

    public function getAllCitas(Request $request, Response $response): Response
    {
        $citas = $this->repository->getAllCitas();
        $response->getBody()->write(json_encode($citas));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Obtener una cita específica (usando el middleware para obtener el atributo "cita")
    public function getCitaById(Request $request, Response $response): Response
    {
        $cita = $request->getAttribute("cita");

        if (!$cita) {
            throw new HttpBadRequestException($request, "Cita no encontrada");
        }

        $response->getBody()->write(json_encode($cita));
        return $response->withHeader('Content-Type', 'application/json');
    }

    // Crear una nueva cita
    public function createCita(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();

        $this->validator = $this->validator->withData($data);

        if (!$this->validator->validate()) {
            $response->getBody()->write(json_encode($this->validator->errors()));

            return $response->withStatus(422);
        }

        // Crear la cita en el repositorio
        $idCita = $this->repository->createCita($data);

        $response->getBody()->write(json_encode(['idCita' => $idCita]));

        return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
    }

    // Actualizar la fecha de una cita existente
    public function updateFechaCita(Request $request, Response $response, array $args): Response
    {
        $idCita = (int) $args['idCita'];

        $data = $request->getParsedBody();
        $this->validator = $this->validator->withData($data);

        if (!$this->validator->validate()) {
            $response->getBody()->write(json_encode($this->validator->errors()));

            return $response->withStatus(422);
        }

        $rows = $this->repository->updateFechaCita($idCita, $data['fecha_y_hora']);
        $response->getBody()->write(json_encode(['rows' => $rows]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    // Eliminar una cita existente
    public function deleteCita(Request $request, Response $response, array $args): Response
    {
        $idCita = (int) $args['idCita'];

        $rows = $this->repository->delete($idCita);

        if ($rows === 0) {
            throw new HttpBadRequestException($request, "No se encontró ninguna cita para eliminar.");
        }

        $response->getBody()->write(json_encode(['rows' => $rows]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}