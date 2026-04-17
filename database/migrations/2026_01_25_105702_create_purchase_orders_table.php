<?php

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
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->string('VendAccount');
            //karena bukan id
            $table->foreign('VendAccount')
                ->references('VendAccount')
                ->on('suppliers')
                ->cascadeOnDelete();
            $table->string('PurchId')
                ->unique();
            $table->string('status')->default('draft');
            // draft | approved | shipped | completed | cancelled
            $table->decimal('total_qty', 15, 2)->default(0);
            $table->string('incoterm')->nullable();
            $table->date('DeliveryDate')->nullable();
            $table->date('expected_arrival_date')->nullable();
            $table->date('createdDateTime')->datetime();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
