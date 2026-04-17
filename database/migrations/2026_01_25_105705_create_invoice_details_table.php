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
        Schema::create('invoice_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->foreignId('purchase_order_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->foreignId('purchase_order_detail_id')
                ->nullable()
                ->constrained('purchase_order_details')
                ->nullOnDelete();
            $table->string('ItemId')->nullable();
            $table->string('Name');
            $table->text('description')->nullable();
            $table->decimal('qty', 15, 2);
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
        Schema::dropIfExists('invoice_details');
    }
};
