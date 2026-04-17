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
        if (Schema::hasColumn('purchase_order_details', 'item_numer')) {
            Schema::table('purchase_order_details', function (Blueprint $table) {
                $table->renameColumn('item_numer', 'item_number');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('purchase_order_details', 'item_number')) {
            Schema::table('purchase_order_details', function (Blueprint $table) {
                $table->renameColumn('item_number', 'item_numer');
            });
        }
    }
};
