<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        $response = [
            'success' => false,
            'message' => "Unauthorised",
        ];

        return response()->json($response, 403);
    }
}
