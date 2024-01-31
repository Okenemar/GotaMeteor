<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lugar_GotaMeteor extends Model
{
    
    use HasFactory;
    
    protected $table = "Lugares_GotaMeteor";
    protected $primaryKey = "nombre";
    protected $keyType = "string";
    public $timestamps = false;
    protected $fillable = [
        "nombre",
        "latitud",
        "longitud",
        "temperatura",
        "humedad",
        "viento",
        "lluvia"
    ];
}
