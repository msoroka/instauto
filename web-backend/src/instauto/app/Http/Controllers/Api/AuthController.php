<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\User;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $token = $user->createToken('Instauto')->accessToken;

        return response()->json([
            'data' => [
                'token' => $token,
            ],
        ], Response::HTTP_OK);
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt([
                'email'    => $request->input('email'),
                'password' => $request->input('password'),
            ]) && $user = Auth::user()) {
            $token = $user->createToken('Instauto')->accessToken;

            return response()->json([
                'data' => [
                    'token' => $token,
                ],
            ], Response::HTTP_OK);
        }

        return response()->json('', Response::HTTP_UNAUTHORIZED);
    }

    public function logout()
    {
        if (Auth::check() && Auth::user()->authAccessToken()->delete()) {
            return response()->json('', Response::HTTP_OK);
        }

        return response()->json('', Response::HTTP_UNAUTHORIZED);
    }

    public function checkAuth()
    {
        $user = Auth::user();

        return response()->json([
            'data' => $user,
        ], Response::HTTP_OK);
    }
}
