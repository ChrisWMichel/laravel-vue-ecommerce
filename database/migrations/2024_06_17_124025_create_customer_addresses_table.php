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
        Schema::create('customer_addresses', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('address1');
            $table->string('address2')->nullable();
            $table->string('city');
            $table->string('state');
            $table->string('zipcode');
            $table->string('country_code', 3);
            $table->foreignId('customer_id')->references('id')->on('customers')->constrained()->onDelete('cascade');
            $table->foreign('country_code')->references('code')->on('countries')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_addresses');
    }
};
