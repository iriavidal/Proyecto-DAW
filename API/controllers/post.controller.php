<?php

require_once "models/post.model.php";
require_once "models/put.model.php";
require_once "models/get.model.php";
require_once "models/connection.php";
require_once "vendor/autoload.php";
use Firebase\JWT\JWT;

class PostController
{
    /* Petición POST para crear datos */
    static function postData($table, $data)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $response = PostModel::postData($table, $data);
        $return = new PostController();
        $return->fncResponse($response, null, null);
    }

    /* Petición POST para registrar usuario */
    static function postRegister($table, $data, $suffix)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data["password_" . $suffix]) && $data["password_" . $suffix] != null) {
            $crypt = crypt($data["password_" . $suffix], '$2a$09$andsf2134examplestringforsalt$');
            $data["password_" . $suffix] = $crypt;

            $response = PostModel::postData($table, $data);

            $return = new PostController();
            $return->fncResponse($response, null, $suffix);
        } else {
            $response = PostModel::postData($table, $data);
            $return = new PostController();
            $return->fncResponse($response, null, $suffix);
        }

    }

    /* Petición POST para loguear usuarios */
    static function postLogin($table, $data, $suffix)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        /* Validar que el usuario exista en base de datos */
        $response = GetModel::getDataFilter($table, "*", "email_" . $suffix, $data["email_" . $suffix], null, null, null, null);

        if (!empty($response)) {
            $crypt = crypt($data["password_" . $suffix], '$2a$09$andsf2134examplestringforsalt$');
            if ($response[0]->{"password_" . $suffix} == $crypt) {
                $token = Connection::jwt($response[0]->{"id_" . $suffix}, $response[0]->{"email_" . $suffix});
                $jwt = JWT::encode($token, "asjhdgasjhgd8q7fbioasUYFGB", "HS256");

                /* Actualizamos la base de datos con el token del usuario */
                $data = array(
                    "token_" . $suffix => $jwt,
                    "token_exp_" . $suffix => $token["exp"]
                );

                $update = PutModel::putData($table, $data, $response[0]->{"id_" . $suffix}, "id_" . $suffix);

                if (isset($update["comment"]) && $update["comment"] == "The process was successful") {
                    $response[0]->{"token_" . $suffix} = $jwt;
                    $response[0]->{"token_exp_" . $suffix} = $token["exp"];

                    $return = new PostController();
                    $return->fncResponse($response, null, $suffix);
                }

            } else {
                $response = null;
                $return = new PostController();
                $return->fncResponse($response, "Wrong password", $suffix);
            }
        } else {
            $response = null;
            $return = new PostController();
            $return->fncResponse($response, "Wrong email", $suffix);
        }
    }

    /* Respuestas del controlador */
    public function fncResponse($response, $error, $suffix)
    {
        // Establecer cabeceras para asegurar que la respuesta sea JSON
        header('Content-Type: application/json; charset=utf-8');

        // Preparar la respuesta JSON
        if (!empty($response)) {
            // Quitamos la contraseña si existe
            if (isset($response[0]->{"password_" . $suffix})) {
                unset($response[0]->{"password_" . $suffix});
            }

            $json = array(
                "status" => 200,
                "results" => $response
            );
        } else {
            $json = array(
                "status" => 404,
                "results" => $error ?? "Not Found",
                "method" => "POST"
            );
        }

        // Enviar código de estado HTTP
        http_response_code($json['status']);

        // Codificar y enviar la respuesta JSON
        echo json_encode($json);

        // Terminar el script para evitar salida adicional
        exit;
    }

}