<?php

Route::prefix('v1')->group(function () {
    Route::post('login', 'Api\AuthController@login');
    Route::post('register', 'Api\AuthController@register');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('check-auth', 'Api\AuthController@checkAuth');
        Route::post('logout', 'Api\AuthController@logout');

        Route::get('instagram-profile', 'Api\InstagramProfileController@getUserInstagramProfile');
        Route::post('instagram-profile', 'Api\InstagramProfileController@updateOrCreate');
    });
});
