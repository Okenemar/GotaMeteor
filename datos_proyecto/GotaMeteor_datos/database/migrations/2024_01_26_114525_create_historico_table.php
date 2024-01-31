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
        Schema::create('Historico_Lugares_GotaMeteor', function (Blueprint $table) {
            $table->string('nombre');
            $table->date('fecha');
            $table->float('temperatura');
            $table->float('humedad');
            $table->float('viento');
            $table->float('lluvia');

            // Agregar la clave foránea
            $table->foreign('nombre')->references('nombre')->on('Lugares_GotaMeteor');
            $table->primary(['nombre','fecha']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Historico_Lugares_GotaMeteor', function (Blueprint $table) {
            // Eliminar la clave foránea
            $table->dropForeign(['nombre']);
        });

        Schema::dropIfExists('Historico_Lugares_GotaMeteor');
    }
};
