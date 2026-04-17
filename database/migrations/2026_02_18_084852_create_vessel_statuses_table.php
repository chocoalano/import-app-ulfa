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
        Schema::create('vessel_statuses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invoice_id');
            $table->string('source'); // e.g., "API", "Manual Entry"
            $table->string('vessel_name')->nullable();
            $table->string('voyage_number')->nullable();
            $table->dateTime('etd')->nullable(); // Estimated Time of Departure
            $table->dateTime('eta')->nullable(); // Estimated Time of Arrival
            $table->dateTime('ata')->nullable(); // Actual Time of Arrival
            $table->string('status')->nullable(); // e.g., "At Sea",
            $table->dateTime('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vessel_trackings');
    }
};
