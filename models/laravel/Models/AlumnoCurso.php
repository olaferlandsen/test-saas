<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class AlumnoCurso
 */
class AlumnoCurso extends Model
{
    protected $table = 'alumno_curso';

    public $timestamps = false;
    protected $hidden = ['pivot'];
    protected $fillable = [
        'cursos_id',
        'alumnos_id'
    ];

    protected $guarded = [];
}