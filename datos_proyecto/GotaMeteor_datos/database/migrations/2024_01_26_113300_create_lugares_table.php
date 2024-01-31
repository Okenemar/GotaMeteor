<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Lugares_GotaMeteor', function (Blueprint $table) {
            $table->string('nombre')->primary();
            $table->float('latitud');
            $table->float('longitud');
            $table->float('temperatura');
            $table->float('humedad');
            $table->float('viento');
            $table->float('lluvia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
