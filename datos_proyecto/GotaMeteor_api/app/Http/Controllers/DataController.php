<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Models\Lugar_GotaMeteor;
use Illuminate\Http\Request;

class DataController extends Controller
{
   public function index(){
        $lugares=Lugar_GotaMeteor::all();
        return response()->json(['lugares'=>$lugares]);
   }
}
