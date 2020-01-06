<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'tags',
        'duration',
        'like',
        'follow',
        'status',
        'start_at',
    ];
}
