<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Repositories\HistorialesRepository;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Routing\RouteContext;
use Slim\Exception\HttpNotFoundException;

class HistorialesMiddleware
{

    public function __construct(private HistorialesRepository $repository)
    {
    }

    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $context = RouteContext::fromRequest($request);

        $route = $context->getRoute();

        $id = $route->getArgument("idHistorial");

        $historial = $this->repository->getHistorialesById((int) $id);

        if ($historial === false) {
            throw new HttpNotFoundException($request, message: "Historial no encontrado");
        }

        $request = $request->withAttribute("historial", $historial);

        return $handler->handle($request);

    }
}