<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Database;
use PDO;

class CitasRepository
{
    public function __construct(private Database $database)
    {
    }

    /* Este método obtiene todas las citas de la base de datos */
    public function getAllCitas(): array|bool
    {
        $pdo = $this->database->getConnection();
        $sql = $pdo->query("SELECT * FROM Citas");

        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }

    /* Este método obtiene una cita en base a su id */
    public function getCitasById(int $id): array|bool
    {
        $sql = ("SELECT * FROM Citas WHERE idCita = :id");
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindParam(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->fetch(PDO::FETCH_ASSOC);
    }

    /* Este meétodo obtiene todas las citas de una mascota */
    public function getAllCitasByMascotaId(int $id): array|bool
    {
        $sql = ("SELECT * FROM Citas WHERE idMascota = :id");
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindParam(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    /* Este método obtiene todas las citas asociadas a un veterinario */
    public function getAllCitasByVeterinarioId(int $id): array|bool
    {
        $sql = ("SELECT * FROM Citas WHERE idVeterinario = :id");
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindParam(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    /* Este método crea una nueva cita en la base de datos */
    public function createCita(array $data): string
    {
        $sql = "INSERT INTO Citas (idMascota, idVeterinario, fecha_y_hora)
                VALUES (:idMascota, :idVeterinario, :fecha_y_hora)";
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindValue(":idMascota", $data["idMascota"], PDO::PARAM_INT);
        $consulta->bindValue(":idVeterinario", $data["idVeterinario"], PDO::PARAM_INT);
        $consulta->bindValue(":fecha_y_hora", $data["fecha_y_hora"], PDO::PARAM_STR);
        $consulta->execute();

        return $pdo->lastInsertId();
    }

    /* Este método modifica la fecha de una cita ya existente en la base de datos */
    public function updateFechaCita(int $idCita, string $nuevaFecha): int
    {
        $sql = "UPDATE Citas
                SET fecha_y_hora = :nuevaFecha
                WHERE idCita = :idCita";
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindValue(":nuevaFecha", $nuevaFecha, PDO::PARAM_STR);
        $consulta->bindValue(":idCita", $idCita, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->rowCount();
    }

    /* Este método elimina una cita existente en la base de datos */
    public function delete(int $idCita): int
    {
        $sql = "DELETE FROM Citas
                WHERE idCita = :idCita";
        $pdo = $this->database->getConnection();

        $consulta = $pdo->prepare($sql);
        $consulta->bindValue(":idCita", $idCita, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta->rowCount();
    }
}