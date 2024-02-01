<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historico_GotaMeteor extends Model
{
    use HasFactory;
    
    protected $table= "Historico_GotaMeteor";
    public $timestamps =false;
    protected $fillable = [
        "nombre",
        "fecha",
        "temperatura",
        "humedad",
        "viento",
        "lluvia"
    ];
}