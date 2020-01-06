<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InstagramProfile extends Model
{
    protected $fillable = [
        'username',
        'password',
        'user_id'
    ];
}
