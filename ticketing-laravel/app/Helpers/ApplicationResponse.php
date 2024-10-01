<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

trait ApplicationResponse
{
    public function json($code = Response::HTTP_OK, $message = '', $data = null, $options = null)
    {
        if (!is_null($data)) {
            if(!is_null($options)) {
                return response()->json(
                    [
                        "code" => $code,
                        "message" => $message,
                        "data" => $data,
                        "data_options" => $options
                    ],
                    $code,
                    []
                );
            }

            if (isset($data->meta)) {
                return response()->json(
                    [
                        "code" => $code,
                        "message" => $message,
                        "data" => $data->data,
                        "meta" => $data->meta
                    ],
                    $code,
                    []
                );
            }

            return response()->json(
                [
                    "code" => $code,
                    "message" => $message,
                    "data" => $data
                ],
                $code,
                []
            );
        }
        return response()->json(
            [
                "code" => $code,
                "message" => $message
            ],
            $code,
            []
        );
    }
}
