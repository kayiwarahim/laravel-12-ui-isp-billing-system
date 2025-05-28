<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('routers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('host');
            $table->string('username');
            $table->string('password');
            $table->integer('port')->default(8728);
            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->string('last_connection_status')->nullable();
            $table->timestamp('last_connection_time')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('routers');
    }
}; 