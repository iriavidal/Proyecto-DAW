<?php
require_once "connection.php";

class GetModel
{
    /* Peticiones GET sin filtro */
    static public function getData($table, $select, $orderBy, $orderMode, $startAt, $endAt)
    {
        /* Validar existencia de la tabla y de las columnas en la base de datos */
        $selectArray = explode(",", $select);

        if (empty(Connection::getColumnsData($table, $selectArray))) {
            return null;
        }

        /* Sin ordenar ni limitar */
        $sql = "SELECT $select FROM $table";

        /* Si ordenamos pero no limitamos */
        if ($orderBy != null && $orderMode != null && $startAt == null && $endAt == null) {
            $sql = "SELECT $select FROM $table ORDER BY $orderBy $orderMode";
        }

        /* Si ordenamos y limitamos */
        if ($orderBy != null && $orderMode != null && $startAt != null && $endAt != null) {
            $sql = "SELECT $select FROM $table ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
        }

        /* Limitamos pero no ordenamos */
        if ($orderBy == null && $orderMode == null && $startAt != null && $endAt != null) {
            $sql = "SELECT $select FROM $table LIMIT $startAt, $endAt";
        }

        $stmt = Connection::connect()->prepare($sql);

        try {
            $stmt->execute();
        } catch (PDOException $e) {
            return null;
        }
        return $stmt->fetchAll(PDO::FETCH_CLASS);


    }

    /* Peticiones GET sin filtro entre tablas relacionadas */
    static public function getRelData($rel, $type, $select, $orderBy, $orderMode, $startAt, $endAt)
    {
        /* Validar existencia de la tabla y de las columnas en la base de datos */
        $relArray = explode(",", $rel);
        $typeArray = explode(",", $type);
        $innerJoinText = "";

        if (count($relArray) > 1) {
            foreach ($relArray as $key => $value) {

                /* Validar existencia de la tabla en la base de datos */
                if (empty(Connection::getColumnsData($value, ["*"]))) {
                    return null;
                }

                if ($key > 0) {
                    $innerJoinText .= "INNER JOIN " . $value . " ON " . $relArray[0] . ".id_" . $typeArray[$key] . " = " . $value . ".id_" . $typeArray[$key] . " ";
                }
            }

            /* Sin ordenar ni limitar */
            $sql = "SELECT $select FROM $relArray[0] $innerJoinText";

            /* Si ordenamos pero no limitamos */
            if ($orderBy != null && $orderMode != null && $startAt == null && $endAt == null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText ORDER BY $relArray[0].$orderBy $orderMode";

                echo $sql;
            }

            /* Si ordenamos y limitamos */
            if ($orderBy != null && $orderMode != null && $startAt != null && $endAt != null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText ORDER BY $relArray[0].$orderBy $orderMode LIMIT $startAt, $endAt";
            }

            /* Limitamos pero no ordenamos */
            if ($orderBy == null && $orderMode == null && $startAt != null && $endAt != null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText LIMIT $startAt, $endAt";
            }

            $stmt = Connection::connect()->prepare($sql);

            try {
                $stmt->execute();
            } catch (PDOException $e) {
                return null;
            }

            return $stmt->fetchAll(PDO::FETCH_CLASS);
        } else {
            return null;
        }
    }

