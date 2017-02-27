<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class AlumnoPrueba
 */
class AlumnoPruebas extends Model
{
    protected $table = 'alumno_pruebas';

    public $timestamps = false;

    protected $fillable = [
        'alumnos_id',
        'pruebas_id',
        'nota'
    ];

    protected $guarded = [];


}