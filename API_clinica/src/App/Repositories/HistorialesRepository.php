<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Database;
use PDO;

class HistorialesRepository
{
    public function __construct(private Database $database)
    {
    }

    /* Este método obtiene todas los historiales de la base de datos */
    public function getAllHistoriales(): array|bool
    {
        $pdo = $this->database->getConnection();
        $sql = $pdo->query("SELECT * FROM Historiales");

        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }

    /* Este método obtiene un historial en base a su id */
    public function getHistorialesById(int $id): array|bool
    {
        $sql = ("SELECT * FROM Historiales WHERE idHistorial = :id");
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindParam(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }

    /* Este método crea un nuev HIstorial en la base de datos */
    public function createHistorial(array $data): string
    {
        $sql = "INSERT INTO Historiales (idHistorial, idMascota, urlArchivo, fecha_y_hora)
                VALUES (:idHistorial, :idMascota, :urlArchivo, :fecha_y_hora)";
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindValue(":idHistorial", $data["idHistorial"], PDO::PARAM_INT);
        $consulta->bindValue(":idMascota", $data["idMascota"], PDO::PARAM_INT);
        $consulta->bindValue(":urlArchivo", $data["urlArchivo"], PDO::PARAM_STR);
        $consulta->bindValue(":fecha_y_hora", $data["fecha_y_hora"], PDO::PARAM_STR);
        $consulta->execute();

        return $pdo->lastInsertId();
    }

    /* Este método elimina un historial existente en la base de datos */
    public function deleteHistorial(int $idHistorial): int
    {
        $sql = "DELETE FROM Historiales
                WHERE idHistorial = :idHistorial";
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindValue(":idHistorial", $idHistorial, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->rowCount();
    }
}