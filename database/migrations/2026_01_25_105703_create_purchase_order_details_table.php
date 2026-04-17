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
        Schema::create('purchase_order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_order_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('PurchId')->nullable();
            $table->string('ItemId')->nullable();
            $table->string('Name');
            $table->decimal('PurchQty', 15, 2);
            $table->string('PurchUnit', 20)->default('pcs');
            $table->string('hs_code')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_order_details');
    }
};
