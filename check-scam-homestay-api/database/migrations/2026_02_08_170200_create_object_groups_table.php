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
        Schema::create('object_groups', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID nhóm thông tin liên lạc');

            $table->string('name', 255)
                ->comment('Tên nhóm');

            $table->text('description')->nullable()
                ->comment('Mô tả nhóm');

            $table->uuid('home_id')->nullable()
                ->comment('Liên kết với homestay');

            $table->uuid('saller_id')->nullable()
                ->comment('Liên kết với người bán');

            $table->json('phones')->nullable()
                ->comment('Mảng SĐT ["0987654321", "0912345678"]');

            $table->json('phone_fulls')->nullable()
                ->comment('Mảng SĐT đầy đủ ["+84987654321", "+84912345678"]');

            $table->json('bank_accounts')->nullable()
                ->comment('Mảng STK ngân hàng ["1234567890", "0987654321"]');

            $table->json('link_facebooks')->nullable()
                ->comment('Mảng URL Facebook ["https://fb.com/user1"]');

            $table->json('link_tiktoks')->nullable()
                ->comment('Mảng URL Tiktok ["https://tiktok.com/@user1"]');

            $table->json('link_zalos')->nullable()
                ->comment('Mảng URL Zalo ["https://zalo.me/user1"]');

            $table->json('link_websites')->nullable()
                ->comment('Mảng URL Website ["https://example.com"]');

            $table->json('link_others')->nullable()
                ->comment('Mảng URL khác ["https://other.com"]');

            $table->boolean('is_scam')->default(false)
                ->comment('Trạng thái lừa đảo');

            $table->timestamps();

            // Indexes
            $table->index('home_id');
            $table->index('saller_id');

            // Foreign Keys
            $table->foreign('home_id')
                ->references('id')
                ->on('homes')
                ->onDelete('cascade');

            $table->foreign('saller_id')
                ->references('id')
                ->on('sallers')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('object_groups');
    }
};
