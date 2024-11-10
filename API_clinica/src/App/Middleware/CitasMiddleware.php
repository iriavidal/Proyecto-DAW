<?php
declare(strict_types=1);

namespace App\Middleware;

use App\Repositories\CitasRepository;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Routing\RouteContext;
use Slim\Exception\HttpNotFoundException;

class CitasMiddleware
{
    public function __construct(private CitasRepository $repository)
    {
    }

    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $context = RouteContext::fromRequest($request);
        $route = $context->getRoute();

        $idCita = $route->getArgument("idCita");
        $idMascota = $route->getArgument("idMascota");
        $idVeterinario = $route->getArgument("idVeterinario");

        $cita = null;

        if ($idCita) {
            $cita = $this->repository->getCitasById((int) $idCita);
        } elseif ($idMascota) {
            $cita = $this->repository->getAllCitasByMascotaId((int) $idMascota);
        } elseif ($idVeterinario) {
            $cita = $this->repository->getAllCitasByVeterinarioId((int) $idVeterinario);
        }

        if (!$cita) {
            throw new HttpNotFoundException($request, "Cita no encontrada");
        }

        $request = $request->withAttribute("cita", $cita);

        return $handler->handle($request);
    }
}
