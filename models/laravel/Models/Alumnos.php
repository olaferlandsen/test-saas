<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

/**
 * Class Alumno
 */
class Alumnos extends Model
{
    protected $table = 'alumnos';

    public $timestamps = false;

    protected $fillable = [
        'nombre'
    ];
    protected $guarded = [];
    /*
     * Cursos a los que pertenece el alumno
     * */
    function cursos () {
        return $this->belongsToMany(
            'App\Models\Cursos',
            'alumno_curso'
        );
    }
}
