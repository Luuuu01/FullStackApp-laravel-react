<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::table('recipes', function (Blueprint $table) {
        $table->string('sku')->unique()->nullable(); // SKU field
        $table->boolean('stock')->default(true); // Stock field (in stock by default)
        $table->decimal('price', 8, 2)->nullable(); // Price field
    });
}

public function down()
{
    Schema::table('recipes', function (Blueprint $table) {
        $table->dropColumn(['sku', 'stock', 'price']);
    });
}

};
