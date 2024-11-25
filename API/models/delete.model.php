<?php

require_once "connection.php";
require_once "get.model.php";

class DeleteModel
{
    /* Petición delete para borrar datos */
    static public function deleteData($table, $id, $nameId)
    {
        /* Validar que el id exista en la bd */
        $response = GetModel::getDataFilter($table, $nameId, $nameId, $id, null, null, null, null);
        if (empty($response)) {
            return null;
        }

        /* Eliminamos registro */

        $sql = "DELETE FROM $table WHERE $nameId = :$nameId";

        $link = Connection::connect();
        $stmt = $link->prepare($sql);

        $stmt->bindParam(":" . $nameId, $id, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response = array(
                "comment" => "The process was successful"
            );

            return $response;
        } else {
            return $link->errorInfo();
        }


    }
}