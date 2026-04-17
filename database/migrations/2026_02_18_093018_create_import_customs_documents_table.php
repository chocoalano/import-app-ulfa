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
        Schema::create('import_customs_documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invoice_id');
            $table->string('aju_number')->nullable();
            $table->string('document_type'); //PIB, SPPB, BC23, BC25, BC27, BC28
            $table->string('document_number')->nullable();
            $table->timestamp('response_date')->nullable();
            $table->string('customs_channel')->nullable();
            $table->string('status')->nullable();
            $table->json('raw_response_json')->nullable();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('import_customs_documents');
    }
};
