<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Profesore
 */
class Profesores extends Model
{
    protected $table = 'profesores';

    public $timestamps = false;

    protected $fillable = [
        'nombre'
    ];

    protected $guarded = [];

        
}