    /* Peticiones GET con filtro */
    static public function getDataFilter($table, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt)
    {
        /* Validar existencia de la tabla y de las columnas en la base de datos */
        $linkToArray = explode(",", $linkTo);
        $selectArray = explode(",", $select);

        foreach ($linkToArray as $key => $value) {
            array_push($selectArray, $value);
        }

        $selectArray = array_unique($selectArray);

        if (empty(Connection::getColumnsData($table, $selectArray))) {
            return null;
        }

        $equalToArray = explode(",", $equalTo);
        $linkToText = "";

        if (count($linkToArray) > 1) {
            foreach ($linkToArray as $key => $value) {
                if ($key > 0) {
                    $linkToText .= "AND " . $value . " = :" . $value . " ";
                }
            }
        }

        /* Sin ordenar ni limitar */
        $sql = "SELECT $select FROM $table WHERE $linkToArray[0] = :$linkToArray[0] $linkToText";

        /* Si ordenamos pero no limitamos */
        if ($orderBy != null && $orderMode != null && $startAt == null && $endAt == null) {
            $sql = "SELECT $select FROM $table WHERE $linkToArray[0] = :$linkToArray[0] $linkToText ORDER BY $orderBy $orderMode";
        }

        /* Si ordenamos y limitamos */
        if ($orderBy != null && $orderMode != null && $startAt != null && $endAt != null) {
            $sql = "SELECT $select FROM $table WHERE $linkToArray[0] = :$linkToArray[0] $linkToText ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
        }

        /* Limitamos pero no ordenamos */
        if ($orderBy == null && $orderMode == null && $startAt != null && $endAt != null) {
            $sql = "SELECT $select FROM $table WHERE $linkToArray[0] = :$linkToArray[0] $linkToText LIMIT $startAt, $endAt";
        }

        $stmt = Connection::connect()->prepare($sql);

        foreach ($linkToArray as $key => $value) {
            $stmt->bindParam(":" . $value, $equalToArray[$key], PDO::PARAM_STR);
        }

        try {
            $stmt->execute();
        } catch (PDOException $e) {
            return null;
        }

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /* Peticiones GET con filtro entre tablas relacionales*/
    static public function getRelDataFilter($rel, $type, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $endAt)
    {
        /* Filtros */
        $linkToArray = explode(",", $linkTo);
        $equalToArray = explode(",", $equalTo);
        $linkToText = "";

        if (count($linkToArray) > 1) {
            foreach ($linkToArray as $key => $value) {
                if ($key > 0) {
                    $linkToText .= "AND " . $value . " = :" . $value . " ";
                }
            }
        }

        /* Relaciones */
        $relArray = explode(",", $rel);
        $typeArray = explode(",", $type);
        $innerJoinText = "";

        if (count($relArray) > 1) {
            foreach ($relArray as $key => $value) {
                /* Validar existencia de la tabla en la base de datos */
                if (empty(Connection::getColumnsData($value, ["*"]))) {
                    return null;
                }

                if ($key > 0) {
                    $innerJoinText .= "INNER JOIN " . $value . " ON " . $relArray[0] . ".id_" . $typeArray[$key] . " = " . $value . ".id_" . $typeArray[$key] . " ";
                }
            }

            /* Sin ordenar ni limitar */
            $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkToArray[0] = :$linkToArray[0] $linkToText";

            /* Si ordenamos pero no limitamos */
            if ($orderBy != null && $orderMode != null && $startAt == null && $endAt == null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkToArray[0] = :$linkToArray[0] $linkToText ORDER BY $orderBy $orderMode";
            }

            /* Si ordenamos y limitamos */
            if ($orderBy != null && $orderMode != null && $startAt != null && $endAt != null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkToArray[0] = :$linkToArray[0] $linkToText ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
            }

            /* Limitamos pero no ordenamos */
            if ($orderBy == null && $orderMode == null && $startAt != null && $endAt != null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkToArray[0] = :$linkToArray[0] $linkToText LIMIT $startAt, $endAt";
            }

            $stmt = Connection::connect()->prepare($sql);

            foreach ($linkToArray as $key => $value) {
                $stmt->bindParam(":" . $value, $equalToArray[$key], PDO::PARAM_STR);
            }

            try {
                $stmt->execute();
            } catch (PDOException $e) {
                return null;
            }

            return $stmt->fetchAll(PDO::FETCH_CLASS);
        } else {
            return null;
        }
    }

    /* Peticiones GET para búsquedas sin relaciones */
    static public function getDataSearch($table, $select, $linkTo, $search, $orderBy, $orderMode, $startAt, $endAt)
    {
        /* Validar existencia de la tabla y de las columnas en la base de datos */
        $linkToArray = explode(",", $linkTo);
        $selectArray = explode(",", $select);

        foreach ($linkToArray as $key => $value) {
            array_push($selectArray, $value);
        }

        $selectArray = array_unique($selectArray);

        if (empty(Connection::getColumnsData($table, $selectArray))) {
            return null;
        }

        $searchArray = explode(",", $search);
        $linkToText = "";

        if (count($linkToArray) > 1) {
            foreach ($linkToArray as $key => $value) {
                if ($key > 0) {
                    $linkToText .= "AND " . $value . " = :" . $value . " ";
                }
            }
        }

        /* Sin ordenar ni limitar */
        $sql = "SELECT $select FROM $table WHERE $linkToArray[0] LIKE '%$searchArray[0]%' $linkToText";

        /* Si ordenamos pero no limitamos */
        if ($orderBy != null && $orderMode != null && $startAt == null && $endAt == null) {
            $sql = "SELECT $select FROM $table WHERE $linkToArray[0] LIKE '%$searchArray[0]%' $linkToText ORDER BY $orderBy $orderMode";
        }

        /* Si ordenamos y limitamos */
        if ($orderBy != null && $orderMode != null && $startAt != null && $endAt != null) {
            $sql = "SELECT $select FROM $table WHERE $linkToArray[0] LIKE '%$searchArray[0]%' $linkToText ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
        }

        /* Limitamos pero no ordenamos */
        if ($orderBy == null && $orderMode == null && $startAt != null && $endAt != null) {
            $sql = "SELECT $select FROM $table WHERE $linkToArray[0] LIKE '%$searchArray[0]%' $linkToText LIMIT $startAt, $endAt";
        }

        $stmt = Connection::connect()->prepare($sql);

        foreach ($linkToArray as $key => $value) {
            if ($key > 0) {
                $stmt->bindParam(":" . $value, $searchArray[$key], PDO::PARAM_STR);
            }
        }


        try {
            $stmt->execute();
        } catch (PDOException $e) {
            return null;
        }

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /* Peticiones GET para búsquedas entre tablas relacionales*/
    static public function getRelDataSearch($rel, $type, $select, $linkTo, $search, $orderBy, $orderMode, $startAt, $endAt)
    {
        /* Filtros */
        $linkToArray = explode(",", $linkTo);
        $searchArray = explode(",", $search);
        $linkToText = "";

        if (count($linkToArray) > 1) {
            foreach ($linkToArray as $key => $value) {
                if ($key > 0) {
                    $linkToText .= "AND " . $value . " = :" . $value . " ";
                }
            }
        }

        /* Relaciones */
        $relArray = explode(",", $rel);
        $typeArray = explode(",", $type);
        $innerJoinText = "";

        if (count($relArray) > 1) {
            foreach ($relArray as $key => $value) {
                /* Validar existencia de la tabla en la base de datos */
                if (empty(Connection::getColumnsData($value, ["*"]))) {
                    return null;
                }

                if ($key > 0) {
                    $innerJoinText .= "INNER JOIN " . $value . " ON " . $relArray[0] . ".id_" . $typeArray[$key] . " = " . $value . ".id_" . $typeArray[$key] . " ";
                }
            }

            /* Sin ordenar ni limitar */
            $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $relArray[0].$linkToArray[0] LIKE '%$searchArray[0]%' $linkToText";

            /* Si ordenamos pero no limitamos */
            if ($orderBy != null && $orderMode != null && $startAt == null && $endAt == null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $relArray[0].$linkToArray[0] LIKE '%$searchArray[0]%' $linkToText ORDER BY $orderBy $orderMode";
            }

            /* Si ordenamos y limitamos */
            if ($orderBy != null && $orderMode != null && $startAt != null && $endAt != null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $relArray[0].$linkToArray[0] LIKE '%$searchArray[0]%' $linkToText ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
            }

            /* Limitamos pero no ordenamos */
            if ($orderBy == null && $orderMode == null && $startAt != null && $endAt != null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $relArray[0].$linkToArray[0] LIKE '%$searchArray[0]%' $linkToText LIMIT $startAt, $endAt";
            }

            $stmt = Connection::connect()->prepare($sql);

            foreach ($linkToArray as $key => $value) {
                if ($key > 0) {
                    $stmt->bindParam(":" . $value, $searchArray[$key], PDO::PARAM_STR);
                }
            }

            try {
                $stmt->execute();
            } catch (PDOException $e) {
                return null;
            }

            return $stmt->fetchAll(PDO::FETCH_CLASS);
        } else {
            return null;
        }
    }

    /* Peticiones GET con rangos */
    static public function getDataRange($table, $select, $linkTo, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt, $filterTo, $inTo)
    {
        /* Validar existencia de la tabla y de las columnas en la base de datos */
        $linkToArray = explode(",", $linkTo);
        $selectArray = explode(",", $select);

        if ($filterTo != null) {
            $filterArray = explode(",", $filterTo);
        } else {
            $filterArray = array();
        }

        foreach ($linkToArray as $key => $value) {
            array_push($selectArray, $value);
        }

        foreach ($filterArray as $key => $value) {
            array_push($selectArray, $value);
        }

        $selectArray = array_unique($selectArray);

        if (empty(Connection::getColumnsData($table, $selectArray))) {
            return null;
        }

        $filter = "";
        if ($filterTo != null && $inTo != null) {
            $filter = "AND " . $filterTo . " IN (" . $inTo . ")";
        }

        /* Sin ordenar ni limitar */
        $sql = "SELECT $select FROM $table WHERE $linkTo BETWEEN '$between1' AND '$between2' $filter";

        /* Si ordenamos pero no limitamos */
        if ($orderBy != null && $orderMode != null && $startAt == null && $endAt == null) {
            $sql = "SELECT $select FROM $table WHERE $linkTo BETWEEN '$between1' AND '$between2' $filter ORDER BY $orderBy $orderMode";
        }

        /* Si ordenamos y limitamos */
        if ($orderBy != null && $orderMode != null && $startAt != null && $endAt != null) {
            $sql = "SELECT $select FROM $table WHERE $linkTo BETWEEN '$between1' AND '$between2' $filter ORDER BY $orderBy $orderMode LIMIT $startAt, $endAt";
        }

        /* Limitamos pero no ordenamos */
        if ($orderBy == null && $orderMode == null && $startAt != null && $endAt != null) {
            $sql = "SELECT $select FROM $table WHERE $linkTo BETWEEN '$between1' AND '$between2' $filter LIMIT $startAt, $endAt";
        }

        $stmt = Connection::connect()->prepare($sql);

        try {
            $stmt->execute();
        } catch (PDOException $e) {
            return null;
        }

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    /* Peticiones GET con rangos entre tablas relacionadas */
    static public function getRelDataRange($rel, $type, $select, $linkTo, $between1, $between2, $orderBy, $orderMode, $startAt, $endAt, $filterTo, $inTo)
    {

        $relArray = explode(",", $rel);
        $typeArray = explode(",", $type);
        $innerJoinText = "";

        $filter = "";
        if ($filterTo != null && $inTo != null) {
            $filter = "AND " . $relArray[0] . "." . $filterTo . " IN (" . $inTo . ")";
        }

        if (count($relArray) > 1) {
            foreach ($relArray as $key => $value) {
                /* Validar existencia de la tabla en la base de datos */
                if (empty(Connection::getColumnsData($value, ["*"]))) {
                    return null;
                }

                if ($key > 0) {
                    $innerJoinText .= "INNER JOIN " . $value . " ON " . $relArray[0] . ".id_" . $typeArray[$key] . " = " . $value . ".id_" . $typeArray[$key] . " ";
                }
            }

            /* Sin ordenar ni limitar */
            $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkTo BETWEEN '$between1' AND '$between2' $filter";

            /* Si ordenamos pero no limitamos */
            if ($orderBy != null && $orderMode != null && $startAt == null && $endAt == null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkTo BETWEEN '$between1' AND '$between2' $filter ORDER BY $relArray[0].$orderBy $orderMode";

                echo $sql;
            }

            /* Si ordenamos y limitamos */
            if ($orderBy != null && $orderMode != null && $startAt != null && $endAt != null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkTo BETWEEN '$between1' AND '$between2' $filter ORDER BY $relArray[0].$orderBy $orderMode LIMIT $startAt, $endAt";
            }

            /* Limitamos pero no ordenamos */
            if ($orderBy == null && $orderMode == null && $startAt != null && $endAt != null) {
                $sql = "SELECT $select FROM $relArray[0] $innerJoinText WHERE $linkTo BETWEEN '$between1' AND '$between2' $filter LIMIT $startAt, $endAt";
            }

            $stmt = Connection::connect()->prepare($sql);

            try {
                $stmt->execute();
            } catch (PDOException $e) {
                return null;
            }

            return $stmt->fetchAll(PDO::FETCH_CLASS);
        } else {
            return null;
        }
    }
}