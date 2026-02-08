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
        Schema::create('objects', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID object');

            $table->uuid('home_id')->nullable()
                ->comment('Liên kết với homestay');

            $table->uuid('saller_id')->nullable()
                ->comment('Liên kết với người bán');

            $table->uuid('object_group_id')->nullable()
                ->comment('Liên kết với nhóm');

            $table->uuid('parent_id')->nullable()
                ->comment('Object cha (self-referencing)');

            $table->string('phone', 20)->nullable()
                ->comment('SĐT ngắn (0987654321)');

            $table->string('phone_full', 20)->nullable()
                ->comment('SĐT đầy đủ (+84987654321)');

            $table->string('bank_account', 50)->nullable()
                ->comment('Số tài khoản ngân hàng');

            $table->string('link_facebook', 500)->nullable()
                ->comment('URL Facebook');

            $table->string('link_tiktok', 500)->nullable()
                ->comment('URL Tiktok');

            $table->string('link_zalo', 500)->nullable()
                ->comment('URL Zalo');

            $table->string('link_website', 500)->nullable()
                ->comment('URL Website');

            $table->string('link_other', 500)->nullable()
                ->comment('URL khác');

            $table->boolean('is_scam')->default(false)
                ->comment('Trạng thái lừa đảo');

            $table->timestamps();

            // Indexes
            $table->index('home_id');
            $table->index('saller_id');
            $table->index('object_group_id');
            $table->index('parent_id');
            $table->index('phone');
            $table->index('phone_full');
            $table->index('bank_account');

            // Foreign Keys
            $table->foreign('home_id')
                ->references('id')
                ->on('homes')
                ->onDelete('cascade');

            $table->foreign('saller_id')
                ->references('id')
                ->on('sallers')
                ->onDelete('cascade');

            $table->foreign('object_group_id')
                ->references('id')
                ->on('object_groups')
                ->onDelete('cascade');

            $table->foreign('parent_id')
                ->references('id')
                ->on('objects')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('objects');
    }
};
