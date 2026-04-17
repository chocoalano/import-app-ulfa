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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('VendAccount');
            $table->foreign('VendAccount')
                ->references('VendAccount')
                ->on('suppliers')
                ->cascadeOnDelete();
            $table->string('PurchId')->unique();
            $table->string('purchase_order_id')->unique();
            $table->string('invoice_number')->unique();
            $table->string('inventTransRefId')->unique();
            $table->string('status')->default('draft');
            $table->decimal('total_qty', 15, 2)->default(0);
            $table->string('incoterm')->unique();
            $table->string('DeliveryDate')->datetime();
            $table->string('expected_arrival_date')->datetime();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
