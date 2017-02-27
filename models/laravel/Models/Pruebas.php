<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Prueba
 */
class Pruebas extends Model
{
    protected $table = 'pruebas';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'cursos_id'
    ];

    protected $guarded = [];

        
}