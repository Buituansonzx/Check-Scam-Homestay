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
        Schema::table('objects', function (Blueprint $table) {
            $table->string('reporter_name', 255)->nullable()
                ->comment('Tên người tố cáo')
                ->after('is_scam');

            $table->string('reporter_phone', 20)->nullable()
                ->comment('SĐT người tố cáo')
                ->after('reporter_name');

            $table->string('accused_name', 255)->nullable()
                ->comment('Tên người bị tố')
                ->after('reporter_phone');
        });

        Schema::table('object_groups', function (Blueprint $table) {
            $table->string('reporter_name', 255)->nullable()
                ->comment('Tên người tố cáo')
                ->after('is_scam');

            $table->string('reporter_phone', 20)->nullable()
                ->comment('SĐT người tố cáo')
                ->after('reporter_name');

            $table->string('accused_name', 255)->nullable()
                ->comment('Tên người bị tố')
                ->after('reporter_phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('objects', function (Blueprint $table) {
            $table->dropColumn(['reporter_name', 'reporter_phone', 'accused_name']);
        });

        Schema::table('object_groups', function (Blueprint $table) {
            $table->dropColumn(['reporter_name', 'reporter_phone', 'accused_name']);
        });
    }
};
