<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Models\Lugar_GotaMeteor;
use Illuminate\Http\Request;

class DataController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        
$provincias = array(
    'Gipuzkoa' => array(
        'id' => 20,
        'municipios' => array(
            'Donosti' => 20069,
            'Errenteria' => 20067,
            'Irun' => 20045,
            'Zarautz' => 20079
        )
    ),
    'Bizkaia' => array(
        'id' => 48,
        'municipios' => array(
            'Bilbo' => 48020
        )
    )
);

foreach ($provincias as $provincia => $provinciaData) {
    foreach ($provinciaData['municipios'] as $municipio => $municipioId) {
        
        $response = Http::get("https://www.el-tiempo.net/api/json/v2/provincias/{$provinciaData['id']}/municipios/{$municipioId}");


        if ($response === false) {
            throw new Exception("La solicitud no se pudo completar correctamente.");
        }

        $data = $response->json();

        if ($municipioId == 20069) {
            $data['municipio']['NOMBRE'] = "Donostia";
        }

        $lugar = Lugar_GotaMeteor::where('nombre', $data['municipio']['NOMBRE'])->first();
        
        if($lugar){
            $lugar -> temperatura = $data['temperatura_actual'] == "" ? 0 : $data['temperatura_actual'];
            $lugar -> humedad = $data['humedad'] == "" ? 0 : $data['humedad'];
            $lugar -> viento = $data['viento'] == "" ? 0 : $data['viento'];
            $lugar -> lluvia = $data['lluvia'] == "" ? 0 : $data['lluvia'];
            
            $lugar->save();
        }
        else{
            Lugar_GotaMeteor::create([
                'nombre' => $data['municipio']['NOMBRE'],
                'latitud' => $data['municipio']['LATITUD_ETRS89_REGCAN95'],
                'longitud' => $data['municipio']['LONGITUD_ETRS89_REGCAN95'],
                'temperatura' => $data['temperatura_actual'] == "" ? 0 : $data['temperatura_actual'],
                'humedad' => $data['humedad'] == "" ? 0 : $data['humedad'],
                'viento' => $data['viento'] == "" ? 0 : $data['viento'],
                'lluvia' => $data['lluvia'] == "" ? 0 : $data['lluvia'],
            ]);
        }  
       
           }
}
    }



    /**
     * Update the specified resource in storage.
     */
    public function update()
    {

    }
}