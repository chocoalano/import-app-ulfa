<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('invoice_details', function (Blueprint $table) {
            if (! Schema::hasColumn('invoice_details', 'purchase_order_id')) {
                $table->foreignId('purchase_order_id')
                    ->nullable()
                    ->constrained()
                    ->after('invoice_id');
            }

            if (! Schema::hasColumn('invoice_details', 'purchase_order_detail_id')) {
                $table->foreignId('purchase_order_detail_id')
                    ->nullable()
                    ->constrained('purchase_order_details')
                    ->after('purchase_order_id');
            }
        });
    }

    public function down()
    {
        Schema::table('invoice_details', function (Blueprint $table) {
            $table->dropConstrainedForeignId('purchase_order_detail_id');
            $table->dropConstrainedForeignId('purchase_order_id');
        });
    }
};
