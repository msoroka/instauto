<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\InstagramProfileRequest;
use App\InstagramProfile;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class InstagramProfileController
{
    public function getUserInstagramProfile()
    {
        if ($user = Auth::user()) {
            $instagramProfile = $user->instagramProfile;

            return response()->json([
                'data' => [
                    'profile' => $instagramProfile,
                ],
            ], Response::HTTP_OK);
        }

        return response()->json('', Response::HTTP_UNAUTHORIZED);
    }

    public function updateOrCreate(InstagramProfileRequest $request)
    {
        if ($user = Auth::user()) {
            if (InstagramProfile::updateOrCreate([
                'user_id'  => $user->id,
                'username' => $request->input('username'),
                'password' => $request->input('password'),
            ])) {
                return response()->json('', Response::HTTP_OK);
            }

            return response()->json('', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json('', Response::HTTP_UNAUTHORIZED);
    }
}
