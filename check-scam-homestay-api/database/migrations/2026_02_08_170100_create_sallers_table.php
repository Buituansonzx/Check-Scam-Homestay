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
        Schema::create('sallers', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID người bán/môi giới');

            $table->uuid('user_id')->nullable()
                ->comment('Liên kết với user account (nullable)');

            $table->decimal('deposit', 15, 2)->default(0.00)
                ->comment('Tiền cọc');

            $table->string('avatar', 500)->nullable()
                ->comment('URL ảnh đại diện');

            $table->string('name', 255)
                ->comment('Tên người bán');

            $table->string('email', 255)->nullable()->unique()
                ->comment('Email liên hệ');

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

            $table->integer('order')->default(0)
                ->comment('Thứ tự hiển thị');

            $table->boolean('is_scam')->default(false)
                ->comment('Trạng thái lừa đảo');

            $table->timestamps();

            // Indexes
            $table->index('user_id');
            $table->index('is_scam');
            $table->index('order');
            $table->index('phone');
            $table->index('email');

            // Foreign Key
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sallers');
    }
};
