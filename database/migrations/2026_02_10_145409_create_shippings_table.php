<?php

use App\Models\Invoice;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
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
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_order_id')->constrained()->onDelete('cascade');
            $table->foreignId('invoice_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');
            $table->string('custom_reference')->nullable();
            $table->string('nomor_respon')->nullable();
            $table->string('kode_respon')->nullable();
            $table->string('bl_number')->nullable();
            $table->string('pol')->nullable()->dateTime();
            $table->string('pod')->nullable()->dateTime();
            $table->date('etd')->nullable()->dateTime();
            $table->date('eta')->nullable()->dateTime();
            $table->date('trucking_date')->nullable()->dateTime();
            $table->string('carrier')->nullable();
            $table->string('container_number')->nullable();
            $table->string('status')->default('pending');
            $table->date('estimated_arrival')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shippings');
    }
    
};
