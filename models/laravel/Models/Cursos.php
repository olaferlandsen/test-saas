<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * Class Curso
 */
class Cursos extends Model
{
    protected $table = 'cursos';

    public $timestamps = false;

    protected $fillable = [
        'profesor_id',
        'nombre'
    ];
    protected $guarded = [];

    /*
     * Obtiene al profesor del curso
     * */
    public function profesor()
    {
        return $this->belongsTo('App\Models\Profesores');
    }

}