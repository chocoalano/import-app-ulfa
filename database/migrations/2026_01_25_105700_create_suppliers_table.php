<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();

            $table->string('Name');
            $table->string('VendAccount')->unique();
            $table->string('MarkupGroup')->nullable();
            $table->string('ItemBuyerGroupId')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();

            $table->timestamps();
        });
    }
    protected $fillable = ['name'];

    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
