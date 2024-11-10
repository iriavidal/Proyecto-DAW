<?php

/* Activa el modo estricto de tipos en PHP, asegurando que los tipos declarados se respeten estrictamente. */
declare(strict_types=1);

namespace App;

/* Importa la clase PDO, que se utiliza para gestionar la conexión y las operaciones en la base de datos. */
use PDO;

/* Declara la clase Database, que contiene un constructor y un método para obtener la conexión a la base de datos. */
class Database
{
    public function __construct(private string $host, private string $name, private string $user, private string $password)
    {
    }

    public function getConnection(): PDO
    {
        $dsn = "mysql:host=$this->host;dbname=$this->name;charset=utf8";
        $pdo = new PDO($dsn, $this->user, $this->password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        return $pdo;
    }
}